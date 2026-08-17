# Fiche Crunchbase — ajout d'organisation (Vague 1, item #6)

Vague 1, item #6 de `docs/seo/NETLINKING-ACTIONS.md` : « Gratuit — Nofollow ». Lien nofollow, donc
pas de puissance SEO directe — l'intérêt est que Google et les moteurs IA voient que Claude Agency
existe (signal d'entité, pas de netlinking).

URL de départ : https://www.crunchbase.com/add-new

**Ce document prépare le formulaire, il ne le remplit pas.** Le compte se crée derrière une
authentification — Claude Code ne le crée pas.

## Ce qui a pu être lu, et ce qui reste caché

`/add-new` a renvoyé une erreur 403 à la fois en accès direct et via le panneau navigateur (deux
tentatives, deux échecs — pas insisté une troisième fois). **La liste ci-dessous est
reconstituée**, pas relevée sur le formulaire réel, à partir des articles d'aide officiels de
Crunchbase (`support.crunchbase.com`) trouvés par recherche :

- Une authentification par compte est nécessaire avant de pouvoir créer un profil (« créer un
  compte, l'authentifier, puis Explore → Create Profile ») — méthode exacte de connexion non
  confirmée dans cette session.
- Seuls **Nom** et **Description** sont explicitement documentés comme obligatoires ; les autres
  champs cités (Logo, Siège social/Headquarters, et « autres champs » non détaillés) sont
  facultatifs.
- Une modération existe : Crunchbase mentionne des vérifications automatiques **et humaines**
  avant publication, avec des règles de contenu (exact, non promotionnel, objectif, apportant une
  information unique sur l'entreprise). Aucun délai précis trouvé pour cette revue.

SOLOHERY doit comparer cette liste à l'ordre réel une fois connecté et l'ajuster si besoin.

## Champs à remplir

| Champ | Valeur à coller | Remarque |
| :--- | :--- | :--- |
| Compte (authentification) | à trancher | Création de compte hors périmètre de Claude Code — à faire par SOLOHERY directement |
| Nom de l'organisation | `ECOLE DE NATUROPATHIE ET SOPHROLOGIE` | Nom légal, décision de Julien du 17/08/2026 (`kit-identite.md` §3) — champ obligatoire |
| Site web | `https://claudeagency.fr` | `kit-identite.md` §1 |
| Description courte / tagline | *AI adoption and back-office automation consulting for training organizations.* | Traduite, jamais publiée ailleurs en anglais ; champ obligatoire |
| Description complète | voir section « Description (anglais) » ci-dessous | Traduite depuis `kit-identite.md` §2 (version moyenne) |
| Siège social / Headquarters | `229 rue Saint-Honoré, 75001 Paris, France` | NAP non traduit tel que demandé — « rue Saint-Honoré » reste en français |
| Téléphone | `07 56 81 34 44` | Format inchangé, non converti en `+33` |
| E-mail de contact | `contact@claudeagency.fr` | `kit-identite.md` §1 |
| Date de fondation | `11/03/2024` | `kit-identite.md` §3, vérifié au registre officiel (`annuaire-entreprises.data.gouv.fr`) |
| Statut d'activité | Active | Constaté au registre officiel le 17/08/2026 (« EN ACTIVITÉ ») |
| Secteur / Industries (proposition) | Artificial Intelligence, Consulting, Professional Training & Coaching | Non vu sur un vrai formulaire — à ajuster selon la liste réelle de tags Crunchbase |
| Nombre d'employés | **inconnu** | Invérifiable de façon fiable — consigne explicite : ne pas approcher un chiffre |
| Financement (levées de fonds) | **inconnu** | Invérifiable — même consigne, ne pas écrire « aucun » ni un montant |
| Logo | `app/public/logo.png` (512×512) | `kit-identite.md` §3 |
| LinkedIn de l'entreprise | à trancher | Page LinkedIn en cours de création ailleurs dans la Vague 1 (item #2) — URL non confirmée à ce jour, ne pas en inventer une |
| **Preuve — URL du profil publié** | *(à coller par SOLOHERY après validation)* | Vide, volontairement |

## Description (anglais) — traduite depuis `kit-identite.md` §2

> Claude Agency is a consulting firm that helps French-speaking training organizations adopt
> artificial intelligence and automate their processes: AI audit and diagnostics, back-office
> automation (Qualiopi compliance, financial and pedagogical reporting, attendance tracking,
> funding applications), and staff training. Our method: one workflow at a time — AI prepares,
> humans validate — you always stay in control. No jargon, no dependency: we train and equip
> teams to remain autonomous.

## Marche à suivre

1. Créer un compte Crunchbase et s'authentifier — étape SOLOHERY, hors périmètre de Claude Code.
2. Depuis le menu « Explore », choisir « Create Profile » (ou l'équivalent affiché) pour ajouter
   une nouvelle organisation.
3. Comparer les champs réels du formulaire à ce tableau, l'ajuster si l'ordre ou les intitulés
   diffèrent — cette fiche est une préparation, pas une capture du formulaire.
4. Coller nom, site web, description courte et description complète depuis le tableau ci-dessus.
5. Coller le siège social et le téléphone **sans les traduire ni en changer le format**.
6. Laisser vides ou indiquer « inconnu » pour effectif et financement — ne jamais approximer.
7. Ajouter le logo (`app/public/logo.png`).
8. Soumettre. **Étape de modération à prévoir** : Crunchbase révise les nouveaux profils
   (vérification automatique et humaine) avant publication — ne pas s'attendre à une mise en
   ligne instantanée, et ne pas resoumettre en boucle si le statut reste « en revue » quelques
   jours.
9. Une fois le profil visible publiquement, copier son URL dans la ligne **Preuve** du tableau
   ci-dessus, dans ce fichier.
