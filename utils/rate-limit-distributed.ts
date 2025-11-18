/**
 * Distributed Rate Limiting with Upstash Redis
 *
 * This module provides enterprise-grade rate limiting that works across
 * multiple server instances using Upstash Redis.
 *
 * Features:
 * - Distributed rate limiting (works with multiple instances)
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

import { rateLimit as inMemoryRateLimit, getClientIdentifier } from './rate-limit';

// Type definitions
interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number;
}

interface RateLimitConfig {
  limit: number;
  windowInSeconds: number;
}

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
let Ratelimit: any;
let Redis: any;
let ratelimitInstance: any;

async function initializeRedis() {
  if (!isRedisConfigured()) {
    return null;
  }

  try {
    // Load optional dependencies using eval to bypass webpack
    const { loadUpstashRatelimit, loadUpstashRedis } = await import('./optional-deps');
    const ratelimitModule = await loadUpstashRatelimit();
    const redisModule = await loadUpstashRedis();

    if (!ratelimitModule || !redisModule) {
      console.warn('⚠️  Upstash packages not installed, falling back to in-memory rate limiting');
      return null;
    }

    Ratelimit = ratelimitModule.Ratelimit;
    Redis = redisModule.Redis;

    // Create Redis client
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    // Create rate limiter with sliding window
    ratelimitInstance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, '60 s'), // 50 requests per minute
      analytics: true, // Enable analytics for abuse detection
      prefix: 'ratelimit:webhook',
    });

    console.log('✅ Distributed rate limiting enabled (Upstash Redis)');
    return ratelimitInstance;
  } catch (error) {
    console.warn('⚠️  Failed to initialize Upstash Redis, falling back to in-memory rate limiting');
    console.warn('   Error:', error instanceof Error ? error.message : 'Unknown error');
    console.warn('   Install packages: npm install @upstash/ratelimit @upstash/redis');
    return null;
  }
}

// Initialize on module load (server-side only)
let redisInitPromise: Promise<any> | null = null;
if (typeof window === 'undefined' && isRedisConfigured()) {
  redisInitPromise = initializeRedis();
}

/**
 * Rate limit a request using distributed Redis or in-memory fallback
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export async function distributedRateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 50, windowInSeconds: 60 }
): Promise<RateLimitResult> {
  // If Redis is configured and initialized, use it
  if (redisInitPromise) {
    try {
      const ratelimiter = await redisInitPromise;

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
  // This happens if:
  // - Redis is not configured
  // - Redis initialization failed
  // - Redis call failed
  return inMemoryRateLimit(identifier, config);
}

/**
 * Helper function to rate limit webhooks
 * Uses distributed rate limiting with appropriate limits
 */
export async function rateLimitWebhook(identifier: string): Promise<RateLimitResult> {
  return distributedRateLimit(identifier, {
    limit: 50,
    windowInSeconds: 60,
  });
}

/**
 * Helper function to rate limit API endpoints
 * More restrictive than webhooks
 */
export async function rateLimitAPI(identifier: string): Promise<RateLimitResult> {
  return distributedRateLimit(identifier, {
    limit: 30,
    windowInSeconds: 60,
  });
}

/**
 * Helper function to rate limit authentication endpoints
 * Very restrictive to prevent brute force attacks
 */
export async function rateLimitAuth(identifier: string): Promise<RateLimitResult> {
  return distributedRateLimit(identifier, {
    limit: 5,
    windowInSeconds: 60,
  });
}

/**
 * Get the current rate limiting mode
 */
export function getRateLimitMode(): 'distributed' | 'in-memory' | 'unknown' {
  if (typeof window !== 'undefined') {
    return 'unknown'; // Client-side
  }

  if (isRedisConfigured()) {
    return 'distributed';
  }

  return 'in-memory';
}

/**
 * Check if distributed rate limiting is available
 */
export function isDistributedRateLimitingEnabled(): boolean {
  return isRedisConfigured();
}

// Export the client identifier helper
export { getClientIdentifier };
