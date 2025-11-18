import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { rateLimitAPI, getClientIdentifier } from '@/utils/rate-limit-distributed';
import { SecurityLogger } from '@/utils/security-logger';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// ✅ SECURITY: Whitelist of allowed origins for CORS
const ALLOWED_ORIGINS = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    // Add your production domains here
].filter(Boolean) as string[];

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
        console.warn('❌ Invalid origin:', origin);
        SecurityLogger.logSuspiciousActivity({
          ip: getClientIdentifier(req),
          activity: 'CSRF_ATTEMPT',
          details: { origin, path: url.pathname },
          path: url.pathname,
        });
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

  // ✅ SECURITY: Rate limiting for all API routes (except webhooks)
  // Protects against brute force, DoS, and credential stuffing attacks
  if (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/webhooks')) {
    const { userId } = await auth();
    const identifier = userId || getClientIdentifier(req);

    const rateLimitResult = await rateLimitAPI(identifier);

    if (!rateLimitResult.success) {
      console.warn(`⚠️  Rate limit exceeded for ${identifier} on ${url.pathname}`);

      SecurityLogger.logRateLimitExceeded({
        identifier,
        endpoint: url.pathname,
        limit: 30,
        ip: getClientIdentifier(req),
      });

      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: rateLimitResult.resetIn
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': '30',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetIn.toString(),
            'Retry-After': rateLimitResult.resetIn.toString()
          }
        }
      );
    }
  }

  // Protection des routes
  if (isProtectedRoute(req)) {
    // Redirect to sign-in if user is not authenticated
    const { userId } = await auth()
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return Response.redirect(signInUrl)
    }
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
