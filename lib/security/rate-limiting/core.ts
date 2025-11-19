/**
 * Rate Limiting Core Logic
 *
 * Common utilities shared across all rate limiting implementations.
 */

import type { RateLimitConfig, RateLimitResult } from './types';

/**
 * Add rate limit headers to a response
 *
 * @param response - The response to add headers to
 * @param result - The rate limit result
 * @param config - The rate limit configuration
 * @returns Response with rate limit headers
 *
 * @example
 * ```typescript
 * const response = new Response('OK', { status: 200 });
 * return withRateLimitHeaders(response, result, config);
 * ```
 */
export function withRateLimitHeaders(
  response: Response,
  result: RateLimitResult,
  config: RateLimitConfig
): Response {
  const headers = new Headers(response.headers);
  const limit = config.limit;
  const resetIn = result.resetIn || (result.reset ? Math.ceil((result.reset - Date.now() / 1000)) : 0);

  headers.set('X-RateLimit-Limit', limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', resetIn.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Create a 429 Too Many Requests response
 *
 * @param result - The rate limit result
 * @param config - The rate limit configuration
 * @returns 429 Response with rate limit headers
 *
 * @example
 * ```typescript
 * if (!result.success) {
 *   return createRateLimitResponse(result, config);
 * }
 * ```
 */
export function createRateLimitResponse(
  result: RateLimitResult,
  config: RateLimitConfig
): Response {
  const resetIn = result.resetIn || (result.reset ? Math.ceil((result.reset - Date.now() / 1000)) : 0);

  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
      retryAfter: resetIn
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': config.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': resetIn.toString(),
        'Retry-After': resetIn.toString()
      }
    }
  );
}

/**
 * Normalize rate limit configuration
 *
 * Handles both windowInSeconds and window naming conventions.
 *
 * @param config - Rate limit configuration
 * @returns Normalized configuration with windowInSeconds
 */
export function normalizeConfig(config: RateLimitConfig): Required<Omit<RateLimitConfig, 'window'>> & { windowInSeconds: number } {
  const windowInSeconds = config.windowInSeconds ?? config.window ?? 60;
  return {
    limit: config.limit,
    windowInSeconds
  };
}
