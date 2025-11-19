/**
 * Main Library Module
 *
 * Barrel export for all library modules.
 *
 * @example
 * ```typescript
 * // Import utilities
 * import { cn } from '@/lib';
 *
 * // Import helpers
 * import { getURL, toDateTime, getStatusRedirect } from '@/lib';
 *
 * // Import security
 * import { rateLimit, getClientIP, SecurityLogger } from '@/lib';
 *
 * // Import integrations
 * import { stripe, createClient, supabaseAdmin } from '@/lib';
 *
 * // Import constants
 * import { RATE_LIMITS, SECURITY_THRESHOLDS } from '@/lib';
 * ```
 */

// Utils
export * from './utils';

// Helpers
export * from './helpers';

// Security
export * from './security';

// Integrations
export * from './integrations';

// Constants
export * from './constants';

// Optional dependencies loader
export * from './optional-deps';
