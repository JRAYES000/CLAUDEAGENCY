# Claude Partners — Site web : document de conception (spec)

> Date : 2026-06-14
> Domaine : claudepartners.fr (Hostinger)
> Statut : validé par Julien, prêt pour le plan d'implémentation

---

## 1. Contexte & objectif

Claude Partners est une entreprise de **prestations de service auprès des organismes de formation (OF)**. Mission : aider les OF à **intégrer les outils d'intelligence artificielle** et à **automatiser leurs process** pour gagner en efficacité.

Le site est un **site vitrine + blog** destiné à présenter l'offre, asseoir la crédibilité et générer des demandes de contact/RDV.

### Critères de succès (priorisés par le client)
1. **SEO** — être correctement référencé (critère n°1).
2. **Simplicité d'usage + intégration Claude** — le site est construit et maintenu **entièrement avec Claude Code** (critère n°2).

---

## 2. Cible & positionnement

- **Cible** : organismes de formation français (dirigeants, responsables pédagogiques/admin), souvent certifiés Qualiopi.
- **Positionnement** : le **partenaire unique** qui prend l'OF par la main, du diagnostic jusqu'aux outils sur mesure — pas un simple formateur ni un dev isolé.
- **Promesse** : faire entrer l'IA dans l'OF pour gagner du temps et de la qualité, sans complexité technique.

---

## 3. Offre (prestations)

Quatre services, chacun avec sa page dédiée :
1. **Audit & diagnostic IA** — analyser les process et identifier les opportunités d'IA/automatisation.
2. **Formation des équipes à l'IA** — former formateurs et staff (ChatGPT, Claude, création de contenus pédagogiques, productivité).
3. **Automatisation des process** — automatisations (Make, n8n, Zapier…) : admin, dossiers Qualiopi, CRM, relances, reporting.
4. **Outils IA sur mesure** — chatbots, assistants, générateurs de supports pédagogiques, correcteurs automatisés.

---

## 4. Stack technique

| Brique | Choix | Justification |
|---|---|---|
| Framework | **Astro** + Tailwind CSS | HTML statique → meilleur SEO technique (Core Web Vitals), terrain idéal pour Claude Code. |
| Contenu blog | **Markdown / MDX** (content collections Astro) | Un fichier = un article ; rédaction directe par Claude Code, versionnée. |
| Hébergement | **Cloudflare Pages** ✅ | Gratuit, CDN mondial, déploiement continu depuis Git. |
| Versionnement | **Git** (repo dédié) | Historique, déploiement continu. |
| Formulaire contact | **Web3Forms** ✅ | Sans back-end, pas de serveur à maintenir. |
| Prise de RDV | **Calendly** embarqué | Déjà utilisé par Julien. |
| Analytics | **Plausible** ✅ | Privacy-friendly → pas de bandeau cookies, conformité RGPD simplifiée. |
| Base de données | ❌ Aucune en v1 | YAGNI : pas d'espace client ni de contenu dynamique. |

**Langue** : français uniquement.

---

## 5. Identité visuelle — Direction « Chaleureux & humain »

Univers proche de Claude/Anthropic, différenciant face à la concurrence « tech froide ».

### Palette
| Rôle | Couleur | Hex |
|---|---|---|
| Fond principal (crème) | Crème | `#F5EFE6` |
| Surface claire | Crème clair | `#FBF7F1` |
| Accent / CTA | Terracotta (clay) | `#CC785C` |
| Texte principal | Encre | `#2B2724` |
| Secondaire / séparateurs | Sable | `#E5D9C7` |
| Texte secondaire | Gris chaud | `#7A6E60` |

### Typographie
- **Titres** : serif éditorial — **Fraunces** (Google Fonts, chaleureux).
- **Corps** : sans-serif lisible — **Inter** (Google Fonts).

### Ton de voix
Expert mais accessible, concret, orienté gain de temps / ROI, rassurant, humain. Pas de jargon inutile.

---

## 6. Plan du site

```
/                       Accueil
/services/audit-ia              Audit & diagnostic IA
/services/formation-ia          Formation des équipes à l'IA
/services/automatisation        Automatisation des process
/services/outils-ia-sur-mesure  Outils IA sur mesure
/a-propos               À propos
/blog                   Index du blog
/blog/<slug>            Article
/contact                Contact / Prendre RDV
/mentions-legales       Mentions légales
/confidentialite        Politique de confidentialité (RGPD)
```

### 6.1 Accueil
Hero (promesse + sous-titre + CTA « Audit offert ») · Le problème (OF débordés, Qualiopi chronophage) · Les 4 services (cards) · Méthode en 3–4 étapes · Pourquoi Claude Partners (réassurance / E-E-A-T) · Emplacement témoignages (placeholder) · FAQ · CTA final.

### 6.2 Pages services (template commun)
Hero spécifique · Problème adressé · Ce qu'on fait concrètement (livrables) · Bénéfices · Process · FAQ spécifique · CTA. Chaque page cible son propre cluster de mots-clés.

### 6.3 À propos
Mission/histoire · Expertise & parcours (E-E-A-T) · Méthode & valeurs · CTA.

### 6.4 Blog
Index : liste d'articles + catégories. Template article : titre, date, auteur, contenu MDX, JSON-LD `Article`, CTA. Organisé en **topic clusters** (IA pour OF, automatisation Qualiopi, productivité formateurs…).

### 6.5 Contact
Formulaire (nom, email, nom de l'OF, message) + Calendly embarqué + coordonnées.

### 6.6 Légal
Mentions légales + politique de confidentialité (RGPD).

---

## 7. Stratégie SEO (critère n°1)

### Technique
- HTML statique (vitesse max), objectif Lighthouse ≥ 95.
- `title` / `meta description` uniques par page, balise canonical, Open Graph + Twitter cards.
- `sitemap.xml` auto (`@astrojs/sitemap`), `robots.txt`.
- Mobile-first, `lang="fr"`, URLs propres.

### Données structurées (JSON-LD)
`Organization`, `Service` (par page service), `Article` (blog), `FAQPage`, `BreadcrumbList`.

### Contenu
- 4 pages services optimisées (1 cluster de mots-clés chacune).
- Blog en topic clusters = principal moteur d'acquisition organique.
- Maillage interne services ↔ articles.

### GEO (référencement sur les IA : ChatGPT, Perplexity, AI Overviews)
Contenu structuré, FAQ, fichier `llms.txt` — cohérent pour une entreprise spécialisée en IA.

---

## 8. Conformité
- Mentions légales + politique de confidentialité conformes RGPD.
- Bandeau cookies seulement si analytics non privacy-friendly (évité si Plausible).

---

## 9. Hors périmètre (v1) — YAGNI
- Supabase / base de données.
- Espace client / authentification / contenus réservés.
- E-commerce, paiement en ligne.
- Multilingue.
- Outils interactifs (démo IA en ligne, dashboard).

## 10. Évolutions futures (v2+)
- Espace ressources/membres (→ Supabase + éventuellement Railway).
- Démo IA interactive.
- Études de cas clients détaillées.

---

## 11. Décisions actées (2026-06-14)
- Hébergement : **Cloudflare Pages** (déploiement continu depuis Git).
- Analytics : **Plausible**.
- Formulaire : **Web3Forms**.
