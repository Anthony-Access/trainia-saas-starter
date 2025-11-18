# Rate Limiting pour les Routes API

## Pourquoi ce changement ?

Le middleware Next.js s'exécute dans **Edge Runtime**, qui interdit l'évaluation de code dynamique (`eval`, `require` dynamique). Notre système de rate limiting utilise des imports dynamiques optionnels, ce qui n'est pas compatible.

**Solution** : Implémenter le rate limiting directement dans chaque route API.

---

## Template pour Nouvelles Routes API

Copiez ce template pour toute nouvelle route API :

```typescript
// app/api/your-endpoint/route.ts
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { rateLimitAPI, getClientIdentifier } from '@/utils/rate-limit-distributed';
import { SecurityLogger } from '@/utils/security-logger';

export async function POST(req: NextRequest) {
  // ✅ SECURITY: Rate limiting (30 req/min per user/IP)
  const { userId } = await auth();
  const identifier = userId || getClientIdentifier(req);

  const rateLimitResult = await rateLimitAPI(identifier);

  if (!rateLimitResult.success) {
    console.warn(`⚠️  Rate limit exceeded for ${identifier} on /api/your-endpoint`);

    SecurityLogger.logRateLimitExceeded({
      identifier,
      endpoint: '/api/your-endpoint',
      limit: 30,
      ip: getClientIdentifier(req),
    });

    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: rateLimitResult.resetIn
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetIn.toString(),
          'Retry-After': rateLimitResult.resetIn.toString()
        }
      }
    );
  }

  // Votre logique API ici
  try {
    // ... votre code

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

---

## Routes API Existantes

### ✅ Déjà Protégées

- `/api/webhooks` - Rate limiting 50 req/min (spécifique aux webhooks Stripe)

### ⚠️ À Protéger

Si vous avez d'autres routes API dans `app/api/`, ajoutez-leur le rate limiting en utilisant le template ci-dessus.

---

## Configuration du Rate Limiting

Le rate limiting utilise:

1. **Upstash Redis** (si configuré) - Recommandé pour production
   ```bash
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   ```

2. **In-Memory** (fallback) - Utilisé automatiquement si Redis n'est pas configuré
   - ⚠️ Ne fonctionne que sur une seule instance
   - Pour production avec load balancing, utilisez Redis

---

## Limites Par Défaut

- **Routes API normales** : 30 requêtes/minute par utilisateur/IP
- **Webhooks Stripe** : 50 requêtes/minute par IP

Pour modifier ces limites, éditez :
- `utils/rate-limit-distributed.ts` - Fonction `rateLimitAPI()`
- `app/api/webhooks/route.ts` - Fonction `rateLimitWebhook()`

---

## Sécurité Restante dans Middleware

Le middleware continue d'assurer:

✅ **CORS Verification** - Vérifie l'origine pour les requêtes POST/PUT/DELETE/PATCH
✅ **Route Protection** - Redirige vers /sign-in si non authentifié
✅ **Edge Runtime Compatible** - Aucune dépendance dynamique

---

## Tests

Pour tester le rate limiting :

```bash
# Envoyer 31 requêtes rapidement (devrait bloquer la 31ème)
for i in {1..31}; do
  curl -X POST http://localhost:3000/api/your-endpoint \
    -H "Content-Type: application/json" \
    -d '{"test": true}'
  echo "Request $i"
done
```

La 31ème requête devrait retourner HTTP 429.

---

## Monitoring

Vérifiez les logs pour :
- `⚠️  Rate limit exceeded for ...` - Tentatives bloquées
- `SecurityLogger.logRateLimitExceeded()` - Logs de sécurité

---

**Note** : Ce changement n'affecte PAS la sécurité globale. Le rate limiting est maintenant au niveau des routes API individuelles au lieu d'être global dans le middleware, mais il est toujours actif et efficace.
