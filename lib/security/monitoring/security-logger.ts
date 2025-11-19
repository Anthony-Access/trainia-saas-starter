/**
 * Security Event Logger
 *
 * Centralized logging for security events with support for:
 * - Console logging (always enabled)
 * - Sentry integration (optional)
 * - Custom log handlers (extensible)
 *
 * Security events logged:
 * - Unauthorized access attempts
 * - Rate limit violations
 * - Suspicious activity
 * - Authentication failures
 * - Environment validation errors
 *
 * Setup Sentry (optional):
 * 1. npm install @sentry/nextjs
 * 2. npx @sentry/wizard@latest -i nextjs
 * 3. Add SENTRY_DSN to environment variables
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Security event types
export type SecurityEventType =
  | 'UNAUTHORIZED_ACCESS'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SUSPICIOUS_ACTIVITY'
  | 'AUTH_FAILURE'
  | 'ENV_VALIDATION_ERROR'
  | 'INVALID_WEBHOOK_SIGNATURE'
  | 'SQL_INJECTION_ATTEMPT'
  | 'XSS_ATTEMPT'
  | 'CSRF_ATTEMPT';

export type SecuritySeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

interface SecurityEvent {
  type: SecurityEventType;
  severity: SecuritySeverity;
  timestamp: string;
  message: string;
  context?: Record<string, any>;
  userId?: string;
  ip?: string;
  path?: string;
  method?: string;
}

interface LogHandler {
  (event: SecurityEvent): void | Promise<void>;
}

// Custom log handlers (can be extended)
const customHandlers: LogHandler[] = [];

/**
 * Add a custom log handler
 * Example: Send to external logging service, save to database, etc.
 */
export function addLogHandler(handler: LogHandler) {
  customHandlers.push(handler);
}

/**
 * Log a security event
 */
async function logSecurityEvent(event: SecurityEvent) {
  // Always log to console
  const emoji = getSeverityEmoji(event.severity);
  const prefix = `${emoji} [SECURITY ${event.severity}]`;

  switch (event.severity) {
    case 'CRITICAL':
    case 'ERROR':
      console.error(prefix, event.type);
      console.error('  Message:', event.message);
      if (event.context) {
        console.error('  Context:', event.context);
      }
      break;
    case 'WARNING':
      console.warn(prefix, event.type);
      console.warn('  Message:', event.message);
      if (event.context) {
        console.warn('  Context:', event.context);
      }
      break;
    case 'INFO':
    default:
      console.log(prefix, event.type);
      console.log('  Message:', event.message);
      if (event.context) {
        console.log('  Context:', event.context);
      }
      break;
  }

  // Send to Sentry if available (load using eval to bypass webpack)
  if (event.severity === 'ERROR' || event.severity === 'CRITICAL') {
    try {
      // Load optional Sentry dependency
      const { loadSentry } = await import('@/lib/optional-deps');
      const Sentry = await loadSentry();

      if (Sentry) {
        Sentry.captureMessage(
          `Security Event: ${event.type} - ${event.message}`,
          {
            level: event.severity.toLowerCase() as any,
            extra: event.context,
            tags: {
              security_event: event.type,
              user_id: event.userId,
              ip: event.ip,
            },
          }
        );
      }
    } catch (error) {
      // Sentry not installed or failed - that's okay
    }
  }

  // Call custom handlers
  for (const handler of customHandlers) {
    try {
      await handler(event);
    } catch (error) {
      console.error('Failed to call custom log handler:', error);
    }
  }
}

function getSeverityEmoji(severity: SecuritySeverity): string {
  switch (severity) {
    case 'CRITICAL':
      return '🚨';
    case 'ERROR':
      return '❌';
    case 'WARNING':
      return '⚠️';
    case 'INFO':
    default:
      return 'ℹ️';
  }
}

/**
 * Security Logger Class
 */
export class SecurityLogger {
  /**
   * Log an unauthorized access attempt
   */
  static logUnauthorizedAccess(context: {
    userId?: string;
    ip: string;
    path: string;
    method: string;
    reason: string;
  }) {
    logSecurityEvent({
      type: 'UNAUTHORIZED_ACCESS',
      severity: 'WARNING',
      timestamp: new Date().toISOString(),
      message: `Unauthorized access attempt: ${context.reason}`,
      context,
      userId: context.userId,
      ip: context.ip,
      path: context.path,
      method: context.method,
    });
  }

  /**
   * Log a rate limit violation
   */
  static logRateLimitExceeded(context: {
    identifier: string;
    endpoint: string;
    limit: number;
    ip?: string;
  }) {
    logSecurityEvent({
      type: 'RATE_LIMIT_EXCEEDED',
      severity: 'WARNING',
      timestamp: new Date().toISOString(),
      message: `Rate limit exceeded for ${context.identifier}`,
      context,
      ip: context.ip,
      path: context.endpoint,
    });
  }

  /**
   * Log suspicious activity
   */
  static logSuspiciousActivity(context: {
    userId?: string;
    ip: string;
    activity: string;
    details: any;
    path?: string;
  }) {
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'ERROR',
      timestamp: new Date().toISOString(),
      message: `Suspicious activity detected: ${context.activity}`,
      context,
      userId: context.userId,
      ip: context.ip,
      path: context.path,
    });
  }

  /**
   * Log an authentication failure
   */
  static logAuthFailure(context: {
    userId?: string;
    ip: string;
    reason: string;
    path: string;
  }) {
    logSecurityEvent({
      type: 'AUTH_FAILURE',
      severity: 'WARNING',
      timestamp: new Date().toISOString(),
      message: `Authentication failed: ${context.reason}`,
      context,
      userId: context.userId,
      ip: context.ip,
      path: context.path,
    });
  }

  /**
   * Log an environment validation error
   */
  static logEnvValidationError(context: {
    variable: string;
    issue: string;
    severity: 'error' | 'warning';
  }) {
    logSecurityEvent({
      type: 'ENV_VALIDATION_ERROR',
      severity: context.severity === 'error' ? 'CRITICAL' : 'WARNING',
      timestamp: new Date().toISOString(),
      message: `Environment validation failed for ${context.variable}`,
      context,
    });
  }

  /**
   * Log an invalid webhook signature
   */
  static logInvalidWebhookSignature(context: {
    ip: string;
    endpoint: string;
    provider: string;
  }) {
    logSecurityEvent({
      type: 'INVALID_WEBHOOK_SIGNATURE',
      severity: 'ERROR',
      timestamp: new Date().toISOString(),
      message: `Invalid webhook signature from ${context.provider}`,
      context,
      ip: context.ip,
      path: context.endpoint,
    });
  }

  /**
   * Log a potential SQL injection attempt
   */
  static logSQLInjectionAttempt(context: {
    userId?: string;
    ip: string;
    path: string;
    input: string;
  }) {
    logSecurityEvent({
      type: 'SQL_INJECTION_ATTEMPT',
      severity: 'CRITICAL',
      timestamp: new Date().toISOString(),
      message: 'Potential SQL injection attempt detected',
      context: {
        ...context,
        input: context.input.substring(0, 100), // Truncate long inputs
      },
      userId: context.userId,
      ip: context.ip,
      path: context.path,
    });
  }

  /**
   * Log a potential XSS attempt
   */
  static logXSSAttempt(context: {
    userId?: string;
    ip: string;
    path: string;
    input: string;
  }) {
    logSecurityEvent({
      type: 'XSS_ATTEMPT',
      severity: 'CRITICAL',
      timestamp: new Date().toISOString(),
      message: 'Potential XSS attempt detected',
      context: {
        ...context,
        input: context.input.substring(0, 100),
      },
      userId: context.userId,
      ip: context.ip,
      path: context.path,
    });
  }

  /**
   * Log a potential CSRF attempt
   */
  static logCSRFAttempt(context: {
    userId?: string;
    ip: string;
    path: string;
    origin?: string;
  }) {
    logSecurityEvent({
      type: 'CSRF_ATTEMPT',
      severity: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'Potential CSRF attempt detected',
      context,
      userId: context.userId,
      ip: context.ip,
      path: context.path,
    });
  }

  /**
   * Log a general security info message
   */
  static logInfo(message: string, context?: Record<string, any>) {
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      context,
    });
  }
}

/**
 * Example: Setup email alerts for critical events
 *
 * ```typescript
 * import { addLogHandler } from '@/utils/security-logger';
 *
 * addLogHandler(async (event) => {
 *   if (event.severity === 'CRITICAL') {
 *     await sendEmailAlert({
 *       to: 'security@company.com',
 *       subject: `CRITICAL: ${event.type}`,
 *       body: event.message,
 *     });
 *   }
 * });
 * ```
 */

/**
 * Example: Save to database
 *
 * ```typescript
 * addLogHandler(async (event) => {
 *   await supabase.from('security_logs').insert({
 *     type: event.type,
 *     severity: event.severity,
 *     message: event.message,
 *     context: event.context,
 *     timestamp: event.timestamp,
 *   });
 * });
 * ```
 */
