-- ============================================================================
-- Fix RLS Policies: TO authenticated instead of TO public
-- ============================================================================
-- Date: 2025-11-18
-- Security: Reduce attack surface for timing attacks
-- ============================================================================

-- SUBSCRIPTIONS TABLE
-- Change policy from "TO public" to "TO authenticated"
DROP POLICY IF EXISTS "owner" ON subscriptions;

CREATE POLICY "Users can view own subscriptions"
ON "public"."subscriptions"
AS PERMISSIVE
FOR SELECT
TO authenticated  -- ✅ Plus restrictif: seulement les utilisateurs authentifiés
USING (requesting_user_id() = user_id);

-- Note: Les webhooks utilisent service_role_key qui bypass RLS ✅
-- Donc pas d'impact sur le fonctionnement des webhooks

-- ============================================================================
-- Security Improvement
-- ============================================================================
-- ✅ Requêtes non authentifiées sont bloquées immédiatement
-- ✅ Réduit le timing attack vector
-- ✅ Defense in depth: fail-fast pour utilisateurs non auth
-- ============================================================================
