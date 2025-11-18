/**
 * Rate Limiting for Server Actions
 *
 * Protects Server Actions from abuse and DoS attacks
 * Uses distributed Redis if available, otherwise in-memory
 */

import { currentUser } from '@clerk/nextjs/server';

// Try to import optional dependencies
let Ratelimit: any;
let Redis: any;

try {
  const upstashRatelimit = require('@upstash/ratelimit');
  const upstashRedis = require('@upstash/redis');
  Ratelimit = upstashRatelimit.Ratelimit;
  Redis = upstashRedis.Redis;
} catch {
  // Optional dependencies not installed
}

// In-memory fallback for rate limiting (single instance only)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed per window
   */
  limit: number;

  /**
   * Time window in seconds
   */
  window: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Create a distributed rate limiter using Upstash Redis
 */
function createDistributedLimiter(config: RateLimitConfig) {
  if (!Ratelimit || !Redis) {
    return null;
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.limit, `${config.window} s`),
    analytics: true,
    prefix: 'server-action',
  });
}

/**
 * In-memory rate limiter (fallback for development)
 */
function inMemoryLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const key = `${identifier}:${config.window}`;
  const record = inMemoryStore.get(key);

  if (!record || now > record.resetAt) {
    // First request or window expired
    const resetAt = now + config.window * 1000;
    inMemoryStore.set(key, { count: 1, resetAt });

    return {
      success: true,
      remaining: config.limit - 1,
      reset: Math.floor(resetAt / 1000),
    };
  }

  if (record.count >= config.limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: Math.floor(record.resetAt / 1000),
    };
  }

  // Increment counter
  record.count++;
  inMemoryStore.set(key, record);

  return {
    success: true,
    remaining: config.limit - record.count,
    reset: Math.floor(record.resetAt / 1000),
  };
}

/**
 * Rate limit a server action by user ID
 *
 * @example
 * ```typescript
 * export async function sensitiveAction() {
 *   const result = await rateLimitAction({ limit: 10, window: 60 });
 *   if (!result.success) {
 *     throw new Error('Rate limit exceeded');
 *   }
 *   // ... rest of action
 * }
 * ```
 */
export async function rateLimitAction(
  config: RateLimitConfig = { limit: 10, window: 60 }
): Promise<RateLimitResult> {
  // Get current user ID as identifier
  const user = await currentUser();

  if (!user?.id) {
    // If no user, use a default strict limit
    return {
      success: false,
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + config.window,
    };
  }

  const identifier = user.id;

  // Try distributed rate limiting first
  const distributedLimiter = createDistributedLimiter(config);

  if (distributedLimiter) {
    try {
      const result = await distributedLimiter.limit(identifier);
      return {
        success: result.success,
        remaining: result.remaining,
        reset: Math.floor(result.reset / 1000),
      };
    } catch (error) {
      console.error('Distributed rate limiting failed, falling back to in-memory:', error);
      // Fall through to in-memory
    }
  }

  // Fallback to in-memory rate limiting
  if (typeof window === 'undefined') {
    console.warn('⚠️  Using in-memory rate limiting. For production, install @upstash/ratelimit');
  }

  return inMemoryLimit(identifier, config);
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

/**
 * Get rate limiting mode
 */
export function getRateLimitMode(): 'distributed' | 'in-memory' {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && Ratelimit) {
    return 'distributed';
  }
  return 'in-memory';
}

// Log rate limiting mode on startup
if (typeof window === 'undefined') {
  const mode = getRateLimitMode();
  console.log(`🔒 Server Actions rate limiting mode: ${mode}`);
  if (mode === 'in-memory') {
    console.warn('⚠️  Using in-memory rate limiting. For production with multiple instances, install Upstash:');
    console.warn('   npm install @upstash/ratelimit @upstash/redis');
    console.warn('   And configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
  }
}
