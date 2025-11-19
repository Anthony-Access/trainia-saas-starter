/**
 * Redirect URL Validator - Server & Client Side
 *
 * This utility provides secure redirect URL validation to prevent Open Redirect attacks.
 * Used both in middleware (server) and in client components.
 *
 * OWASP Reference: https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
 */

// ✅ SECURITY: Whitelist of allowed redirect paths
const ALLOWED_REDIRECT_PATHS = [
  '/dashboard',
  '/settings',
  '/profile',
  '/billing',
  '/api',
] as const;

const DEFAULT_REDIRECT_PATH = '/dashboard';

/**
 * Validates a redirect URL on the client side
 *
 * This is a defense-in-depth measure even though server-side validation
 * already occurs in middleware.
 *
 * @param redirectUrl - URL from query params or user input
 * @returns Safe redirect path or default
 */
export function validateRedirectUrl(redirectUrl: string | null | undefined): string {
  // Handle null/undefined
  if (!redirectUrl) {
    return DEFAULT_REDIRECT_PATH;
  }

  try {
    const trimmed = redirectUrl.trim();

    // ✅ SECURITY: Length validation
    if (!trimmed || trimmed.length > 2048) {
      console.warn('⚠️ SECURITY: Invalid redirect URL length');
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: Block dangerous protocols
    const dangerousProtocols = [
      'javascript:',
      'data:',
      'vbscript:',
      'file:',
      'about:',
      'blob:',
    ];

    const lowerUrl = trimmed.toLowerCase();
    if (dangerousProtocols.some(proto => lowerUrl.startsWith(proto))) {
      console.error('🚨 SECURITY: Dangerous protocol in redirect:', trimmed);
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: Block protocol-relative URLs
    if (trimmed.startsWith('//')) {
      console.warn('⚠️ SECURITY: Protocol-relative URL blocked');
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: If absolute URL, validate same origin
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      // Only in browser context
      if (typeof window !== 'undefined') {
        try {
          const redirectUrlObj = new URL(trimmed);
          const currentOrigin = window.location.origin;

          if (redirectUrlObj.origin !== currentOrigin) {
            console.warn('⚠️ SECURITY: Cross-origin redirect blocked:', {
              attempted: redirectUrlObj.origin,
              current: currentOrigin,
            });
            return DEFAULT_REDIRECT_PATH;
          }

          // Extract pathname from same-origin URL
          return validatePath(redirectUrlObj.pathname);
        } catch (error) {
          console.error('🚨 SECURITY: Invalid URL:', error);
          return DEFAULT_REDIRECT_PATH;
        }
      }

      // Server-side: be conservative, reject absolute URLs
      return DEFAULT_REDIRECT_PATH;
    }

    // Ensure relative path starts with /
    const relativePath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

    return validatePath(relativePath);

  } catch (error) {
    console.error('🚨 SECURITY: Error validating redirect:', error);
    return DEFAULT_REDIRECT_PATH;
  }
}

/**
 * Validates path against whitelist
 */
function validatePath(path: string): string {
  // Normalize: remove double slashes, directory traversal
  const normalized = path
    .replace(/\/+/g, '/')
    .replace(/\/\.\.\//g, '/')
    .replace(/\/\.\//g, '/');

  // Check whitelist
  const isAllowed = ALLOWED_REDIRECT_PATHS.some(allowedPath =>
    normalized.startsWith(allowedPath)
  );

  if (!isAllowed) {
    console.warn('⚠️ SECURITY: Path not in whitelist:', normalized);
    return DEFAULT_REDIRECT_PATH;
  }

  // Strip query params and hash for security
  const pathOnly = normalized.split('?')[0].split('#')[0];

  return pathOnly;
}

/**
 * Get redirect URL from query params (client-side safe)
 * @param searchParams - URLSearchParams object
 */
export function getValidatedRedirectUrl(searchParams: URLSearchParams): string {
  const redirectUrl = searchParams.get('redirect_url');
  return validateRedirectUrl(redirectUrl);
}

/**
 * Check if a path is in the allowed list
 */
export function isAllowedPath(path: string): boolean {
  const normalized = path.replace(/\/+/g, '/');
  return ALLOWED_REDIRECT_PATHS.some(allowed => normalized.startsWith(allowed));
}

/**
 * Get all allowed redirect paths (for documentation/testing)
 */
export function getAllowedPaths(): readonly string[] {
  return ALLOWED_REDIRECT_PATHS;
}
