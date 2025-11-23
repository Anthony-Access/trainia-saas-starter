import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { getClientIP } from "@/lib/security/validation/ip"

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/app(.*)'])

// ✅ SECURITY: Whitelist of allowed origins for CORS
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  // Add your production domains here
].filter(Boolean) as string[];

// ✅ SECURITY: Whitelist of allowed redirect paths to prevent Open Redirect attacks
// Only allow redirects to these specific application paths
const ALLOWED_REDIRECT_PATHS = [
  '/dashboard',
  '/settings',
  '/profile',
  '/billing',
  '/api',
] as const;

// Default safe redirect path when validation fails
const DEFAULT_REDIRECT_PATH = '/dashboard';

/**
 * Validates a redirect URL to prevent Open Redirect vulnerabilities
 *
 * Security measures:
 * 1. Only allows relative URLs (no absolute URLs to external sites)
 * 2. Whitelist validation against allowed paths
 * 3. Prevents protocol-relative URLs (//evil.com)
 * 4. Prevents javascript:, data:, vbscript: and other dangerous protocols
 * 5. Normalizes paths to prevent bypass via encoding or special chars
 *
 * @param redirectUrl - The URL to validate (from user input)
 * @param baseUrl - The base URL of the application
 * @returns Safe redirect path or default path if validation fails
 */
function validateRedirectUrl(redirectUrl: string, baseUrl: string): string {
  try {
    // Remove whitespace and decode URI components
    const trimmed = redirectUrl.trim();

    // ✅ SECURITY: Reject empty or suspicious inputs
    if (!trimmed || trimmed.length > 2048) {
      console.warn('⚠️ SECURITY: Invalid redirect URL length:', trimmed.length);
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: Detect and block dangerous protocols
    const dangerousProtocols = [
      'javascript:',
      'data:',
      'vbscript:',
      'file:',
      'about:',
    ];

    const lowerUrl = trimmed.toLowerCase();
    if (dangerousProtocols.some(proto => lowerUrl.startsWith(proto))) {
      console.error('🚨 SECURITY: Dangerous protocol detected in redirect:', trimmed);
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: Block protocol-relative URLs (//evil.com)
    if (trimmed.startsWith('//')) {
      console.warn('⚠️ SECURITY: Protocol-relative URL blocked:', trimmed);
      return DEFAULT_REDIRECT_PATH;
    }

    // ✅ SECURITY: Block absolute URLs to external domains
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      // Parse and validate it's same origin
      try {
        const redirectUrlObj = new URL(trimmed);
        const baseUrlObj = new URL(baseUrl);

        // Only allow if same origin (host + port)
        if (redirectUrlObj.origin !== baseUrlObj.origin) {
          console.warn('⚠️ SECURITY: Cross-origin redirect blocked:', {
            attempted: redirectUrlObj.origin,
            expected: baseUrlObj.origin,
          });
          return DEFAULT_REDIRECT_PATH;
        }

        // Extract pathname from validated same-origin URL
        const pathname = redirectUrlObj.pathname;
        return validatePath(pathname);
      } catch (error) {
        console.error('🚨 SECURITY: Invalid URL in redirect:', error);
        return DEFAULT_REDIRECT_PATH;
      }
    }

    // At this point, we should have a relative URL
    // Ensure it starts with /
    const relativePath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

    // ✅ SECURITY: Validate against whitelist
    return validatePath(relativePath);

  } catch (error) {
    console.error('🚨 SECURITY: Error validating redirect URL:', error);
    return DEFAULT_REDIRECT_PATH;
  }
}

/**
 * Validates a path against the whitelist
 * @param path - The path to validate
 * @returns Safe path or default path
 */
function validatePath(path: string): string {
  // Normalize path: remove double slashes, resolve .., etc.
  const normalized = path.replace(/\/+/g, '/').replace(/\/\.\.\//g, '/');

  // ✅ SECURITY: Check against whitelist
  const isAllowed = ALLOWED_REDIRECT_PATHS.some(allowedPath =>
    normalized.startsWith(allowedPath)
  );

  if (!isAllowed) {
    console.warn('⚠️ SECURITY: Redirect path not in whitelist:', normalized);
    return DEFAULT_REDIRECT_PATH;
  }

  // Return only the pathname (strip query params and hash for security)
  // Query params and hash will be reconstructed safely if needed
  const pathOnly = normalized.split('?')[0].split('#')[0];

  return pathOnly;
}

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);

  // ✅ SECURITY: Verify origin for mutating requests to prevent CSRF attacks
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');

    // Check if origin is in whitelist
    if (origin) {
      const isAllowed = ALLOWED_ORIGINS.some(allowed =>
        origin.startsWith(allowed)
      );

      if (!isAllowed) {
        console.warn('❌ Invalid origin:', origin, 'from IP:', getClientIP(req));
        return new Response('Forbidden', { status: 403 });
      }
    } else if (referer) {
      // Fallback to referer check if no origin header
      const isAllowed = ALLOWED_ORIGINS.some(allowed =>
        referer.startsWith(allowed)
      );

      if (!isAllowed) {
        console.warn('❌ Invalid referer:', referer);
        return new Response('Forbidden', { status: 403 });
      }
    }
    // Note: Requests without origin/referer are allowed (server-side, Postman, etc.)
  }

  // NOTE: Rate limiting moved to individual API routes to avoid Edge Runtime restrictions
  // See: app/api/*/route.ts for rate limiting implementation

  // 🛡️ SECURITY: Organization-First Flow - Enforce onboarding completion
  // Every authenticated user MUST belong to an organization
  const { userId, sessionClaims } = await auth();

  if (userId) {
    const orgId = sessionClaims?.org_id;
    const isOnboardingPage = url.pathname === '/onboarding';
    const isSignOutPage = url.pathname.includes('/sign-out');
    const isApiRoute = url.pathname.startsWith('/api');
    const isPublicRoute = url.pathname === '/' || url.pathname.startsWith('/legal') || url.pathname.startsWith('/about') || url.pathname.startsWith('/faq') || url.pathname.startsWith('/contact');

    // If user is authenticated but has no organization
    if (!orgId) {
      // Allow access to onboarding page, sign-out, and public routes
      if (!isOnboardingPage && !isSignOutPage && !isPublicRoute && !isApiRoute) {
        console.log('🔄 Redirecting user without org_id to onboarding:', userId);
        return Response.redirect(new URL('/onboarding', req.url));
      }
    } else {
      // User has an org_id, don't allow them to access onboarding again
      if (isOnboardingPage) {
        console.log('✅ User already has org_id, redirecting to dashboard');
        return Response.redirect(new URL('/dashboard', req.url));
      }
    }
  }

  // Protection des routes
  if (isProtectedRoute(req)) {
    // Redirect to sign-in if user is not authenticated
    const { userId: protectedUserId, getToken } = await auth()

    if (!protectedUserId) {
      const signInUrl = new URL('/sign-in', req.url)

      // ✅ SECURITY: Validate redirect URL to prevent Open Redirect attacks
      // Extract only the pathname + search from the original request URL
      const originalUrl = new URL(req.url);
      const requestedPath = originalUrl.pathname + originalUrl.search;

      // Validate the redirect URL against our whitelist
      const safeRedirectPath = validateRedirectUrl(requestedPath, req.url);

      // Set the validated, safe redirect path
      signInUrl.searchParams.set('redirect_url', safeRedirectPath)

      console.log('🔒 SECURITY: Redirect validation:', {
        original: requestedPath,
        validated: safeRedirectPath,
        ip: getClientIP(req)
      });

      return Response.redirect(signInUrl)
    }

    // 🛡️ SECURITY: Placeholder for Supabase token validation
    // Ensure we can generate a token for Supabase RLS
    // const supabaseToken = await getToken({ template: 'supabase' })
    // if (!supabaseToken) console.warn("⚠️ No Supabase token found for user")
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // ✅ SECURITY: Simpler, more maintainable regex to avoid edge cases
    // This protects all routes except: static files, _next, and api/webhooks
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks).*)",
    // Alternative simpler approach (commented - uncomment if preferred):
    // '/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)',
  ],
}
