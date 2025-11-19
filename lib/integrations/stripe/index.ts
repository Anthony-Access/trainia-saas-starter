/**
 * Stripe Integration Module
 *
 * Barrel export for Stripe client, server, and configuration.
 *
 * @example
 * ```typescript
 * import { stripe } from '@/lib/integrations/stripe';
 * import { getStripe } from '@/lib/integrations/stripe';
 * ```
 */

export { getStripe } from './client';
export { stripe } from './config';
export { checkoutWithStripe, createBillingPortalSession } from './server';
