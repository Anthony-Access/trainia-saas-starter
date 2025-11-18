import Stripe from 'stripe';

// Use a placeholder key during build time to prevent errors
// At runtime, the real key will be used from environment variables
// Placeholder follows Stripe format but uses 'PLACEHOLDER' to avoid secret detection
const stripeKey = process.env.STRIPE_SECRET_KEY_LIVE
  ?? process.env.STRIPE_SECRET_KEY
  ?? 'sk_test_PLACEHOLDER_BUILD_TIME_KEY_NOT_REAL_DO_NOT_USE';

export const stripe = new Stripe(
  stripeKey,
  {
    // https://github.com/stripe/stripe-node#configuration
    // https://stripe.com/docs/api/versioning
    // @ts-ignore
    apiVersion: null,
    // ✅ SECURITY: Prevent hanging requests and DoS attacks
    timeout: 10000, // 10 seconds maximum per request
    maxNetworkRetries: 2, // Automatic retry on network failures
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Next.js Subscription Starter',
      version: '0.0.0',
      url: 'https://github.com/vercel/nextjs-subscription-payments'
    }
  }
);

// Log configuration at startup (server-side only)
if (typeof window === 'undefined') {
    console.log('✅ Stripe configured with 10s timeout and 2 retries');
}
