-- Migration: Create requesting_user_id() function for RLS policies
-- Date: 2025-11-18
-- Purpose: Fix CRITICAL security issue - RLS policies were using undefined function

-- ============================================================================
-- Create requesting_user_id() function
-- ============================================================================

-- This function extracts the user_id from the JWT token provided by Clerk
-- It's used in all RLS policies to ensure users can only access their own data

CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT AS $$
DECLARE
  user_id TEXT;
BEGIN
  -- Try to get user_id from JWT claims
  -- Clerk stores the user ID in the 'sub' claim of the JWT
  BEGIN
    user_id := NULLIF(
      current_setting('request.jwt.claims', true)::json->>'sub',
      ''
    )::text;
  EXCEPTION
    WHEN OTHERS THEN
      -- If setting doesn't exist or is invalid, return NULL
      user_id := NULL;
  END;

  -- If we couldn't get the user_id, try alternative claim names
  -- Some Clerk configurations use 'user_id' instead of 'sub'
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

  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Add comment explaining the function
COMMENT ON FUNCTION requesting_user_id() IS
'Extracts the user_id from the JWT token provided by Clerk authentication. '
'Used in RLS policies to ensure users can only access their own data. '
'Returns NULL if no valid JWT is present.';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION requesting_user_id() TO authenticated;
GRANT EXECUTE ON FUNCTION requesting_user_id() TO anon;

-- ============================================================================
-- Verify the function works
-- ============================================================================

-- Test query (will return NULL if no JWT is set, which is expected)
-- SELECT requesting_user_id();

-- Note: This function will only return a value when called in the context
-- of an authenticated request with a valid Clerk JWT token.
