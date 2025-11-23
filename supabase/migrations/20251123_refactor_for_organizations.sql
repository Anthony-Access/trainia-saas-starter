-- ============================================================================
-- REFACTOR FOR ORGANIZATIONS (B2B) - IDEMPOTENT VERSION
-- ============================================================================
-- Date: 2025-11-23
-- Description: Adds org_id support and updates RLS for Multi-Tenant B2B
-- ============================================================================

-- 1. Helper Function to extract org_id from Clerk JWT
CREATE OR REPLACE FUNCTION public.requesting_org_id()
RETURNS TEXT AS $$
DECLARE
  org_id TEXT;
BEGIN
  -- Extract org_id from JWT claims (Clerk passes it in 'org_id')
  org_id := NULLIF(
    current_setting('request.jwt.claims', true)::json->>'org_id',
    ''
  )::text;
  
  RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

GRANT EXECUTE ON FUNCTION requesting_org_id() TO authenticated;
GRANT EXECUTE ON FUNCTION requesting_org_id() TO anon;

-- 2. Update Tables to support Organizations

-- Customers: Add org_id (IF NOT EXISTS pour éviter les erreurs)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'org_id'
  ) THEN
    ALTER TABLE "public"."customers" ADD COLUMN "org_id" TEXT;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "customers_org_id_idx" ON "public"."customers" ("org_id");

-- Subscriptions: Add org_id (IF NOT EXISTS pour éviter les erreurs)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'subscriptions' AND column_name = 'org_id'
  ) THEN
    ALTER TABLE "public"."subscriptions" ADD COLUMN "org_id" TEXT;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "subscriptions_org_id_idx" ON "public"."subscriptions" ("org_id");

-- 3. Update RLS Policies (DROP IF EXISTS avant recréation)

-- CUSTOMERS
DROP POLICY IF EXISTS "Users can view own customer data" ON "public"."customers";
DROP POLICY IF EXISTS "Users can insert own customer data" ON "public"."customers";
DROP POLICY IF EXISTS "Users can update own customer data" ON "public"."customers";
DROP POLICY IF EXISTS "Org members can view org customer data" ON "public"."customers";
DROP POLICY IF EXISTS "Org admins can update org customer data" ON "public"."customers";

CREATE POLICY "Org members can view org customer data"
ON "public"."customers"
FOR SELECT
TO authenticated
USING (org_id = requesting_org_id());

CREATE POLICY "Org admins can update org customer data"
ON "public"."customers"
FOR UPDATE
TO authenticated
USING (org_id = requesting_org_id())
WITH CHECK (org_id = requesting_org_id());

-- SUBSCRIPTIONS
DROP POLICY IF EXISTS "Users can view own subscriptions" ON "public"."subscriptions";
DROP POLICY IF EXISTS "owner" ON "public"."subscriptions";
DROP POLICY IF EXISTS "Users can request updates to own subscription" ON "public"."subscriptions";
DROP POLICY IF EXISTS "Org members can view org subscriptions" ON "public"."subscriptions";

CREATE POLICY "Org members can view org subscriptions"
ON "public"."subscriptions"
FOR SELECT
TO authenticated
USING (org_id = requesting_org_id());

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================
-- 1. You must enable "Organizations" in Clerk Dashboard.
-- 2. You must configure Clerk to pass `org_id` in the JWT session token.
--    (Clerk Dashboard > Sessions > Customize Session Token > Add `org_id`)
-- 3. Existing data with NULL org_id will become inaccessible to users.
--    (You may need to backfill org_id if you have existing production data)
-- ============================================================================
