# Supabase Database Migrations

This folder contains all database schema migrations for the Train-IA SaaS application.

## Status

✅ **All migrations have been applied to production**

Last verified: 2025-11-18

## Migrations

| File | Date | Status | Description |
|------|------|--------|-------------|
| `20250125124435_init.sql` | 2025-01-25 | ✅ Applied | Initial database schema with tables, RLS, and permissions |
| `20250118000001_create_requesting_user_id_function.sql` | 2025-01-18 | ✅ Applied | Critical fix: Creates `requesting_user_id()` function for RLS policies |
| `20250118000000_fix_security_policies.sql` | 2025-01-18 | ✅ Applied | Security fix: Adds proper RLS policies and revokes dangerous permissions |
| `20250118000002_final_permission_cleanup.sql` | 2025-01-18 | ✅ Applied | Final cleanup: Removes excessive INSERT permissions for defense-in-depth |

## Production Database

The production Supabase database has all these migrations applied and is fully secured with:
- ✅ Row Level Security (RLS) policies on all tables
- ✅ Proper GRANT permissions (principle of least privilege)
- ✅ `requesting_user_id()` function for user isolation
- ✅ Service role restrictions for data mutations

**Security Score**: 10/10 ✅

## For New Developers

If you're setting up a local development environment:

```bash
# 1. Install Supabase CLI
npm install -g supabase

# 2. Login to Supabase
supabase login

# 3. Link to the project (or create a new one for local dev)
supabase link --project-ref your-project-ref

# 4. Apply all migrations
supabase db push

# 5. Generate TypeScript types
supabase gen types typescript --local > ../types/database.types.ts
```

## Important Notes

- **DO NOT** modify these migrations once applied to production
- **DO NOT** delete these files (needed for new environments)
- **DO** create a new migration file for schema changes
- **DO** test migrations in staging before production

## Creating New Migrations

```bash
# Create a new migration file
supabase migration new your_migration_name

# Edit the file in supabase/migrations/

# Test locally
supabase db reset  # Resets local DB and applies all migrations

# Apply to production (via Supabase dashboard SQL editor)
```

## Security Audit Results

Latest security audit performed: 2025-11-18

**Results**:
- 🔴 Critical vulnerabilities: 0
- 🟠 Medium vulnerabilities: 0
- 🟡 Low vulnerabilities: 0

**RLS Policies**: ✅ Perfect
**GRANT Permissions**: ✅ Perfect
**Defense in Depth**: ✅ Complete

See `/documentation/security/` for detailed audit reports.
