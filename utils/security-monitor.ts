/**
 * Security Monitoring Utilities
 *
 * This module provides security monitoring and anomaly detection
 * to help identify and respond to potential attacks.
 */

interface SecurityEvent {
  type: 'rate_limit_bypass_attempt' | 'suspicious_ip_spoofing' | 'repeated_auth_failure';
  identifier: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// In-memory store for security events (use Redis in production)
const securityEvents: SecurityEvent[] = [];

/**
 * Log a security event for monitoring
 */
export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: new Date(),
  };

  securityEvents.push(fullEvent);

  // Keep only last 1000 events to prevent memory issues
  if (securityEvents.length > 1000) {
    securityEvents.shift();
  }

  // Log to console for immediate visibility
  console.warn('🚨 SECURITY EVENT:', {
    type: event.type,
    identifier: event.identifier,
    timestamp: fullEvent.timestamp.toISOString(),
    metadata: event.metadata,
  });

  // TODO: Send to monitoring service (Sentry, DataDog, etc.)
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureMessage(`Security Event: ${event.type}`, {
  //     level: 'warning',
  //     extra: event,
  //   });
  // }
}

/**
 * Detect suspicious IP spoofing patterns
 *
 * An attacker trying to bypass rate limiting will send many requests
 * with different X-Forwarded-For headers but same User-Agent
 */
export function detectIPSpoofing(
  forwardedFor: string | null,
  realIp: string | null,
  userAgent: string | null
): boolean {
  // If X-Forwarded-For doesn't match X-Real-IP, might be spoofing
  if (forwardedFor && realIp) {
    const forwardedIp = forwardedFor.split(',')[0].trim();
    if (forwardedIp !== realIp) {
      logSecurityEvent({
        type: 'suspicious_ip_spoofing',
        identifier: forwardedIp,
        metadata: {
          forwardedFor,
          realIp,
          userAgent,
        },
      });
      return true;
    }
  }

  return false;
}

/**
 * Analyze rate limit bypass attempts
 *
 * Detect patterns that indicate an attacker trying to bypass rate limits
 */
export function analyzeRateLimitBypass(identifier: string, isBlocked: boolean): void {
  if (isBlocked) {
    // Count how many times this identifier has been blocked in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentBlocks = securityEvents.filter(
      e => e.type === 'rate_limit_bypass_attempt' &&
           e.identifier === identifier &&
           e.timestamp > fiveMinutesAgo
    );

    // If blocked multiple times, log as potential attack
    if (recentBlocks.length > 3) {
      logSecurityEvent({
        type: 'rate_limit_bypass_attempt',
        identifier,
        metadata: {
          blockCount: recentBlocks.length,
          message: 'Persistent rate limit violations detected - potential DoS attack',
        },
      });
    }
  }
}

/**
 * Get security event statistics
 */
export function getSecurityStats() {
  const now = Date.now();
  const oneHourAgo = new Date(now - 60 * 60 * 1000);

  const recentEvents = securityEvents.filter(e => e.timestamp > oneHourAgo);

  return {
    total: securityEvents.length,
    lastHour: recentEvents.length,
    byType: {
      rateLimitBypass: recentEvents.filter(e => e.type === 'rate_limit_bypass_attempt').length,
      ipSpoofing: recentEvents.filter(e => e.type === 'suspicious_ip_spoofing').length,
      authFailure: recentEvents.filter(e => e.type === 'repeated_auth_failure').length,
    },
  };
}

/**
 * Export events for external monitoring
 */
export function exportSecurityEvents(): SecurityEvent[] {
  return [...securityEvents];
}
