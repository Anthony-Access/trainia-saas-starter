/**
 * Rate Limiting for Server Actions
 *
 * Protects Server Actions from abuse and DoS attacks.
 * Uses distributed Redis if available, otherwise in-memory.
 *
 * @example
 * ```typescript
 * import { rateLimitAction, RateLimiters } from '@/lib/security/rate-limiting/actions';
 *
 * export async function sensitiveAction() {
 *   const result = await RateLimiters.strict();
 *   if (!result.success) {
 *     throw new Error('Rate limit exceeded');
 *   }
 *   // ... rest of action
 * }
 * ```
 */

import { currentUser } from '@clerk/nextjs/server';
import { distributedRateLimit, getRateLimitMode } from './distributed';
import { inMemoryRateLimit } from './in-memory';
import type { RateLimitConfig, RateLimitResult } from './types';

/**
 * Rate limit a server action by user ID
 *
 * @param config - Rate limit configuration
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * export async function myAction() {
 *   const result = await rateLimitAction({ limit: 10, window: 60 });
 *   if (!result.success) {
 *     throw new Error('Too many requests');
 *   }
 *   // Proceed with action
 * }
 * ```
 */
export async function rateLimitAction(
  config: RateLimitConfig = { limit: 10, window: 60 }
): Promise<RateLimitResult> {
  // Get current user ID as identifier
  const user = await currentUser();

  if (!user?.id) {
    // If no user, deny the request
    return {
      success: false,
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + (config.window || config.windowInSeconds || 60),
    };
  }

  const identifier = user.id;
  const windowInSeconds = config.window ?? config.windowInSeconds ?? 60;
  const normalizedConfig = { limit: config.limit, windowInSeconds };

  // Try distributed rate limiting first
  try {
    const result = await distributedRateLimit(identifier, normalizedConfig, 'server-action');

    // Convert resetIn to reset for backwards compatibility
    if (result.resetIn !== undefined) {
      return {
        ...result,
        reset: Math.floor(Date.now() / 1000) + result.resetIn,
      };
    }

    return result;
  } catch (error) {
    console.error('Distributed rate limiting failed, falling back to in-memory:', error);

    // Fallback to in-memory
    const result = inMemoryRateLimit(identifier, normalizedConfig);

    return {
      ...result,
      reset: Math.floor(Date.now() / 1000) + (result.resetIn || 0),
    };
  }
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const RateLimiters = {
  /**
   * Strict: 5 requests per minute (for sensitive operations)
   */
  strict: () => rateLimitAction({ limit: 5, window: 60 }),

  /**
   * Standard: 10 requests per minute (for normal operations)
   */
  standard: () => rateLimitAction({ limit: 10, window: 60 }),

  /**
   * Relaxed: 30 requests per minute (for frequent operations)
   */
  relaxed: () => rateLimitAction({ limit: 30, window: 60 }),

  /**
   * Checkout: 3 checkout sessions per 5 minutes
   */
  checkout: () => rateLimitAction({ limit: 3, window: 300 }),

  /**
   * Billing Portal: 10 accesses per hour
   */
  billingPortal: () => rateLimitAction({ limit: 10, window: 3600 }),
};

// Log rate limiting mode on startup (server-side only)
if (typeof window === 'undefined') {
  const mode = getRateLimitMode();
  console.log(`🔒 Server Actions rate limiting mode: ${mode}`);
  if (mode === 'in-memory') {
    console.warn('⚠️  Using in-memory rate limiting for Server Actions');
    console.warn('   For production with multiple instances, install Upstash:');
    console.warn('   npm install @upstash/ratelimit @upstash/redis');
    console.warn('   And configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
  }
}
