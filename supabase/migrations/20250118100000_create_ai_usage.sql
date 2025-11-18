-- AI Usage Tracking Migration
-- This migration creates the infrastructure for tracking OpenAI API usage
-- Date: 2025-11-18
-- Purpose: Enable rate limiting, cost tracking, and usage analytics for AI features

-- ============================================================================
-- Create AI Usage Table
-- ============================================================================

create table if not exists public.ai_usage (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  tokens_used integer not null check (tokens_used >= 0),
  cost_usd numeric(10, 6) not null check (cost_usd >= 0),
  model text not null,
  created_at timestamp with time zone default now() not null
);

-- Add table comment
comment on table public.ai_usage is 'Tracks OpenAI API usage for rate limiting and cost monitoring';

-- Add column comments
comment on column public.ai_usage.user_id is 'Clerk user ID who made the request';
comment on column public.ai_usage.tokens_used is 'Total tokens consumed (input + output)';
comment on column public.ai_usage.cost_usd is 'Estimated cost in USD for this request';
comment on column public.ai_usage.model is 'OpenAI model used (e.g., gpt-4o, gpt-3.5-turbo)';

-- ============================================================================
-- Enable Row Level Security
-- ============================================================================

alter table public.ai_usage enable row level security;

-- ============================================================================
-- Create RLS Policies
-- ============================================================================

-- Users can view their own AI usage
create policy "Users can view own AI usage"
  on public.ai_usage
  for select
  to authenticated
  using (requesting_user_id() = user_id);

-- Only service role can insert usage records
-- (This is done server-side via OpenAI API wrapper)
create policy "Service role can insert AI usage"
  on public.ai_usage
  for insert
  to service_role
  with check (true);

-- Prevent users from modifying or deleting usage records
-- (Ensures audit trail integrity)

-- ============================================================================
-- Create Indexes for Performance
-- ============================================================================

-- Index for daily usage queries (most common lookup)
create index if not exists idx_ai_usage_user_date
  on public.ai_usage(user_id, created_at desc);

-- Index for cost analytics
create index if not exists idx_ai_usage_cost
  on public.ai_usage(cost_usd desc, created_at desc);

-- Index for model usage analytics
create index if not exists idx_ai_usage_model
  on public.ai_usage(model, created_at desc);

-- ============================================================================
-- Grant Permissions
-- ============================================================================

-- Grant select to authenticated users (via RLS)
grant select on table public.ai_usage to authenticated;

-- Grant insert to service_role (for server-side tracking)
grant insert on table public.ai_usage to service_role;

-- Grant all to postgres and service_role for admin operations
grant all on table public.ai_usage to postgres;
grant all on table public.ai_usage to service_role;

-- ============================================================================
-- Create View for Daily Usage Summary
-- ============================================================================

create or replace view public.ai_usage_daily_summary as
select
  user_id,
  date_trunc('day', created_at) as usage_date,
  count(*) as request_count,
  sum(tokens_used) as total_tokens,
  sum(cost_usd) as total_cost_usd,
  array_agg(distinct model) as models_used
from public.ai_usage
group by user_id, date_trunc('day', created_at)
order by usage_date desc;

-- Grant select on view
grant select on public.ai_usage_daily_summary to authenticated;
grant select on public.ai_usage_daily_summary to service_role;

comment on view public.ai_usage_daily_summary is 'Daily aggregated AI usage statistics per user';

-- ============================================================================
-- Create Function to Check Daily Token Limit
-- ============================================================================

create or replace function public.check_daily_token_limit(
  p_user_id text,
  p_limit integer default 100000
)
returns table (
  tokens_used bigint,
  limit_exceeded boolean,
  remaining integer
)
language plpgsql
security definer
as $$
declare
  v_tokens_used bigint;
  v_today timestamp with time zone;
begin
  -- Get start of today
  v_today := date_trunc('day', now() at time zone 'UTC');

  -- Sum tokens used today
  select coalesce(sum(tokens_used), 0)
  into v_tokens_used
  from public.ai_usage
  where user_id = p_user_id
    and created_at >= v_today;

  -- Return results
  return query
  select
    v_tokens_used,
    v_tokens_used >= p_limit,
    greatest(0, p_limit - v_tokens_used::integer);
end;
$$;

comment on function public.check_daily_token_limit is 'Check if user has exceeded daily token limit';

grant execute on function public.check_daily_token_limit to authenticated;
grant execute on function public.check_daily_token_limit to service_role;

-- ============================================================================
-- Sample Data (Optional - for testing)
-- ============================================================================

-- Uncomment to insert sample data for testing
-- insert into public.ai_usage (user_id, tokens_used, cost_usd, model) values
--   ('user_test_123', 150, 0.0045, 'gpt-4o'),
--   ('user_test_123', 300, 0.009, 'gpt-4o'),
--   ('user_test_456', 100, 0.0003, 'gpt-4o-mini');

-- ============================================================================
-- NOTES
-- ============================================================================

-- Rate Limits:
-- - Per-minute limit: 10 requests/minute (handled in application code)
-- - Daily token limit: 100,000 tokens/day (checked via this table)

-- Cost Calculation:
-- Costs are calculated in utils/ai/rate-limit.ts using current OpenAI pricing
-- Update pricing in code as OpenAI rates change

-- Usage Analytics:
-- Use ai_usage_daily_summary view for dashboard analytics
-- Query ai_usage table directly for detailed usage patterns

-- Security:
-- - RLS ensures users can only see their own usage
-- - Only service_role can insert records (server-side only)
-- - Users cannot modify or delete usage records (audit trail)
