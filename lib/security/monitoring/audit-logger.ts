/**
 * Audit Logging Utility
 *
 * Provides secure audit logging for compliance and security monitoring.
 * All audit logs are immutable and stored in Supabase.
 *
 * Features:
 * - Track all security-sensitive actions
 * - Store IP address and user agent
 * - Support for severity levels
 * - Flexible metadata storage
 * - Immutable logs (no updates/deletes)
 *
 * Compliance: SOC2, GDPR, PCI-DSS compatible
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from '@/lib/integrations/supabase/admin';
import { currentUser } from '@clerk/nextjs/server';
import { headers } from 'next/headers';

/**
 * Audit event types
 */
export type AuditEventType =
  | 'checkout_initiated'
  | 'checkout_completed'
  | 'billing_portal_accessed'
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'auth_login'
  | 'auth_logout'
  | 'auth_failed'
  | 'rate_limit_exceeded'
  | 'security_alert';

/**
 * Audit severity levels
 */
export type AuditSeverity = 'info' | 'warning' | 'error' | 'critical';

/**
 * Audit log entry
 */
export interface AuditLogEntry {
  eventType: AuditEventType;
  message: string;
  severity?: AuditSeverity;
  metadata?: Record<string, any>;
  userId?: string;
}

/**
 * Get client IP address from request headers
 */
function getClientIP(): string | null {
  try {
    const headersList = headers();

    // Try various headers in order of preference
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      headersList.get('cf-connecting-ip') ||
      null;

    return ip;
  } catch {
    return null;
  }
}

/**
 * Get user agent from request headers
 */
function getUserAgent(): string | null {
  try {
    const headersList = headers();
    return headersList.get('user-agent');
  } catch {
    return null;
  }
}

/**
 * Log an audit event
 *
 * @example
 * ```typescript
 * // Log a checkout event
 * await auditLog({
 *   eventType: 'checkout_initiated',
 *   message: 'User started checkout for Pro plan',
 *   severity: 'info',
 *   metadata: {
 *     priceId: 'price_xxx',
 *     amount: 2999
 *   }
 * });
 *
 * // Log a security alert
 * await auditLog({
 *   eventType: 'security_alert',
 *   message: 'Multiple failed authentication attempts',
 *   severity: 'critical',
 *   metadata: {
 *     attemptCount: 5
 *   }
 * });
 * ```
 */
export async function auditLog(entry: AuditLogEntry): Promise<void> {
  try {
    // Get current user (if authenticated)
    let userId: string | null = entry.userId || null;
    if (!userId) {
      try {
        const user = await currentUser();
        userId = user?.id || null;
      } catch {
        // User not authenticated or error getting user
        userId = null;
      }
    }

    // Get request context
    const ipAddress = getClientIP();
    const userAgent = getUserAgent();

    // Insert audit log using service_role (bypasses RLS)
    // Note: Using 'as any' temporarily until database types are regenerated with audit_logs table
    const { error } = await (supabaseAdmin as any)
      .from('audit_logs')
      .insert({
        user_id: userId,
        event_type: entry.eventType,
        severity: entry.severity || 'info',
        message: entry.message,
        metadata: entry.metadata || null,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (error) {
      console.error('Failed to write audit log:', error);
      // Don't throw - audit logging should never break the main flow
    }

    // Also log to console for immediate visibility
    const logLevel = entry.severity === 'critical' || entry.severity === 'error' ? 'error' : 'log';
    console[logLevel]('📋 AUDIT LOG:', {
      eventType: entry.eventType,
      userId: userId || 'anonymous',
      message: entry.message,
      severity: entry.severity || 'info',
      ip: ipAddress,
    });
  } catch (error) {
    console.error('Audit logging failed:', error);
    // Silently fail - audit logging should never break the application
  }
}

/**
 * Pre-configured audit loggers for common events
 */
export const AuditLoggers = {
  /**
   * Log checkout initiated
   */
  checkoutInitiated: (metadata: { priceId: string; amount?: number }) =>
    auditLog({
      eventType: 'checkout_initiated',
      message: 'User initiated checkout session',
      severity: 'info',
      metadata,
    }),

  /**
   * Log checkout completed
   */
  checkoutCompleted: (metadata: { sessionId: string; subscriptionId?: string }) =>
    auditLog({
      eventType: 'checkout_completed',
      message: 'Checkout session completed successfully',
      severity: 'info',
      metadata,
    }),

  /**
   * Log billing portal access
   */
  billingPortalAccessed: () =>
    auditLog({
      eventType: 'billing_portal_accessed',
      message: 'User accessed billing portal',
      severity: 'info',
    }),

  /**
   * Log subscription created
   */
  subscriptionCreated: (metadata: { subscriptionId: string; priceId: string }) =>
    auditLog({
      eventType: 'subscription_created',
      message: 'New subscription created',
      severity: 'info',
      metadata,
    }),

  /**
   * Log subscription updated
   */
  subscriptionUpdated: (metadata: { subscriptionId: string; changes: any }) =>
    auditLog({
      eventType: 'subscription_updated',
      message: 'Subscription updated',
      severity: 'info',
      metadata,
    }),

  /**
   * Log subscription cancelled
   */
  subscriptionCancelled: (metadata: { subscriptionId: string; reason?: string }) =>
    auditLog({
      eventType: 'subscription_cancelled',
      message: 'Subscription cancelled',
      severity: 'warning',
      metadata,
    }),

  /**
   * Log rate limit exceeded
   */
  rateLimitExceeded: (metadata: { endpoint: string; limit: number }) =>
    auditLog({
      eventType: 'rate_limit_exceeded',
      message: 'Rate limit exceeded',
      severity: 'warning',
      metadata,
    }),

  /**
   * Log security alert
   */
  securityAlert: (message: string, metadata?: Record<string, any>) =>
    auditLog({
      eventType: 'security_alert',
      message,
      severity: 'critical',
      metadata,
    }),
};

/**
 * Query audit logs for a specific user
 * Note: This should only be called from admin contexts
 *
 * @example
 * ```typescript
 * const logs = await getAuditLogs('user_xxx', { limit: 100 });
 * ```
 */
export async function getAuditLogs(
  userId: string,
  options: {
    limit?: number;
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
  } = {}
) {
  // Note: Using 'as any' temporarily until database types are regenerated with audit_logs table
  let query = (supabaseAdmin as any)
    .from('audit_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (options.eventType) {
    query = query.eq('event_type', options.eventType);
  }

  if (options.severity) {
    query = query.eq('severity', options.severity);
  }

  if (options.startDate) {
    query = query.gte('created_at', options.startDate.toISOString());
  }

  if (options.endDate) {
    query = query.lte('created_at', options.endDate.toISOString());
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to query audit logs:', error);
    return [];
  }

  return data || [];
}

/**
 * Get recent security alerts
 * Note: This should only be called from admin contexts
 */
export async function getSecurityAlerts(limit: number = 50) {
  // Note: Using 'as any' temporarily until database types are regenerated with audit_logs table
  const { data, error } = await (supabaseAdmin as any)
    .from('audit_logs')
    .select('*')
    .in('severity', ['error', 'critical'])
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to query security alerts:', error);
    return [];
  }

  return data || [];
}
