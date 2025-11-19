/**
 * In-Memory Rate Limiting
 *
 * Simple in-memory rate limiter suitable for development and single-instance deployments.
 *
 * ⚠️ WARNING: This implementation does NOT work across multiple server instances.
 * For production with multiple instances, use distributed rate limiting with Redis.
 *
 * Features:
 * - Fast and simple
 * - No external dependencies
 * - Automatic cleanup of expired entries
 * - Suitable for development and single-server deployments
 */

import type { RateLimitConfig, RateLimitResult } from './types';
import { normalizeConfig } from './core';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

/**
 * Rate limit a request using in-memory storage
 *
 * @param identifier - Unique identifier for the client (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * const result = inMemoryRateLimit('192.168.1.1', { limit: 10, windowInSeconds: 60 });
 *
 * if (!result.success) {
 *   return new Response('Too Many Requests', { status: 429 });
 * }
 * ```
 */
export function inMemoryRateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 10, windowInSeconds: 60 }
): RateLimitResult {
  const normalizedConfig = normalizeConfig(config);
  const now = Date.now();
  const windowMs = normalizedConfig.windowInSeconds * 1000;

  // Get or create rate limit entry
  if (!store[identifier] || store[identifier].resetTime < now) {
    store[identifier] = {
      count: 0,
      resetTime: now + windowMs
    };
  }

  const entry = store[identifier];
  const resetIn = Math.ceil((entry.resetTime - now) / 1000);

  // Check if limit is exceeded
  if (entry.count >= normalizedConfig.limit) {
    return {
      success: false,
      remaining: 0,
      resetIn
    };
  }

  // Increment count
  entry.count++;

  return {
    success: true,
    remaining: normalizedConfig.limit - entry.count,
    resetIn
  };
}

/**
 * Get the current state for an identifier (for testing/debugging)
 *
 * @param identifier - Unique identifier
 * @returns Current state or null if not found
 */
export function getRateLimitState(identifier: string) {
  return store[identifier] || null;
}

/**
 * Clear rate limit for an identifier (for testing)
 *
 * @param identifier - Unique identifier
 */
export function clearRateLimit(identifier: string) {
  delete store[identifier];
}

/**
 * Clear all rate limits (for testing)
 */
export function clearAllRateLimits() {
  Object.keys(store).forEach(key => delete store[key]);
}
