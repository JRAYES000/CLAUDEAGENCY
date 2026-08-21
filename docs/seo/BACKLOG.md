# Backlog SEO — claudeagency.fr

Prochaines actions, par ordre de priorité. **Lire aussi la section « Écarté »** avant de proposer
quoi que ce soit : une idée qui s'y trouve a déjà été tranchée.

Mise à jour le 2026-08-14 (ménage du dépôt). Priorisation du 2026-08-12 (après-midi) inchangée. Priorisation à partir des données GSC mesurées (14/05→09/08/2026), pas
d'hypothèses. Dernière mesure : 49 clics, 2 797 impressions, position moyenne 33,3.

---

## À faire

### ✅ 0. Cannibalisation — TRAITÉ le 2026-08-14

15 articles fusionnés (blog de 69 à 54), 15 redirections 301, 88 liens internes réécrits, 5 docs
périmés supprimés. Détail et mise en garde : entrée du 2026-08-14 dans `JOURNAL.md`.

- [ ] **Au relevé du 2026-09-11** : vérifier le report des 138 impressions « logiciel bilan
      pédagogique et financier » sur `/blog/remplir-bpf-organisme-formation/`, l'absence de 404
      sur les 15 URL redirigées, et trancher le sort des 5 articles à 0 impression conservés.
- [ ] Ne PAS resupprimer d'articles avant ce relevé. Le blocage reste le netlinking, pas le volume.

### 🔴 1. Netlinking — le seul levier qui débloque le reste

**Constat mesuré :** 0 backlink, 0 domaine référent, autorité de domaine 1/100
(Ubersuggest, 2026-08-12). Le site a 2 797 impressions et une position moyenne de 33,3 : Google
connaît les pages, il ne les juge pas assez fiables pour les remonter.

Publier un 70ᵉ article ne changera pas ça. C'est le point de blocage n°1.

**Plan d'action complet, 13 cibles vérifiées + messages prêts à envoyer :
[`NETLINKING-ACTIONS.md`](./NETLINKING-ACTIONS.md)** (établi le 2026-08-12).

- [ ] **Vague 1** — 6 fiches à créer soi-même, gratuit, ~2 h : Google Business Profile, LinkedIn
      entreprise, PagesJaunes, Annuaire du Conseil, Sortlist, Crunchbase.
- [ ] **Vague 2** — les 2 fédérations qui comptent : Les Acteurs de la Compétence et Hub France IA
      (payantes, cotisation à demander). Messages rédigés, à envoyer.
- [ ] **Vague 3** — Digiformag, contribution éditoriale gratuite. Message rédigé avec 3 sujets.
- [ ] Avant tout achat de lien payant : passer le site donneur aux **7 critères éliminatoires du
      tableau 3 de l'onglet F · Netlinking** du Sheet de suivi, puis classer les candidats retenus
      sur le rapport visites estimées ÷ prix. Voir aussi `NETLINKING.md`.
      *(Corrigé le 15/08/2026 : cette ligne renvoyait à la skill `netlinking-ecole-naturo`, qui
      appartient à un autre projet et se calibre sur un site santé YMYL.)*

**Contrainte d'éligibilité :** Claude Agency n'est pas un OF déclaré → tous les annuaires
alimentés par la liste publique Qualiopi lui sont fermés. Ne pas y perdre de temps.

### ✅ 2. Doublon www / non-www — FAUSSE ALERTE, clos le 2026-08-12

`www.claudeagency.fr` redirige bien en **301** vers l'apex (testé le 12/08). Les URLs `www` vues
dans GSC sont un reliquat d'indexation qui se purge tout seul. Rien à corriger. Conclusion trop
rapide de ma part le matin même — laissée ici pour qu'on ne la reprenne pas.

### ✅ 3. Pages en *striking distance* — FAIT le 2026-08-12

9 `title` + `description` réécrits, alignés sur les requêtes réellement constatées dans GSC.
Détail, positions de départ et arbitrages : entrée du 2026-08-12 dans `JOURNAL.md`.

- [ ] **Relever le résultat le 2026-09-11** : clics, CTR et position des 9 URLs ci-dessous,
      à comparer aux valeurs de départ (14/05→09/08/2026) :
      `/services/seo/` (pos. 3,8, 0 clic) · `/blog/claude-ai-en-francais/` (4,7, 1 clic) ·
      `/blog/convention-de-formation/` (13,8, 0 clic) ·
      `/blog/formation-autofinancee-france-travail/` (14,8, 0 clic) ·
      `/blog/feuille-emargement/` (16,0, 1 clic) ·
      `/blog/seo-organisme-formation/` (16,8, 0 clic) ·
      `/blog/livret-accueil-stagiaire/` (21,0, 4 clics) ·
      `/blog/questionnaire-satisfaction-formation/` (31,0, 1 clic) ·
      `/blog/numero-declaration-activite/` (33,5, 0 clic).
      **Règle déjà arbitrée pour `/services/seo/`** : si toujours 0 clic le 11/09 (position 3,8,
      zéro récolte), remettre l'ancien title « Agence SEO Claude pour organismes de formation »
      — l'effet d'un title se voit 2 à 4 semaines après changement.
- [ ] Pages non traitées faute de données : `/blog/attestation-de-formation/` et
      `/blog/automatiser-relances-stagiaires/` — leurs requêtes sont sous le seuil
      d'anonymisation GSC. Rien à aligner tant qu'on ne sait pas sur quoi elles ressortent.

### ✅ 4. Requêtes « …skills claude seo » — ÉLUCIDÉ le 2026-08-12

Ce ne sont **pas des requêtes humaines** : des concaténations mécaniques
(`formation seo qualiopi` + `skills claude seo`) émises par un agent automatisé. Elles touchent
surtout `/services/seo/` et `/blog/seo-guide-complet-organisme-formation-2026/`. ~140 impressions,
0 clic. **Rien à corriger sur le site.**

**Conséquence pratique, à appliquer systématiquement :** exclure ces requêtes de toute analyse GSC
avec le filtre `query notContains "skills claude seo"`. Sans ce filtre, le CTR de `/services/seo/`
est faussé (536 impressions affichées contre ~100 réelles) et les vraies requêtes sont noyées.

### ✅ 4bis. Mesure des conversions — CORRIGÉ le 2026-08-14 (code), reste 1 geste dans GA4

Les 5 événements du site appelaient `window.plausible(...)` alors que Plausible n'est chargé nulle
part : aucune soumission n'était comptée. Remplacés par `gtag('event', …)` vers GA4. Détail et
vérifications : entrée du 2026-08-14 (soir) dans `JOURNAL.md`.

- [ ] **Dans l'interface GA4** (Admin → Événements) : marquer `contact_submit`,
      `diagnostic_submit`, `lead_magnet_submit`, `calculateur_utilise` et `barometre_reponse`
      comme **événements clés**. Sans ce geste, ils sont enregistrés mais ne comptent pas comme
      conversions dans les rapports.
- [ ] Premier relevé exploitable **une semaine après la mise en production**.
- [ ] Les 14 autres tâches du chantier G (preuve client, page « semaine offerte », notoriété) sont
      dans le même document, au format des onglets du Sheet.

### ✅ 5. Sous-domaine `reporting.claudeagency.fr` indexé — RÉSOLU le 2026-08-19

**Constat mesuré :** 17 impressions, position 9,2. La propriété domaine l'inclut.

**Décision (SOLOHERY, seul) :** `noindex` — la page servie à un visiteur non connecté est un écran
de connexion vers un tableau de bord interne (reporting collaborateurs, clients suivis, tarifs
jour), pas un contenu présentable au public ; aucune page publique n'existe sur ce sous-domaine.

Règle Cloudflare posée par SOLOHERY (Transform Rule, `X-Robots-Tag: noindex, nofollow` sur
`http.host eq "reporting.claudeagency.fr"`), vérifiée en direct :
`curl -sI https://reporting.claudeagency.fr | grep -i x-robots-tag` → `X-Robots-Tag: noindex, nofollow`.
Reste à observer : la désindexation effective côté Google (GSC) prend plusieurs jours/semaines,
rien à revérifier ici avant le prochain audit GSC de routine.

### 🟡 6. Requêtes à fort volume où le site est trop loin

Impressions réelles mais positions hors jeu — à traiter **après** le netlinking, pas avant.

| Requête | Impressions | Position | Page |
| :--- | ---: | ---: | :--- |
| `logiciel organisme de formation` | 121 | 75,1 | `/blog/logiciel-organisme-formation/` |
| `logiciel bilan pédagogique et financier` (2 graphies) | 119 | ~35 | `/blog/automatiser-bpf-organisme-formation/` |
| `claude seo agency` (anglais) | 107 | 57,6 | `/services/seo/` |
| `agence claude code` | 37 | 66,1 | — |

### ✅ 8. Vague longue traîne « documents & démarches obligatoires » — TERMINÉE le 2026-08-19

Suite de `plan-editorial-longue-traine.md`, avec vérification cannibalisation avant chaque
sujet (leçon du 30/06/2026 : plus jamais de sujet publié sans vérifier l'existant).

- [x] **Règlement intérieur d'un OF** — publié le 2026-08-19 :
      [`/blog/reglement-interieur-organisme-formation/`](https://claudeagency.fr/blog/reglement-interieur-organisme-formation/).
- [x] **OPCO et Qualiopi : ce que la certification change pour le financement** — publié le
      2026-08-19 : [`/blog/opco-qualiopi-financement/`](https://claudeagency.fr/blog/opco-qualiopi-financement/).
- [x] **Enrichir `qualiopi-guide-organisme-formation.mdx`** — fait le 2026-08-19 : nouvelle
      sous-section « Comment choisir son organisme certificateur ? » (accréditation COFRAC,
      critères de choix, vérification sur cofrac.fr). Remplace le sujet #13 (« Certification RNQ :
      étapes pour l'obtenir »), abandonné car déjà couvert par ce guide. Vague longue traîne
      « documents & démarches obligatoires » terminée (3/3).

### ⚪ 7. Dette de la mémoire elle-même

- [ ] `REQUETES.csv` : 62 lignes sur 87 ont une requête cible marquée
      `deduite-du-slug-A-VALIDER`. À corriger au fil de l'eau, pas en une passe.
- [x] Couvertures temporaires — TRAITÉ, vérifié le 2026-08-19 : `indicateurs-qualiopi.mdx` a déjà
      sa couverture dédiée (`indicateurs-qualiopi-cover.webp`) ; `audit-surveillance-qualiopi`
      n'est pas un article mais une requête mappée sur `qualiopi-guide-organisme-formation.mdx`,
      qui a aussi sa couverture dédiée (`qualiopi-guide-cover.webp`). Ligne périmée.

---

## Écarté — ne pas reproposer

| Idée | Écartée le | Raison |
| :--- | :--- | :--- |
| Publier en masse (~40 articles d'un coup) | 2026-08-12 | Fait le 30/06/2026. Mesure à 6 semaines : impressions en hausse, **quasiment aucun clic**, position moyenne dégradée à 33,3. Le volume ne compense pas l'absence d'autorité. |
| Maillage interne par script | 2026-07-03 | A vidé 62 articles (incident documenté dans `docs/CONTEXTE-COWORK.md`). Le maillage se pose à la main. |
| Nouveau schema `FAQPage` pour le SEO Google | 2026-06-14 | Rich result restreint aux sites gov/santé depuis août 2023. Les `FAQPage` existants restent en place pour les citations IA. |
| Schema `HowTo` | 2026-06-14 | Déprécié par Google en septembre 2023. |
| Pages doublons / variantes géographiques | 2026-06-14 | Offre nationale — pas de justification, risque de contenu dupliqué. |
| Optimisation CTR comme priorité | 2026-06-19 | Écartée à l'époque faute de pages en position 4-10. **Ré-ouverte le 2026-08-12** : il y en a maintenant (voir priorité 3). |
| Retirer le tag GA4 | — | La propriété Search Console préfixe est validée par ce tag. Le retirer casse la validation. |
| Sujet #9 « Déclaration d'activité, procédure pas à pas » (plan longue traîne) | 2026-08-19 | Déjà traité : `numero-declaration-activite.mdx` a déjà le tableau étapes/pièces et les délais (3 mois / 30 jours). |
| Sujet #12 « BPF : qui dépose, quels délais » (plan longue traîne) | 2026-08-19 | Déjà traité : `remplir-bpf-organisme-formation.mdx` a déjà « Qui doit remplir le BPF ? » et « Quand faut-il le transmettre ? ». |
| Sujet #14 « Convention vs contrat de formation » (plan longue traîne) | 2026-08-19 | Déjà traité : `convention-de-formation.mdx` a un H2 dédié « Convention ou contrat de formation : lequel utiliser ? » avec tableau comparatif. |
| Sujet #13 « Certification RNQ : étapes pour l'obtenir » (plan longue traîne) | 2026-08-19 | Déjà traité : `qualiopi-guide-organisme-formation.mdx` couvre déjà les étapes d'obtention (L99-123), le cycle d'audit (L125-181) et les coûts (L209+). Remplacé par un enrichissement de ce guide (voir « À faire » n°8). |
| Sujets #5 « Audit Qualiopi initial vs surveillance » et #10 « RNQ : qu'est-ce que » (plan longue traîne) | 2026-08-19 | Probablement déjà traités par `qualiopi-guide-organisme-formation.mdx` (sections cycle d'audit et RNQ 7 critères/32 indicateurs), vérification faite sur les titres de section seulement — **à re-vérifier ligne à ligne** avant de les reproposer, pas encore écarté avec certitude comme #9/#12/#13/#14. |
| Ouvrir un compte Instagram | 2026-08-14 | Cible B2B absente du réseau en contexte professionnel, coût de production le plus élevé de tous les canaux, aucun effet SEO (liens `nofollow`, contenu non indexé), et la page LinkedIn entreprise n'existe pas encore. Arbitrage complet dans `TACHES-SOLOHERY-SITE-CONVERSION.md` §3. |
| Ouvrir une « chaîne » YouTube avec rythme de publication | 2026-08-14 | Les vidéos sont utiles (tâche G15), le format « chaîne » ne l'est pas. Bibliothèque de 5 à 8 vidéos utilitaires uniquement, après 4 semaines de LinkedIn. |
| Installer Plausible | 2026-08-14 | GA4 est déjà chargé. Un second outil de mesure = un script de plus et deux chiffres qui ne concorderont jamais. Corriger les 4 événements vers GA4 (G1). |
| Rendre `/semaine-offerte/` indexable | 2026-08-14 | La page promet une prestation gratuite sans filtre : indexée elle attire des curieux, envoyée à un prospect qualifié elle convertit. Reste en `noindex`. |
