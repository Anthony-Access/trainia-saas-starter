import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// ✅ SECURITY: Whitelist of allowed origins for CORS
const ALLOWED_ORIGINS = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    // Add your production domains here
].filter(Boolean) as string[];

/**
 * Get client IP from request headers
 * Edge Runtime compatible version (no external dependencies)
 */
function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
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
