# Fiche Annuaire du Conseil — inscription gratuite avec lien retour

Vague 1, item #4 de `docs/seo/NETLINKING-ACTIONS.md` : gratuit à condition de poser un lien retour
vers `annuaireduconseil.com` (fait, voir `JOURNAL.md` du 2026-08-17, footer de `claudeagency.fr`).
URL de départ : https://annuaireduconseil.com/

**Ce document prépare le formulaire, il ne le remplit pas.** L'inscription du site se fait
derrière un compte (e-mail + mot de passe) — Claude Code ne crée pas de compte ni ne saisit de
mot de passe à la place de SOLOHERY.

## Ce qui a pu être lu, et ce qui reste caché

Contrairement à la page Solocal (bloquée par anti-robot), `annuaireduconseil.com` s'est laissé
lire. Mais le formulaire de **soumission du site** (nom, URL, catégorie, description...) vit
**derrière la connexion** : `/webmaster-submit-website.html` n'affiche qu'un formulaire de
compte (e-mail, mot de passe, répéter le mot de passe, code de sécurité), pas les champs de la
fiche elle-même. Impossible de relever leur ordre exact sans créer ce compte — ce que je ne fais
pas. **La liste ci-dessous est reconstituée** à partir de la page de règles
(`/info/useCondition`) et de la structure standard d'un annuaire de sites (nom, URL, catégorie,
description, mots-clés) : SOLOHERY doit vérifier l'ordre réel une fois connecté.

## Règles trouvées, à respecter dans le remplissage

Citations exactes de `/info/useCondition` :
- « L'inscription est **gratuite** (avec lien retour) pour les professionnels du conseil » —
  version Premium sans lien retour = **payante**, à éviter (voir marche à suivre).
- « merci d'utiliser une **description unique** n'ayant jamais été utilisée sur internet » —
  **les descriptions de `kit-identite.md` ne conviennent pas telles quelles** : la version longue
  est déjà publiée sur la page LinkedIn de l'entreprise. Une description neuve est à rédiger pour
  cette fiche précisément, pas copiée d'ailleurs.
- « Plus la description est longue et soignée, plus elle donnera de poids à votre lien » — privilégier
  un texte développé plutôt que la version courte de 169 caractères.
- Public visé : « professionnels du conseil, consultants indépendants ou cabinets de conseil
  exerçant en France » — Claude Agency correspond (« cabinet de conseil »).
- « Aucune information ne sera communiquée à un tiers. »
- Aucun délai de validation n'est précisé.

## Description — 387 caractères

Rédigée pour cette fiche uniquement, jamais publiée ailleurs. Mêmes faits que
`kit-identite.md` (cabinet de conseil, organismes de formation francophones, automatisation des
obligations administratives, formation à l'autonomie, diagnostic préalable), entièrement
reformulés — aucune phrase des trois descriptions existantes ni du site claudeagency.fr n'est
reprise. Aucune limite de caractères n'est affichée sur `/info/useCondition` ni sur les pages
accessibles du site ; ciblée par défaut sur 300-400 caractères comme demandé.

> Ce cabinet parisien conseille les organismes de formation francophones (France, Belgique,
> Suisse, Luxembourg) sur l'intégration concrète de l'intelligence artificielle. Il repère les
> tâches administratives les plus lourdes — indicateurs Qualiopi, bilan pédagogique et financier,
> suivi des présences — les automatise une à une, puis rend les équipes autonomes sur les outils
> mis en place.

## Champs à remplir

| Champ | Valeur à coller | Remarque |
| :--- | :--- | :--- |
| Compte (e-mail + mot de passe) | à trancher | Création de compte hors périmètre de Claude Code — à faire par SOLOHERY directement |
| Nom du site / raison sociale | `ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)` ou `Claude Agency` selon le champ demandé | NAP verbatim en `kit-identite.md` §1 ; à trancher entre raison sociale légale et nom commercial si le formulaire ne précise pas lequel |
| URL du site | `https://claudeagency.fr` | `kit-identite.md` §1 |
| Adresse | `229 rue Saint-Honoré, 75001 Paris` | NAP verbatim, `kit-identite.md` §1 |
| Téléphone | `07 56 81 34 44` | NAP verbatim, `kit-identite.md` §1 |
| E-mail public | `contact@claudeagency.fr` | `kit-identite.md` §1 |
| Catégorie | Conseil en stratégie digitale | Liste réelle vue le 17/08/2026 sur le formulaire : **un seul choix possible** (pas multi comme d'abord supposé). Ni « intelligence artificielle » ni « cabinet de conseil » n'y figurent ; « Conseil en stratégie digitale » décrit le service vendu (à préférer à « Conseil en formation », qui décrirait la clientèle visée et se lirait à tort comme « organisation de programmes de formation interne »). Repli : « Conseil en innovation ». Éviter « Conseil en recrutement », sans rapport. Suggérer `Intelligence artificielle` dans le champ libre « Proposer des catégories » si le formulaire le permet en plus du choix unique |
| Description | voir section « Description » ci-dessus (387 caractères) | Rédigée spécifiquement pour cette fiche, jamais publiée ailleurs |
| Mots-clés | à trancher | Non couvert par `kit-identite.md` ; proposition : organismes de formation, Qualiopi, automatisation, IA, conseil |
| Lien retour vers annuaireduconseil.com | déjà posé | Footer de `claudeagency.fr`, ajouté et poussé le 2026-08-17 (commit `6781807`) — condition remplie avant soumission |
| **Preuve — URL de la fiche publiée** | *(à coller par SOLOHERY après validation)* | Vide, volontairement |

## Marche à suivre

1. Vérifier d'abord que le lien retour est **en ligne sur claudeagency.fr** (pas seulement
   poussé sur `main` — attendre le déploiement Cloudflare et charger la page en production).
2. Aller sur https://annuaireduconseil.com/webmaster-submit-website.html et créer un compte
   (e-mail + mot de passe) — étape à faire par SOLOHERY, Claude Code n'y a pas accès.
3. Une fois connecté, choisir l'option **inscription gratuite avec lien retour** — surtout
   **ne pas** prendre l'option Premium, qui supprime l'obligation de lien retour en échange
   d'un paiement.
4. Coller nom, URL, adresse, téléphone, e-mail depuis le tableau ci-dessus.
5. Choisir **« Conseil en stratégie digitale »** (choix unique, repli : « Conseil en
   innovation ») ; ajouter `Intelligence artificielle` dans le champ « Proposer des
   catégories » si le formulaire le permet en plus.
6. Coller la description de la section « Description » ci-dessus (387 caractères, rédigée pour
   cette fiche, jamais publiée ailleurs).
7. Renseigner les mots-clés proposés si le champ existe, ou choisir librement.
8. **S'arrêter et relire avant de valider** si le parcours pousse vers l'offre Premium ou
   réclame une carte bancaire à un moment quelconque : ce plan ne couvre que l'inscription
   gratuite avec lien retour.
9. Si tout reste gratuit jusqu'au bout : valider la fiche.
10. Copier l'URL de la fiche publiée dans la ligne **Preuve** du tableau ci-dessus, dans ce
    fichier.
