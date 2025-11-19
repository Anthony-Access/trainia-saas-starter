/**
 * Security Constants
 *
 * Centralized security configuration and constants.
 */

/**
 * IP validation patterns
 */
export const IP_PATTERNS = {
  /** IPv4 validation regex */
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  /** IPv6 validation regex */
  IPV6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^[0-9a-fA-F]{1,4}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/,
} as const;

/**
 * Security event thresholds
 */
export const SECURITY_THRESHOLDS = {
  /** Maximum proxy chain length before flagging as suspicious */
  MAX_PROXY_CHAIN_LENGTH: 5,

  /** Maximum unique IPs in headers before flagging as suspicious */
  MAX_UNIQUE_IPS: 2,

  /** Maximum rate limit violations before blocking */
  MAX_RATE_LIMIT_VIOLATIONS: 3,

  /** Time window for tracking violations (milliseconds) */
  VIOLATION_TRACKING_WINDOW: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * Dangerous patterns for XSS detection
 */
export const DANGEROUS_PATTERNS = [
  /<script/i,           // Scripts XSS
  /javascript:/i,       // Javascript in href
  /on\w+=/i,           // Event handlers (onclick, onload, etc.)
  /<iframe/i,          // iframes
  /eval\(/i,           // eval calls
  /expression\(/i,     // CSS expressions
] as const;

/**
 * Security headers configuration
 */
export const SECURITY_HEADERS = {
  /** Content Security Policy */
  CSP: {
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
      'font-src': ["'self'", 'data:'],
      'connect-src': ["'self'"],
      'frame-ancestors': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
    }
  },

  /** Permissions Policy */
  PERMISSIONS_POLICY: {
    'camera': [],
    'microphone': [],
    'geolocation': [],
    'interest-cohort': [], // Disable FLoC
  },
} as const;

/**
 * Audit log retention periods (in days)
 */
export const AUDIT_RETENTION = {
  /** Security events */
  SECURITY_EVENTS: 90,

  /** Authentication logs */
  AUTH_LOGS: 30,

  /** Payment logs */
  PAYMENT_LOGS: 365,

  /** General activity */
  GENERAL_ACTIVITY: 30,
} as const;

/**
 * Security monitoring configuration
 */
export const MONITORING_CONFIG = {
  /** Maximum security events to keep in memory */
  MAX_EVENTS_IN_MEMORY: 1000,

  /** Cleanup interval (milliseconds) */
  CLEANUP_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const;
