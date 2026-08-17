# Kit d'identité — fiches annuaires et NAP

Source unique du NAP (Nom, Adresse, Téléphone) pour les six fiches de la Vague 1 de
`docs/seo/NETLINKING-ACTIONS.md` (Google Business Profile, LinkedIn, PagesJaunes/Solocal,
Annuaire du Conseil, Sortlist, Crunchbase) et pour toute fiche future. Informations vérifiées le
13/08/2026.

**Règle absolue : le nom, l'adresse et le téléphone se copient d'ici au mot près, jamais de
mémoire, jamais reformulés.** Une virgule d'écart entre deux fiches et Google peut considérer
qu'il s'agit de deux entreprises différentes (dédoublement d'entité, dilution du Knowledge Graph).

---

## 1. NAP à copier tel quel

```
Nom       : ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)
Adresse   : 229 rue Saint-Honoré, 75001 Paris
Téléphone : 07 56 81 34 44
```

Identifiants légaux associés, à saisir quand un formulaire les demande (ne font pas partie du NAP
au sens strict, mais viennent de la même source vérifiée le 13/08/2026) :

- SIREN : 924 997 539
- SIRET : 924 997 539 00011
- RCS : Paris
- NAF/APE : 85.59B
- Président : Antoine RAYES
- Contact commercial : Julien RAYES
- E-mail : contact@claudeagency.fr
- Site web : https://claudeagency.fr

---

## 2. Descriptions

### Description courte — 169 caractères

Source : `docs/seo/NETLINKING-ACTIONS.md` (« Description courte réutilisable »), calibrée pour la
cible de 200 caractères que le même document fixe ligne 37.

> Claude Agency accompagne les organismes de formation dans l'adoption de l'IA : audit,
> automatisation du back-office (Qualiopi, BPF, émargement) et formation des équipes.

### Description moyenne — 481 caractères

Condensée à partir des mêmes sources que les deux autres (aucun fait nouveau) : la phrase
d'ouverture et l'énumération de services de `NETLINKING-ACTIONS.md`, la méthode et la promesse
d'autonomie de `linkedin-kit.md`. Cible visée par le prompt initial : ~500 caractères.

> Claude Agency est un cabinet de conseil qui aide les organismes de formation français à
> intégrer l'intelligence artificielle et à automatiser leurs process : audit et diagnostic IA,
> automatisation du back-office (Qualiopi, BPF, émargement, dossiers de financement) et
> formation des équipes. Notre méthode : un flux à la fois, l'IA prépare, l'humain valide — vous
> gardez toujours la main. Pas de jargon, pas de dépendance : nous formons et outillons pour que
> vous restiez autonomes.

### Description longue — 1650 caractères

Source : `docs/seo/linkedin-kit.md` (section « Description « À propos » », page entreprise
LinkedIn), calibrée pour la fourchette 1500-2000 caractères que le même document fixe.

> Claude Agency est un cabinet de conseil qui aide les organismes de formation français à intégrer
> l'intelligence artificielle et à automatiser leurs process, pour gagner du temps et monter en
> qualité.
>
> Notre conviction est simple : les organismes de formation ont tout à gagner de l'IA, mais ils
> manquent de temps et d'un partenaire de confiance pour s'y mettre sans se tromper. Entre
> Qualiopi, les conventions, l'émargement, le BPF et le montage des dossiers de financement,
> l'administratif déborde vite sur le temps pédagogique et commercial. Or l'essentiel de cette
> charge est répétitif — donc automatisable.
>
> Nous accompagnons les dirigeants, responsables pédagogiques et responsables administratifs de
> bout en bout, autour de quatre services :
>
> • Audit & diagnostic IA — identifier les automatisations à plus fort retour.
> • Formation des équipes — vous rendre autonomes sur les bons outils.
> • Automatisation des process — émargement, preuves Qualiopi, BPF, relances, dossiers de
>   financement.
> • Outils IA sur mesure — pensés pour votre métier, pas l'inverse.
>
> Notre méthode : un flux à la fois. On repère la tâche la plus chronophage, on l'automatise de
> bout en bout, on mesure le temps gagné, puis on passe à la suivante. La règle d'or : l'IA
> prépare, l'humain valide. Vous gardez toujours la main.
>
> Nous parlons votre langage métier, pas celui de la technique. Pas de jargon, pas de dépendance :
> nous formons et nous outillons pour que vous restiez autonomes.
>
> Pour savoir ce que vous pouvez déléguer, commencez par un audit offert : vous repartez avec une
> feuille de route claire et chiffrée.
>
> En savoir plus : https://claudeagency.fr

La version longue (1650 caractères) reste disponible ci-dessus pour tout usage qui accepte un
texte plus développé (page « À propos » LinkedIn notamment, sa source d'origine).

---

## 3. Champs que tous les annuaires demandent

| Champ | Valeur | Source |
| :--- | :--- | :--- |
| Catégorie principale | Cabinet de conseil | `NETLINKING-ACTIONS.md` l.36 et catégories fédérations (l.59, l.87) |
| Catégorie secondaire | Conseil en intelligence artificielle | `NETLINKING-ACTIONS.md` l.36 |
| Zone d'intervention | France, Belgique, Suisse, Luxembourg (organismes de formation francophones) | `CLAUDE.md` |
| Langues | Français | Site et contenu du dépôt entièrement en français, aucune version traduite publiée |
| Année de création | 11/03/2024 | Information fournie et vérifiée le 13/08/2026 |
| Effectif | à trancher | Non prouvé dans le dépôt ni dans les informations fournies |
| E-mail public | contact@claudeagency.fr | Information fournie et vérifiée le 13/08/2026 |
| Logo | PNG : `app/public/logo.png` (512×512) · SVG : `app/public/favicon.svg` — même étoile à 12 branches, même couleur `#CC785C`, vérifié visuellement (voir note ci-dessous) | Fichiers présents dans le dépôt |

**Note sur le logo — vérifié visuellement.** `logo.png` et `favicon.svg` sont le même symbole :
une étoile à 12 branches avec un point central, en `#CC785C` (le orange-terracotta de la marque
Claude/Anthropic), sans texte. Ce n'est **pas** une favicon simplifiée distincte d'un « vrai »
logo : le PNG utilisé comme logo du site est exactement ce même symbole, juste en raster. Donc le
SVG demandé existe bel et bien dans le dépôt et correspond au logo réellement utilisé.
Ce qui n'existe en revanche **pas** dans le dépôt : un logotype avec le texte « Claude Agency »
(nom de marque écrit) — seul le symbole existe, en PNG et en SVG.

**Décidé par Julien le 17/08/2026 : le symbole seul (favicon.svg / logo.png) est utilisé pour
toutes les fiches annuaires, pas de logo avec texte pour l'instant.** Confirmé : le site
claudeagency.fr utilise lui-même du texte stylé en HTML pour son nom, pas un logo graphique avec
le nom intégré — l'absence de wordmark dans le dépôt reflète donc un choix déjà fait, pas un
manque.

**Point d'éligibilité à rappeler sur chaque fiche** (`NETLINKING-ACTIONS.md` l.8-12) : Claude
Agency est un cabinet de conseil, pas un organisme de formation déclaré — les annuaires alimentés
par la liste Qualiopi (Pronéo, AnnuaireQualiopi.fr, lifelong-learning.lu) sont fermés et ne doivent
pas être tentés.

**Écart à connaître entre e-mail public et e-mail de prospection.** Le NAP ci-dessus donne
`contact@claudeagency.fr` comme e-mail public (information fournie le 13/08/2026).
`NETLINKING-ACTIONS.md` (arbitrage de Julien du 15/08/2026) utilise `equipe1@claudeagency.fr` pour
les demandes d'adhésion aux fédérations — un usage différent, pas une contradiction : ne pas
mélanger les deux dans une même fiche.

---

## 4. Statut réglementaire

Vérifié sur le SIREN 924 997 539, via deux URL distinctes consultées séparément.

**NDA : oui — 11 75 70022 75** — https://recherche-entreprises.api.gouv.fr/search?q=924997539 —
donnée mise à jour le 16/08/2026 (champ `date_mise_a_jour` de la réponse). Champ source :
`liste_id_organisme_formation`, documenté dans le schéma OpenAPI de l'API comme « Liste des
numéro de déclaration d'activité des établissements organismes de formation (source : Ministère
du Travail) ».

**Qualiopi : oui** — https://annuaire-entreprises.data.gouv.fr/entreprise/924997539 (page
consultée directement le 17/08/2026, distincte de l'URL ci-dessus) — section « Labels et
certificats » : « Organisme de formation (certifié Qualiopi) », mise à jour le 17/08/2026. Cette
page ne détaille pas l'organisme certificateur ni la date de validité du certificat ; à compléter
si un formulaire l'exige.

**Note d'honnêteté sur l'indépendance des sources.** Les deux URL sont réellement distinctes
(API JSON vs page de l'Annuaire des Entreprises) et ont été consultées séparément. Elles ne sont
en revanche pas deux registres tenus par des organismes différents : les deux s'appuient sur la
même chaîne de données publiques (INSEE, DGFiP, Douanes, MTPEI/Ministère du Travail, INPI) — pas
sur, par exemple, un registre propre à un organisme certificateur Qualiopi consulté en direct.
Tentative faite d'atteindre une troisième source réellement indépendante (l'API Qualiopi
dédiée `entreprise.api.gouv.fr/catalogue/carif_oref/certifications_qualiopi_france_competences`,
opérée par un CARIF-OREF) : elle exige une clé API dont je ne dispose pas dans cette session,
donc non vérifiée.

Le NAF 85.59B (code générique « autres enseignements ») ne fonde ce constat en rien — les deux
champs officiels ci-dessus sont la seule preuve retenue.

**⚠️ Contredit l'hypothèse posée plus haut (§3, « point d'éligibilité ») et dans
`NETLINKING-ACTIONS.md` (l.8-12), qui présentent Claude Agency comme un cabinet de conseil non
déclaré organisme de formation, avec les annuaires Qualiopi fermés en conséquence. Les données
officielles disent l'inverse pour ce SIREN. Conséquence actée pour cette vérification (consigne
reçue) : rien à soumettre côté annuaires Qualiopi — les listes publiques ne font que recopier le
fichier du Ministère du Travail, aucune démarche manuelle n'est donc utile, et les annuaires
alimentés par la liste Qualiopi restent écartés (onglet ⛔ Interdits de `NETLINKING-ACTIONS.md`).
En revanche, la case « catégorie » des 6 fiches (§3 ci-dessus) et l'éligibilité aux deux
fédérations de la Vague 2 restent à trancher par Julien à la lumière de ce constat — non
modifiées ici, hors périmètre de cette vérification.**

---

## Reste

- Logo : symbole seul (favicon.svg / logo.png), pas de wordmark pour l'instant — à revoir si un
  annuaire de la Vague 1 l'exige explicitement.
- Effectif : à trancher, non prouvé.
