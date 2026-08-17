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

## Description — 1 469 caractères

Le formulaire réel affiche 5000 caractères disponibles (vu le 17/08/2026) : la version de 387
caractères d'abord rédigée était trop courte pour le champ, remplacée par celle-ci, étoffée sur
les mêmes faits et toujours entièrement reformulée — aucune phrase des trois descriptions de
`kit-identite.md`, du site claudeagency.fr, ni de la version de 387 caractères, n'est reprise.
Longueur recomptée mécaniquement (`wc -m`) après écriture dans le fichier, pas estimée.

> Claude Agency est un cabinet de conseil parisien spécialisé dans l'adoption de l'intelligence
> artificielle par les organismes de formation francophones : France, Belgique, Suisse et
> Luxembourg. Sa cible n'est pas le grand public, mais un métier précis, avec ses propres
> contraintes administratives.
>
> Les responsables pédagogiques et administratifs d'un organisme de formation consacrent une
> part importante de leur temps à des tâches répétitives : constitution des preuves Qualiopi,
> remplissage du bilan pédagogique et financier, suivi des feuilles d'émargement, montage des
> dossiers de financement, rédaction des conventions. Ce temps administratif empiète directement
> sur le temps pédagogique et commercial.
>
> Claude Agency identifie, dans chaque structure, les tâches les plus chronophages et les
> automatise une par une, en gardant chaque automatisation sous contrôle humain : l'outil
> prépare, la personne valide. Une fois l'automatisation posée, l'équipe est formée à s'en servir
> seule, sans dépendre d'un prestataire externe pour la faire fonctionner au quotidien.
>
> Le cabinet ne vend pas de solution technique clé en main déconnectée du métier : chaque
> intervention part d'un audit du fonctionnement réel de l'organisme, pas d'un outil générique
> plaqué dessus. L'objectif est mesurable : du temps administratif récupéré, documenté, sans
> jargon technique inutile pour des équipes qui ne sont pas censées devenir informaticiennes.

## Champs à remplir

| Champ | Valeur à coller | Remarque |
| :--- | :--- | :--- |
| Compte (e-mail + mot de passe) | à trancher | Création de compte hors périmètre de Claude Code — à faire par SOLOHERY directement |
| Nom du site | `ECOLE DE NATUROPATHIE ET SOPHROLOGIE` | ⚠️ **Déjà soumis avec `Claude Agency`** avant l'arbitrage de Julien du 17/08/2026 (nom légal partout, pas la marque) — statut « En attente » au moment de l'arbitrage, encore modifiable via « Modifier » sur le tableau de bord. Correction non faite tant que Julien n'a pas confirmé s'il faut éditer la fiche déjà soumise ou la laisser telle quelle |
| URL du site | `https://claudeagency.fr` | `kit-identite.md` §1 |
| Adresse | `229 rue Saint-Honoré, 75001 Paris` | NAP verbatim, `kit-identite.md` §1 |
| Téléphone | `07 56 81 34 44` | NAP verbatim, `kit-identite.md` §1 |
| E-mail public | `contact@claudeagency.fr` | `kit-identite.md` §1 |
| Catégorie | Conseil en stratégie digitale | Liste réelle vue le 17/08/2026 sur le formulaire : **un seul choix possible** (pas multi comme d'abord supposé). Ni « intelligence artificielle » ni « cabinet de conseil » n'y figurent ; « Conseil en stratégie digitale » décrit le service vendu (à préférer à « Conseil en formation », qui décrirait la clientèle visée et se lirait à tort comme « organisation de programmes de formation interne »). Repli : « Conseil en innovation ». Éviter « Conseil en recrutement », sans rapport. Suggérer `Intelligence artificielle` dans le champ libre « Proposer des catégories » si le formulaire le permet en plus du choix unique |
| Description | voir section « Description » ci-dessus (1 469 caractères) | Rédigée spécifiquement pour cette fiche, jamais publiée ailleurs ; champ « originale et unique, pas de copier-coller » (5000 caractères disponibles, vu sur le formulaire réel) |
| Titre du Twitter / Adresse du Twitter (URL) | laisser vide | Facultatif (pas d'astérisque) ; aucun compte X/Twitter documenté dans `kit-identite.md` |
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
