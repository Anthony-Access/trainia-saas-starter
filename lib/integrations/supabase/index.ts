/**
 * Supabase Integration Module
 *
 * Barrel export for all Supabase clients and context.
 *
 * @example
 * ```typescript
 * import { createClient } from '@/lib/integrations/supabase';
 * import { supabaseAdmin } from '@/lib/integrations/supabase';
 * ```
 */

export { createClerkSupabaseClientSsr } from './server';
export { supabaseAdmin } from './admin';
export { SupabaseProvider, useSupabase } from './context';
