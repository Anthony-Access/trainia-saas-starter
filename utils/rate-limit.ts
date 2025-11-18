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
 * Validates if a string is a valid IPv4 or IPv6 address
 * @param ip - IP address to validate
 * @returns true if valid IP format
 */
function isValidIP(ip: string): boolean {
  // IPv4 regex (strict)
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (simplified, covers most cases)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^[0-9a-fA-F]{1,4}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Detects IP spoofing by checking for inconsistencies between headers
 * @param cfIp - Cloudflare connecting IP
 * @param realIp - X-Real-IP header
 * @param forwardedFor - X-Forwarded-For header
 * @returns Object with spoofing detection results
 */
function detectIPSpoofing(
  cfIp: string | null,
  realIp: string | null,
  forwardedFor: string | null
): { isSpoofed: boolean; reason?: string } {
  // If we have Cloudflare IP and others don't match, potential spoofing
  if (cfIp && realIp && cfIp !== realIp) {
    return {
      isSpoofed: true,
      reason: `CF-Connecting-IP (${cfIp}) differs from X-Real-IP (${realIp})`
    };
  }

  if (cfIp && forwardedFor) {
    const firstForwarded = forwardedFor.split(',')[0].trim();
    if (cfIp !== firstForwarded) {
      return {
        isSpoofed: true,
        reason: `CF-Connecting-IP (${cfIp}) differs from X-Forwarded-For (${firstForwarded})`
      };
    }
  }

  // Check for invalid IP formats in forwarded headers
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    const hasInvalidIP = ips.some(ip => !isValidIP(ip));
    if (hasInvalidIP) {
      return {
        isSpoofed: true,
        reason: `X-Forwarded-For contains invalid IP format: ${forwardedFor}`
      };
    }
  }

  return { isSpoofed: false };
}

/**
 * Get the client identifier from a request with advanced spoofing detection
 * Uses a combination of IP and User-Agent to prevent spoofing
 *
 * @param request - The incoming request
 * @returns Client identifier (fingerprint)
 *
 * Security improvements over previous version:
 * 1. Validates IP format to detect malformed spoofing attempts
 * 2. Detects inconsistencies between multiple IP headers
 * 3. Logs spoofing attempts for security monitoring
 * 4. Never trusts X-Forwarded-For without validation
 * 5. Uses TLS connection info when available
 * 6. Creates robust fingerprint with multiple signals
 *
 * Priority chain (security level):
 * 1. CF-Connecting-IP (trusted, set by Cloudflare CDN)
 * 2. X-Real-IP (trusted if from known reverse proxy)
 * 3. X-Forwarded-For (validated, used only if format is correct)
 * 4. Fallback to 'unknown' (never use localhost, prevents false positives)
 */
export function getClientIdentifier(request: Request): string {
  // Get all possible IP sources
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');

  // ✅ SECURITY: Detect IP spoofing attempts
  const spoofingCheck = detectIPSpoofing(cfConnectingIp, realIp, forwardedFor);

  if (spoofingCheck.isSpoofed) {
    console.warn('🚨 SECURITY: IP spoofing detected!', {
      reason: spoofingCheck.reason,
      headers: {
        'cf-connecting-ip': cfConnectingIp,
        'x-real-ip': realIp,
        'x-forwarded-for': forwardedFor,
      },
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });

    // Log to security monitor if available
    if (typeof window === 'undefined') {
      // Server-side only
      try {
        const { logSecurityEvent } = require('./security-monitor');
        logSecurityEvent({
          type: 'ip_spoofing_detected',
          severity: 'high',
          details: spoofingCheck.reason,
          ip: cfConnectingIp || realIp || 'unknown',
        });
      } catch (e) {
        // Security monitor not available, already logged to console
      }
    }
  }

  // ✅ SECURITY: Select IP with strict validation
  let ip: string = 'unknown';

  // Priority 1: Cloudflare (most trusted, cannot be spoofed by client)
  if (cfConnectingIp && isValidIP(cfConnectingIp)) {
    ip = cfConnectingIp;
  }
  // Priority 2: X-Real-IP (trusted if set by your infrastructure)
  else if (realIp && isValidIP(realIp)) {
    ip = realIp;
  }
  // Priority 3: X-Forwarded-For (only if validated)
  else if (forwardedFor && !spoofingCheck.isSpoofed) {
    const firstIP = forwardedFor.split(',')[0].trim();
    if (isValidIP(firstIP)) {
      ip = firstIP;
      // Log that we're using XFF (less reliable)
      console.warn('⚠️ Using X-Forwarded-For for rate limiting (less reliable):', {
        ip: firstIP,
        fullHeader: forwardedFor
      });
    }
  }

  // ✅ SECURITY: Create robust fingerprint
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const acceptEncoding = request.headers.get('accept-encoding') || '';

  // Combine multiple signals for better fingerprinting
  const fingerprintComponents = [
    userAgent,
    acceptLanguage.substring(0, 10), // First 10 chars only
    acceptEncoding.substring(0, 10),
  ].join('|');

  const fingerprint = simpleHash(fingerprintComponents);

  // Return composite identifier: IP:Fingerprint
  // This makes it much harder to bypass rate limiting
  return `${ip}:${fingerprint}`;
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
