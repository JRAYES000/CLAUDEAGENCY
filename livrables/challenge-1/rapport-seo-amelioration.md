# Rapport SEO consolidé — Challenge #1 · Claude Agency
> Mis à jour le 29 juin 2026 | Site : claudeagency.fr | Repo : JRAYES000/CLAUDEAGENCY · branche main
>
> Ce document consolide l'audit du 26 juin, le clustering sémantique, les corrections appliquées le 29 juin et le backlog priorisé.

---

## 1. Score SEO global

| Axe | 26/06 (initial) | 29/06 (après corrections) |
|---|---|---|
| Technique (robots, sitemap, canonical) | 80/100 | 80/100 |
| On-page (title, meta, H1, alt) | 70/100 | 82/100 |
| Schéma / E-E-A-T | 78/100 | 78/100 |
| GEO / visibilité IA | 55/100 | 55/100 |
| Performance (LCP, Core Web Vitals) | 82/100 | 82/100 |
| Maillage interne | 70/100 | 75/100 |
| **Score global** | **72/100** | **76/100** |

---

## 2. Ce qui était déjà en place

| Élément | Détail |
|---|---|
| Schema Organization + WebSite | BaseLayout — toutes les pages. Logo, areaServed FR/BE/CH/LU, founder Julien Rayes, knowsAbout, sameAs LinkedIn |
| Schema Person / BreadcrumbList / Service | Pages dédiées |
| Balises OG + Twitter Cards | BaseHead.astro — complètes |
| Sitemap XML | @astrojs/sitemap, filtré (no-index exclus), lié dans BaseHead |
| Robots.txt | Propre — bots IA autorisés (OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot) |
| Canonical URLs | BaseHead avec trailing slash cohérent Cloudflare |
| Attributs alt | Renseignés sur toutes les images |
| FAQ homepage | 14 Q/R |
| Hero LCP | Préchargé WebP responsive, fetchpriority=high |
| Blog | 55 articles au 26/06 |

---

## 3. Corrections appliquées — 29 juin 2026

### Title + meta description — homepage
Fichier : app/src/pages/index.astro
Commit : seo(home): title keyword-first + meta description optimisée

| | Avant | Après |
|---|---|---|
| Title | "Claude Agency — agence IA pour organismes de formation" (brand en tête) | "Agence IA pour organismes de formation | Claude Agency" (keyword-first) |
| Meta | 155 chars génériques, sans CTA | 110 chars — bénéfice Qualiopi + CTA audit gratuit |

### 3 articles créés

| Titre | Slug | Mot-clé ciblé | Mots |
|---|---|---|---|
| Automatiser la gestion Qualiopi avec l'IA | automatiser-gestion-qualiopi-ia | automatisation Qualiopi IA | ~850 |
| SEO pour organisme de formation : guide complet 2026 | seo-guide-complet-organisme-formation-2026 | SEO organisme de formation | ~950 |
| Qualiopi et IA : comment gagner 5h par semaine | qualiopi-ia-gagner-5h-semaine | Qualiopi IA gain de temps | ~820 |

Chaque article : frontmatter complet, H1 > intro > H2 thématiques > CTA audit, maillage vers /services/ et articles existants.

---

## 4. Clustering sémantique — carte des mots-clés

### Cluster 1 — Acquisition agence IA
Hub : /services/ | Transactionnel

| Mot-clé | Vol./mois | Page cible | Statut |
|---|---|---|---|
| IA pour organisme de formation | 100-300 | /blog/integrer-ia-organisme-formation/ | OK |
| agence IA organisme de formation | 20-50 | /services/ | A renforcer H1 |
| outils IA formateurs | 50-150 | /blog/outils-ia-organisme-formation/ | OK |

### Cluster 2 — SEO niche
Hub : /services/seo/ | Transactionnel B2B

| Mot-clé | Vol./mois | Page cible | Statut |
|---|---|---|---|
| SEO organisme de formation | 50-150 | /blog/seo-organisme-formation/ | OK |
| SEO organisme de formation 2026 | 50-150 | /blog/seo-guide-complet-organisme-formation-2026/ | Cree 29/06 |
| agence SEO organisme de formation | 10-30 | /services/seo/ | A capter en H1 |

### Cluster 3 — Qualiopi & admin
Hub : /services/automatisation/ | Informationnel → transactionnel

| Mot-clé | Vol./mois | Page cible | Statut |
|---|---|---|---|
| automatisation Qualiopi IA | 10-30 | /blog/automatiser-gestion-qualiopi-ia/ | Cree 29/06 |
| Qualiopi IA gain de temps | 10-30 | /blog/qualiopi-ia-gagner-5h-semaine/ | Cree 29/06 |
| automatiser BPF | 10-30 | /blog/automatiser-bpf-organisme-formation/ | OK |

### Cluster 4 — Pédagogie
Hub : /services/formation-ia/ | Informationnel — bien couvert, pas d'action urgente

### Cluster 5 — Conformité légale (top funnel)
Hub : /blog/numero-declaration-activite/

| Mot-clé | Vol./mois | Statut |
|---|---|---|
| numéro de déclaration d'activité | 500-1500 | Pilier trafic OK |
| Qualiopi guide | 200-500 | OK |
| logiciel organisme de formation | 100-300 | OK |

---

## 5. Backlog priorisé — actions restantes

### Critique

**1. Créer app/public/llms.txt**
robots.txt autorise déjà les bots IA. llms.txt absent alors que la stratégie y fait référence.
Format : <= 30 lignes — Liens / Services / Contenus piliers / A propos / Contact.
Effort : 30 min | Impact : citations GEO (ChatGPT, Perplexity, Claude)

**2. Schema Article sur le layout blog**
Le layout blog n'injecte pas de schema Article/BlogPosting (author, datePublished, publisher).
Fichier : app/src/layouts/BlogPostLayout.astro (ou équivalent)
Effort : 20 min | Impact : rich results Google, signal E-E-A-T

### Important

**3. Corriger le title page A propos**
Actuel : "Claude Agency, partenaire IA des OF · Claude Agency" (doublon marque + jargon)
Cible : "Julien Rayes & Claude Agency — agence IA pour OF" (49 chars)
Fichier : app/src/pages/a-propos.astro | Effort : 5 min

**4. Refaire le H1 de /services/seo/**
Cible : "Agence SEO pour organismes de formation" — capte "agence SEO organisme de formation"
Effort : 10 min

**5. Enrichir sameAs auteur**
app/src/data/author.ts — ajouter 2-3 profils (X/Twitter pro, Annuaire Formation, About.me)
Effort : 10 min | Impact : Knowledge Graph

**6. CTA top-funnel sur 4 articles a fort volume**
Ajouter un encart vers /services/automatisation/ dans :
- /blog/numero-declaration-activite/
- /blog/qualiopi-guide-organisme-formation/
- /blog/logiciel-organisme-formation/
- /blog/automatiser-bpf-organisme-formation/
Effort : 20 min | Impact : conversion trafic informationnel

### Mineur

**7. Soumettre sitemap dans Google Search Console**
URL : https://claudeagency.fr/sitemap-index.xml
Valider que les 3 nouveaux articles sont crawlés.

**8. Images OG dédiées par article**
Toutes les pages partagent /og-default.jpg.
Créer des covers specifiques pour les 3 articles du 29/06 — CTR LinkedIn.

**9. sameAs Organization — Qualiopi**
Ajouter France Competences comme sameAs dans BaseLayout pour renforcer la coherence thematique.

---

## 6. Maillage interne — structure hub-and-spoke

Hub commercial : /services/
  /services/seo/ · /services/sea/ · /services/optimisation-site/
  /services/audit-ia/ · /services/automatisation/ · /services/formation-ia/

Hub editorial IA : /blog/integrer-ia-organisme-formation/
  /blog/automatiser-gestion-qualiopi-ia/  [cree 29/06]
  /blog/automatiser-qualiopi-ia/
  /blog/qualiopi-ia-gagner-5h-semaine/    [cree 29/06]
  /blog/outils-ia-organisme-formation/

Hub editorial SEO : /blog/seo-organisme-formation/
  /blog/seo-guide-complet-organisme-formation-2026/ [cree 29/06]

---

*Sources fusionnees : seo-audit-26/06 · keyword-clusters-26/06 · corrections 29/06*
*Rapport consolide — Claude Agency · Challenge SEO #1 · 29 juin 2026*
