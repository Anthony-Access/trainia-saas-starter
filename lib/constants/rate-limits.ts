/**
 * Rate Limiting Constants
 *
 * Centralized configuration for all rate limits across the application.
 * Adjust these values based on your application's needs and infrastructure.
 */

/**
 * Rate limit configuration for different endpoints and use cases
 */
export const RATE_LIMITS = {
  /**
   * Webhooks (Stripe, etc.)
   * Higher limit to handle burst traffic from payment providers
   */
  WEBHOOK: {
    requests: 50,
    window: 60, // seconds
  },

  /**
   * Standard API endpoints
   * Balanced limit for general API usage
   */
  API: {
    requests: 100,
    window: 60, // seconds
  },

  /**
   * Authentication endpoints (login, register, password reset)
   * Strict limit to prevent brute force attacks
   */
  AUTH: {
    requests: 5,
    window: 900, // 15 minutes
  },

  /**
   * Checkout session creation
   * Prevent abuse of checkout flow
   */
  CHECKOUT: {
    requests: 3,
    window: 300, // 5 minutes
  },

  /**
   * Billing portal access
   * Moderate limit for customer management
   */
  BILLING_PORTAL: {
    requests: 10,
    window: 3600, // 1 hour
  },

  /**
   * Standard server actions
   * Default limit for protected actions
   */
  SERVER_ACTION_STANDARD: {
    requests: 10,
    window: 60, // seconds
  },

  /**
   * Strict server actions (sensitive operations)
   * Lower limit for critical operations
   */
  SERVER_ACTION_STRICT: {
    requests: 5,
    window: 60, // seconds
  },

  /**
   * Relaxed server actions (frequent operations)
   * Higher limit for non-sensitive frequent operations
   */
  SERVER_ACTION_RELAXED: {
    requests: 30,
    window: 60, // seconds
  },
} as const;

/**
 * Type-safe rate limit preset configurations
 */
export type RateLimitPreset = typeof RATE_LIMITS[keyof typeof RATE_LIMITS];

/**
 * Helper to get rate limit config by key
 */
export function getRateLimitConfig(key: keyof typeof RATE_LIMITS): RateLimitPreset {
  return RATE_LIMITS[key];
}
