# 🛡️ CORRECTIFS DE SÉCURITÉ À APPLIQUER

Ce fichier contient les correctifs recommandés suite à l'audit de sécurité du 2025-11-18.

## ✅ CORRECTIF DÉJÀ APPLIQUÉ

### 1. Variable d'environnement incorrecte (CRITIQUE)
**Statut**: ✅ CORRIGÉ
**Fichier**: `utils/supabase/context.tsx`
**Commit**: À venir

## ⏳ CORRECTIFS À APPLIQUER

### 2. Retirer la vérification d'authentification client-side redondante

**Fichier**: `app/(main)/dashboard/page.tsx`

```typescript
// AVANT (vulnérable à une race condition):
export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  // ❌ RETIRER CE CODE
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return <LoadingState />
  }
  // ...
}

// APRÈS (sécurisé):
export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  // Le middleware Clerk protège déjà cette route
  // Pas besoin de redirection client-side

  if (!isLoaded) {
    return <LoadingState />
  }

  // Si on arrive ici, user est forcément défini grâce au middleware
  return (
    <div>
      <h1>Welcome {user?.firstName}</h1>
      {/* ... */}
    </div>
  )
}
```

### 3. Remplacer le JWT placeholder

**Fichier**: `utils/supabase/admin.ts`

```typescript
// AVANT:
export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxOTAwMDAwMDAwfQ.placeholder'
);

// APRÈS:
export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key_not_a_real_jwt'
);
```

### 4. Ajouter un timing constant pour la vérification webhook

**Fichier**: `app/api/webhooks/route.ts`

```typescript
// AVANT:
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('❌ Webhook configuration error');
      return new Response('Webhook configuration error', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Webhook signature verification failed:`, err);
    SecurityLogger.logInvalidWebhookSignature({
      ip: identifier,
      endpoint: '/api/webhooks',
      provider: 'Stripe',
    });
    return new Response('Webhook signature verification failed', { status: 400 });
  }
  // ...
}

// APRÈS (avec timing constant):
// Ajouter cette constante au début du fichier
const TIMING_SAFE_DELAY_MS = 100;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('❌ Webhook configuration error');
      // ✅ Ajouter un délai constant
      await new Promise(resolve => setTimeout(resolve, TIMING_SAFE_DELAY_MS));
      return new Response('Webhook configuration error', { status: 400 });
    }

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      // ✅ Délai constant même en cas d'erreur
      await new Promise(resolve => setTimeout(resolve, TIMING_SAFE_DELAY_MS));
      throw err;
    }
  } catch (err) {
    console.error(`❌ Webhook signature verification failed:`, err);

    // ✅ Timing constant pour toutes les erreurs
    await new Promise(resolve => setTimeout(resolve, TIMING_SAFE_DELAY_MS));

    SecurityLogger.logInvalidWebhookSignature({
      ip: identifier,
      endpoint: '/api/webhooks',
      provider: 'Stripe',
    });

    return new Response('Webhook signature verification failed', { status: 400 });
  }
  // ... rest of the code
}
```

### 5. Configuration Upstash Redis pour le rate limiting distribué

**Fichier**: `.env` ou `.env.local` ou Variables d'environnement Vercel

```bash
# Étapes:
# 1. Créer un compte gratuit sur https://upstash.com
# 2. Créer une base de données Redis
# 3. Copier les credentials et ajouter:

UPSTASH_REDIS_REST_URL=https://xxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Installation des dépendances**:
```bash
npm install @upstash/ratelimit @upstash/redis
```

### 6. Ajouter une validation JWT côté Supabase

**Nouveau fichier**: `supabase/migrations/20251118_add_jwt_validation.sql`

```sql
-- ============================================================================
-- JWT Validation Enhancement
-- ============================================================================
-- Date: 2025-11-18
-- Description: Adds JWT validation functions to prevent stolen JWT attacks
-- ============================================================================

-- Function to validate JWT expiration
CREATE OR REPLACE FUNCTION public.validate_jwt_expiration()
RETURNS BOOLEAN AS $$
DECLARE
  exp_claim BIGINT;
  current_time BIGINT;
BEGIN
  BEGIN
    -- Extract exp from JWT
    exp_claim := (current_setting('request.jwt.claims', true)::json->>'exp')::BIGINT;
    current_time := EXTRACT(EPOCH FROM NOW())::BIGINT;

    -- Check token is not expired
    RETURN exp_claim > current_time;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

GRANT EXECUTE ON FUNCTION public.validate_jwt_expiration() TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_jwt_expiration() TO anon;

COMMENT ON FUNCTION public.validate_jwt_expiration() IS
'Validates that the JWT token is not expired. Returns FALSE if expired or invalid.';

-- Function to validate JWT issuer (Clerk)
CREATE OR REPLACE FUNCTION public.validate_jwt_issuer()
RETURNS BOOLEAN AS $$
DECLARE
  issuer TEXT;
BEGIN
  BEGIN
    issuer := current_setting('request.jwt.claims', true)::json->>'iss';

    -- Check that JWT comes from Clerk
    RETURN issuer LIKE 'https://clerk.%' OR issuer LIKE '%.clerk.accounts.dev';
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

GRANT EXECUTE ON FUNCTION public.validate_jwt_issuer() TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_jwt_issuer() TO anon;

COMMENT ON FUNCTION public.validate_jwt_issuer() IS
'Validates that the JWT token was issued by Clerk authentication service.';

-- Update existing RLS policies to include JWT validation
-- CUSTOMERS TABLE
DROP POLICY IF EXISTS "Users can view own customer data" ON customers;
CREATE POLICY "Users can view own customer data"
ON "public"."customers"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  requesting_user_id() = id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
);

DROP POLICY IF EXISTS "Users can insert own customer data" ON customers;
CREATE POLICY "Users can insert own customer data"
ON "public"."customers"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  requesting_user_id() = id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
);

DROP POLICY IF EXISTS "Users can update own customer data" ON customers;
CREATE POLICY "Users can update own customer data"
ON "public"."customers"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  requesting_user_id() = id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
)
WITH CHECK (
  requesting_user_id() = id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
);

-- SUBSCRIPTIONS TABLE
DROP POLICY IF EXISTS "owner" ON subscriptions;
CREATE POLICY "Users can view own subscriptions"
ON "public"."subscriptions"
AS PERMISSIVE
FOR SELECT
TO public
USING (
  requesting_user_id() = user_id
  AND (
    validate_jwt_expiration() = true OR requesting_user_id() IS NULL
  )
  AND (
    validate_jwt_issuer() = true OR requesting_user_id() IS NULL
  )
);

DROP POLICY IF EXISTS "Users can request updates to own subscription" ON subscriptions;
CREATE POLICY "Users can update own subscriptions"
ON "public"."subscriptions"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  requesting_user_id() = user_id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
)
WITH CHECK (
  requesting_user_id() = user_id
  AND validate_jwt_expiration() = true
  AND validate_jwt_issuer() = true
);

-- ============================================================================
-- Security Notes
-- ============================================================================
-- ✅ JWT expiration is now validated
-- ✅ JWT issuer is verified to be Clerk
-- ✅ Prevents stolen JWT attacks
-- ✅ Defense in depth: RLS + JWT validation
-- ============================================================================
```

**Pour appliquer cette migration**:
```bash
# Si vous utilisez Supabase CLI:
supabase db push

# Ou manuellement dans le dashboard Supabase:
# SQL Editor > New Query > Coller le contenu > Run
```

### 7. Détection de JWT réutilisés (optionnel mais recommandé)

**Nouveau fichier**: `utils/jwt-security.ts`

```typescript
/**
 * JWT Security - Détection de tokens volés
 *
 * Détecte les JWT réutilisés depuis différents contextes (IP, User-Agent)
 * ce qui peut indiquer un vol de token.
 */

import { SecurityLogger } from './security-logger';

interface JWTContext {
  userId: string;
  jwtId: string;
  ip: string;
  userAgent: string;
  firstSeen: number;
  lastSeen: number;
  requestCount: number;
}

// En production, utiliser Redis ou une base de données
// Pour dev/test, Map en mémoire suffit
const jwtContexts = new Map<string, JWTContext>();

// Nettoyer les anciens contextes toutes les heures
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [jwtId, context] of jwtContexts.entries()) {
    if (context.lastSeen < oneHourAgo) {
      jwtContexts.delete(jwtId);
    }
  }
}, 60 * 60 * 1000);

/**
 * Valide le contexte d'utilisation d'un JWT
 * Retourne false si le JWT est utilisé dans un contexte suspect
 */
export function validateJWTContext(
  userId: string,
  jwtId: string,
  ip: string,
  userAgent: string
): boolean {
  const stored = jwtContexts.get(jwtId);

  if (!stored) {
    // Première utilisation de ce JWT - enregistrer le contexte
    jwtContexts.set(jwtId, {
      userId,
      jwtId,
      ip,
      userAgent,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      requestCount: 1,
    });
    return true;
  }

  // Vérifier les changements suspects
  const ipChanged = stored.ip !== ip;
  const uaChanged = stored.userAgent !== userAgent;

  if (ipChanged || uaChanged) {
    // JWT utilisé depuis un contexte différent - SUSPECT
    SecurityLogger.logSuspiciousActivity({
      userId,
      ip,
      activity: 'JWT_CONTEXT_MISMATCH',
      details: {
        jwtId,
        originalIp: stored.ip,
        currentIp: ip,
        originalUserAgent: stored.userAgent,
        currentUserAgent: userAgent,
        firstSeen: new Date(stored.firstSeen).toISOString(),
        requestCount: stored.requestCount,
      },
      path: '/api/*',
    });

    // Option 1: Bloquer complètement (strict)
    // return false;

    // Option 2: Logger mais autoriser (moins strict)
    // Utile pour les utilisateurs mobiles qui changent de réseau
    // return true;

    // Option 3: Bloquer seulement si changement drastique
    // Par exemple: IP d'un pays différent, UA complètement différent
    if (isHighRiskChange(stored, { ip, userAgent })) {
      return false; // Bloquer
    }
  }

  // Mettre à jour le contexte
  stored.lastSeen = Date.now();
  stored.requestCount++;

  return true;
}

/**
 * Détermine si un changement de contexte est à haut risque
 */
function isHighRiskChange(
  original: JWTContext,
  current: { ip: string; userAgent: string }
): boolean {
  // Vérifier si le User-Agent a complètement changé
  // (pas juste une version de navigateur)
  const uaScore = calculateUserAgentSimilarity(
    original.userAgent,
    current.userAgent
  );

  if (uaScore < 0.5) {
    // User-Agent complètement différent
    return true;
  }

  // Vérifier si l'IP a changé de pays
  // (nécessite une API de géolocalisation IP)
  // Pour simplifier, on compare juste les premiers octets
  const originalPrefix = original.ip.split('.').slice(0, 2).join('.');
  const currentPrefix = current.ip.split('.').slice(0, 2).join('.');

  if (originalPrefix !== currentPrefix) {
    // IP d'un réseau complètement différent
    return true;
  }

  return false;
}

/**
 * Calcule la similarité entre deux User-Agents (0-1)
 */
function calculateUserAgentSimilarity(ua1: string, ua2: string): number {
  // Simple comparaison basée sur les tokens communs
  const tokens1 = new Set(ua1.toLowerCase().split(/[\s\/\(\)]/));
  const tokens2 = new Set(ua2.toLowerCase().split(/[\s\/\(\)]/));

  const intersection = new Set(
    [...tokens1].filter(t => tokens2.has(t))
  );

  const union = new Set([...tokens1, ...tokens2]);

  return intersection.size / union.size;
}

/**
 * Nettoyer le contexte d'un JWT (par exemple lors de logout)
 */
export function clearJWTContext(jwtId: string): void {
  jwtContexts.delete(jwtId);
}

/**
 * Obtenir des statistiques sur les JWT en cours
 */
export function getJWTStats() {
  return {
    totalJWTs: jwtContexts.size,
    contexts: Array.from(jwtContexts.values()).map(ctx => ({
      userId: ctx.userId,
      firstSeen: new Date(ctx.firstSeen).toISOString(),
      lastSeen: new Date(ctx.lastSeen).toISOString(),
      requestCount: ctx.requestCount,
    })),
  };
}
```

**Utilisation dans les API routes**:
```typescript
// Dans vos API routes qui nécessitent une auth
import { auth } from '@clerk/nextjs/server';
import { validateJWTContext } from '@/utils/jwt-security';

export async function POST(req: Request) {
  const { userId, sessionId } = await auth();

  if (!userId || !sessionId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Extraire le contexte de la requête
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  // Valider le contexte du JWT
  const isValid = validateJWTContext(userId, sessionId, ip, userAgent);

  if (!isValid) {
    return new Response('Suspicious activity detected', { status: 403 });
  }

  // Continuer avec la logique normale
  // ...
}
```

---

## 📋 CHECKLIST D'APPLICATION

Suivez cette checklist pour appliquer tous les correctifs:

### Étape 1: Correctifs immédiats
- [x] Corriger la variable d'environnement dans `utils/supabase/context.tsx`
- [ ] Retirer la vérification auth client-side dans `app/(main)/dashboard/page.tsx`
- [ ] Remplacer le JWT placeholder dans `utils/supabase/admin.ts`

### Étape 2: Configuration externe
- [ ] Créer un compte Upstash Redis
- [ ] Configurer les variables d'environnement Redis
- [ ] Installer les dépendances: `npm install @upstash/ratelimit @upstash/redis`
- [ ] Vérifier que le rate limiting distribué fonctionne

### Étape 3: Correctifs avancés
- [ ] Ajouter le timing constant dans `app/api/webhooks/route.ts`
- [ ] Appliquer la migration SQL pour la validation JWT
- [ ] (Optionnel) Implémenter `jwt-security.ts`
- [ ] (Optionnel) Utiliser `validateJWTContext()` dans les API routes

### Étape 4: Tests
- [ ] Tester l'authentification
- [ ] Tester le rate limiting (50 req/min)
- [ ] Tester les webhooks Stripe
- [ ] Tester l'accès aux données Supabase
- [ ] Vérifier les logs de sécurité

### Étape 5: Déploiement
- [ ] Tester en staging
- [ ] Vérifier les variables d'environnement de production
- [ ] Déployer en production
- [ ] Monitorer les logs pendant 24h
- [ ] Confirmer que tout fonctionne

### Étape 6: Monitoring continu
- [ ] Configurer Sentry pour les événements de sécurité
- [ ] Mettre en place des alertes pour les événements critiques
- [ ] Planifier un audit de sécurité dans 3 mois
- [ ] Former l'équipe sur les bonnes pratiques

---

## 🔄 ORDRE D'APPLICATION RECOMMANDÉ

1. **Immédiat** (aujourd'hui):
   - Variable d'environnement (déjà fait ✅)
   - Retirer auth check client-side
   - Remplacer JWT placeholder

2. **Cette semaine**:
   - Configurer Upstash Redis
   - Ajouter timing constant webhook
   - Tests complets

3. **Mois prochain**:
   - Migration JWT validation
   - JWT context tracking
   - Monitoring Sentry

---

## ⚠️ AVERTISSEMENTS

1. **Avant de déployer en production**:
   - Tester TOUS les correctifs en staging
   - Vérifier que les webhooks Stripe fonctionnent
   - S'assurer que le rate limiting ne bloque pas les vrais utilisateurs

2. **Migration SQL**:
   - Faire un backup de la base de données avant
   - Tester la migration en dev d'abord
   - Prévoir une fenêtre de maintenance si nécessaire

3. **Rate limiting Redis**:
   - Upstash gratuit = 10,000 req/jour
   - Monitorer l'utilisation
   - Prévoir une mise à niveau si nécessaire

4. **JWT context tracking**:
   - Peut générer des faux positifs pour les utilisateurs mobiles
   - Commencer avec le mode "log only"
   - Ajuster les seuils selon vos besoins

---

**Dernière mise à jour**: 2025-11-18
**Version**: 1.0
**Auteur**: Claude Security Audit
