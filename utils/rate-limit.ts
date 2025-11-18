/**
 * Simple in-memory rate limiter
 *
 * NOTE: This is a basic implementation suitable for development and single-instance deployments.
 * For production with multiple instances, use a distributed solution like:
 * - @upstash/ratelimit with Redis
 * - Vercel Edge Middleware rate limiting
 * - Cloudflare Workers rate limiting
 *
 * Install: npm install @upstash/ratelimit @upstash/redis
 *
 * Example with Upstash:
 * ```typescript
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 *
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(10, "10 s"),
 * });
 * ```
 */

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

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the time window */
  limit: number;
  /** Time window in seconds */
  windowInSeconds: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Time until the limit resets (in seconds) */
  resetIn: number;
}

/**
 * Rate limit a request based on an identifier (usually IP address or user ID)
 *
 * @param identifier - Unique identifier for the client (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
 * const result = rateLimit(ip, { limit: 10, windowInSeconds: 60 });
 *
 * if (!result.success) {
 *   return new Response("Too Many Requests", {
 *     status: 429,
 *     headers: {
 *       'X-RateLimit-Limit': '10',
 *       'X-RateLimit-Remaining': '0',
 *       'X-RateLimit-Reset': result.resetIn.toString()
 *     }
 *   });
 * }
 * ```
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 10, windowInSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowInSeconds * 1000;

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
  if (entry.count >= config.limit) {
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
    remaining: config.limit - entry.count,
    resetIn
  };
}

/**
 * Get the client identifier from a request
 * Uses X-Forwarded-For header (set by reverse proxies) or falls back to a default
 *
 * @param request - The incoming request
 * @returns Client identifier (IP address or default)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (works with most hosting platforms)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Fallback for development/local
  return '127.0.0.1';
}

/**
 * Middleware helper to add rate limit headers to a response
 *
 * @param response - The response to add headers to
 * @param result - The rate limit result
 * @param config - The rate limit configuration
 * @returns Response with rate limit headers
 */
export function withRateLimitHeaders(
  response: Response,
  result: RateLimitResult,
  config: RateLimitConfig
): Response {
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Limit', config.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.resetIn.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
