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
- [ ] Avant tout achat de lien payant : appliquer la méthode de la skill `netlinking-ecole-naturo`
      (DR, thématique, ancres). Voir aussi `NETLINKING.md`.

**Contrainte d'éligibilité :** Claude Agency n'est pas un OF déclaré → tous les annuaires
alimentés par la liste publique Qualiopi lui sont fermés. Ne pas y perdre de temps.

### ✅ 2. Doublon www / non-www — FAUSSE ALERTE, clos le 2026-08-12

`www.claudeagency.fr` redirige bien en **301** vers l'apex (testé le 12/08). Les URLs `www` vues
dans GSC sont un reliquat d'indexation qui se purge tout seul. Rien à corriger. Conclusion trop
rapide de ma part le matin même — laissée ici pour qu'on ne la reprenne pas.

### ✅ 3. Pages en *striking distance* — FAIT le 2026-08-12

9 `title` + `description` réécrits, alignés sur les requêtes réellement constatées dans GSC.
Détail, positions de départ et arbitrages : entrée du 2026-08-12 dans `JOURNAL.md`.

- [ ] **Relever le résultat le 2026-09-11** : clics, CTR et position de ces 9 URLs.
      Si le CTR de `/services/seo/` est toujours à 0, revenir à l'ancien title.
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

### 🟡 5. Sous-domaine `reporting.claudeagency.fr` indexé

**Constat mesuré :** 17 impressions, position 9,2. La propriété domaine l'inclut.

- [ ] Confirmer avec Julien s'il doit être public. Si non : `noindex` + exclusion du sitemap.

### 🟡 6. Requêtes à fort volume où le site est trop loin

Impressions réelles mais positions hors jeu — à traiter **après** le netlinking, pas avant.

| Requête | Impressions | Position | Page |
| :--- | ---: | ---: | :--- |
| `logiciel organisme de formation` | 121 | 75,1 | `/blog/logiciel-organisme-formation/` |
| `logiciel bilan pédagogique et financier` (2 graphies) | 119 | ~35 | `/blog/automatiser-bpf-organisme-formation/` |
| `claude seo agency` (anglais) | 107 | 57,6 | `/services/seo/` |
| `agence claude code` | 37 | 66,1 | — |

### ⚪ 7. Dette de la mémoire elle-même

- [ ] `REQUETES.csv` : 62 lignes sur 87 ont une requête cible marquée
      `deduite-du-slug-A-VALIDER`. À corriger au fil de l'eau, pas en une passe.
- [ ] Régénérer les 2 couvertures temporaires (`indicateurs-qualiopi`, `audit-surveillance-qualiopi`)
      — en attente depuis le 2026-06-15.

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
