-- Final Permission Cleanup Migration
-- Date: 2025-11-18
-- Purpose: Remove excessive permissions identified in security audit
-- This ensures defense-in-depth alongside RLS policies

-- ============================================================================
-- ISSUE: anon and authenticated roles had INSERT permissions on tables
-- that should only be modified by service_role (via webhooks)
-- ============================================================================

-- Even though RLS policies block these operations, it's a security best practice
-- to also revoke the underlying permissions (defense in depth)

-- ============================================================================
-- FIX #1: Revoke INSERT on prices for anon
-- ============================================================================
-- prices should only be created/modified by Stripe webhooks
REVOKE INSERT ON TABLE "public"."prices" FROM "anon";

-- ============================================================================
-- FIX #2: Revoke INSERT on products for anon
-- ============================================================================
-- products should only be created/modified by Stripe webhooks
REVOKE INSERT ON TABLE "public"."products" FROM "anon";

-- ============================================================================
-- FIX #3: Revoke INSERT on subscriptions for authenticated
-- ============================================================================
-- subscriptions should only be created by Stripe webhooks (checkout.session.completed)
-- Users can UPDATE (cancel) but not INSERT (create) subscriptions directly
REVOKE INSERT ON TABLE "public"."subscriptions" FROM "authenticated";

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Run this to verify the permissions are correct:
--
-- SELECT
--     grantee as "Role",
--     table_name as "Table",
--     string_agg(privilege_type, ', ' ORDER BY privilege_type) as "Permissions"
-- FROM information_schema.table_privileges
-- WHERE grantee IN ('anon', 'authenticated')
-- AND table_schema = 'public'
-- AND table_name IN ('customers', 'prices', 'products', 'subscriptions')
-- GROUP BY grantee, table_name
-- ORDER BY table_name, grantee;

-- ============================================================================
-- EXPECTED RESULTS AFTER MIGRATION:
-- ============================================================================
--
-- customers (anon):          REFERENCES, SELECT, TRIGGER
-- customers (authenticated): INSERT, REFERENCES, SELECT, TRIGGER, UPDATE
-- prices (anon):             REFERENCES, SELECT, TRIGGER
-- prices (authenticated):    REFERENCES, SELECT, TRIGGER
-- products (anon):           REFERENCES, SELECT, TRIGGER
-- products (authenticated):  REFERENCES, SELECT, TRIGGER
-- subscriptions (anon):      REFERENCES, SELECT, TRIGGER
-- subscriptions (authenticated): REFERENCES, SELECT, TRIGGER, UPDATE

-- ============================================================================
-- SECURITY IMPACT:
-- ============================================================================
--
-- This migration provides defense-in-depth by ensuring that even if RLS
-- policies are accidentally disabled, users still cannot:
-- - Create fake products or prices
-- - Create fake subscriptions to get premium access
-- - Manipulate the pricing catalog
--
-- All data mutations for prices, products, and subscription creation
-- must go through the service_role (webhooks with proper validation)
