/**
 * Optional Dependencies Loader
 *
 * Safely loads optional dependencies that may not be installed.
 * Uses eval() to bypass webpack's static analysis.
 */

export async function loadUpstashRatelimit() {
  try {
    // Use eval to bypass webpack static analysis
    // eslint-disable-next-line no-eval
    const module = eval('require')('@upstash/ratelimit');
    return module;
  } catch (error) {
    return null;
  }
}

export async function loadUpstashRedis() {
  try {
    // Use eval to bypass webpack static analysis
    // eslint-disable-next-line no-eval
    const module = eval('require')('@upstash/redis');
    return module;
  } catch (error) {
    return null;
  }
}

export async function loadSentry() {
  try {
    // Use eval to bypass webpack static analysis
    // eslint-disable-next-line no-eval
    const module = eval('require')('@sentry/nextjs');
    return module;
  } catch (error) {
    return null;
  }
}
