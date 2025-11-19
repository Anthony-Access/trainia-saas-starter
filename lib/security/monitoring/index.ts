/**
 * Security Monitoring Module
 *
 * Barrel export for all monitoring utilities.
 *
 * @example
 * ```typescript
 * import { SecurityLogger, auditLog } from '@/lib/security/monitoring';
 * ```
 */

// Security event logging
export {
  SecurityLogger,
  addLogHandler,
  type SecurityEventType,
  type SecuritySeverity
} from './security-logger';

// Audit logging
export {
  auditLog,
  type AuditEventType,
  type AuditSeverity,
  type AuditLogEntry
} from './audit-logger';

// Security monitoring and anomaly detection
export {
  logSecurityEvent,
  analyzeRateLimitBypass,
  getSecurityStats,
  exportSecurityEvents
} from './security-monitor';
