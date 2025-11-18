-- Security Fix Migration
-- This migration fixes critical security issues identified in the security audit
-- Date: 2025-11-18
-- Issues addressed:
-- 1. Missing RLS policies for customers table
-- 2. Excessive permissions for 'anon' role
-- 3. Missing policies for subscriptions mutations

-- ============================================================================
-- FIX 1: Add RLS policies for customers table
-- ============================================================================

-- Allow authenticated users to view their own customer data
create policy "Users can view own customer data"
on "public"."customers"
as permissive
for select
to authenticated
using (requesting_user_id() = id);

-- Allow authenticated users to update their own customer data
create policy "Users can update own customer data"
on "public"."customers"
as permissive
for update
to authenticated
using (requesting_user_id() = id)
with check (requesting_user_id() = id);

-- Allow authenticated users to insert their own customer record
create policy "Users can insert own customer data"
on "public"."customers"
as permissive
for insert
to authenticated
with check (requesting_user_id() = id);

-- ============================================================================
-- FIX 2: Revoke dangerous permissions from 'anon' role
-- ============================================================================

-- Revoke DELETE permissions (users should not be able to delete data directly)
revoke delete on table "public"."customers" from "anon";
revoke delete on table "public"."prices" from "anon";
revoke delete on table "public"."products" from "anon";
revoke delete on table "public"."subscriptions" from "anon";

-- Revoke TRUNCATE permissions (extremely dangerous operation)
revoke truncate on table "public"."customers" from "anon";
revoke truncate on table "public"."prices" from "anon";
revoke truncate on table "public"."products" from "anon";
revoke truncate on table "public"."subscriptions" from "anon";

-- Revoke INSERT permissions from anon for customers and subscriptions
-- These should only be managed via backend operations
revoke insert on table "public"."customers" from "anon";
revoke insert on table "public"."subscriptions" from "anon";

-- Revoke UPDATE permissions from anon for sensitive tables
-- These should only be managed via backend operations
revoke update on table "public"."customers" from "anon";
revoke update on table "public"."prices" from "anon";
revoke update on table "public"."products" from "anon";
revoke update on table "public"."subscriptions" from "anon";

-- ============================================================================
-- FIX 3: Revoke dangerous permissions from 'authenticated' role
-- ============================================================================

-- Authenticated users should not be able to directly manipulate these tables
-- All mutations should go through API routes with proper validation

revoke delete on table "public"."customers" from "authenticated";
revoke delete on table "public"."prices" from "authenticated";
revoke delete on table "public"."products" from "authenticated";
revoke delete on table "public"."subscriptions" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";
revoke truncate on table "public"."prices" from "authenticated";
revoke truncate on table "public"."products" from "authenticated";
revoke truncate on table "public"."subscriptions" from "authenticated";

revoke insert on table "public"."prices" from "authenticated";
revoke insert on table "public"."products" from "authenticated";

revoke update on table "public"."prices" from "authenticated";
revoke update on table "public"."products" from "authenticated";

-- ============================================================================
-- FIX 4: Add UPDATE policy for subscriptions
-- ============================================================================

-- Allow authenticated users to update their own subscription
-- (e.g., for cancellation requests that go through validated API)
create policy "Users can request updates to own subscription"
on "public"."subscriptions"
as permissive
for update
to authenticated
using (requesting_user_id() = user_id)
with check (requesting_user_id() = user_id);

-- NOTE: In practice, subscription updates should still go through
-- your API routes for validation, but this policy allows the flexibility
-- while maintaining security (users can only update their own subscriptions)

-- ============================================================================
-- NOTES:
-- ============================================================================

-- After this migration:
-- 1. Customers table: authenticated users can SELECT, INSERT, UPDATE their own data
-- 2. Subscriptions table: authenticated users can SELECT and UPDATE their own data
-- 3. Prices/Products tables: all users can SELECT (read-only)
-- 4. All mutations (INSERT/DELETE) for prices, products, and subscriptions
--    must go through service_role (backend API routes)
-- 5. anon role has very limited permissions (read-only for prices/products)

-- This ensures:
-- - Users can only access their own data
-- - Critical operations go through validated API routes
-- - Users can update their subscription (e.g., cancellation) through proper channels
-- - No direct database manipulation by clients without ownership verification
-- - Protection against data loss and unauthorized access
