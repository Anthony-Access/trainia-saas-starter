/**
 * Security Monitoring Utilities
 *
 * ✅ REFACTORED: IP spoofing detection now uses centralized implementation
 * from @/utils/ip-validation for consistency and maintainability.
 *
 * This module provides security monitoring and anomaly detection
 * to help identify and respond to potential attacks.
 */

import { detectIPSpoofing as detectIPSpoofingCentralized } from './ip-validation';

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
 * ✅ REFACTORED: Now uses centralized detectIPSpoofing from @/utils/ip-validation
 *
 * This wrapper maintains backwards compatibility while delegating to the
 * centralized IP spoofing detection logic.
 *
 * An attacker trying to bypass rate limiting will send many requests
 * with different X-Forwarded-For headers but same User-Agent
 *
 * @deprecated Consider using detectIPSpoofing from @/utils/ip-validation directly
 */
export function detectIPSpoofing(
  forwardedFor: string | null,
  realIp: string | null,
  userAgent: string | null
): boolean {
  // Create a mock request object to use centralized detection
  const mockHeaders = new Headers();
  if (forwardedFor) mockHeaders.set('x-forwarded-for', forwardedFor);
  if (realIp) mockHeaders.set('x-real-ip', realIp);
  if (userAgent) mockHeaders.set('user-agent', userAgent);

  const mockRequest = { headers: mockHeaders };
  const result = detectIPSpoofingCentralized(mockRequest);

  if (result.isSuspicious) {
    logSecurityEvent({
      type: 'suspicious_ip_spoofing',
      identifier: forwardedFor || realIp || 'unknown',
      metadata: {
        forwardedFor,
        realIp,
        userAgent,
        reason: result.reason,
      },
    });
    return true;
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
