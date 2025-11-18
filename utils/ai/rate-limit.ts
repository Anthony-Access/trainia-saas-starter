import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { rateLimit as baseRateLimit } from '@/utils/rate-limit'

interface OpenAIUsage {
  user_id: string
  tokens_used: number
  cost_usd: number
  model: string
  created_at: string
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: Date
  reason?: string
}

/**
 * Check rate limit for OpenAI API calls
 *
 * Implements two-tier rate limiting:
 * 1. Per-minute limit: 10 requests/minute
 * 2. Daily token limit: 100,000 tokens/day
 *
 * @param userId - The user ID to check
 * @returns Rate limit result with allowed status and reset time
 */
export async function checkOpenAIRateLimit(userId: string): Promise<RateLimitResult> {
  // 1. Per-minute rate limit (10 requests/minute)
  const ipLimit = baseRateLimit(`openai:${userId}`, {
    limit: 10,
    windowInSeconds: 60
  })

  if (!ipLimit.success) {
    const resetAt = new Date(Date.now() + ipLimit.resetIn * 1000)
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      reason: 'Too many requests. Please wait before trying again.'
    }
  }

  // 2. Daily token limit (100,000 tokens/day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try {
    // Sum all tokens used today
    const { data: usageData, error } = await supabaseAdmin
      .from('ai_usage')
      .select('tokens_used')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found (acceptable)
      console.error('Error checking AI usage:', error)
      // Allow on error (fail open) but log it
      return {
        allowed: true,
        remaining: 100000,
        resetAt: new Date(today.getTime() + 86400000)
      }
    }

    const dailyLimit = 100000
    const tokensUsed = usageData?.reduce((sum, row) => sum + (row.tokens_used || 0), 0) || 0

    if (tokensUsed >= dailyLimit) {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return {
        allowed: false,
        remaining: 0,
        resetAt: tomorrow,
        reason: `Daily token limit reached (${dailyLimit} tokens). Resets at midnight.`
      }
    }

    return {
      allowed: true,
      remaining: dailyLimit - tokensUsed,
      resetAt: new Date(today.getTime() + 86400000)
    }
  } catch (err) {
    console.error('Error in checkOpenAIRateLimit:', err)
    // Fail open but log
    return {
      allowed: true,
      remaining: 100000,
      resetAt: new Date(today.getTime() + 86400000)
    }
  }
}

/**
 * Track OpenAI API usage for cost monitoring and rate limiting
 *
 * @param userId - The user ID
 * @param tokensUsed - Number of tokens used in the request
 * @param model - OpenAI model used (e.g., "gpt-4o", "gpt-3.5-turbo")
 */
export async function trackOpenAIUsage(
  userId: string,
  tokensUsed: number,
  model: string
): Promise<void> {
  // Calculate approximate cost
  // Pricing as of 2025 (update these values as needed)
  const costPerToken = getCostPerToken(model)
  const cost = tokensUsed * costPerToken

  try {
    const { error } = await supabaseAdmin.from('ai_usage').insert({
      user_id: userId,
      tokens_used: tokensUsed,
      cost_usd: cost,
      model,
      created_at: new Date().toISOString()
    })

    if (error) {
      console.error('Error tracking AI usage:', error)
      // Don't throw - tracking failure shouldn't block the request
    }
  } catch (err) {
    console.error('Error in trackOpenAIUsage:', err)
    // Don't throw - tracking failure shouldn't block the request
  }
}

/**
 * Get cost per token for different models
 * Update these values as OpenAI pricing changes
 */
function getCostPerToken(model: string): number {
  // Pricing per 1000 tokens (input + output averaged)
  const pricing: Record<string, number> = {
    'gpt-4o': 0.000015,           // $15/1M tokens (avg)
    'gpt-4o-mini': 0.0000003,     // $0.30/1M tokens (avg)
    'gpt-4-turbo': 0.00002,       // $20/1M tokens (avg)
    'gpt-4': 0.00004,             // $40/1M tokens (avg)
    'gpt-3.5-turbo': 0.000002,    // $2/1M tokens (avg)
    'o1-preview': 0.00005,        // $50/1M tokens (avg)
    'o1-mini': 0.000012,          // $12/1M tokens (avg)
  }

  // Find matching model (handles versioned models like gpt-4o-2024-11-20)
  for (const [key, value] of Object.entries(pricing)) {
    if (model.startsWith(key)) {
      return value
    }
  }

  // Default to gpt-4o pricing if unknown
  return 0.000015
}

/**
 * Get total AI usage statistics for a user
 *
 * @param userId - The user ID
 * @param days - Number of days to look back (default: 30)
 * @returns Usage statistics
 */
export async function getUserAIUsage(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  try {
    const { data, error } = await supabaseAdmin
      .from('ai_usage')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching AI usage:', error)
      return null
    }

    const totalTokens = data?.reduce((sum, row) => sum + row.tokens_used, 0) || 0
    const totalCost = data?.reduce((sum, row) => sum + row.cost_usd, 0) || 0
    const requestCount = data?.length || 0

    return {
      totalTokens,
      totalCost,
      requestCount,
      usage: data
    }
  } catch (err) {
    console.error('Error in getUserAIUsage:', err)
    return null
  }
}
