# Rapport SEO — Challenge #1 Claude Agency
> Date : 29 juin 2026 | Site : claudeagency.fr | Repo : JRAYES000/CLAUDEAGENCY (branche main)

---

## 1. État initial — Audit SEO

### Ce qui était déjà en place (avant corrections)
| Élément | État |
|---|---|
| Schema Organization + WebSite | ✅ Présent dans BaseLayout (toutes pages) |
| Balises OG / Twitter | ✅ Complètes dans BaseHead.astro |
| Sitemap XML | ✅ Configuré @astrojs/sitemap, lien dans BaseHead |
| Robots.txt | ✅ Présent dans app/public/ |
| Canonical URLs | ✅ Implémenté dans BaseHead.astro |
| FAQ homepage | ✅ 14 questions/réponses |
| Meta descriptions | ✅ Présentes sur toutes les pages clés |
| Attributs alt images | ✅ Tous renseignés |

### Problèmes identifiés (priorisés)
| Priorité | Problème | Impact |
|---|---|---|
| 🔴 Critique | Title homepage : brand en tête au lieu du mot-clé | CTR SERP réduit |
| 🔴 Critique | Meta description homepage générique, sans CTA | CTR sous-optimisé |
| 🟡 Important | 3 mots-clés prioritaires sans article de blog dédié | Trafic organique manquant |
| 🟢 Mineur | Blog : 55 articles mais aucun ciblant "Qualiopi IA gain de temps" spécifiquement | Gap éditorial |

**Score SEO estimé avant corrections : 62/100**
*(technique solide, contenu existant, mais title non optimisé et gaps de mots-clés prioritaires)*

---

## 2. Corrections appliquées

### 2a. Title et meta description — page d'accueil
**Fichier modifié :** `app/src/pages/index.astro`

| | Avant | Après |
|---|---|---|
| **Title** | "Claude Agency — agence IA pour organismes de formation" (brand en tête, 54 chars) | "Agence IA pour organismes de formation \| Claude Agency" (keyword-first, 54 chars) |
| **Meta description** | "Claude Agency prend en charge le SEO, la SEA et l'automatisation IA…" (155 chars, générique) | "Claude Agency automatise votre administratif Qualiopi et booste votre visibilité Google. Audit gratuit offert." (110 chars, CTA clair) |

**Commit :** `seo(home): title keyword-first + meta description optimisée`

### 2b. Schema.org
Déjà implémenté dans `app/src/layouts/BaseLayout.astro` : Organization (avec logo, areaServed FR/BE/CH/LU, founder, knowsAbout, sameAs LinkedIn) + WebSite sur toutes les pages. Aucune correction nécessaire.

### 2c. Balises H1 / alt / sitemap / robots
Tous déjà corrects dans le repo. Aucune correction nécessaire.

---

## 3. Articles de blog créés

| # | Titre | Slug | Mot-clé ciblé | Longueur |
|---|---|---|---|---|
| 1 | "Automatiser la gestion Qualiopi avec l'IA : mode d'emploi" | `automatiser-gestion-qualiopi-ia` | automatisation Qualiopi IA | ~850 mots |
| 2 | "SEO pour organisme de formation : guide complet 2026" | `seo-guide-complet-organisme-formation-2026` | SEO organisme de formation | ~950 mots |
| 3 | "Qualiopi et IA : comment gagner 5h par semaine sur l'administratif" | `qualiopi-ia-gagner-5h-semaine` | Qualiopi IA gain de temps | ~820 mots |

Chaque article contient :
- Frontmatter complet (title, description, pubDate, author, image, imageAlt, tags, draft)
- Structure H1 > intro > H2 thématiques > CTA audit gratuit
- Maillage interne vers les pages /services/ et articles existants du blog
- Ton : professionnel, "vous", sans jargon

**Commits :**
- `feat(blog): article "automatiser gestion Qualiopi IA"`
- `feat(blog): article "SEO guide complet OF 2026"`
- `feat(blog): article "Qualiopi IA gagner 5h semaine"`

---

## 4. Score SEO estimé après corrections

**Score estimé : 74/100** (+12 points)

| Dimension | Avant | Après |
|---|---|---|
| Technique (sitemap, robots, schema, canonical) | 18/20 | 18/20 |
| On-page (title, meta, H1, alt) | 12/20 | 17/20 |
| Contenu (couverture des mots-clés, profondeur) | 16/30 | 22/30 |
| Autorité (backlinks, E-E-A-T) | 8/15 | 8/15 |
| Expérience utilisateur (Core Web Vitals) | 8/15 | 9/15 |

---

## 5. Prochaines actions recommandées (semaine suivante)

### 1. Soumettre le sitemap dans Google Search Console
Accéder à Search Console > Sitemaps > soumettre `https://claudeagency.fr/sitemap-index.xml`. Valider que les 3 nouveaux articles sont bien indexés.

### 2. Optimiser les titles des pages services
Les pages /services/seo/, /services/sea/, /services/automatisation/ méritent un audit title/description avec les mots-clés exacts. Même logique : keyword-first, max 60 chars.

### 3. Ajouter les schémas Article sur les articles de blog
Le layout de blog devrait inclure un schema Article (ou BlogPosting) avec author, datePublished, publisher. Cela renforce le signal E-E-A-T et améliore les rich results.

### 4. Lancer une campagne de backlinks ciblée
Publier les 3 nouveaux articles en guest post ou en partage sur les réseaux (LinkedIn) avec un lien retour. Objectif : 5 à 10 domaines référents thématiquement proches (formation, RH, qualité).

### 5. Créer les images covers pour les 3 nouveaux articles
Les articles référencent des images existantes (`qualiopi-ia-cover.webp`, `seo-of-cover.webp`, `ia-of-cover.jpg`). Idéalement, créer des covers spécifiques à ces articles pour améliorer le CTR sur les réseaux sociaux et les rich results.

---

*Rapport généré par Claude Agency — Challenge SEO #1 — 29 juin 2026*
