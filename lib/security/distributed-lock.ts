/**
 * Distributed Lock using Upstash Redis
 * Prevents race conditions in customer creation
 */

export interface LockOptions {
    key: string;
    ttl: number; // seconds
    retryDelay?: number; // milliseconds
    maxRetries?: number;
}

/**
 * Acquire a distributed lock
 * Returns true if lock acquired, false otherwise
 */
export async function acquireLock(options: LockOptions): Promise<boolean> {
    const {
        key,
        ttl,
        retryDelay = 500,
        maxRetries = 5
    } = options;

    // Check if Redis is available
    const isRedisConfigured = !!(
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
    );

    if (!isRedisConfigured) {
        console.warn('⚠️  Redis not configured, skipping distributed lock');
        return true; // Fallback: allow operation
    }

    try {
        // Load Redis
        const { loadUpstashRedis } = await import('@/lib/optional-deps');
        const redisModule = await loadUpstashRedis();

        if (!redisModule) {
            console.warn('⚠️  Redis module not available');
            return true;
        }

        const { Redis } = redisModule;
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });

        // Try to acquire lock
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            const acquired = await redis.set(key, '1', {
                ex: ttl,
                nx: true // Only set if doesn't exist
            });

            if (acquired) {
                console.log(`✅ Lock acquired: ${key}`);
                return true;
            }

            // Lock exists, wait and retry
            console.log(`⏳ Lock exists, retrying... (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }

        console.warn(`⚠️  Failed to acquire lock after ${maxRetries} attempts: ${key}`);
        return false;
    } catch (error) {
        console.error('❌ Lock error:', error);
        return true; // Fallback: allow operation
    }
}

/**
 * Release a distributed lock
 */
export async function releaseLock(key: string): Promise<void> {
    const isRedisConfigured = !!(
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
    );

    if (!isRedisConfigured) return;

    try {
        const { loadUpstashRedis } = await import('@/lib/optional-deps');
        const redisModule = await loadUpstashRedis();

        if (!redisModule) return;

        const { Redis } = redisModule;
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });

        await redis.del(key);
        console.log(`✅ Lock released: ${key}`);
    } catch (error) {
        console.error('❌ Failed to release lock:', error);
    }
}

/**
 * Execute a function with a distributed lock
 */
export async function withLock<T>(
    options: LockOptions,
    fn: () => Promise<T>
): Promise<T> {
    const lockAcquired = await acquireLock(options);

    if (!lockAcquired) {
        throw new Error(`Failed to acquire lock: ${options.key}`);
    }

    try {
        return await fn();
    } finally {
        await releaseLock(options.key);
    }
}
