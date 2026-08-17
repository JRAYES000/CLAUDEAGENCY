# Fiche Sortlist — inscription gratuite (Vague 1, item #5)

Vague 1, item #5 de `docs/seo/NETLINKING-ACTIONS.md` : « Gratuit (profil de base) ».
URL de départ : https://www.sortlist.fr/providers/pricing

**Ce document prépare le formulaire, il ne le remplit pas.** L'inscription se fait derrière un
compte — Claude Code ne le crée pas et ne saisit pas de mot de passe à la place de SOLOHERY.

## Ce qui a pu être lu, et ce qui reste caché

L'offre gratuite existe toujours (vérifié le 17/08/2026, page `sortlist.fr/providers/pricing`
lue avec succès) : *« Devenez membre Sortlist+ pour atteindre vos objectifs — Gratuit — €0 —
Créez le profil de votre agence en quelques minutes, ajoutez vos réalisations et vos avis
clients. »* Le CTA correspondant est **« Créez votre profil » / « Register as a provider »**,
sans carte bancaire requise.

Le **formulaire de création lui-même** (champs, ordre exact) vit derrière la création de compte
— non tentée, hors périmètre de Claude Code — et les articles du centre d'aide Sortlist
(`help.sortlist.com`) qui l'auraient peut-être détaillé ont renvoyé une erreur 403 dans cette
session. **La liste ci-dessous est reconstituée**, pas relevée sur le formulaire réel, à partir
de deux sources : ce que Sortlist décrit lui-même comme contenu d'un profil gratuit (page
Tarifs, comparatif Gratuit/Sortlist+) et la structure standard déjà validée pour les 5 autres
fiches de la Vague 1 (`kit-identite.md` §3). SOLOHERY doit vérifier l'ordre et l'intitulé réels
une fois connecté.

**Point d'alerte sur le secteur demandé.** La consigne donnée est « secteur : formation
professionnelle », mais les catégories de service visibles sur Sortlist sont celles d'une
agence marketing/digitale (Digital Strategy, UX/UI, Mobile App…) — aucune catégorie
« organisme de formation » ou « formation professionnelle » n'apparaît sur les pages lues. Le
plus probable est que « formation professionnelle » se place comme **secteur client desservi**
(à qui l'agence vend), pas comme catégorie de service principale (ce que l'agence vend) — la
catégorie de service la plus proche du positionnement Claude Agency serait plutôt « Conseil en
stratégie digitale » ou « Intelligence artificielle ». Marqué « à trancher » ci-dessous : à
confirmer une fois le formulaire réel ouvert.

## Champs à remplir

| Champ | Valeur à coller | Remarque |
| :--- | :--- | :--- |
| Compte (e-mail + mot de passe) | à trancher | Création de compte hors périmètre de Claude Code — à faire par SOLOHERY directement |
| Nom de l'agence | `ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)` ou `Claude Agency` selon le champ demandé | NAP verbatim, `kit-identite.md` §1 ; à trancher entre raison sociale légale et nom commercial si le formulaire ne précise pas lequel |
| Site web | `https://claudeagency.fr` | `kit-identite.md` §1 |
| Adresse | `229 rue Saint-Honoré, 75001 Paris` | NAP verbatim, `kit-identite.md` §1 |
| Téléphone | `07 56 81 34 44` | NAP verbatim, `kit-identite.md` §1 |
| E-mail public | `contact@claudeagency.fr` | `kit-identite.md` §1 |
| Catégorie de service principale | Conseil en stratégie digitale / Intelligence artificielle (proposition) | à trancher — voir « Point d'alerte » ci-dessus, aucune catégorie native « formation » repérée |
| Secteur client desservi | Formation professionnelle | Consigne reçue ; à placer dans le champ secteur/industrie s'il existe, pas dans la catégorie de service |
| Langues parlées | Français (proposition) | Absent de `kit-identite.md` ; site et contenu entièrement en français — à trancher si le formulaire permet plusieurs langues |
| Taille minimale de mission / budget | à trancher | Absent de `kit-identite.md`, aucune grille tarifaire publiée à ce jour dans le dépôt — ne pas inventer un chiffre |
| Description courte | voir `kit-identite.md` §2, version 169 caractères | Réutilisable telle quelle, cohérente avec les autres fiches |
| Description longue / présentation | voir `kit-identite.md` §2, version moyenne (481) ou longue (1650) selon la limite du champ réel | À choisir une fois la limite de caractères du formulaire connue |
| Logo | `app/public/logo.png` (512×512) | `kit-identite.md` §3 |
| Image de couverture | à trancher | Absent du dépôt — aucun visuel bannière disponible actuellement |
| Photos d'équipe | à trancher | Absent du dépôt — non fourni |
| Réalisations / travaux (portfolio) | à trancher | Rien à coller sans inventer — proposer d'y renvoyer vers les articles du blog ou les pages `services/` en attendant de vrais cas clients |
| Avis / références clients | **laisser vide** | Aucune référence client disponible (société créée le 11/03/2024) — n'en inventer aucune, consigne explicite |
| **Preuve — URL de la fiche publiée** | *(à coller par SOLOHERY après publication)* | Vide, volontairement |

## Marche à suivre

1. Ouvrir https://www.sortlist.fr/providers/pricing et cliquer **« Créez votre profil »** —
   vérifier d'abord qu'aucune carte bancaire n'est demandée avant de continuer (le plan gratuit
   ne doit pas en réclamer).
2. Créer le compte (e-mail + mot de passe) — étape SOLOHERY, hors périmètre de Claude Code.
3. Une fois dans le formulaire réel, comparer son ordre et ses intitulés à ce tableau, l'ajuster
   si besoin — cette fiche est une préparation, pas une capture du formulaire.
4. Coller nom, site web, adresse, téléphone, e-mail depuis le tableau ci-dessus.
5. Choisir la catégorie de service la plus proche de « Conseil en stratégie digitale » /
   « Intelligence artificielle » ; placer « Formation professionnelle » dans un champ secteur ou
   client-cible s'il existe, pas comme catégorie de service.
6. Coller la description courte ou longue selon la limite de caractères affichée par le champ.
7. Ajouter le logo (`app/public/logo.png`).
8. Laisser vides les champs sans contenu vérifié (image de couverture, photos d'équipe,
   réalisations, avis clients) plutôt que d'inventer une valeur — à compléter plus tard avec du
   contenu réel.
9. **S'arrêter et relire avant de valider** si le parcours pousse à un moment vers une offre
   payante ou réclame une carte bancaire : ce plan ne couvre que le profil gratuit.
10. Si tout reste gratuit jusqu'au bout : publier la fiche.
11. Copier l'URL de la fiche publiée dans la ligne **Preuve** du tableau ci-dessus, dans ce
    fichier.
