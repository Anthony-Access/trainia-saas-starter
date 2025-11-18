import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
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
