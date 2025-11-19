/**
 * Integrations Module
 *
 * Barrel export for all third-party integrations.
 *
 * @example
 * ```typescript
 * import { stripe, getStripe } from '@/lib/integrations';
 * import { createClient, supabaseAdmin } from '@/lib/integrations';
 * ```
 */

// Stripe
export * from './stripe';

// Supabase
export * from './supabase';
