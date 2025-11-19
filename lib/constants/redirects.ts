/**
 * Redirect Constants
 *
 * Centralized configuration for redirects and URL validation.
 */

/**
 * Allowed redirect paths
 * Only these paths are allowed for redirects to prevent open redirect vulnerabilities
 */
export const ALLOWED_REDIRECT_PATHS = [
  '/',
  '/account',
  '/signin',
  '/signup',
  '/dashboard',
  '/pricing',
  '/settings',
] as const;

/**
 * Allowed redirect origins
 * For production, add your actual domain(s)
 */
export const ALLOWED_REDIRECT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  // Add production domains here:
  // 'https://yourdomain.com',
  // 'https://www.yourdomain.com',
] as const;

/**
 * Default redirects
 */
export const DEFAULT_REDIRECTS = {
  /** Default redirect after successful login */
  AFTER_LOGIN: '/account',

  /** Default redirect after logout */
  AFTER_LOGOUT: '/signin',

  /** Default redirect for unauthenticated users */
  UNAUTHENTICATED: '/signin',

  /** Default redirect after signup */
  AFTER_SIGNUP: '/account',

  /** Default redirect after checkout */
  AFTER_CHECKOUT: '/account',

  /** Default error redirect */
  ERROR: '/',
} as const;

/**
 * Toast message types
 */
export const TOAST_TYPES = {
  STATUS: 'status',
  ERROR: 'error',
} as const;

/**
 * Toast parameter keys
 */
export const TOAST_PARAM_KEYS = {
  [TOAST_TYPES.STATUS]: {
    name: 'status',
    description: 'status_description',
  },
  [TOAST_TYPES.ERROR]: {
    name: 'error',
    description: 'error_description',
  },
} as const;

/**
 * Query parameter names
 */
export const QUERY_PARAMS = {
  /** Disable button parameter */
  DISABLE_BUTTON: 'disable_button',

  /** Redirect destination */
  REDIRECT_TO: 'redirect_to',

  /** Status message */
  STATUS: 'status',

  /** Status description */
  STATUS_DESCRIPTION: 'status_description',

  /** Error message */
  ERROR: 'error',

  /** Error description */
  ERROR_DESCRIPTION: 'error_description',
} as const;
