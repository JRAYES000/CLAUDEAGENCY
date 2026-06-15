# Playbook Netlinking + Indexation — Claude Partners

> Plan d'action pour la phase « autorité + indexation » (suite de `SEO-STRATEGY.md`).
> Établi le 2026-06-15 après audit : ~12 articles publiés mais **aucun indexé** (GSC : pilier
> « inconnu de Google »). Sur un domaine neuf **sans backlinks**, Google crawle lentement →
> le goulot n'est plus le contenu, c'est **l'indexation + l'autorité**.

---

## Étape 0 — Forcer l'indexation (à faire MAINTENANT, ~15 min, action manuelle Julien)

1. **GSC → Inspection d'URL** → coller l'URL → **« Demander une indexation »**. Faire pour, en priorité :
   - la home `https://claudepartners.fr/`
   - le pilier `/blog/integrer-ia-organisme-formation/`
   - les meilleurs articles : `/blog/convention-de-formation/`, `/blog/programme-de-formation/`, `/blog/automatiser-qualiopi-ia/`, `/blog/logiciel-organisme-formation/`, `/blog/indicateurs-qualiopi/`
2. Quota GSC ≈ 10-15 demandes/jour → étaler sur 2-3 jours pour couvrir tout le cluster + les pages services.
3. Vérifier que le sitemap est en **« Réussite »** (resoumis le 2026-06-15).

> ⚠️ La demande d'indexation **n'est pas automatisable** par API pour des pages classiques → c'est à faire à la main dans l'UI GSC.

---

## Étape 1 — Stratégie d'ancres (sécurité d'abord)

**Donnée réelle** (profil de Digiforma, acteur établi DA40) : ancres **ultra-dominées par la
marque** — « digiforma » sur 43 domaines référents, contre **une seule** ancre exacte
commerciale. Un domaine **neuf** doit être encore plus prudent.

| Type d'ancre | Cible | Exemples |
|---|---|---|
| **Marque / URL nue** | **60-70 %** | « Claude Partners », « claudepartners.fr » |
| **Naturelle / générique** | **15-20 %** | « en savoir plus », « ce cabinet », « leur site » |
| **Semi-optimisée (douce)** | **10-15 %** | « conseil IA pour organismes de formation » |
| **Exacte commerciale** | **< 5 %** | « logiciel organisme de formation », « automatiser Qualiopi » |

**Règle d'or** : les **premiers** backlinks d'un domaine neuf = marque + URL nue. On introduit
les ancres optimisées **progressivement**, jamais en premier.

---

## Étape 2 — Pages cibles (vers où pointer les liens)

- **Priorité 1** : home + pilier `/blog/integrer-ia-organisme-formation/` (autorité globale).
- **Priorité 2** : pages services « money » (`/services/seo/`, `/services/automatisation/`) + meilleurs articles par volume (convention 720, programme 590, logiciel 320).
- **Répartir** : ne pas tout pointer sur la home — distribuer vers pilier + 2-3 articles forts pour les faire crawler et ranker.

---

## Étape 3 — Sources de liens (par priorité et effort)

**Tier 1 — Gratuit / rapide (à faire en premier : ça déclenche le crawl)**
- Page **LinkedIn entreprise** (déjà dans `sameAs`) + posts qui renvoient vers les articles.
- **Google Business Profile** (si un ancrage local est pertinent) + annuaires d'OF gratuits.
- **Écosystème formation** : Centre Inffo, annuaires d'organismes de formation, listes régionales.
- **Tes propres actifs** : lien depuis tes autres sites/profils pertinents (avec mesure : pertinence thématique).

**Tier 2 — Éditorial / relationnel (le plus fort à terme)**
- **Articles invités** sur blogs RH / formation / digital.
- **Interviews, podcasts, tribunes** — angle fort du fondateur : « DCM d'un OF qui a automatisé son back-office (3 M€ de CA) ».
- **Partenariats** avec des éditeurs d'outils complémentaires (non concurrents).

**Tier 3 — Payant (netlinking premium)**
- Plateformes : RocketLinks, Getfluence, Develink, Semjuice…
- **Qualifier CHAQUE spot** avec ta skill `netlinking-ecole-naturo` (scoring DR / trafic /
  thématique / red flags, prix max conseillé).
- ⚠️ Nuance : claudepartners.fr **n'est PAS YMYL** (contrairement à ecole-naturo, santé) → les
  ratios d'ancres peuvent être un peu moins stricts, **mais** domaine neuf = on reste prudent
  (cf. étape 1).

---

## Étape 4 — Registre de suivi (template)

| Date | Domaine source | DR / trafic | Page cible | Ancre | Type d'ancre | Coût | Statut |
|------|----------------|-------------|------------|-------|--------------|------|--------|
|      |                |             |            |       |              |      |        |

Tenir le **ratio d'ancres** à jour (étape 1) à chaque lien acquis.

---

## Rythme conseillé

- **Mois 1** : indexation (GSC) + Tier 1 (profils, écosystème) + 1-2 liens éditoriaux. Objectif : **déclencher le crawl**.
- **Mois 2-3** : 2-4 liens/mois (éditorial + 1-2 premium qualifiés), ancres surtout marque.
- Dès que les pages passent « indexées » et que des **impressions** apparaissent en GSC → cap tenu.

## Mesure
- **GSC** : pages indexées (couverture), premières impressions, requêtes positionnées.
- **Ubersuggest** : domain authority + referring domains — re-checker dans ~1 mois (actuellement `noData`, domaine trop neuf).
