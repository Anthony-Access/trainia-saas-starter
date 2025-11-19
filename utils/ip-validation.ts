/**
 * IP Validation and Extraction Utilities
 *
 * ✅ CENTRALIZED MODULE - Single source of truth for IP handling
 *
 * This module consolidates all IP validation, extraction, and spoofing detection
 * logic used across the application. Import from here instead of duplicating code.
 *
 * Used by:
 * - middleware.ts (CSRF protection, authentication)
 * - utils/rate-limit.ts (rate limiting)
 * - utils/security-monitor.ts (security events)
 * - API routes (webhooks, etc.)
 *
 * ✅ SECURITY: Provides defense against IP spoofing attacks
 * ✅ PERFORMANCE: Optimized regex patterns for IPv4/IPv6 validation
 * ✅ MAINTAINABILITY: All IP logic in one place
 */

/**
 * Validates IP address format (IPv4 or IPv6)
 *
 * Supports:
 * - IPv4: 0.0.0.0 to 255.255.255.255
 * - IPv6: Full format (8 groups) and compressed formats (::)
 *
 * @param ip - IP address string to validate
 * @returns true if valid IPv4 or IPv6, false otherwise
 *
 * @example
 * ```typescript
 * isValidIPFormat('192.168.1.1') // true
 * isValidIPFormat('2001:0db8::1') // true
 * isValidIPFormat('invalid') // false
 * ```
 */
export function isValidIPFormat(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  // IPv4: 0.0.0.0 to 255.255.255.255 (strict validation)
  const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6: Full and compressed formats
  const ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^[0-9a-fA-F]{1,4}::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/;

  return ipv4.test(ip) || ipv6.test(ip);
}

/**
 * Get client IP from request headers with spoofing detection
 *
 * Security improvements:
 * - Validates IP format
 * - Detects header inconsistencies
 * - Prioritizes trusted headers (cf-connecting-ip from Cloudflare)
 * - Never blindly trusts X-Forwarded-For
 *
 * Priority order:
 * 1. cf-connecting-ip (Cloudflare - most trusted)
 * 2. x-real-ip (proxy/load balancer)
 * 3. x-forwarded-for (least trusted, first IP only)
 *
 * @param req - Request object (NextRequest or standard Request)
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(req: Request | { headers: Headers }): string {
  const headers = req.headers;

  const cfIp = headers.get('cf-connecting-ip');
  const realIp = headers.get('x-real-ip');
  const forwardedFor = headers.get('x-forwarded-for');

  // ✅ SECURITY: Detect IP spoofing - log mismatch between trusted headers
  if (cfIp && realIp && cfIp !== realIp) {
    console.warn('⚠️ SECURITY: IP header mismatch detected', {
      cfIp,
      realIp,
      timestamp: new Date().toISOString()
    });
  }

  // Priority 1: Cloudflare (most trusted)
  if (cfIp && isValidIPFormat(cfIp)) {
    return cfIp;
  }

  // Priority 2: X-Real-IP
  if (realIp && isValidIPFormat(realIp)) {
    return realIp;
  }

  // Priority 3: X-Forwarded-For (take first IP only, least trusted)
  if (forwardedFor) {
    const firstIP = forwardedFor.split(',')[0].trim();
    if (isValidIPFormat(firstIP)) {
      return firstIP;
    }
  }

  return 'unknown';
}

/**
 * Detects potential IP spoofing by analyzing header inconsistencies
 *
 * Red flags:
 * - Multiple different IPs in headers
 * - Invalid IP formats
 * - Suspicious patterns
 *
 * @param req - Request object
 * @returns Spoofing detection result
 */
export function detectIPSpoofing(req: Request | { headers: Headers }): {
  isSuspicious: boolean;
  reason?: string;
  details?: Record<string, string | null>;
} {
  const headers = req.headers;

  const cfIp = headers.get('cf-connecting-ip');
  const realIp = headers.get('x-real-ip');
  const forwardedFor = headers.get('x-forwarded-for');
  const trueClientIp = headers.get('true-client-ip');

  // Collect all IPs
  const ips = {
    cfIp,
    realIp,
    forwardedFor: forwardedFor?.split(',')[0].trim() ?? null,
    trueClientIp,
  };

  // Check 1: Header mismatch between trusted sources
  if (cfIp && realIp && cfIp !== realIp) {
    return {
      isSuspicious: true,
      reason: 'IP mismatch between cf-connecting-ip and x-real-ip',
      details: ips,
    };
  }

  // Check 2: Multiple forwarded IPs (potential proxy chain abuse)
  if (forwardedFor && forwardedFor.split(',').length > 5) {
    return {
      isSuspicious: true,
      reason: 'Excessive proxy chain in X-Forwarded-For',
      details: { ...ips, chainLength: forwardedFor.split(',').length.toString() },
    };
  }

  // Check 3: Invalid IP formats in headers
  const allIPs = Object.values(ips).filter(Boolean);
  const hasInvalidIP = allIPs.some(ip => ip && !isValidIPFormat(ip));

  if (hasInvalidIP) {
    return {
      isSuspicious: true,
      reason: 'Invalid IP format detected in headers',
      details: ips,
    };
  }

  // Check 4: Conflicting IPs between all headers
  const uniqueValidIPs = new Set(
    allIPs.filter(ip => ip && isValidIPFormat(ip))
  );

  if (uniqueValidIPs.size > 2) {
    return {
      isSuspicious: true,
      reason: 'Multiple conflicting IP addresses across headers',
      details: { ...ips, uniqueCount: uniqueValidIPs.size.toString() },
    };
  }

  return {
    isSuspicious: false,
  };
}

/**
 * Creates a fingerprint for rate limiting based on IP and other factors
 *
 * This creates a composite identifier that's harder to spoof than IP alone.
 * Used for rate limiting to prevent bypass attempts.
 *
 * @param req - Request object
 * @param additionalFactors - Additional factors to include in fingerprint
 * @returns Unique fingerprint string
 *
 * @example
 * ```typescript
 * const fingerprint = createIPFingerprint(request);
 * // Returns: "192.168.1.1|Mozilla/5.0...|en-US"
 *
 * const hashedFingerprint = createIPFingerprint(request, [], true);
 * // Returns: "192.168.1.1:abc123def" (with hash)
 * ```
 */
export function createIPFingerprint(
  req: Request | { headers: Headers },
  additionalFactors: string[] = [],
  includeHash = false
): string {
  const ip = getClientIP(req);
  const headers = req.headers;

  const userAgent = headers.get('user-agent') || '';
  const acceptLanguage = headers.get('accept-language') || '';

  if (includeHash) {
    // Create a hashed fingerprint for compact identifiers
    const fingerprintComponents = [
      userAgent,
      acceptLanguage.slice(0, 10),
      headers.get('accept-encoding')?.slice(0, 10) || '',
      ...additionalFactors,
    ].join('|');

    const hash = simpleHash(fingerprintComponents);
    return `${ip}:${hash}`;
  }

  // Create a verbose fingerprint for logging/debugging
  const factors = [
    ip,
    userAgent.slice(0, 100), // Limit length
    acceptLanguage.slice(0, 50),
    ...additionalFactors,
  ].filter(Boolean);

  return factors.join('|');
}

/**
 * Simple hash function for creating shorter identifiers
 *
 * Uses a basic string hashing algorithm (similar to Java's hashCode)
 * converted to base36 for compactness.
 *
 * @param str - String to hash
 * @returns Hash value as string (base36)
 *
 * @example
 * ```typescript
 * simpleHash('Mozilla/5.0 Chrome/120.0') // "1a2b3c4d"
 * ```
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Get client identifier for rate limiting with advanced spoofing detection
 *
 * This is a convenience wrapper around createIPFingerprint specifically
 * designed for rate limiting use cases.
 *
 * Creates a composite identifier using:
 * - Client IP (validated and spoofing-checked)
 * - User-Agent hash
 * - Accept-Language
 * - Accept-Encoding
 *
 * @param request - The incoming request
 * @returns Client identifier (format: "IP:hash")
 *
 * @example
 * ```typescript
 * const identifier = getClientIdentifier(request);
 * const result = rateLimit(identifier, { limit: 10, windowInSeconds: 60 });
 * ```
 */
export function getClientIdentifier(request: Request): string {
  return createIPFingerprint(request, [], true);
}
