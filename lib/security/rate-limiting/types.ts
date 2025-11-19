/**
 * Rate Limiting Types
 *
 * Shared type definitions for all rate limiting implementations.
 */

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed in the time window */
  limit: number;
  /** Time window in seconds */
  windowInSeconds?: number; // For backwards compatibility
  /** Time window in seconds (alternative naming) */
  window?: number; // For server actions
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Time until the limit resets (in seconds) */
  resetIn?: number; // For in-memory and distributed
  /** Unix timestamp when limit resets */
  reset?: number; // For server actions
}

/**
 * Rate limiting mode
 */
export type RateLimitMode = 'distributed' | 'in-memory' | 'unknown';
