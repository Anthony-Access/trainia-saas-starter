/**
 * Optional Dependencies Loader
 *
 * Safely loads optional dependencies that may not be installed.
 * Uses native dynamic imports instead of eval() for better security.
 */

export async function loadUpstashRatelimit() {
  try {
    // Use native dynamic import instead of eval for security
    // @ts-expect-error - Optional dependency may not be installed
    const ratelimitModule = await import('@upstash/ratelimit');
    return ratelimitModule;
  } catch {
    return null;
  }
}

export async function loadUpstashRedis() {
  try {
    // Use native dynamic import instead of eval for security
    // @ts-expect-error - Optional dependency may not be installed
    const redisModule = await import('@upstash/redis');
    return redisModule;
  } catch {
    return null;
  }
}

export async function loadSentry() {
  try {
    // Use native dynamic import instead of eval for security
    // @ts-expect-error - Optional dependency may not be installed
    const sentryModule = await import('@sentry/nextjs');
    return sentryModule;
  } catch {
    return null;
  }
}
