/**
 * Security Validation Module
 *
 * Barrel export for all validation utilities.
 *
 * @example
 * ```typescript
 * import { getClientIP, validateRedirect, validateEnv } from '@/lib/security/validation';
 * ```
 */

// IP validation and extraction
export {
  isValidIPFormat,
  getClientIP,
  detectIPSpoofing,
  createIPFingerprint,
  simpleHash,
  getClientIdentifier
} from './ip';

// Redirect validation
export {
  validateRedirectUrl,
  getValidatedRedirectUrl,
  isAllowedPath,
  getAllowedPaths
} from './redirect';

// Environment validation
export {
  validateEnvironmentVariables,
  getEnvironmentStatus
} from './env';

// Stripe validation
export {
  MetadataSchema,
  validateStripeMetadata,
  sanitizeForDisplay
} from './stripe-metadata';

export {
  validateBillingDetails
} from './billing-details';
