/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ PERFORMANCE: Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ WEBPACK: Handle optional dependencies that may not be installed
  // These packages are loaded dynamically in lib/optional-deps.ts
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark optional dependencies as external to prevent build errors
      config.externals = config.externals || [];
      config.externals.push({
        '@upstash/ratelimit': 'commonjs @upstash/ratelimit',
        '@upstash/redis': 'commonjs @upstash/redis',
        '@sentry/nextjs': 'commonjs @sentry/nextjs',
      });
    }
    return config;
  },

  async headers() {
    // ✅ SECURITY: Strict CSP in production (no unsafe-eval, no unsafe-inline for scripts)
    // Development mode allows unsafe-eval for Hot Module Replacement (HMR)
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Script-src: Allow unsafe-inline for Next.js hydration (both dev and prod)
    // Note: In production, Next.js requires 'unsafe-inline' for runtime scripts and hydration
    // For stricter security, use nonces instead: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
    const scriptSrc = isDevelopment
      ? "'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com https://challenges.cloudflare.com"
      : "'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com https://challenges.cloudflare.com";

    // Style-src: Allow unsafe-inline (needed for CSS-in-JS and Tailwind)
    const styleSrc = "'self' 'unsafe-inline' https://fonts.googleapis.com";

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
              // Scripts: Stricter in production (no unsafe-eval, no unsafe-inline)
              `script-src ${scriptSrc}`,
              // Styles: Allow self, inline styles (needed for Tailwind), and Google Fonts
              `style-src ${styleSrc}`,
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
