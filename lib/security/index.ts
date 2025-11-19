/**
 * Security Module
 *
 * Barrel export for all security utilities.
 *
 * @example
 * ```typescript
 * import { rateLimit, getClientIP, SecurityLogger } from '@/lib/security';
 * ```
 */

// Rate limiting
export * from './rate-limiting';

// Validation
export * from './validation';

// Monitoring
export * from './monitoring';

// Distributed lock (if needed)
export {
  acquireLock,
  releaseLock,
  withLock,
  type LockOptions
} from './distributed-lock';
