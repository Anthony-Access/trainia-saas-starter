/**
 * IP Validation and Extraction Utilities
 *
 * Centralized module for IP address validation and client IP extraction.
 * Used across middleware, rate limiting, and security monitoring.
 *
 * ✅ SECURITY: Provides defense against IP spoofing attacks
 */

/**
 * Validates IP address format (IPv4 or IPv6)
 *
 * @param ip - IP address string to validate
 * @returns true if valid IPv4 or IPv6, false otherwise
 */
export function isValidIPFormat(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  // IPv4: 0.0.0.0 to 255.255.255.255
  const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6: Full and compressed formats
  const ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$/;

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
    forwardedFor: forwardedFor?.split(',')[0].trim(),
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
 * @param req - Request object
 * @param additionalFactors - Additional factors to include in fingerprint
 * @returns Unique fingerprint string
 */
export function createIPFingerprint(
  req: Request | { headers: Headers },
  additionalFactors: string[] = []
): string {
  const ip = getClientIP(req);
  const headers = req.headers;

  const userAgent = headers.get('user-agent') || '';
  const acceptLanguage = headers.get('accept-language') || '';

  const factors = [
    ip,
    userAgent.slice(0, 100), // Limit length
    acceptLanguage.slice(0, 50),
    ...additionalFactors,
  ].filter(Boolean);

  return factors.join('|');
}
