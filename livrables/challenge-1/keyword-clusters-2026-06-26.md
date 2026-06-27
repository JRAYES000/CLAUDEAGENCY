# Clustering sémantique de mots-clés — Claude Agency — 26/06/2026

**Méthode :** regroupement par intention de recherche + ciblage hub-and-spoke. Inputs = mots-clés Plan d'action §3 + 4 mots-clés Ahrefs vérifiés + requêtes pivot du brief (« organismes de formation / Qualiopi / IA »).

**Niche :** B2B, organismes de formation francophones certifiés Qualiopi. Volumes globalement faibles (10-200/mois), intention transactionnelle/informationnelle mixte.

## Cluster 1 — Acquisition « agence IA pour OF »

**Hub** : `/services/` (page index)
**Spokes** : `/services/audit-ia/`, `/services/automatisation/`, `/services/formation-ia/`, `/services/outils-ia-sur-mesure/`
**Intention** : transactionnelle (recherche d'un prestataire)

| Mot-clé | Volume estimé/mois | Page cible | Statut |
|---|---|---|---|
| agence IA organisme de formation | 20-50 | `/services/` | À renforcer dans H1/title |
| agence IA pour formation | 30-80 | `/services/` | Existant, mot-clé en H1 home OK |
| consultant IA organisme de formation | 10-30 | `/services/` ou `/a-propos/` | Page À propos pourrait capter |
| agence IA Qualiopi | 10-30 | `/services/automatisation/` | À ajouter dans la FAQ |
| IA pour organisme de formation | 100-300 | `/blog/integrer-ia-organisme-formation/` (pilier) | Bon |
| outils IA pour formateurs | 50-150 | `/blog/outils-ia-organisme-formation/` | Bon |
| ChatGPT pour formateurs | 100-300 | `/blog/chatgpt-formateurs/` | Bon |

**Action prio** : enrichir la FAQ de `/services/automatisation/` avec "agence IA Qualiopi" comme mot-clé long-tail.

## Cluster 2 — SEO B2B niche « SEO organisme de formation »

**Hub** : `/services/seo/`
**Spokes** : `/blog/seo-organisme-formation/`, articles connexes (référencement OF)
**Intention** : transactionnelle (B2B services)

| Mot-clé | Volume estimé/mois | Page cible | Statut |
|---|---|---|---|
| agence SEO organisme de formation | 10-30 | `/services/seo/` | À capter en H1 (action B5-bis) |
| SEO organisme de formation | 50-150 | `/blog/seo-organisme-formation/` | Pilier OK |
| référencement organisme de formation | 20-80 | `/blog/seo-organisme-formation/` | OK |
| consultant SEO formation | 10-40 | `/services/seo/` | À ajouter en sous-section |
| audit SEO organisme de formation | 10-30 | `/services/seo/` ou `/diagnostic/` | À renforcer via la home (audit offert) |

**Action prio** : refaire le H1 de `/services/seo/` en "Agence SEO pour organismes de formation" (cf. audit page services seo).

## Cluster 3 — Qualiopi & administratif

**Hub** : `/services/automatisation/`
**Spokes** : `/blog/qualiopi-guide-organisme-formation/`, `/blog/automatiser-qualiopi-ia/` (à créer), `/blog/automatiser-bpf-organisme-formation/`, `/blog/reduire-charge-administrative-organisme-formation/`
**Intention** : informationnelle → transactionnelle (douleur connue → besoin de solution)

| Mot-clé | Volume estimé/mois | Page cible | Statut |
|---|---|---|---|
| automatisation Qualiopi | 10-30 | `/services/automatisation/` | À capter dans title (action B5-bis) |
| Qualiopi automatisation | 10-30 | `/services/automatisation/` | Inversion mot-clé — accepter |
| outil Qualiopi IA | 10-50 | `/blog/outils-ia-organisme-formation/` | Pivot existant |
| automatiser BPF | 10-30 | `/blog/automatiser-bpf-organisme-formation/` | Pilier OK |
| Qualiopi IA | 30-80 | `/blog/automatiser-qualiopi-ia/` (à créer) | **Article restant à écrire** |
| réduire charge admin formation | 10-30 | `/blog/reduire-charge-administrative-organisme-formation/` | OK |

**Action prio** : finaliser l'article `automatiser-qualiopi-ia.mdx` (mentionné dans Plan d'action §4 B comme « à écrire »).

## Cluster 4 — Pédagogie & contenu

**Hub** : `/services/formation-ia/`
**Spokes** : `/blog/ia-pedagogie-personnalisation/`, `/blog/chatgpt-formateurs/`, articles connexes
**Intention** : informationnelle

| Mot-clé | Volume estimé/mois | Page cible | Statut |
|---|---|---|---|
| IA pédagogie | 100-300 | `/blog/ia-pedagogie-personnalisation/` | Bon |
| personnalisation pédagogique IA | 50-150 | `/blog/ia-pedagogie-personnalisation/` | OK |
| ChatGPT formateur cas d'usage | 50-150 | `/blog/chatgpt-formateurs/` | OK |
| outils IA formateur | 50-150 | `/blog/outils-ia-organisme-formation/` | OK |
| former à l'IA en entreprise | 80-200 | `/services/formation-ia/` | À renforcer |

**Action prio** : pas d'action urgente — cluster déjà bien couvert.

## Cluster 5 — Conformité légale (BPF, RGPD, NDA)

**Hub** : `/blog/numero-declaration-activite/` (top traffic pivot)
**Spokes** : `/blog/qualiopi-guide-organisme-formation/`, `/blog/logiciel-organisme-formation/`
**Intention** : informationnelle (top funnel, recherche de définition)

| Mot-clé | Volume estimé/mois | Page cible | Statut |
|---|---|---|---|
| numéro de déclaration d'activité | 500-1500 | `/blog/numero-declaration-activite/` | Pilier traffic OK |
| Qualiopi guide | 200-500 | `/blog/qualiopi-guide-organisme-formation/` | OK |
| logiciel organisme de formation | 100-300 | `/blog/logiciel-organisme-formation/` | OK |
| BPF organisme formation | 100-300 | `/blog/automatiser-bpf-organisme-formation/` | OK |

**Action prio** : ajouter un encart en bas de chaque article du cluster pointant vers `/services/automatisation/` (CTA monétisation du trafic top funnel).

## Hub-and-spoke recommandé : matrice de liens internes

```
                /services/                          ← hub commercial
                    ├── /services/seo/
                    ├── /services/sea/
                    ├── /services/optimisation-site/
                    ├── /services/audit-ia/
                    ├── /services/automatisation/   ← hub Qualiopi
                    ├── /services/formation-ia/
                    └── /services/outils-ia-sur-mesure/

                /blog/integrer-ia-organisme-formation/   ← hub éditorial IA
                    ├── /blog/chatgpt-formateurs/
                    ├── /blog/outils-ia-organisme-formation/
                    ├── /blog/ia-pedagogie-personnalisation/
                    └── (à venir) /blog/automatiser-qualiopi-ia/
```

## Conclusions actionnables

1. **3 mots-clés cibles à capturer immédiatement (B5-bis)** :
   - `agence SEO organisme de formation` → H1 `/services/seo/`
   - `automatisation Qualiopi` → title + H1 `/services/automatisation/`
   - `Julien Rayes Claude Agency` → title `/a-propos/`

2. **1 article à écrire en priorité (Plan d'action §4 B)** : `automatiser-qualiopi-ia.mdx`.

3. **CTA top funnel** : encart « besoin d'aide ? voir nos prestations » sur les 4 articles à fort volume (numero-declaration-activite, qualiopi-guide, logiciel-of, bpf).
