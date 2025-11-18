# Rapport d'Audit de Sécurité - Train-IA SaaS Platform
**Date**: 18 Novembre 2025
**Auditeur**: Claude AI Security Review
**Application**: Train-IA SaaS Starter Platform

---

## Résumé Exécutif

Cette revue de sécurité a identifié **plusieurs vulnérabilités critiques** et des opportunités d'amélioration de la sécurité. L'application utilise des technologies modernes (Next.js, Clerk, Supabase, Stripe) mais présente des failles de sécurité importantes qui doivent être corrigées avant le déploiement en production.

### Évaluation Globale de Sécurité: ⚠️ **ATTENTION REQUISE** (6/10)

---

## 1. Vulnérabilités Critiques 🔴

### 1.1 Dépendances avec Vulnérabilités de Sécurité ⚠️ CRITIQUE

**Localisation**: `package.json`
**Gravité**: CRITIQUE/HIGH

L'analyse npm audit révèle **10 vulnérabilités de sécurité**, dont:

#### Vulnérabilités Critiques:
- **form-data (4.0.0-4.0.3)**: Utilise une fonction aléatoire non sécurisée pour choisir les limites (GHSA-fjxv-7rqg-78g4)

#### Vulnérabilités High (Haute Gravité):
- **@clerk/nextjs (>=6.2.10 <6.23.3)**: Vérification insuffisante de l'authenticité des données (GHSA-9mp4-77wg-rwx9)
- **@supabase/auth-js (<2.69.1)**: Routage de chemin non sécurisé à partir d'entrée utilisateur malformée (GHSA-8r88-6cj9-9fh5)
- **@supabase/supabase-js (2.41.1-2.49.2)**: Dépend de la version vulnérable de @supabase/auth-js
- **glob (10.3.7-11.0.3)**: Injection de commande via CLI (GHSA-5j98-mcp5-4vw2)
- **brace-expansion (2.0.0-2.0.1)**: ReDoS (Déni de service par expression régulière)

#### Vulnérabilités Modérées:
- **Next.js (0.9.9-14.2.31)**:
  - Exposition d'informations dans le serveur dev
  - Confusion de clé de cache pour les routes API d'optimisation d'image
  - Gestion incorrecte de redirection middleware menant à SSRF
  - Vulnérabilité d'injection de contenu

**Recommandation**:
```bash
npm audit fix
npm update @clerk/nextjs @supabase/supabase-js next
```

---

### 1.2 Politiques de Sécurité de Base de Données Dangereuses ⚠️ CRITIQUE

**Localisation**: `supabase/migrations/20250125124435_init.sql`
**Gravité**: CRITIQUE

#### Problèmes identifiés:

1. **Table `customers` SANS politique RLS**:
   - RLS activé (ligne 19) mais AUCUNE politique définie
   - Les utilisateurs ne peuvent ni lire ni écrire leurs propres données clients
   - Seul le service_role peut accéder à ces données
   - **Impact**: Les utilisateurs ne peuvent pas accéder à leurs informations de paiement

2. **Permissions excessivement permissives pour le rôle 'anon'**:
   ```sql
   grant delete on table "public"."customers" to "anon";
   grant insert on table "public"."customers" to "anon";
   grant truncate on table "public"."customers" to "anon";
   grant update on table "public"."customers" to "anon";
   ```
   - Le rôle anonyme peut DELETE, TRUNCATE et modifier toutes les tables
   - **Impact**: Risque de perte de données massive si exploité

3. **Table `subscriptions` accessible uniquement en lecture**:
   - Policy: `requesting_user_id() = user_id` (ligne 360)
   - Pas de policy pour INSERT/UPDATE/DELETE
   - Les utilisateurs ne peuvent pas modifier leurs abonnements via l'application

**Recommandation**: Ajouter des politiques RLS appropriées:
```sql
-- Pour la table customers
create policy "Users can view own customer data"
on "public"."customers"
for select
to authenticated
using (requesting_user_id() = id);

create policy "Users can update own customer data"
on "public"."customers"
for update
to authenticated
using (requesting_user_id() = id);

-- Révoquer les permissions dangereuses du rôle anon
revoke delete, truncate on table "public"."customers" from "anon";
revoke delete, truncate on table "public"."prices" from "anon";
revoke delete, truncate on table "public"."products" from "anon";
revoke delete, truncate on table "public"."subscriptions" from "anon";
```

---

### 1.3 Variables d'Environnement Manquantes dans la Documentation ⚠️ MEDIUM

**Localisation**: `.env.example`
**Gravité**: MEDIUM

Variables manquantes mais utilisées dans le code:
- `SUPABASE_SERVICE_ROLE_KEY` (utilisé dans `utils/supabase/admin.ts:10,27`)
- `STRIPE_WEBHOOK_SECRET` (utilisé dans `app/api/webhooks/route.ts:27`)
- `STRIPE_SECRET_KEY_LIVE` (utilisé dans `utils/stripe/config.ts:4`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE` (utilisé dans `utils/stripe/client.ts:8`)

**Impact**: Les développeurs peuvent ne pas savoir quelles variables d'environnement configurer, conduisant à des configurations incomplètes.

**Recommandation**: Mettre à jour `.env.example`:
```env
# Supabase Service Role (KEEP SECRET - Server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Webhooks
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Stripe Live Keys (Production)
STRIPE_SECRET_KEY_LIVE=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_xxxxx
```

---

## 2. Vulnérabilités Hautes 🟠

### 2.1 Absence d'En-têtes de Sécurité HTTP ⚠️ HIGH

**Localisation**: `next.config.mjs`
**Gravité**: HIGH

Le fichier de configuration Next.js est vide et ne définit aucun en-tête de sécurité.

**En-têtes manquants**:
- `Content-Security-Policy` (CSP) - Protection contre XSS
- `X-Frame-Options` - Protection contre Clickjacking
- `X-Content-Type-Options` - Protection contre MIME sniffing
- `Referrer-Policy` - Contrôle des informations de référence
- `Permissions-Policy` - Contrôle des API du navigateur
- `Strict-Transport-Security` (HSTS) - Force HTTPS

**Recommandation**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.*.com https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://api.openai.com https://clerk.*.com https://api.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

---

### 2.2 Absence de Rate Limiting ⚠️ HIGH

**Localisation**: `app/api/webhooks/route.ts`, routes d'API
**Gravité**: HIGH

Aucune limite de taux n'est implémentée sur les endpoints API.

**Impact**:
- Vulnérabilité aux attaques par force brute
- Vulnérabilité aux attaques DDoS
- Abus potentiel de l'API OpenAI (coûts élevés)
- Spam de webhooks

**Recommandation**: Implémenter un rate limiting avec `@upstash/ratelimit` ou similaire:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too Many Requests", { status: 429 });
  }

  // ... reste du code
}
```

---

### 2.3 Gestion d'Erreurs Verbose ⚠️ MEDIUM

**Localisation**: Multiples fichiers
**Gravité**: MEDIUM

Les messages d'erreur exposent potentiellement des informations sensibles:

- `app/api/webhooks/route.ts:37`: `Webhook Error: ${err.message}`
- `utils/stripe/server.ts`: Plusieurs console.error avec des détails complets

**Recommandation**:
- Logger les erreurs détaillées côté serveur
- Retourner des messages génériques aux clients
- Utiliser un service de logging comme Sentry

---

## 3. Vulnérabilités Moyennes 🟡

### 3.1 Absence de Protection CSRF ⚠️ MEDIUM

**Gravité**: MEDIUM

Next.js n'implémente pas de protection CSRF par défaut pour les routes API.

**Recommandation**:
- Utiliser les Server Actions de Next.js qui ont une protection CSRF intégrée
- Ou implémenter des tokens CSRF pour les routes API traditionnelles

---

### 3.2 Utilisation de `dangerouslySetInnerHTML` ✅ ACCEPTABLE

**Localisation**: `components/ui/chart.tsx:81`
**Gravité**: LOW (Acceptable)

L'utilisation est **SÉCURISÉE** car:
- Utilisé uniquement pour injecter des variables CSS contrôlées
- Les données proviennent de la configuration du composant, pas de l'utilisateur
- Aucun risque XSS identifié

---

### 3.3 Middleware - Exclusion des Webhooks ⚠️ MEDIUM

**Localisation**: `middleware.ts:19`
**Gravité**: MEDIUM

Le pattern d'exclusion `api/webhooks` dans le matcher du middleware:
```typescript
"/((?!_next|[^?]*\\.(?:html?|css|...|api/webhooks).*)"
```

**Analyse**: C'est **correct** car les webhooks Stripe nécessitent:
- L'accès non authentifié (Stripe signe les requêtes)
- La vérification de signature dans le handler du webhook

**Recommandation**: Ajouter un commentaire expliquant pourquoi:
```typescript
// Exclude webhooks from auth middleware as they use signature verification
```

---

## 4. Points Positifs ✅

### 4.1 Authentification Robuste
- ✅ Clerk correctement implémenté
- ✅ Protection des routes via middleware
- ✅ Vérification de `userId` avant autorisation

### 4.2 Webhooks Stripe Sécurisés
- ✅ Vérification de signature Stripe (`stripe.webhooks.constructEvent`)
- ✅ Validation du secret webhook
- ✅ Gestion appropriée des événements

### 4.3 Intégration Supabase
- ✅ Utilisation de tokens JWT Clerk pour Supabase
- ✅ Service role key utilisé uniquement côté serveur
- ✅ Row Level Security activé sur toutes les tables

### 4.4 Stripe Checkout Sécurisé
- ✅ Sessions créées côté serveur uniquement
- ✅ Validation des utilisateurs avant création de session
- ✅ Metadata de référence correctement gérée

### 4.5 Variables d'Environnement
- ✅ Séparation claire entre variables publiques (`NEXT_PUBLIC_*`) et privées
- ✅ Pas de secrets hardcodés dans le code

### 4.6 Pas de Vulnérabilités Évidentes
- ✅ Aucune utilisation d'`eval()`
- ✅ Aucune injection SQL (utilisation de Supabase ORM)
- ✅ Pas d'exposition directe de `innerHTML`/`outerHTML`

---

## 5. Recommandations Générales

### 5.1 Priorité IMMÉDIATE (Avant Production)
1. ⚠️ Mettre à jour toutes les dépendances vulnérables (`npm audit fix`)
2. ⚠️ Corriger les politiques RLS Supabase (customers table)
3. ⚠️ Révoquer les permissions excessives du rôle 'anon'
4. ⚠️ Ajouter les en-têtes de sécurité HTTP

### 5.2 Priorité HAUTE (Avant Lancement)
5. 🟠 Implémenter le rate limiting sur toutes les routes API
6. 🟠 Améliorer la gestion des erreurs (ne pas exposer les détails)
7. 🟠 Documenter toutes les variables d'environnement dans `.env.example`
8. 🟠 Ajouter la protection CSRF

### 5.3 Priorité MOYENNE (Post-Lancement)
9. 🟡 Implémenter un système de logging centralisé (Sentry, LogRocket)
10. 🟡 Ajouter des tests de sécurité automatisés
11. 🟡 Implémenter une politique de rotation des secrets
12. 🟡 Mettre en place une surveillance des vulnérabilités (Dependabot, Snyk)

### 5.4 Meilleures Pratiques
- 📝 Documenter les décisions de sécurité dans le code
- 🔒 Mettre en place un processus de revue de sécurité avant chaque déploiement
- 🔄 Effectuer des audits de sécurité réguliers (trimestriels)
- 📊 Surveiller les logs pour détecter les comportements suspects
- 🚨 Configurer des alertes pour les échecs d'authentification multiples

---

## 6. Checklist de Sécurité pour Production

### Infrastructure
- [ ] Toutes les dépendances sont à jour
- [ ] Les en-têtes de sécurité HTTP sont configurés
- [ ] HTTPS est forcé (HSTS activé)
- [ ] Rate limiting est implémenté
- [ ] CDN/WAF est configuré (Cloudflare, AWS WAF)

### Base de Données
- [ ] RLS policies correctement définies pour toutes les tables
- [ ] Permissions minimales pour le rôle 'anon'
- [ ] Backups automatiques activés
- [ ] Encryption at rest activée

### Authentification & Autorisation
- [ ] Clerk configuré pour production
- [ ] MFA disponible pour les utilisateurs
- [ ] Politiques de mot de passe robustes
- [ ] Sessions expirantes configurées

### API & Webhooks
- [ ] Tous les webhooks utilisent la vérification de signature
- [ ] Rate limiting sur tous les endpoints
- [ ] Validation des entrées sur toutes les routes
- [ ] CORS correctement configuré

### Monitoring & Logging
- [ ] Service de logging centralisé configuré
- [ ] Alertes configurées pour les erreurs critiques
- [ ] Monitoring des métriques de sécurité
- [ ] Plan de réponse aux incidents documenté

### Variables d'Environnement
- [ ] Toutes les clés secrètes sont en production
- [ ] Pas de secrets de test en production
- [ ] Rotation régulière des clés
- [ ] Secrets stockés dans un gestionnaire sécurisé (Vercel, AWS Secrets Manager)

---

## 7. Ressources Supplémentaires

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/pages/building-your-application/configuring/security)
- [Clerk Security Documentation](https://clerk.com/docs/security)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Stripe Webhook Security](https://stripe.com/docs/webhooks/best-practices)

---

## Contact

Pour toute question concernant ce rapport d'audit, veuillez contacter l'équipe de sécurité.

**Fin du Rapport**
