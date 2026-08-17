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

**À trancher.** Ni `NETLINKING-ACTIONS.md` ni `linkedin-kit.md` ne contiennent de texte rédigé
à ~500 caractères — seulement le court (169, calibré 200) et le long (1650, calibré 1500-2000).
Si un annuaire de la Vague 1 impose un champ à ~500 caractères, ce texte reste à rédiger : ce kit
ne l'invente pas.

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
| Logo | PNG : `app/public/logo.png` (512×512) · SVG : `app/public/favicon.svg` | Fichiers présents dans le dépôt |

**Point d'éligibilité à rappeler sur chaque fiche** (`NETLINKING-ACTIONS.md` l.8-12) : Claude
Agency est un cabinet de conseil, pas un organisme de formation déclaré — les annuaires alimentés
par la liste Qualiopi (Pronéo, AnnuaireQualiopi.fr, lifelong-learning.lu) sont fermés et ne doivent
pas être tentés.

**Écart à connaître entre e-mail public et e-mail de prospection.** Le NAP ci-dessus donne
`contact@claudeagency.fr` comme e-mail public (information fournie le 13/08/2026).
`NETLINKING-ACTIONS.md` (arbitrage de Julien du 15/08/2026) utilise `equipe1@claudeagency.fr` pour
les demandes d'adhésion aux fédérations — un usage différent, pas une contradiction : ne pas
mélanger les deux dans une même fiche.
