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

// Force dynamic rendering - don't statically analyze during build
export const dynamic = 'force-dynamic';

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
  // Rate limiting: Allow 50 webhook calls per minute per IP
  // Uses distributed Redis if configured, otherwise falls back to in-memory
  // This prevents abuse while allowing legitimate high-volume webhook processing
  const identifier = getClientIdentifier(req);
  const rateLimitResult = await rateLimitWebhook(identifier);

  if (!rateLimitResult.success) {
    console.warn(`⚠️  Rate limit exceeded for ${identifier}`);

    // ✅ SECURITY: Log rate limit violation
    SecurityLogger.logRateLimitExceeded({
      identifier,
      endpoint: '/api/webhooks',
      limit: 50,
      ip: identifier,
    });

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
