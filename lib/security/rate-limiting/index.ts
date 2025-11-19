/**
 * Rate Limiting Module
 *
 * Unified rate limiting with automatic selection between distributed Redis
 * and in-memory implementations.
 *
 * ## Usage
 *
 * ### For API Routes and Webhooks:
 * ```typescript
 * import { rateLimit, getClientIdentifier } from '@/lib/security/rate-limiting';
 *
 * export async function POST(request: Request) {
 *   const identifier = getClientIdentifier(request);
 *   const result = await rateLimit(identifier, { limit: 50, windowInSeconds: 60 });
 *
 *   if (!result.success) {
 *     return new Response('Too Many Requests', { status: 429 });
 *   }
 *   // ... handle request
 * }
 * ```
 *
 * ### For Server Actions:
 * ```typescript
 * import { rateLimitAction, RateLimiters } from '@/lib/security/rate-limiting';
 *
 * export async function myAction() {
 *   const result = await RateLimiters.standard();
 *   if (!result.success) {
 *     throw new Error('Rate limit exceeded');
 *   }
 *   // ... handle action
 * }
 * ```
 *
 * ### Pre-configured Rate Limiters:
 * ```typescript
 * import { RateLimitPresets } from '@/lib/security/rate-limiting';
 *
 * // Webhook rate limiting
 * const result = await RateLimitPresets.webhook(identifier);
 *
 * // API rate limiting
 * const result = await RateLimitPresets.api(identifier);
 *
 * // Auth rate limiting (strict)
 * const result = await RateLimitPresets.auth(identifier);
 * ```
 */

// Internal imports for use in this file
import { distributedRateLimit as distributedRateLimitFn, getRateLimitMode as getRateLimitModeFn } from './distributed';

// Export types
export type { RateLimitConfig, RateLimitResult, RateLimitMode } from './types';

// Export core utilities
export { withRateLimitHeaders, createRateLimitResponse, normalizeConfig } from './core';

// Export in-memory implementation
export {
  inMemoryRateLimit,
  getRateLimitState,
  clearRateLimit,
  clearAllRateLimits
} from './in-memory';

// Export distributed implementation
export {
  distributedRateLimit,
  getRateLimitMode,
  isDistributedRateLimitingEnabled
} from './distributed';

// Export server actions
export { rateLimitAction, RateLimiters } from './actions';

// Re-export getClientIdentifier from IP validation
export { getClientIdentifier } from '../validation/ip';

/**
 * Main rate limit function with automatic distributed/in-memory selection
 *
 * This is the recommended function to use for most use cases.
 * It automatically chooses between distributed Redis and in-memory based on configuration.
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * const identifier = getClientIdentifier(request);
 * const result = await rateLimit(identifier, { limit: 10, windowInSeconds: 60 });
 * ```
 */
export async function rateLimit(
  identifier: string,
  config: { limit: number; windowInSeconds: number }
) {
  // Use distributed rate limiting (will fallback to in-memory automatically)
  return distributedRateLimitFn(identifier, config);
}

/**
 * Pre-configured rate limiters for common use cases
 *
 * @example
 * ```typescript
 * // Protect webhooks
 * const result = await RateLimitPresets.webhook(identifier);
 *
 * // Protect API endpoints
 * const result = await RateLimitPresets.api(identifier);
 *
 * // Protect authentication endpoints
 * const result = await RateLimitPresets.auth(identifier);
 * ```
 */
export const RateLimitPresets = {
  /**
   * Webhook: 50 requests per minute
   */
  webhook: (identifier: string) =>
    rateLimit(identifier, { limit: 50, windowInSeconds: 60 }),

  /**
   * API: 100 requests per minute
   */
  api: (identifier: string) =>
    rateLimit(identifier, { limit: 100, windowInSeconds: 60 }),

  /**
   * Authentication: 5 requests per 15 minutes (strict)
   */
  auth: (identifier: string) =>
    rateLimit(identifier, { limit: 5, windowInSeconds: 900 }),

  /**
   * Standard: 30 requests per minute
   */
  standard: (identifier: string) =>
    rateLimit(identifier, { limit: 30, windowInSeconds: 60 }),
};

// Log initialization
if (typeof window === 'undefined') {
  const mode = getRateLimitModeFn();
  console.log(`🔒 Rate limiting initialized in ${mode} mode`);

  if (mode === 'in-memory') {
    console.warn('⚠️  WARNING: Using in-memory rate limiting');
    console.warn('   This does NOT work across multiple server instances');
    console.warn('   For production, install Upstash Redis:');
    console.warn('   1. npm install @upstash/ratelimit @upstash/redis');
    console.warn('   2. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
    console.warn('   3. Visit https://upstash.com to create a free account');
  }
}
