/**
 * Distributed Rate Limiting with Upstash Redis
 *
 * Enterprise-grade rate limiting that works across multiple server instances.
 *
 * Features:
 * - Distributed (works with multiple instances)
 * - Automatic fallback to in-memory if Redis is not configured
 * - Sliding window algorithm for accurate rate limiting
 * - Analytics and abuse detection
 *
 * Setup:
 * 1. Create free account at https://upstash.com
 * 2. Create a Redis database
 * 3. Add environment variables:
 *    - UPSTASH_REDIS_REST_URL
 *    - UPSTASH_REDIS_REST_TOKEN
 * 4. Install: npm install @upstash/ratelimit @upstash/redis
 */

import type { RateLimitConfig, RateLimitResult } from './types';
import { normalizeConfig } from './core';
import { inMemoryRateLimit } from './in-memory';

// Check if Upstash Redis is configured
const isRedisConfigured = () => {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
};

/**
 * Lazy load Upstash modules only if Redis is configured
 * This prevents errors during build when dependencies are not installed
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Ratelimit: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Redis: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ratelimitCache = new Map<string, any>();

async function loadOptionalDeps() {
  try {
    // Dynamic import to avoid build errors
    const { loadUpstashRatelimit, loadUpstashRedis } = await import('@/lib/optional-deps');
    const ratelimitModule = await loadUpstashRatelimit();
    const redisModule = await loadUpstashRedis();

    if (!ratelimitModule || !redisModule) {
      return null;
    }

    Ratelimit = ratelimitModule.Ratelimit;
    Redis = redisModule.Redis;

    return { Ratelimit, Redis };
  } catch {
    return null;
  }
}

async function getRatelimiter(config: RateLimitConfig, prefix: string = 'ratelimit') {
  if (!isRedisConfigured()) {
    return null;
  }

  const normalizedConfig = normalizeConfig(config);
  const cacheKey = `${prefix}:${normalizedConfig.limit}:${normalizedConfig.windowInSeconds}`;

  // Return cached instance if available
  if (ratelimitCache.has(cacheKey)) {
    return ratelimitCache.get(cacheKey);
  }

  try {
    const deps = await loadOptionalDeps();
    if (!deps) {
      console.warn('⚠️  Upstash packages not installed, falling back to in-memory rate limiting');
      return null;
    }

    const { Ratelimit, Redis } = deps;

    // Create Redis client
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    // Create rate limiter with sliding window
    const ratelimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(
        normalizedConfig.limit,
        `${normalizedConfig.windowInSeconds} s`
      ),
      analytics: true,
      prefix,
    });

    // Cache the instance
    ratelimitCache.set(cacheKey, ratelimiter);

    return ratelimiter;
  } catch (error) {
    console.warn('⚠️  Failed to initialize Upstash Redis, falling back to in-memory rate limiting');
    console.warn('   Error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Rate limit a request using distributed Redis or in-memory fallback
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @param prefix - Redis key prefix for categorizing rate limits
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * const result = await distributedRateLimit('192.168.1.1', {
 *   limit: 50,
 *   windowInSeconds: 60
 * });
 *
 * if (!result.success) {
 *   return new Response('Too Many Requests', { status: 429 });
 * }
 * ```
 */
export async function distributedRateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 50, windowInSeconds: 60 },
  prefix: string = 'ratelimit'
): Promise<RateLimitResult> {
  // Try Redis if configured
  if (isRedisConfigured()) {
    try {
      const ratelimiter = await getRatelimiter(config, prefix);

      if (ratelimiter) {
        const { success, limit, remaining, reset } = await ratelimiter.limit(identifier);

        // Calculate reset time in seconds
        const resetIn = Math.ceil((reset - Date.now()) / 1000);

        // Log rate limit exceeded (potential abuse)
        if (!success) {
          console.warn(`🚨 Rate limit exceeded for ${identifier}`, {
            limit,
            remaining,
            reset: new Date(reset).toISOString(),
            timestamp: new Date().toISOString(),
          });
        }

        return {
          success,
          remaining,
          resetIn,
        };
      }
    } catch (error) {
      console.error('❌ Redis rate limiting error, falling back to in-memory:', error);
      // Fall through to in-memory rate limiting
    }
  }

  // Fallback to in-memory rate limiting
  return inMemoryRateLimit(identifier, config);
}

/**
 * Get the current rate limiting mode
 *
 * @returns 'distributed' if Redis is configured, 'in-memory' otherwise
 */
export function getRateLimitMode(): 'distributed' | 'in-memory' {
  return isRedisConfigured() ? 'distributed' : 'in-memory';
}

/**
 * Check if distributed rate limiting is available
 *
 * @returns true if Redis is configured
 */
export function isDistributedRateLimitingEnabled(): boolean {
  return isRedisConfigured();
}
