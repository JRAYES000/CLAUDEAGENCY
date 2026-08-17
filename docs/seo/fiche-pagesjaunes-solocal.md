# Fiche PagesJaunes / Solocal — inscription gratuite

Vague 1, item #3 de `docs/seo/NETLINKING-ACTIONS.md` : inscription libre, gratuite, aucune
validation extérieure. URL de départ :
https://www.solocal.com/landing/inscription-gratuite-pagesjaunes

**Ce document prépare le formulaire, il ne le remplit pas.** Claude Code n'a pas accès à un
compte Solocal et ne doit pas créer de compte ni entrer de mot de passe à la place de SOLOHERY —
c'est à SOLOHERY de coller les valeurs ci-dessous dans le vrai formulaire et de valider.

## Page non lisible automatiquement

Trois tentatives de lecture de la page (`WebFetch`, puis navigateur avec deux essais) ont toutes
échoué : `WebFetch` renvoie **403 Forbidden**, et le navigateur affiche l'interstitiel anti-robot
Cloudflare **« Just a moment… »** au lieu du formulaire. La page est protégée contre la lecture
automatisée — ce n'est pas une erreur de ma part, c'est un blocage réel et je ne le contourne pas
(bypasser un anti-robot n'est de toute façon pas une action autorisée). **Bascule sur la liste de
champs standard d'une fiche PagesJaunes/Solocal**, construite à partir de deux sources : la liste
« à préparer une fois pour les six » de `NETLINKING-ACTIONS.md` (l.35-37) et la structure connue
d'un formulaire de fiche pro Solocal (raison sociale, coordonnées, activité, description,
horaires, logo). SOLOHERY doit vérifier l'ordre réel des champs à l'écran, cette liste couvre le
contenu, pas forcément la séquence exacte des pages.

## Champs à remplir

| Champ | Valeur à coller | Remarque |
| :--- | :--- | :--- |
| Raison sociale | `ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)` | NAP verbatim, `kit-identite.md` §1 |
| Adresse | `229 rue Saint-Honoré, 75001 Paris` | NAP verbatim, `kit-identite.md` §1 |
| Téléphone | `07 56 81 34 44` | NAP verbatim, `kit-identite.md` §1 |
| SIRET | `924 997 539 00011` | `kit-identite.md` §1 |
| Site web | `https://claudeagency.fr` | `kit-identite.md` §1 |
| E-mail public | `contact@claudeagency.fr` | `kit-identite.md` §1 |
| Catégorie d'activité principale | Cabinet de conseil | `kit-identite.md` §3 |
| Catégorie d'activité secondaire (si un second champ existe) | Conseil en intelligence artificielle | `kit-identite.md` §3 |
| Description (si le champ est limité, ~150-200 car.) | *(texte de 169 caractères, voir `kit-identite.md` §2 « Description courte »)* | `kit-identite.md` §2 |
| Description (si le champ accepte plus, ~500 car.) | *(texte de 481 caractères, voir `kit-identite.md` §2 « Description moyenne »)* | `kit-identite.md` §2 |
| Logo | `app/public/logo.png` (PNG, 512×512) ou `app/public/favicon.svg` (SVG) selon le format demandé | `kit-identite.md` §3 — symbole seul, pas de texte |
| Zone d'intervention / zone de chalandise | France, Belgique, Suisse, Luxembourg (organismes de formation francophones) | `kit-identite.md` §3 |
| Horaires d'ouverture | à trancher | Non couvert par `kit-identite.md` ; Claude Agency est un cabinet de conseil, pas un commerce à horaires fixes — à décider avec Julien (ex. « sur rendez-vous ») |
| Effectif | à trancher | Non prouvé, `kit-identite.md` §3 |
| Année de création | `11/03/2024` | `kit-identite.md` §1 |
| Compte de connexion (e-mail + mot de passe Solocal) | à trancher | Création de compte hors périmètre de Claude Code — à faire par SOLOHERY directement |
| **Preuve — URL de la fiche publiée** | *(à coller par SOLOHERY après validation)* | Vide, volontairement |

## Marche à suivre

1. Ouvrir https://www.solocal.com/landing/inscription-gratuite-pagesjaunes dans un navigateur.
2. Créer ou utiliser un compte Solocal (e-mail + mot de passe) — étape à faire par SOLOHERY,
   Claude Code n'y a pas accès.
3. Choisir le parcours d'**inscription gratuite** (pas une offre payante mise en avant) — relire
   l'écran avant de cliquer, Solocal pousse souvent une offre payante en premier choix.
4. Coller raison sociale, adresse, téléphone, SIRET tels quels depuis le tableau ci-dessus.
5. Sélectionner la catégorie d'activité la plus proche de « Cabinet de conseil » (secondaire :
   « Conseil en intelligence artificielle » si un second champ le permet).
6. Coller site web et e-mail public.
7. Coller la description qui correspond à la limite de caractères affichée par le champ (courte
   169 ou moyenne 481 — ne pas couper l'une des deux à la volée, prendre celle qui rentre).
8. Importer le logo (`app/public/logo.png`, ou le SVG si le champ l'accepte).
9. Renseigner zone d'intervention si le champ existe ; laisser horaires et effectif de côté ou
   les trancher avec Julien avant de continuer si le formulaire les rend obligatoires.
10. **S'arrêter et relire avant de valider** si le parcours demande à ce stade une carte bancaire,
    un IBAN ou tout moyen de paiement : ce plan ne couvre que l'inscription libre, une offre
    payante ne se valide pas sans un accord explicite de Julien.
11. Si tout reste gratuit jusqu'au bout : valider la fiche.
12. Copier l'URL de la fiche publiée dans la ligne **Preuve** du tableau ci-dessus, dans ce
    fichier.
