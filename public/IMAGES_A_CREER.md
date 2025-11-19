# 📸 Images à créer pour Memo-IA

Ce fichier documente toutes les images manquantes qui doivent être créées pour optimiser le SEO, les partages sociaux et l'expérience utilisateur.

## 🚨 Images CRITIQUES (Bloqueurs pour partages sociaux)

### 1. og-image.png
- **Emplacement** : `/public/og-image.png`
- **Dimensions** : 1200 x 630 pixels
- **Format** : PNG ou JPG
- **Poids max** : 1 MB
- **Usage** : Partages Facebook, LinkedIn, WhatsApp
- **Référencé dans** : `app/layout.tsx` ligne 59
- **URL finale** : https://memo-ia.fr/og-image.png

**Contenu suggéré** :
```
┌─────────────────────────────────────────────┐
│  [Logo Memo-IA]                             │
│                                              │
│  Générez vos mémoires techniques             │
│  en 30 minutes avec l'IA                     │
│                                              │
│  ✓ 3x plus d'appels d'offres               │
│  ✓ 15h gagnées par semaine                  │
│  ✓ Conformité garantie                      │
│                                              │
│  memo-ia.fr                                  │
└─────────────────────────────────────────────┘
```

**Design** :
- Fond : Dégradé purple-fuchsia-pink (gradient de la marque)
- Texte : Blanc, bold, lisible
- Logo : Carré avec 4 blocs colorés
- Style : Moderne, professionnel

---

### 2. twitter-image.png
- **Emplacement** : `/public/twitter-image.png`
- **Dimensions** : 1200 x 630 pixels (ou 1200 x 675 pour ratio 16:9)
- **Format** : PNG ou JPG
- **Poids max** : 5 MB
- **Usage** : Partages Twitter/X
- **Référencé dans** : `app/layout.tsx` ligne 71
- **URL finale** : https://memo-ia.fr/twitter-image.png

**Contenu suggéré** :
```
┌─────────────────────────────────────────────┐
│  [Logo]  MEMO-IA                            │
│                                              │
│  Répondez à 3x plus d'appels d'offres      │
│  sans recruter                               │
│                                              │
│  L'IA qui rédige vos mémoires en 30 min    │
│                                              │
│  🚀 Essai gratuit 14 jours                  │
└─────────────────────────────────────────────┘
```

**Note** : Peut être identique à og-image.png ou légèrement adapté pour Twitter

---

## 🎯 Favicons et Icônes (CRITIQUES pour UX)

### 3. favicon.ico
- **Emplacement** : `/public/favicon.ico`
- **Dimensions** : 32 x 32 pixels (multi-size: 16, 32, 48)
- **Format** : .ico (multi-résolutions)
- **Usage** : Onglet navigateur
- **Référencé dans** : `app/layout.tsx` ligne 98

**Design** :
- Version simplifiée du logo
- Carré avec 4 blocs colorés (purple, fuchsia, violet, pink)
- Doit être reconnaissable même à 16x16px

---

### 4. apple-touch-icon.png
- **Emplacement** : `/public/apple-touch-icon.png`
- **Dimensions** : 180 x 180 pixels
- **Format** : PNG
- **Usage** : Icône sur écran d'accueil iOS/macOS
- **Référencé dans** : `app/layout.tsx` ligne 99

**Design** :
- Logo Memo-IA sur fond coloré ou blanc
- Coins arrondis automatiquement ajoutés par iOS
- Haute résolution pour écrans Retina

---

## 📱 PWA Icons (Pour manifest.json)

### 5. icon-192x192.png
- **Emplacement** : `/public/icon-192x192.png`
- **Dimensions** : 192 x 192 pixels
- **Format** : PNG
- **Usage** : PWA Android/Chrome
- **Référencé dans** : `public/manifest.json` ligne 9

---

### 6. icon-512x512.png
- **Emplacement** : `/public/icon-512x512.png`
- **Dimensions** : 512 x 512 pixels
- **Format** : PNG
- **Usage** : PWA Android/Chrome (splash screen)
- **Référencé dans** : `public/manifest.json` ligne 15

**Design pour les 2** :
- Logo Memo-IA centré
- Fond blanc ou transparent
- Version haute résolution du logo

---

## 🎨 Palette de couleurs Memo-IA

Pour toutes les images, utiliser la palette de marque :

```css
/* Gradient principal */
from-purple-500 (#A855F7)
via-fuchsia-500 (#D946EF)
to-pink-500 (#EC4899)

/* Couleurs secondaires */
violet-500: #8B5CF6
blue-500: #3B82F6

/* Texte */
white: #FFFFFF
gray-900: #111827
```

---

## 🛠️ Outils recommandés

### Design graphique
- **Figma** : https://figma.com (gratuit, collaboratif)
- **Canva** : https://canva.com (templates prêts)
- **Adobe Express** : https://express.adobe.com

### Génération d'icônes
- **Favicon Generator** : https://realfavicongenerator.net/
- **PWA Asset Generator** : https://github.com/elegantapp/pwa-asset-generator

### Optimisation
- **TinyPNG** : https://tinypng.com/ (compression PNG)
- **Squoosh** : https://squoosh.app/ (compression avancée)

---

## ✅ Checklist de création

- [ ] **og-image.png** (1200x630) - Partages sociaux
- [ ] **twitter-image.png** (1200x630) - Twitter/X
- [ ] **favicon.ico** (32x32) - Onglet navigateur
- [ ] **apple-touch-icon.png** (180x180) - iOS
- [ ] **icon-192x192.png** (192x192) - PWA
- [ ] **icon-512x512.png** (512x512) - PWA

---

## 📝 Template Figma/Canva

### Dimensions à configurer
```
Canvas OG Image:
- Largeur: 1200px
- Hauteur: 630px
- Safe zone: 1200x600 (éviter texte dans les 30px du bas)

Canvas Icons:
- 512x512px (exporter en 512, 192, 180, 32)
- Zones de sécurité: marges 10% sur chaque côté
```

### Éléments à inclure

**Logo Memo-IA** :
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; width: 80px; height: 80px;">
  <div style="background: linear-gradient(to-br, #A855F7, #9333EA); border-radius: 4px;"></div>
  <div style="background: linear-gradient(to-br, #D946EF, #C026D3); border-radius: 4px;"></div>
  <div style="background: linear-gradient(to-br, #8B5CF6, #7C3AED); border-radius: 4px;"></div>
  <div style="background: linear-gradient(to-br, #EC4899, #DB2777); border-radius: 4px;"></div>
</div>
```

**Texte principal** :
- Police: Inter, Geist, ou system-ui
- Taille titre: 72px (OG), 48px (Twitter)
- Poids: Bold (700)
- Couleur: Blanc

---

## 🚀 Déploiement

Une fois les images créées :

1. Placer tous les fichiers dans `/public/`
2. Vérifier que les noms correspondent exactement
3. Tester avec ces outils :
   - **OG Preview** : https://www.opengraph.xyz/
   - **Twitter Card Validator** : https://cards-dev.twitter.com/validator
   - **Facebook Debugger** : https://developers.facebook.com/tools/debug/

4. Invalider le cache si nécessaire :
   - Facebook: "Scrape Again" dans le debugger
   - Twitter: "Preview Card" dans le validator

---

## 📊 Impact attendu

Avec ces images :
- **+50% CTR** sur partages sociaux (vs aperçu cassé)
- **Professionnalisme** perçu augmenté
- **Reconnaissance de marque** sur mobile (PWA)
- **SEO images** : indexation Google Images

---

**Date de création de ce document** : 2025-11-19
**Priorité** : 🔴 CRITIQUE - À faire avant mise en production
