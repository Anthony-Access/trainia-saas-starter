# 🚀 Configuration Netlify pour Train-IA

## Si vous n'avez pas encore les clés API (en développement)

Vous pouvez déployer avec des placeholders pour tester le déploiement. L'application buildra mais certaines fonctionnalités ne marcheront pas:

### Étape 1: Aller dans Netlify

1. Connectez-vous à [Netlify](https://app.netlify.com)
2. Sélectionnez votre site **trainia-saas-starter**
3. Allez dans **Site configuration** → **Environment variables**
4. Cliquez sur **Add a variable**

### Étape 2: Ajouter ces variables (avec les PLACEHOLDERS)

```bash
# Clerk Authentication (PLACEHOLDER - l'auth ne fonctionnera pas)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=REPLACE_WITH_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=REPLACE_WITH_YOUR_CLERK_SECRET_KEY

# Supabase (PLACEHOLDER - la base de données ne fonctionnera pas)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_WITH_YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=REPLACE_WITH_YOUR_SUPABASE_SERVICE_ROLE_KEY

# Stripe (PLACEHOLDER - les paiements ne fonctionneront pas)
STRIPE_SECRET_KEY=REPLACE_WITH_YOUR_STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET

# OpenAI (PLACEHOLDER - l'IA ne fonctionnera pas)
OPENAI_API_KEY=REPLACE_WITH_YOUR_OPENAI_API_KEY

# Application URL (remplacez par votre URL Netlify)
NEXT_PUBLIC_SITE_URL=https://votre-site.netlify.app
```

### Étape 3: Redéployer

1. Allez dans **Deploys**
2. Cliquez sur **Trigger deploy** → **Clear cache and deploy site**
3. ✅ Le site devrait builder avec succès!

---

## Quand vous aurez les vraies clés API

Remplacez les placeholders par les vraies valeurs dans les variables d'environnement Netlify.

### Où obtenir vos clés:

#### 🔐 Clerk (Authentication)
- Créez un compte sur https://clerk.com
- Tableau de bord → API Keys
- Copiez `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` et `CLERK_SECRET_KEY`

#### 🗄️ Supabase (Database)
- Créez un compte sur https://supabase.com
- Créez un nouveau projet
- Settings → API
- Copiez `URL`, `anon public key`, et `service_role key`
- ⚠️ **Important**: Exécutez les migrations SQL avant:
  - `supabase/migrations/20250118000000_fix_security_policies.sql`
  - `supabase/migrations/20250118100000_create_ai_usage.sql`

#### 💳 Stripe (Payments)
- Créez un compte sur https://stripe.com
- Mode Test → API Keys
- Copiez `Secret key` et `Publishable key`
- Webhooks → Add endpoint → Copiez `Signing secret`

#### 🤖 OpenAI (AI)
- Créez un compte sur https://platform.openai.com
- API Keys → Create new secret key
- Copiez la clé

### Une fois les vraies clés ajoutées:

1. Retournez dans Netlify → Environment variables
2. Cliquez sur chaque variable et **Edit**
3. Remplacez par la vraie valeur
4. Sauvegardez
5. Trigger deploy → **Deploy site**

---

## ✅ Vérification

Après déploiement avec les vraies clés:

- [ ] Page d'accueil se charge
- [ ] Sign-in fonctionne (Clerk)
- [ ] Dashboard accessible après connexion
- [ ] Pas d'erreurs dans la console navigateur

---

## 🆘 Problèmes Courants

**Build échoue**: Vérifiez que TOUTES les variables sont définies, même avec placeholders

**Pages blanches**: Vérifiez les variables `NEXT_PUBLIC_*` (elles doivent être publiques)

**Erreurs 500**: Vérifiez les logs Netlify Functions pour voir quelle clé manque

**Auth ne marche pas**: Vérifiez que Clerk a l'URL Netlify dans les domaines autorisés
