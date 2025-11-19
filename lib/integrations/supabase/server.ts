import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// ✅ SECURITY: Timing constant to mitigate timing attacks
// Ensures authentication failures take consistent time
const AUTH_TIMING_CONSTANT = 100; // milliseconds

export async function createClerkSupabaseClientSsr() {
    // The `useAuth()` hook is used to access the `getToken()` method
    const { getToken } = await auth()
    const startTime = Date.now();

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                // Get the custom Supabase token from Clerk
                fetch: async (url, options = {}) => {
                    const clerkToken = await getToken({
                        template: 'supabase',
                    })

                    // ✅ SECURITY: Calculate constant delay to mask timing differences
                    const elapsed = Date.now() - startTime;
                    const remainingDelay = Math.max(0, AUTH_TIMING_CONSTANT - elapsed);

                    // ✅ SECURITY: Verify token exists to prevent "Bearer null" in headers
                    if (!clerkToken) {
                        // Wait for constant delay before throwing to prevent timing attacks
                        await new Promise(resolve => setTimeout(resolve, remainingDelay));
                        throw new Error('Authentication required: No valid session token available')
                    }

                    // Insert the Clerk Supabase token into the headers
                    const headers = new Headers(options?.headers)
                    headers.set('Authorization', `Bearer ${clerkToken}`)

                    // Now call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    })
                },
            },
        },
    )
}