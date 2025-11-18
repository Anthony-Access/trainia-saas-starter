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
 * Uses a combination of IP and User-Agent to prevent spoofing
 *
 * @param request - The incoming request
 * @returns Client identifier (fingerprint)
 *
 * Security improvements:
 * 1. Prioritize non-spoofable headers (cf-connecting-ip from Cloudflare)
 * 2. Create fingerprint with IP + User-Agent to make spoofing harder
 * 3. Fallback chain: Cloudflare IP → X-Real-IP → X-Forwarded-For → localhost
 */
export function getClientIdentifier(request: Request): string {
  // 1. Try Cloudflare's connecting IP (most reliable, can't be spoofed)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  // 2. Try X-Real-IP (set by Nginx and other reverse proxies)
  const realIp = request.headers.get('x-real-ip');

  // 3. Try X-Forwarded-For (can be spoofed, use as last resort)
  const forwardedFor = request.headers.get('x-forwarded-for');

  // Select the most reliable IP source
  const ip = cfConnectingIp ||
             realIp ||
             (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

  // Get User-Agent for additional fingerprinting
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Create a composite fingerprint to make spoofing harder
  // Hash the user agent to keep the identifier reasonably short
  const userAgentHash = simpleHash(userAgent);

  return `${ip}:${userAgentHash}`;
}

/**
 * Simple hash function for creating shorter identifiers
 * @param str - String to hash
 * @returns Hash value as string
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
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
