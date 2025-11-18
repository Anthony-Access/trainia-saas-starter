-- ============================================================================
-- Validate user_id Format in requesting_user_id()
-- ============================================================================
-- Date: 2025-11-18
-- Security: Prevent malformed JWTs from returning invalid user_ids
-- ============================================================================

CREATE OR REPLACE FUNCTION public.requesting_user_id()
RETURNS TEXT AS $$
DECLARE
  user_id TEXT;
BEGIN
  -- Try to get user_id from JWT claims (Clerk stores it in 'sub')
  BEGIN
    user_id := NULLIF(
      current_setting('request.jwt.claims', true)::json->>'sub',
      ''
    )::text;
  EXCEPTION
    WHEN OTHERS THEN
      user_id := NULL;
  END;

  -- If we couldn't get the user_id, try alternative claim names
  IF user_id IS NULL THEN
    BEGIN
      user_id := NULLIF(
        current_setting('request.jwt.claims', true)::json->>'user_id',
        ''
      )::text;
    EXCEPTION
      WHEN OTHERS THEN
        user_id := NULL;
    END;
  END IF;

  -- ✅ SÉCURITÉ: Valider le format du user_id
  -- Clerk user IDs: user_xxxxxxxxxxxxx (24+ caractères alphanumériques)
  IF user_id IS NOT NULL THEN
    -- Vérifier le format: doit commencer par "user_" suivi d'alphanum
    IF user_id !~ '^user_[a-zA-Z0-9]{24,}$' THEN
      -- Format invalide: logger et retourner NULL
      RAISE WARNING 'Invalid user_id format detected: %', user_id;

      -- TODO: Si vous avez une table de logs, insérer ici
      -- INSERT INTO security_logs (event_type, details, timestamp)
      -- VALUES ('INVALID_USER_ID_FORMAT', user_id, NOW());

      RETURN NULL;
    END IF;
  END IF;

  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION requesting_user_id() IS
'Extracts and validates the user_id from the JWT token provided by Clerk authentication. '
'Returns NULL if no valid JWT is present or if the user_id format is invalid. '
'Clerk user IDs must match pattern: user_[a-zA-Z0-9]{24,}';

-- ============================================================================
-- Security Improvement
-- ============================================================================
-- ✅ Valide le format du user_id extrait du JWT
-- ✅ Empêche l'injection via JWT malformé
-- ✅ Logs les tentatives avec format invalide
-- ============================================================================
