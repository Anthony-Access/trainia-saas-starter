import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord
} from '@/utils/supabase/admin';
import { rateLimitWebhook, getClientIdentifier, getRateLimitMode } from '@/utils/rate-limit-distributed';
import { SecurityLogger } from '@/utils/security-logger';
import { detectIPSpoofing, analyzeRateLimitBypass } from '@/utils/security-monitor';

// Force dynamic rendering - don't statically analyze during build
export const dynamic = 'force-dynamic';

// ✅ SECURITY: Limit webhook payload size to prevent DoS attacks
// 1MB is more than sufficient for Stripe webhooks (typically < 50KB)
const MAX_WEBHOOK_SIZE = 1024 * 1024; // 1 MB

// Log rate limiting mode on first load
if (typeof window === 'undefined') {
  const mode = getRateLimitMode();
  console.log(`🔒 Webhook rate limiting mode: ${mode}`);
  if (mode === 'in-memory') {
    console.warn('⚠️  Using in-memory rate limiting. For production with multiple instances, configure Upstash Redis.');
    console.warn('   Visit: https://upstash.com (free tier available)');
  }
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(req: Request) {
  // ✅ SECURITY: Check payload size BEFORE reading body to prevent DoS
  const contentLength = req.headers.get('content-length');

  if (contentLength && parseInt(contentLength) > MAX_WEBHOOK_SIZE) {
    console.error('❌ Webhook payload too large:', contentLength);

    const identifier = getClientIdentifier(req);
    SecurityLogger.logSuspiciousActivity({
      ip: identifier,
      activity: 'OVERSIZED_WEBHOOK',
      details: { size: contentLength },
      path: '/api/webhooks',
    });

    return new Response('Payload too large', { status: 413 });
  }

  // ✅ SECURITY: Detect IP spoofing attempts
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const userAgent = req.headers.get('user-agent');

  if (detectIPSpoofing(forwardedFor, realIp, userAgent)) {
    console.warn('⚠️  Suspicious IP spoofing detected', {
      forwardedFor,
      realIp,
      userAgent,
    });
  }

  // Rate limiting: Allow 50 webhook calls per minute per IP
  // Uses distributed Redis if configured, otherwise falls back to in-memory
  // This prevents abuse while allowing legitimate high-volume webhook processing
  const identifier = getClientIdentifier(req);
  const rateLimitResult = await rateLimitWebhook(identifier);

  if (!rateLimitResult.success) {
    console.warn(`⚠️  Rate limit exceeded for ${identifier}`);

    // ✅ SECURITY: Log rate limit violation and analyze bypass attempts
    SecurityLogger.logRateLimitExceeded({
      identifier,
      endpoint: '/api/webhooks',
      limit: 50,
      ip: identifier,
    });

    analyzeRateLimitBypass(identifier, true);

    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': '50',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetIn.toString(),
        'Retry-After': rateLimitResult.resetIn.toString()
      }
    });
  }

  const body = await req.text();

  // ✅ SECURITY: Double-check body size after reading
  if (body.length > MAX_WEBHOOK_SIZE) {
    console.error('❌ Webhook body exceeds limit after reading:', body.length);

    SecurityLogger.logSuspiciousActivity({
      ip: identifier,
      activity: 'OVERSIZED_WEBHOOK_BODY',
      details: { actualSize: body.length },
      path: '/api/webhooks',
    });

    return new Response('Payload too large', { status: 413 });
  }

  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('❌ Webhook configuration error: Missing signature or secret');
      return new Response('Webhook configuration error', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err) {
    console.error(`❌ Webhook signature verification failed:`, {
      error: err instanceof Error ? err.message : 'Unknown error',
      hasSignature: !!sig,
      hasSecret: !!webhookSecret
    });

    // ✅ SECURITY: Log invalid webhook signature (potential attack)
    SecurityLogger.logInvalidWebhookSignature({
      ip: identifier,
      endpoint: '/api/webhooks',
      provider: 'Stripe',
    });

    return new Response('Webhook signature verification failed', { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case 'price.deleted':
          await deletePriceRecord(event.data.object as Stripe.Price);
          break;
        case 'product.deleted':
          await deleteProductRecord(event.data.object as Stripe.Product);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error(`❌ Webhook handler error for event ${event.type}:`, {
        eventId: event.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return new Response('Webhook processing failed', { status: 500 });
    }
  } else {
    console.log(`ℹ️  Ignored event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
