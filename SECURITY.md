# Sécurité de l'Application

**Dernière mise à jour**: 19 Novembre 2025
**Statut Global**: ✅ SÉCURISÉ

Ce document centralise toutes les informations relatives à la sécurité de l'application Train-IA SaaS Starter. Il remplace les précédents rapports d'audit et de pentest.

---

## 1. État Actuel de la Sécurité

Suite à l'audit complet et aux correctifs appliqués le 19 Novembre 2025, l'application est considérée comme sécurisée pour la production.

### ✅ Vulnérabilités Corrigées

| Vulnérabilité | Sévérité | Statut | Description du Correctif |
|---------------|----------|--------|--------------------------|
| **Variable d'env incorrecte** | 🔴 CRITIQUE | ✅ CORRIGÉ | Utilisation exclusive de `NEXT_PUBLIC_SUPABASE_ANON_KEY` côté client. |
| **Auth Race Condition** | 🟠 HAUTE | ✅ CORRIGÉ | Suppression des redirections client-side insécurisées au profit du Middleware Clerk. |
| **Service Role Key Exposure** | 🟡 MOYENNE | ✅ CORRIGÉ | Remplacement des placeholders JWT par des chaînes opaques dans `lib/integrations/supabase/admin.ts`. |
| **Webhook Timing Attack** | 🟡 MOYENNE | ✅ MITIGÉ | Implémentation de `AUTH_TIMING_CONSTANT` et vérification stricte des signatures Stripe. |
| **Rate Limiting Bypass** | 🟡 MOYENNE | ✅ CORRIGÉ | Adoption d'un rate limiting distribué (Redis/Upstash) compatible Edge. |

### ⚠️ Points d'Attention Mineurs

- **CSP (Content Security Policy)**: La directive `style-src 'unsafe-inline'` est actuellement nécessaire pour Tailwind CSS et certains composants UI. C'est un risque faible accepté pour le moment.
- **OpenAI Rate Limiting**: Bien que l'API soit protégée, une implémentation plus fine du rate limiting par utilisateur pour l'IA est recommandée (voir Checklist de Conformité).

---

## 2. Architecture de Sécurité

### Authentification & Autorisation
- **Clerk**: Gère l'authentification utilisateur.
- **Middleware (`middleware.ts`)**: Protège toutes les routes sensibles (`/dashboard`, etc.) et prévient les attaques CSRF sur les requêtes mutantes.
- **Supabase RLS**: La sécurité des données est assurée par les Row Level Security policies. Le client Supabase utilise le token JWT de Clerk pour s'authentifier.

### Protection API
- **Rate Limiting**: Implémenté via `@upstash/ratelimit` (avec fallback en mémoire).
    - Webhooks: 50 req/min
    - API Routes: 30 req/min par user/IP
- **Validation**: Tous les inputs sont validés (Zod) et les webhooks Stripe vérifient la signature cryptographique.

### Gestion des Secrets
- Aucun secret n'est codé en dur.
- Les clés de service (Service Role) ne sont utilisées que côté serveur (`lib/integrations/supabase/admin.ts`).

---

## 3. Ressources et Guides

- **[Guide Rate Limiting](documentation/guides/rate-limiting.md)** : Détails techniques sur l'implémentation du rate limiting pour les nouvelles routes API.
- **[Checklist de Conformité](documentation/security/compliance-checklist.md)** : Liste détaillée des points de contrôle de sécurité et recommandations futures (ex: sécurité OpenAI avancée).

---

## 4. Procédures de Maintenance

1. **Mise à jour des dépendances**: Vérifier régulièrement les alertes de sécurité (npm audit).
2. **Rotation des clés**: En cas de compromission suspectée, effectuer une rotation des clés Stripe, Supabase et Clerk immédiatement.
3. **Logs de Sécurité**: Surveiller les logs pour les erreurs `RateLimitExceeded` ou les échecs de validation de signature Webhook.
