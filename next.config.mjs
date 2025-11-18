/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional dependencies are loaded using eval('require') in utils/optional-deps.ts
  // This bypasses webpack's static analysis and allows the app to build
  // without these packages installed
  async headers() {
    // Only allow unsafe-eval in development (needed for HMR)
    // In production, we use a stricter CSP for better XSS protection
    const isDevelopment = process.env.NODE_ENV === 'development';
    const scriptSrc = isDevelopment
      ? "'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com https://challenges.cloudflare.com"
      : "'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com https://challenges.cloudflare.com";

    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: Stricter in production (no unsafe-eval)
              `script-src ${scriptSrc}`,
              // Styles: Allow self, inline styles, and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: Allow self, data URIs, Clerk, and HTTPS images
              "img-src 'self' data: https: blob:",
              // Fonts: Allow self, data URIs, Google Fonts CDN, and other CDNs
              "font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
              // Workers: Allow blob: for Clerk web workers
              "worker-src 'self' blob:",
              // Connect: Allow API calls to backend services
              "connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://*.clerk.com https://clerk-telemetry.com https://api.stripe.com wss://*.supabase.co",
              // Frames: Allow Stripe, Clerk, and Netlify (for deploy previews)
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com https://app.netlify.com",
              // Objects: Block all
              "object-src 'none'",
              // Base URI: Restrict to self
              "base-uri 'self'",
              // Form actions: Restrict to self and Clerk
              "form-action 'self' https://*.clerk.accounts.dev https://*.clerk.com",
              // Frame ancestors: Same origin only
              "frame-ancestors 'self'",
              // Upgrade insecure requests
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
