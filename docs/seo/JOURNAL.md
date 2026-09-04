# Journal SEO — claudeagency.fr

Antéchronologique : l'entrée la plus récente en haut. Mode d'emploi dans `README.md`.
Une action SEO sans entrée ici n'existe pas pour les sessions suivantes.

---

## 2026-09-05 (94) — Nouvel article « Facture électronique : ce que doit faire un organisme de formation »

**Type :** publication d'article (actualité réglementaire). Carte 85 du backlog `visibilite-ops`,
déléguée à l'intendant.

**URL :** https://claudeagency.fr/blog/facture-electronique-organisme-formation/

**Fichiers touchés :** `app/src/content/blog/facture-electronique-organisme-formation.mdx` (neuf),
`app/src/content/blog/images/facture-electronique-organisme-formation-cover.jpg` (neuf),
`app/src/content/blog/logiciel-organisme-formation.mdx`,
`app/src/content/blog/remplir-bpf-organisme-formation.mdx`,
`app/src/content/blog/numero-declaration-activite.mdx`, `docs/seo/REQUETES.csv`, ce journal.

**Pourquoi :** l'obligation de **recevoir** une facture électronique s'applique depuis le
1er septembre 2026 à toute entreprise établie en France et assujettie à la TVA, organismes de
formation compris. Les 58 articles du blog couvraient le BPF, Qualiopi, l'émargement et le NDA,
mais aucun ne parlait de facturation — vérifié par grep sur `factur|électronique|Chorus|Factur-X`
dans `app/src/content/blog/` et `app/src/pages/` : zéro occurrence sur ce sujet, aucune
cannibalisation avec `/facturation-tva-societe-europeenne/` (TVA intracommunautaire, autre sujet).
Sujet d'actualité : sa valeur décroît chaque semaine.

**Angle retenu :** la seule question que se pose un dirigeant d'organisme — que dois-je avoir en
place avant de recevoir ma première facture électronique. Entonnoir inversé : la réponse (être
raccordé à une plateforme agréée, y avoir déclaré son SIREN) est dans le premier paragraphe.

**Le point qui fait la valeur de l'article :** un organisme de formation exonéré de TVA au titre
des articles 261 à 261 E du CGI n'est **pas** concerné en émission, mais l'est en **réception**,
en tant qu'acheteur professionnel. C'est le contresens le plus répandu du secteur, et il porte
exactement sur la seule obligation déjà en vigueur.

**Sources, vérifiées en direct le 2026-09-05 :**

- [service-public.fr F23208](https://entreprendre.service-public.gouv.fr/vosdroits/F23208) —
  calendrier (réception au 01/09/2026 pour toutes les entreprises ; émission au 01/09/2026 pour
  les grandes entreprises et ETI, au 01/09/2027 pour les PME et micro-entreprises), passage
  obligatoire par une plateforme agréée, quatre nouvelles mentions obligatoires.
- [impots.gouv.fr — « Je n'émets pas de facture, ou je facture sans TVA »](https://www.impots.gouv.fr/professionnel/questions/je-nemets-pas-de-facture-ou-je-facture-sans-tva-suis-je-concerne-par-la)
  — le cas des exonérés 261 à 261 E et celui de la franchise en base.
- [impots.gouv.fr — liste des plateformes agréées](https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees)
  — page mise à jour le 03/09/2026.

**Aucune plateforme n'est nommée dans l'article** : l'article renvoie à la liste officielle de la
DGFiP, qui est la seule à faire foi et qui bouge à chaque immatriculation. Aucun chiffre hors des
trois sources ci-dessus.

**Maillage entrant (3 liens, posés à la main, jamais par script) :**

1. `logiciel-organisme-formation.mdx` — puce « Facturation et financement ».
2. `remplir-bpf-organisme-formation.mdx` — phrase ajoutée sous le tableau des cadres du BPF
   (les cadres B et C se nourrissent de la facturation).
3. `numero-declaration-activite.mdx` — puce « figurer sur vos documents contractuels ».

**Maillage sortant :** `/blog/logiciel-organisme-formation/`, `/blog/numero-declaration-activite/`,
`/blog/convention-de-formation/`, `/blog/remplir-bpf-organisme-formation/`, `/services/audit-ia/`.

**Image :** générée par Cloudflare Workers AI (FLUX.2 klein 9B), coût 0 $. Palette maison
crème/terracotta, aucun texte incrusté.

**Vérifications :** `npm run build` en code de sortie 0, 87 pages, la route
`/blog/facture-electronique-organisme-formation/` générée. 1 158 mots. Quota respecté : deuxième
et dernier article de claudeagency.fr pour la semaine du 31/08 (le premier étant
`agence-claude-comment-choisir`, publié le 04/09).

**Mesure prévue :** au relevé Search Console du jeudi suivant, la page doit compter des affichages
sur une requête de facturation ; à défaut, indexation constatée sous 14 jours.

## 2026-09-04 (93) — `llms.txt` alignée sur la cible de `PRODUCT.md` : la spécialisation n'est plus « exclusive »

**Type :** correction de positionnement (fichier lu par les moteurs IA). Carte 78 du backlog
`visibilite-ops`, déléguée à l'intendant.

**URLs :** https://claudeagency.fr/llms.txt · https://claudeagency.fr/contact/

**Fichiers touchés :** `app/src/pages/llms.txt.ts`, `app/src/pages/contact.astro`, ce journal.

**Pourquoi :** `PRODUCT.md` porte depuis le 04/09 (commit `3b8f6cb`) la nouvelle cible —
agence IA grand public, les organismes de formation en spécialité d'origine et segment fort —
et la page `/claude-agency-en-bref/`, publiée le même jour, la dit en toutes lettres.
`llms.txt`, lui, annonçait encore « Spécialisation exclusive : organismes de formation ».
Un moteur qui lit les deux trouvait une contradiction sur la question la plus simple :
pour qui travaillez-vous. Dérive repérée en publiant la carte 20, signalée à l'entrée 90.

**Ce qui a changé dans `llms.txt` (cinq endroits) :**

1. **Titre** — « Agence IA pour organismes de formation » → « Agence IA et marketing digital
   francophone ».
2. **Paragraphe de résumé (`>`)** — réécrit sur le modèle de `/claude-agency-en-bref/` :
   entreprises, indépendants et équipes ; les OF Qualiopi en spécialité d'origine et segment
   le mieux servi, « une preuve d'expertise, pas une frontière ».
3. **Bloc Identité** — la ligne « Spécialisation exclusive » devient deux lignes : `Clients`
   (large) et `Spécialité d'origine et segment le mieux servi` (les OF), qui dit explicitement
   « pas une limite de périmètre ».
4. **« Ce que fait Claude Agency »** — la phrase d'ouverture ne s'adresse plus aux seuls
   dirigeants d'OF, et les points 1 à 4 ne présument plus que le client est un OF (le détail
   Qualiopi/BPF/émargement reste, en exemple sectoriel).
5. **FAQ « Quelle agence IA choisir pour un organisme de formation ? »** — l'affirmation
   « seule agence francophone exclusivement spécialisée » est remplacée par la preuve
   d'expertise réelle (l'OF Qualiopi à +3 M€ du fondateur), suivie d'une phrase qui dit que
   l'agence travaille aussi hors du secteur de la formation.

Le segment formation n'a été effacé nulle part : c'est le mot « exclusive » qui était faux.

**Second écart traité au passage :** `/contact/` annonçait « Zone d'intervention : France
entière (à distance) », là où le JSON-LD de `BaseLayout` et `llms.txt` disent France, Belgique,
Suisse et Luxembourg. La page dit désormais les quatre pays.

**Vérifications :** `npm run build` en code de sortie 0, 86 pages. `grep exclusi` sur
`app/dist/llms.txt` ne renvoie plus rien.

**Reste à traiter (pas dans le périmètre de la carte 78) :** la `description` du JSON-LD de
`app/src/layouts/BaseLayout.astro` (ligne 31) porte la même dérive — « agence marketing et IA
pour organismes de formation francophones » — et part sur **toutes** les pages du site. Le
`title` et la `description` de l'accueil (`app/src/pages/index.astro`) aussi. Carte à ouvrir.

## 2026-09-04 (92) — Deux introductions coupées en deux, restes de la réécriture du lot `1bdf91f`

**Type :** correction de contenu (lisibilité, pages publiques). Carte 76 du backlog
`visibilite-ops`.

**URLs :** https://claudeagency.fr/blog/claude-pour-le-marketing/ ·
https://claudeagency.fr/blog/referencer-formation-mon-compte-formation/

**Fichiers touchés :** `app/src/content/blog/claude-pour-le-marketing.mdx`,
`app/src/content/blog/referencer-formation-mon-compte-formation.mdx`, ce journal.

**Pourquoi :** le commit `1bdf91f` du 04/09 (carte 69) a posé un nouveau paragraphe
d'introduction en tête de 30 articles. Sur deux d'entre eux, l'ancien paragraphe n'a pas
été retiré en entier : il en restait un morceau qui démarrait **au milieu d'une phrase**,
en minuscule, juste sous le nouveau texte. Visible par n'importe quel visiteur, sur des
pages qui portent des requêtes ciblées (« claude pour le marketing », « mon compte
formation »).

**Ce qui a été retiré :**

1. `claude-pour-le-marketing.mdx` — fragment « préféré de nombreuses équipes marketing : … »
   et la phrase d'annonce qui suivait, devenue un doublon du nouveau paragraphe (elle
   répétait « les quatre pannes qu'on rencontre vraiment » à cinq lignes d'intervalle).
2. `referencer-formation-mon-compte-formation.mdx` — fragment « chercher, et financer, une
   formation. » et le membre de phrase « , son financement en poche », déjà écrit par le
   nouveau paragraphe deux lignes plus haut.

**Les 28 autres articles du lot sont indemnes.** Balayage des 30 fichiers de `1bdf91f`
(premiers paragraphes, recherche de paragraphes ouvrant en minuscule ou de doublons de
l'intro), puis contre-vérification mécanique sur l'ensemble de `app/src/content/blog/` :
aucun autre reste. Les autres remontées de ce contrôle sont des retours à la ligne en
milieu de paragraphe, pas des coupures.

**Vérifié :** `npm run build` dans `app/`, code de sortie 0, 86 pages construites.

## 2026-09-04 (91) — `/donnees-prospection/` remise au niveau du registre interne : sous-traitants, base légale, vraies sources

**Type :** correction de contenu (conformité RGPD, page publique). Carte 57 du backlog
`visibilite-ops`, déléguée par Julien à l'intendant le 2026-09-04.

**URL :** https://claudeagency.fr/donnees-prospection/

**Fichiers touchés :** `app/src/pages/donnees-prospection.astro` (réécrite),
`docs/prospection/registre-traitements.md` (registre interne remis à jour), ce journal.

**Pourquoi :** c'est la page qu'ouvre un destinataire agacé pour savoir qui le contacte et
avec quoi. Le jury du 31/08 y avait confirmé quatre défauts sur 23 lignes — la page en disait
moins que le registre interne, et sur un point elle se contredisait.

**Les quatre défauts, et ce qui a été écrit à la place :**

1. **Sous-traitant d'envoi non nommé.** Le registre (`registre-traitements.md:15`) écrivait
   « Saleshandy comme sous-traitant technique d'envoi », la page publique ne nommait personne.
   Une section « À qui elles sont transmises » nomme désormais les trois : **Saleshandy**
   (e-mail), **Closely** (LinkedIn), **Apify** (vérification technique des adresses). Closely
   et Apify manquaient aussi au registre interne : ajoutés.
2. **Base légale absente** des deux pages publiques, alors que le registre la fixe
   (« Intérêt légitime, RGPD art. 6.1.f ») et que ce même registre désigne
   `/donnees-prospection` comme le lieu de l'information. Une section « Sur quelle base
   légale » l'écrit, avec les trois conditions CNIL B2B et le responsable de traitement
   (BULGARIA EDUCATION EOOD), lié aux mentions légales.
3. **Phrase sur les sources fausse et auto-contradictoire.** L'ancienne ligne disait
   « Coordonnées issues de … (données SIRENE), jamais d'un fichier acheté ni de données
   collectées sur LinkedIn hors des règles du site ». Deux problèmes. **(a)** SIRENE a fourni
   les organismes, pas les adresses e-mail : celles-ci ont été **déduites** du motif
   `prénom.nom@domaine`, sans confrontation à un serveur — taux de réussite mesuré 18 %
   (`visibilite-ops/recherche/2026-08-25-verification-liste-of.md`). La page le dit maintenant,
   et explique pourquoi un message peut arriver à la mauvaise adresse. **(b)** « hors des règles
   du site » était une clause d'audit recopiée du registre, qui disait « jamais » et « sauf »
   dans la même phrase — alors qu'un canal LinkedIn claudeagency tourne depuis le 27/08
   (segment `of` de `data/prospection-registre.csv`, campagne Closely). La page assume
   désormais **deux** sources publiques : l'annuaire des entreprises, et les profils et
   contenus publiés publiquement. La clause ambiguë est supprimée, remplacée par ce qui est
   vrai : aucune donnée extraite d'une zone réservée aux membres connectés.
4. **Données détenues sous-déclarées.** « nom, organisme, contact » est devenu la liste
   réelle : nom du décideur, organisme, SIRET, région, thématique, téléphone et e-mail
   professionnels, profil LinkedIn public, et l'élément public qui a motivé la prise de
   contact.

**Registre interne corrigé au passage :** ligne « Données traitées » et ligne
« Destinataires » alignées sur la réalité, ajout du lot « Vague 2 — canal LinkedIn », et
remplacement de la phrase absolue de fin. Sans ça, la page repartait en contradiction avec sa
propre source de vérité au prochain audit.

**Vérifié :** `npm run build` dans `app/`, code de sortie 0, 86 pages construites. Page
indexable, comme toutes les pages du site.

## 2026-09-04 (90) — Page d'identité « Claude Agency en bref », pour la récupération directe par les IA

**Type :** publication. Carte 20 du backlog `visibilite-ops`, déléguée par Julien à l'intendant
le 2026-09-04.

**URL :** https://claudeagency.fr/claude-agency-en-bref/

**Fichiers touchés :** `app/src/pages/claude-agency-en-bref.astro` (créé),
`app/src/pages/index.astro` (un lien sous la FAQ), `app/src/pages/agence-marketing-claude.astro`
(un lien dans le bloc « Explorer »), `app/src/components/Footer.astro` (nav « Navigation »),
`app/src/pages/llms.txt.ts` (une ligne dans « Pages principales »), ce journal.

**Pourquoi :** quand un moteur conversationnel est interrogé sur une marque, il va lire le site
de la marque en premier — *direct retrieval*. Le site n'avait aucune page où les cinq réponses
de base soient réunies : qui nous sommes, ce que nous faisons, pour qui, ce que nous ne faisons
pas, comment nous joindre. C'était éparpillé entre `/a-propos/`, `/services/`,
`/mentions-legales/`, `/facturation-tva-societe-europeenne/` et `/contact/` — donc le moteur
complétait ailleurs. Source de la carte : Nathan Gotch, « How fix technical SEO issues with AI
(2026) », https://www.youtube.com/watch?v=y-lyVyv800E, 2026-08-25 — démonstration filmée par
l'auteur sur son propre site, un cas et non une mesure.

**Arbitrage — nouvelle page plutôt que réécriture de `/a-propos/` :** `/a-propos/` existe et
raconte l'histoire du fondateur, avec images et Schema `Person`. C'est un autre travail : une
page de récit chaud, pas une fiche de faits. La transformer aurait détruit un contenu E-E-A-T
qui fonctionne pour en fabriquer un autre, au lieu d'ajouter ce qui manquait. Les deux se
lient mutuellement et ne se doublonnent pas — `/a-propos/` garde le récit, `/claude-agency-en-bref/`
prend les faits.

**Fait :**
- Page en cinq sections, une par question, chaque section adressable par ancre
  (`#qui-nous-sommes`, `#ce-que-nous-faisons`, `#pour-qui`, `#ce-que-nous-ne-faisons-pas`,
  `#comment-nous-joindre`). Aucun chiffre nouveau : tout est repris de `PRODUCT.md`,
  `mentions-legales.astro`, `facturation-tva-societe-europeenne.astro`, du contenu des huit
  services et de `docs/seo/kit-identite.md` §1.
- La section « Pour qui » suit le positionnement en vigueur (`PRODUCT.md`, commit `3b8f6cb` du
  04/09) : agence IA grand public, organismes de formation en spécialité d'origine et segment
  fort — pas « spécialisation exclusive ».
- « Ce que nous ne faisons pas » en cinq points vérifiables, dont le plus important : Claude
  Agency n'est pas un organisme de formation, ses prestations ne sont imputables ni sur le CPF,
  ni sur un budget OPCO, ni sur une aide France Travail. Repris mot pour mot du sens de
  `facturation-tva-societe-europeenne.astro` (lignes 28-29 et 112-113).
- Aucune promesse de position ni de résultat chiffré : la page dit explicitement que personne
  ne peut en garantir.
- Schema : `BreadcrumbList` seul. Aucun `FAQPage` ni `HowTo` (garde-fou du dépôt), bien que la
  page ait une forme de questions-réponses. `Organization`, `WebSite` et `ProfessionalService`
  restent injectés par `BaseLayout`.
- Page indexable comme le reste du site, aucun `noindex` — vérifié dans le HTML construit.
- Maillage posé à la main : accueil (sous la FAQ), `/agence-marketing-claude/` (bloc
  « Explorer »), pied de page (donc toutes les pages), `llms.txt`. La page renvoie de son côté
  vers `/a-propos/`, les huit services, `/agence-marketing-claude/`, `/diagnostic/`,
  `/contact/`, `/mentions-legales/`, `/confidentialite/`,
  `/facturation-tva-societe-europeenne/`, `/blog/` et le baromètre.

**Mesure :** `cd app && npm install && npm run build` → **code de sortie 0**, 86 pages,
`/claude-agency-en-bref/index.html` dans la sortie. Contrôles sur `dist/` : la page est dans
`sitemap-0.xml`, son canonical est `https://claudeagency.fr/claude-agency-en-bref/`, elle ne
porte aucun `noindex`, et le lien apparaît dans `index.html`, `agence-marketing-claude/index.html`,
`contact/index.html` (pied de page) et `llms.txt`. `postbuild` IndexNow ignoré en local,
comme prévu.

**Réserve — dérive repérée, non corrigée ici :** `llms.txt.ts` annonce encore « Spécialisation
exclusive : organismes de formation » et un titre « Agence IA pour organismes de formation »,
ce que `PRODUCT.md` a périmé le 04/09. La page publiée aujourd'hui dit l'inverse : un moteur qui
lit les deux trouvera une contradiction sur la cible. La carte 20 renvoyait à « la carte 7 » pour
`llms.txt`, mais cette carte-là portait sur `llms.txt` de **claudepartners.fr** et elle est close
depuis le 04/09 : aucune carte ne couvrait donc la reprise de `llms.txt` côté claudeagency.fr.
Elle a été ouverte en **carte 78** du backlog `visibilite-ops`. Pas traitée ici : réécrire le
positionnement déclaré de tout le fichier dépasse le périmètre de la carte 20, qui portait sur
une page. Même remarque, plus petite : `/contact/` annonce « zone
d'intervention : France entière », là où le JSON-LD de `BaseLayout` et `llms.txt` disent France,
Belgique, Suisse et Luxembourg.

**Suite :** au relevé du 2026-09-11, vérifier que la page est indexée. Test de fond à faire à la
main : interroger un moteur conversationnel sur « Claude Agency » et regarder si les réponses
« ce qu'ils ne font pas » et « pour qui » proviennent bien de cette page.

## 2026-09-04 (89) — Nouvel article « Agence Claude : comment la choisir », cible grand public

**Type :** publication. Carte 10 du backlog `visibilite-ops`, déléguée par Julien à l'intendant
le 2026-09-04.

**URL :** https://claudeagency.fr/blog/agence-claude-comment-choisir/

**Fichiers touchés :** `app/src/content/blog/agence-claude-comment-choisir.mdx` (créé, 1 358 mots),
`app/src/content/blog/images/agence-claude-choisir-cover.jpg` (créé),
`app/src/pages/agence-marketing-claude.astro` (un lien contextuel ajouté), `REQUETES.csv`,
`BACKLOG.md`, ce journal.

**Pourquoi :** deuxième article de l'élargissement grand public (arbitrage du 22/08, répercuté
dans `PRODUCT.md` le 04/09, commit `3b8f6cb`). Requête visée : « agence claude », mesurée
**17e** au relevé DataForSEO du 2026-09-03 (`visibilite-ops/data/2026-09-03-positions.md`),
URL classée `/agence-marketing-claude/`. Aucune ligne « agence claude » n'existait dans
`REQUETES.csv` : la requête n'était couverte par aucune page dédiée. La requête « agence ia »
est explicitement hors périmètre — elle revient à l'autre produit.

**Arbitrage — pourquoi l'article ne vise pas la tête de requête :** la landing
`/agence-marketing-claude/` tient déjà la 17e place sur « agence claude ». Écrire un second
article sur la même intention commerciale rejouerait exactement le défaut diagnostiqué le 30/08
sur « claude pour le marketing » (entrée #85) : deux pages, une intention, la landing gagne,
l'article n'entre jamais dans le top 100. L'article prend donc l'intention **informationnelle**
du même cluster — *comment choisir une agence qui travaille avec Claude, et repérer celles qui
se contentent de le dire* — et la landing garde l'intention commerciale. Même méthode que le
30/08 : séparation des intentions, pas fusion.

**Fait :**
- Article de 1 358 mots, écrit pour un dirigeant de PME ou un indépendant **non organisme de
  formation** : les trois sens de « agence Claude », sept questions vérifiables à poser en
  rendez-vous, trois signaux d'alerte, ce que ça change sur délais et prix, ce que Claude ne
  fait pas, et un paragraphe qui dit quand une agence ne sert à rien.
- Premier paragraphe en entonnoir inversé (règle `LECONS.md` du 04/09) : la réponse d'abord,
  aucun chiffre qui ne soit démontré plus bas.
- Source externe citée : position de Google sur le contenu produit par IA, Google Search
  Central, 8 février 2023. Les délais annoncés sont donnés comme **nos délais constatés**,
  jamais comme une moyenne de marché — aucun chiffre inventé, aucune promesse de position.
- Maillage posé à la main, jamais par script : article → `/agence-marketing-claude/` (deux
  fois, dont la conclusion) et → `/blog/claude-pour-le-marketing/` ; landing → article, dans
  un paragraphe contextuel sous « Claude, c'est quoi exactement ? ».
- Aucun Schema `FAQPage` ni `HowTo` ajouté (garde-fou du dépôt).
- Couverture produite par IA : quota gratuit Workers AI de Cloudflare épuisé (HTTP 429 sur les
  deux comptes du coffre), repli sur fal.ai (FLUX schnell), désigné comme secours dans le
  coffre. Image 1024×576, sans texte ni visage, tons chauds conformes à `DESIGN.md`.

**Mesure :** `cd app && npm install && npm run build` → **code de sortie 0**, 85 pages, la page
`/blog/agence-claude-comment-choisir/` figure dans la sortie. `postbuild` IndexNow ignoré en
local, comme prévu. Position de départ sur « agence claude » : landing 17e au 03/09 — l'article
part de zéro, il n'a pas encore de position.

**Suite :** au relevé du 2026-09-11, vérifier laquelle des deux URL est classée sur « agence
claude ». Si l'article n'apparaît pas mais que la landing recule, la séparation d'intentions
n'a pas pris et il faut trancher entre les deux pages, pas en écrire une troisième.

## 2026-08-31 (87) — E7 : passer le relais, les rendez-vous de septembre

**Type :** documentation de passage de relais, `docs/suite-sprint-septembre.md`. Aucune
publication sur le site. Entrée rétroactive : commit `a631281` du 31/08/2026, jamais loggé ici,
repéré par le contrôle de fin de sprint (C10) du 31/08/2026.

**Fichiers touchés :** `docs/suite-sprint-septembre.md` (créé), `docs/points-etape-sprint.md`
(routines F5/F6), ce journal.

**Fait :** `docs/suite-sprint-septembre.md` créé avec 4 fiches actives (B5, C9, B8, webinaire) et
2 points en suspens signalés (D0d, D21 — dépendants du chantier D, à l'arrêt).

**Pourquoi :** passage de relais à SOLOHERY après la fin du sprint le 27/08/2026.

**Mesure :** 2 routines post-sprint ajoutées (F5, F6).

**Suite :** SOLOHERY doit créer les 4 rappels calendrier, rédiger les posts LinkedIn 5 à 10, et
documenter l'outil de visio du webinaire avant le 16/09.

---

## 2026-08-28 (86) — E6 : état des outils et des accès à mi-parcours

**Type :** constat de mi-parcours, tableau ajouté à `docs/points-etape-sprint.md`. Aucune
publication sur le site. Entrée rétroactive : commit `d64d860` du 28/08/2026, jamais loggé ici,
repéré par le contrôle de fin de sprint (C10) du 31/08/2026.

**Fichiers touchés :** `docs/points-etape-sprint.md`, ce journal.

**Fait :** tableau des 3 familles (outils, adhésions/fiches, liens) ajouté à
`docs/points-etape-sprint.md`.

**Pourquoi :** contrôle de mi-parcours demandé par le plan.

**Mesure :** Saleshandy actif mais séquence à l'arrêt (9 boîtes, healthScore 95-97) ; Ahrefs
bloqué « Insufficient plan » ; Ubersuggest inaccessible (3 échecs) ; 3 démarches de netlinking
parties, 1 en ligne.

**Suite :** aucun accès du plan ne réclame de règlement au 28/08.

---

## 2026-08-30 (85) — Cannibalisation « claude pour le marketing » : l'article rendu autonome, le lien manquant posé depuis la landing

**Type :** arbitrage + réécriture + maillage. Carte 5 du backlog `visibilite-ops`.
**URLs touchées :** `/blog/claude-pour-le-marketing/` (réécrite, 828 → 1 677 mots) et
`/agence-marketing-claude/` (un lien contextuel ajouté).

**La question posée était : sous-exploitation ou cannibalisation ? Réponse : cannibalisation.**
Trois faits concordants, aucun n'étant suffisant seul :

1. **La SERP consolide sur la landing.** Sur « claude pour le marketing », l'URL classée est
   `/agence-marketing-claude/` — 66e, puis 69e (relevé DataForSEO du 22/08), puis 72e (relevé du
   27/08, `visibilite-ops/data/2026-08-27-positions.md`). L'article, dont c'est pourtant le
   slug exact, n'apparaît jamais dans le top 100. Google a bien deux pages et en a choisi une.
2. **Les FAQ se recouvraient mot pour mot.** Les 3 questions de l'article — contenu IA pénalisé
   par Google, Claude ou ChatGPT, combien ça coûte — sont les questions 3, 2 et 6 de la FAQ de la
   landing, avec des réponses de même sens. Deux pages qui répondent la même chose à la même
   question ne peuvent pas classer toutes les deux.
3. **Le maillage était à sens unique, et dans le mauvais sens.** L'article envoyait 3 liens vers
   la landing, dont un en ancre exacte (« agence marketing pilotée par Claude ») dès le premier
   paragraphe. La landing — 1re sur « agence marketing claude », 15e sur « agence claude », donc
   la page la plus forte du cluster — n'envoyait **aucun** lien vers l'article, tout en liant
   deux autres articles du blog. L'article votait pour la landing, la landing ne votait pas pour
   lui.

**Ce qui a été corrigé, dans cet ordre (la cause d'abord).**

- **Le lien manquant est posé** : `/agence-marketing-claude/` lie désormais vers l'article, en
  contextuel dans la section « Claude, c'est quoi exactement ? », au paragraphe qui demandait
  déjà « Envie de voir comment nous l'utilisons au quotidien ? » — l'endroit où le lecteur pose
  la question à laquelle l'article répond. Pas dans le bloc « Explorer » : un lien de navigation
  en pied de page pèse moins qu'un lien dans le corps du texte.
- **Les 3 questions de FAQ dupliquées sont supprimées** de l'article, pas de la landing : la page
  commerciale garde les objections commerciales. Remplacées par 4 questions que la landing ne
  traite pas et ne traitera pas (faut-il coder, comment vérifier une production IA, délai avant
  effet SEO, par quel canal commencer).
- **Les liens sortants vers la landing passent de 3 à 1**, en fin d'article, dans l'option
  « vous voulez déléguer ». L'ancre exacte du premier paragraphe est retirée.
- **L'article est approfondi sur ce qu'une page de vente ne peut pas porter** : une semaine de
  travail détaillée jour par jour, et une section « les quatre pannes qu'on rencontre vraiment »
  (chiffre faux affirmé avec aplomb, chiffre recopié qui vieillit, correction de masse qui
  écrase, tentation du volume) avec la parade de chacune. Intention informationnelle nette d'un
  côté, intention commerciale de l'autre.

**Aucun Schema FAQPage ajouté** (garde-fou projet) : les questions restent en Markdown, la
landing conserve son `Service` + `BreadcrumbList` inchangés.

**Aucun chiffre nouveau inventé.** Les trois données chiffrées de l'article (3 M€ de CA, relances
2 h/jour → 2 h/mois, tunnel 5-6 h → quelques minutes) sont celles déjà publiées depuis le
13/07/2026 ; elles sont reprises telles quelles, pas augmentées.

**Ce qui reste à vérifier, et quand.** Le seul juge est le prochain relevé de positions sur
« claude pour le marketing » : l'URL classée doit basculer de `/agence-marketing-claude/` vers
`/blog/claude-pour-le-marketing/`. Tant que la landing reste l'URL classée, la cannibalisation
n'est pas levée, quelle que soit la position affichée. À relire au relevé du **2026-09-05** au
plus tôt, et à considérer comme non tranché avant.

**Fichiers touchés :** `app/src/content/blog/claude-pour-le-marketing.mdx`,
`app/src/pages/agence-marketing-claude.astro`, `docs/seo/REQUETES.csv` (ligne « claude pour le
marketing » : `date_maj` 2026-08-30, `mots` 1677), `docs/seo/BACKLOG.md` (§0), ce journal.

## 2026-08-28 (84) — Correction E2 suite passe de preuves (ultracode) : gabarit, priorité, constat DNS

**Type :** correction, `docs/points-etape-sprint.md` section E2, sur consigne de Julien après une
vérification indépendante (npm run build, curl, DNS live, lecture directe du Sheet via Composio).
Le Sheet lui-même n'est **pas** touché — consigne explicite : focus sur l'onglet F, chantier D à
l'arrêt, on n'écrit rien dans D0b (ni Statut ni Preuve).

**1. Gabarit du verdict.** « Verdict rétrospectif : NO-GO » ne collait pas au gabarit littéral exact
attendu. **Corrigé :** « Envoi du 25/08 : no-go. »

**2. Constat DNS non reflété dans le Sheet.** Vérification DNS en direct (résolveur 8.8.8.8,
28/08/2026) : 2 des 4 CNAME `go` de la tâche D0b existent déjà (`go.claudeagency.fr` et
`go.claudepartners.fr` → `watch.saleshandy.com`), origine et date de pose inconnues — alors que le
Statut Sheet D0b reste « Bloqué » et que le rapport affirmait qu'aucun des 4 n'était créé. **Ajouté**
comme simple constat d'observation dans le document (bloc 1 d'E2), sans corriger le Sheet.

**3. Priorité rang 1 réévaluée.** Le document donnait deux tâches ex æquo en tête (D0b et A2, quinze
jours de retard chacune) — le critère demandait une tâche unique. D0b dépend du chantier D, suspendu
par Julien depuis le 25/08 (campagne Saleshandy à l'arrêt) : son urgence relative n'est plus la même
tant que ce chantier ne reprend pas. **Corrigé :** A2 (fiche Google) devient la seule tâche en tête,
avec explication du retrait de D0b et un renvoi explicite vers le chantier F, seul chantier actif,
comme nouveau focus opérationnel.

**Fichiers touchés :** `docs/points-etape-sprint.md` uniquement (section E2). Sheet SOLOHERY non
modifié.

## 2026-08-28 (83) — Correction E1 suite passe de preuves (E5, ultracode)

**Type :** correction, tâche E1 du Sheet SOLOHERY. 2 non-conformités relevées par une vérification
indépendante (protocole E5/ultracode) sur `docs/points-etape-sprint.md` et la cellule Preuve
(colonne N) de la ligne E1 de l'onglet `E · Pilotage`.

**Non-conformité 1 (critère « les décisions collées dans Preuve »).** La Preuve d'E1 ne contenait
qu'une description de la rédaction du bloc 3 (« rédigé avec une correction... »), pas les décisions
elles-mêmes. **Corrigé :** la cellule contient maintenant le tableau réel des 3 blocages (D0b, D11,
A2/A14 — décision, première action, date), recopié depuis `docs/points-etape-sprint.md`.

**Non-conformité 2 (critère « aucune [décision] ne renvoie à Julien »).** La décision A2/A14
renvoyait explicitement à Julien (« attendre la réponse de Julien sur la fiche mystère »), en
contradiction directe avec le critère. **Ce renvoi est maintenu**, mais documenté comme exception
légitime, dans le fichier et dans la Preuve : établir l'origine de la fiche Google Business mystère
suppose un accès direct au compte Google que SOLOHERY n'a pas — un fait technique à constater, pas
un arbitrage de gestion que SOLOHERY pourrait trancher seul avec les informations disponibles,
contrairement à D0b et D11 (deux vraies décisions internes, tranchées seul). La règle vise à éviter
les décisions renvoyées par confort, pas les vérifications matériellement hors de portée.

**Fichiers touchés :** `docs/points-etape-sprint.md` (ajout du paragraphe d'exception après le
tableau de décisions, bloc 3 d'E1) et la cellule Preuve d'E1 dans le Sheet (mise à jour via
Composio, relue après écriture pour confirmer).

## 2026-08-28 (82) — E3 : bilan de fin de sprint SOLOHERY

**Objectif 5 domaines référents : ATTEINT - 8 domaines, source Ahrefs (Domain Rating, Backlink Checker), relevé le 27/08.**

**Type :** bilan (synthèse de fin de sprint), tâche E3 du Sheet SOLOHERY. Aucune cellule Statut/Preuve
du Sheet modifiée par ce document — uniquement `docs/seo/JOURNAL.md`.

**URLs :** aucune publication — synthèse de `docs/seo/JOURNAL.md` (entrées 69-81), du Sheet SOLOHERY
(`1BZmaiFA10tY9aKVUQkHnZRt_1RjXz2AJ26cke2gfevg`, onglet Mesures relu en direct ce jour) et de
`docs/points-etape-sprint.md` (E2, E6).

**Nuance sur le « 8 » (déjà actée en E2, à ne pas perdre) :** ce chiffre est une **mesure globale**
Ahrefs (Domain Rating, Backlink Checker), tout l'historique du domaine confondu — y compris 2 sites
de spam jamais sollicités (linkgenius.shop DR21, ranksupreme.shop DR17). Le **rendement propre à la
campagne de netlinking F1-F6** lancée ce sprint est très inférieur : **1 domaine référent confirmé
en ligne** (annuaireduconseil.com, lien vérifié le 17/08) sur **20 candidats qualifiés**, 2 autres
démarches envoyées sans confirmation à ce jour (digiformag.com, zoneia.fr), 17 jamais encore
contactés (quota mensuel d'envoi de 2/mois tenu). Le tableau F6 du Sheet l'annonçait déjà lui-même
avant le fait : ce chantier n'apporte aucun domaine référent d'ici le 27/08 (délai de publication de
1 à 4 semaines après un envoi). Les deux chiffres — 8 global, 1 propre à F1-F6 — mesurent deux
populations différentes ; ne pas les opposer comme une contradiction.

**Vérification de la colonne « Après » (étape 2 de la tâche) — résultat négatif, pas la confirmation
attendue.** Relecture en direct du Sheet (`GOOGLESHEETS_BATCH_GET`, `Mesures!A17:H36`, 28/08/2026),
pas une relecture du journal seul. Sur les 15 lignes E18:E23 et E28:E36, **3 cellules restent
vides** : **E30** (abonnés page LinkedIn — nombre simplement non relevé ; **correction du 28/08 :**
la page LinkedIn (B1) est créée et en ligne depuis le 15/08/2026
(https://www.linkedin.com/company/claude-agency-fr/) et B10 (alignement `sameAs`) est fait depuis le
16/08/2026 — vérifié directement dans l'onglet `B · Notoriété` du Sheet, Statut « Fait » sur les
deux lignes. Une première version de cette entrée affirmait à tort que la page n'existait pas
encore ; l'annotation « 0 au 12/08 parce que la page n'existe pas encore » lue dans la cellule E30
décrit l'état du 12/08, pas l'état actuel — erreur de lecture corrigée ici avant tout push), **E34**
(LCP mobile — deux méthodes de mesure tentées et documentées en entrée 81, échec des
deux, cellule volontairement laissée vide plutôt qu'un chiffre inventé) et **E36** (rendez-vous
obtenus — mesure à la main par Julien sur son agenda, hors accès de Claude Code). Les 12 autres
cellules du périmètre (E18, E19, E20, E21, E22, E23, E28, E29, E31, E32, E33, E35) sont bien
remplies, valeurs conformes à celles communiquées pour cette tâche. Ces 3 vides ne sont pas un
oubli : ils sont documentés comme volontaires dans l'entrée 81 et dans la colonne « Où le lire » du
Sheet lui-même (outil ou accès hors du périmètre de Claude Code). Signalé plutôt que rapporté comme
« rien à signaler ».

**Tableau des 15 indicateurs, 12/08 → 27/08 :**

| Indicateur | Cible | Avant (12/08) | Après (27/08) | Écart | Verdict | Mesure |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Domaines référents | 5 | 0 | 8 | +8 | ✅ ATTEINT | mesuré (Ahrefs manuel, mesure globale — voir nuance ci-dessus) |
| Fiches d'entreprise en ligne et vérifiables | 6 | 0 | 1 | +1 | ❌ NON ATTEINT | mesuré |
| Posts publiés sur la page LinkedIn | 10 | 0 | 4 | +4 | ❌ NON ATTEINT | mesuré |
| Articles avec maillage interne posé | 20 | 0 | 20 | +20 | ✅ ATTEINT | mesuré (`git log`, entrée 81) |
| E-mails de prospection envoyés | 50 | 0 | 32 | +32 | ❌ NON ATTEINT | mesuré (Saleshandy, voir « Ce qui n'a pas marché ») |
| Boîtes d'envoi connectées à Saleshandy | 4 | 0 | 4 | +4 | ✅ ATTEINT | mesuré |
| Backlinks (tous sites confondus) | — | 0 | 11 | +11 | — | mesuré (Ahrefs manuel) |
| Autorité de domaine (Domain Rating) | — | 1 | 2,1 | +1,1 | — | mesuré, mais échelle non comparable au 1/100 Ubersuggest du 12/08 (entrée 77) |
| Abonnés page LinkedIn | — | 0 | *(vide)* | *(vide)* | — | **inconnu** — page en ligne depuis le 15/08 (B1/B10 faits), nombre d'abonnés simplement non relevé |
| Clics Google (88 j) | — | 49 | 9 | -40 | — | mesuré (Search Console) |
| Impressions Google (88 j) | — | 2797 | 2081 | -716 | — | mesuré (Search Console) |
| Position moyenne Google | — | 33,3 | 52,1 | +18,8 (dégradation) | — | mesuré (Search Console) |
| LCP mobile de l'accueil (s) | réf. < 2,5 | 4,2 | *(vide)* | *(vide)* | — | **inconnu** — 2 méthodes tentées, 2 échecs (entrée 81) |
| Réponses positives à la prospection | — | 0 | 0 | 0 | — | mesuré (Saleshandy) |
| Rendez-vous obtenus | — | 0 | *(vide)* | *(vide)* | — | **inconnu** — agenda Julien, hors accès Claude Code |

**Ce qui n'a pas marché, et pourquoi.**

- **Campagne de prospection Saleshandy (D5/D7).** 32 e-mails partis sur 50 contacts importés (18
  jamais envoyés, campagne suspendue le 25/08 avant leur départ). Sur les 32 partis : 12 délivrés,
  19 rebonds (14 block + 5 hard), 1 échec — **59 % de taux de rebond**, mesuré directement dans
  Saleshandy (`get_sequence_stats`, séquence `glwGO3M0w6`, entrée 81). Cause identifiée dans le point
  d'étape E2 : 55 des 100 adresses de la liste étaient **reconstituées** au format prénom.nom@,
  jamais vérifiées, faute de crédit sur le vérificateur Saleshandy (D11, bloqué depuis le 22/08,
  décision assumée d'envoyer sans nettoyage). La liste n'a jamais été nettoyée en amont : c'est la
  cause directe du rebond, pas un problème de délivrabilité générale des boîtes (D0c/D0e en feu
  vert). Julien a suspendu la campagne le 25/08 sur ce constat. **D7 (bilan chiffré Saleshandy) n'a
  pas été fait comme tâche séparée : sans objet depuis la suspension** — ce paragraphe et E22 du
  tableau ci-dessus en tiennent lieu.
- **Indicateurs Search Console en recul, pas seulement une position dégradée.** Les trois chiffres
  du tableau ci-dessus (clics -40, impressions -716, position +18,8) reculent ensemble sur la
  fenêtre 88 jours, recoupé sur une seconde fenêtre indépendante en entrée 81 (même ordre de
  grandeur, donc pas un artefact du jour de mesure). Aucune cause tranchée à ce stade : signalé pour
  que le chantier C (SEO on-site) ou un futur audit y regarde avant le prochain point d'étape — voir
  aussi l'hypothèse ouverte en entrée 65 (30-40 articles publiés d'un coup le 30/06).

**Bloc 4 — état des 3 familles d'accès (E40-E42), reporté depuis `docs/points-etape-sprint.md`,
section E6 (relevé du 28/08/2026) :**

| Famille | Ce qui marche | Ce qui est bloqué | Palliatif |
| :--- | :--- | :--- | :--- |
| **1. Outils** | Saleshandy (9 boîtes connectées, healthScore 95-97, testé en direct le 28/08 — séquence à l'arrêt sur décision, pas une panne) ; Search Console (connecteur actif) ; connecteurs MCP Google Sheets/Composio (actifs, preuve directe) | Ubersuggest (3 échecs de scraping confirmés) ; Ahrefs API du plan connecté (« Insufficient plan », 4 échecs) ; TrulyInbox (inconnu, dernière preuve du 14/08, 14 jours périmée) | Ahrefs/Ubersuggest remplacés par un relevé manuel sur ahrefs.com (SOLOHERY, entrée 77) ; TrulyInbox sans palliatif nécessaire tant que la campagne reste à l'arrêt |
| **2. Adhésions et fiches** | A3, A4, A5, A6, A11 : 5 accès libres et gratuits, aucune contrepartie financière relevée | A2 (bloqué, en attente de l'arbitrage de Julien — fiche Google naturopathie vs vitrine Claude Agency) ; A7/A8 (relancées le 18/08, sans réponse) ; A10 (statut « Fait » mais Preuve vide, inconnu) | A2 en pause explicite ; A7/A8 à relancer puis passage « Sans objet » si toujours muettes ; A10 à documenter avant de conclure |
| **3. Liens** | 1 démarche confirmée en ligne (annuaireduconseil.com, lien vérifié) sur 20 sites qualifiés | 2 démarches envoyées sans confirmation (digiformag.com, zoneia.fr) ; 17 sites qualifiés jamais contactés, quota mensuel d'août déjà atteint | Cadence du plan tenue telle quelle (2 en août / 3 en septembre / 3 en octobre / 4/mois ensuite), aucune accélération pour compenser |

**Aucun des 3 accès en attente (A2, A7/A8, A10) ne réclame de règlement au 28/08** — signalé dans
l'entrée E6 source, repris ici tel quel.

**Mesure :** mesuré pour les 12 cellules remplies du tableau (sources détaillées ci-dessus, la
plupart déjà mesurées en entrée 81 et reprises sans nouveau relevé) ; **inconnu**, explicitement,
pour E30/E34/E36.

**Suite :** les 3 cellules vides (E30, E34, E36) restent à combler par SOLOHERY, hors périmètre
Claude Code (création de la page LinkedIn, clé API PageSpeed ou relevé manuel, agenda de Julien).
Les deux points ouverts de l'entrée 81 restent également en attente d'arbitrage SOLOHERY : le sens
à donner au recul Search Console, et la méthode de mesure du LCP mobile.

---

## 2026-08-28 (81) — Onglet Mesures rempli (colonne « Après ») : verdict du sprint à 3/6, deux écarts signalés avant écriture

**Type :** mesure — colonne « Après (27/08) » de l'onglet Mesures du Sheet SOLOHERY (cellules
E19, E21-E23, E31-E33, E35). Pas de publication sur le site, aucun fichier du dépôt modifié.

**URLs :** aucune — écriture directe dans le Google Sheet
(id `1BZmaiFA10tY9aKVUQkHnZRt_1RjXz2AJ26cke2gfevg`, onglet Mesures).

**Fait, chiffre par chiffre :**
- **E19 — Fiches d'entreprise en ligne et vérifiables : 1** (mesuré, source : tableau A15 déjà
  produit le 28/08, entrée (78) de ce journal — réutilisé tel quel, pas rerelevé). Sur les 6
  fiches A2/A3/A4/A5/A6/A11 : seule A4 (Annuaire du Conseil) affiche publiquement les trois champs
  nom + adresse + téléphone. A2 (adresse indisponible), A3 (téléphone absent), A5 et A11
  (téléphone masqué derrière un bouton/formulaire), A6 (bloquée par Cloudflare) n'affichent pas
  les trois. Cible 6 → **NON ATTEINT**.
- **E21 — Articles avec maillage interne posé : 20** (mesuré, source : `git log`, 4 commits
  `9d24b84`/`82f1737`/`a45cd1e`/`605701d` du 19/08/2026, « feat(blog): maillage interne lot 1-4/4 »,
  3 liens par article choisis à la main d'après `docs/seo/maillage-interne-2026-08-19-proposition.md`
  — confirmé fait par Julien lui-même, pas par script). Les 20 fichiers :
  `accessibilite-formation-ia`, `ai-act-organisme-formation`, `cas-usage-claude-organisme-formation`,
  `claude-ai-en-francais`, `claude-pour-le-marketing`, `evaluer-apprenants-ia`,
  `feuille-emargement`, `formation-autofinancee-france-travail`, `formation-claude-code`,
  `formation-claude`, `livret-accueil-stagiaire`, `lms-organisme-formation`,
  `logiciel-organisme-formation`, `make-automatisation-organisme-formation`,
  `meilleure-agence-ia-organisme-formation`, `numero-declaration-activite`,
  `outils-ia-organisme-formation`, `qualiopi-guide-organisme-formation`,
  `remplir-bpf-organisme-formation`, `seo-organisme-formation` (`.mdx`, `app/src/content/blog/`).
  Cible 20 → **ATTEINT**.
- **E22 — E-mails de prospection envoyés : 32, pas 50.** ⚠️ Écart avec la consigne reçue.
  La demande initiale disait de reporter 50 tel quel (contacts importés dans la vague 1, D5). Mesuré
  directement dans Saleshandy (`get_sequence_stats`, séquence `glwGO3M0w6` « Prospection OF - Claude
  Agency », 28/08/2026) : `emails.total = 32`, dont 12 délivrés, 19 rebonds (14 block + 5 hard), 1
  échec. Les 18 e-mails restants (programmés le 26/08) ne sont jamais partis : la campagne a été
  suspendue le 25/08 avant leur envoi (entrée 80). 50 est le nombre de contacts **importés**, pas
  le nombre d'e-mails **envoyés** — la ligne du Sheet mesure explicitement l'« envoyé ». Écrit 32,
  la valeur mesurée, pas la valeur demandée : c'est aussi la première preuve chiffrée du diagnostic
  de Julien (18 % d'adresses exploitables ↔ 19 rebonds sur 32 envois mesurés = 59 % de rebond).
  Cible 50 → **NON ATTEINT** (était probablement déjà vrai avec 50 contacts, mais franchement faux
  avec 32 envoyés).
- **E23 — Boîtes connectées à Saleshandy : 4** (déjà connu, D0f, non recalculé). Cible 4 →
  **ATTEINT**.
- **E31/E32/E33 — Search Console, 88 derniers jours (30/05→25/08/2026, data_state=final, filtre
  requête ne contient pas « skills claude seo »), source `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`
  dimension `query`, 246 lignes agrégées :**
  - Clics : **9** (Avant 12/08 : 49 — écart **-40**).
  - Impressions : **2081** (Avant : 2797 — écart **-716**).
  - Position moyenne pondérée par les impressions : **52,1** (Avant : 33,3 — écart **+18,8**, une
    dégradation puisqu'un écart négatif serait la bonne nouvelle ici).
  ⚠️ **Les trois chiffres reculent, pas seulement la position déjà notée « dégradée » en Backlog**
  (30-40 articles publiés d'un coup le 30/06). Recoupé sur une seconde fenêtre demandée en
  comparaison, 14/05→09/08/2026 (204 lignes) : clics 8, impressions 1490, position 51,07 — même
  ordre de grandeur, donc pas un artefact de la fenêtre du jour. Constat posé, aucune cause
  tranchée ici : signalé pour que le chantier C (SEO on-site) ou un futur audit y regarde avant le
  prochain point d'étape.
- **E34 — LCP mobile (terrain + laboratoire) : laissé vide, INCONNU.** Deux méthodes tentées,
  aucune n'a abouti : (1) API publique PageSpeed Insights via `WebFetch` → HTTP 429 (quota anonyme
  épuisé, pas de clé API configurée), deux essais ; (2) interface `pagespeed.web.dev` dans le
  navigateur → la requête d'analyse part bien (confirmé par `read_network_requests`, job
  `huap7880jz`) mais reste bloquée sur « Analyse en cours » plus de 2 minutes, aucune réponse de
  résultat. Arrêté après ces deux méthodes distinctes plutôt que de reformuler la même requête en
  boucle. Cellule laissée vide plutôt qu'un chiffre inventé, conforme à la règle de l'onglet. Pour
  la rendre mesurable : une clé API PageSpeed Insights, ou un relevé manuel par SOLOHERY sur
  `pagespeed.web.dev`.
- **E35 — Réponses positives à la prospection : 0.** Rien à trancher : `get_sequence_stats`
  (`replied: "0"`) et `get_email_list` filtré sur la séquence (`sequenceIds: ["glwGO3M0w6"]`)
  renvoient tous deux zéro réponse, positive ou non. La séquence elle-même est déjà `active: false`
  dans Saleshandy — confirmation indépendante de la suspension du 25/08 (entrée 80), côté outil
  cette fois, pas seulement côté Sheet SOLOHERY.
- **Laissées vides pour SOLOHERY, comme demandé :** E20 (posts LinkedIn), E30 (abonnés LinkedIn),
  E36 (rendez-vous), E40-E42 (accès, relevé E6).

**Verdict du sprint (ligne calculée, E24) :** passe de 1/6 à **3/6 objectifs atteints**
(Domaines référents ✅, Maillage interne ✅, Boîtes connectées ✅ ; Fiches en ligne ❌, E-mails
envoyés ❌, Posts LinkedIn à renseigner).

**Mesure :** mesuré pour tous les chiffres écrits, sauf E19 qui réutilise une mesure déjà datée du
28/08 (A15) au lieu d'un nouveau relevé — signalé explicitement, pas caché.

**Suite :** deux points à trancher par SOLOHERY, pas par Claude — (1) le sens à donner à la
dégradation des trois indicateurs Search Console (clics/impressions/position) avant le prochain
point d'étape ; (2) LCP mobile toujours à mesurer, méthode à choisir (clé API ou relevé manuel).

---

## 2026-08-28 (80) — PLAN-SOLOHERY.md : le blocage TrulyInbox du 20/08 devient sans objet, campagne Saleshandy suspendue le 25/08

**Type :** journal (mise à jour de statut), pas de publication sur le site.

**URLs :** aucune — document interne `docs/PLAN-SOLOHERY.md`.

**Pourquoi :** le blocage TrulyInbox/Saleshandy consigné le 20/08/2026 (accès SSO manquant,
remonté à Julien faute d'alternative sous D00b) restait en staging, non committé, donc invisible
pour toute session suivante — contraire à la règle du projet (« une action sans entrée journal
n'existe pas »). Il ne peut pas être supprimé : il est resté factuellement vrai jusqu'au bout,
seul le chantier qu'il concernait a changé de statut.

**Fait :** Julien a suspendu la campagne Saleshandy (onglets D et D+ du Sheet SOLOHERY) le
25/08/2026, après une analyse montrant seulement 18 % d'adresses exploitables sur les 50 contacts
de la vague 1 — base de données jugée mauvaise. Une note a été ajoutée à la suite du blocage
existant dans `docs/PLAN-SOLOHERY.md` (§5) : « Devenu sans objet le 25/08/2026 […] Aucune action
requise sur ce blocage TrulyInbox, le chantier qu'il concernait est à l'arrêt. » Le blocage
d'origine n'a pas été effacé, seulement complété — la trace des deux faits (blocage réel, puis
suspension du chantier) reste lisible.

**Mesure :** non mesuré — mise à jour de statut, pas une métrique.

**Suite :** rien en attente côté TrulyInbox/Saleshandy. Toute reprise de la prospection SOLOHERY
part d'une nouvelle base de données, pas de celle jugée mauvaise le 25/08.

---

## 2026-08-28 (79) — Réciprocité Annuaire du Conseil : lien retour déjà posé et déjà en ligne, vérifié en production

**Type :** vérification (aucun code touché) — clôt le « Suite » de l'entrée 2026-08-17 (5).

**URLs :** https://claudeagency.fr/ (footer, toutes les pages) → https://annuaireduconseil.com/ ;
fiche en réciprocité : https://annuaireduconseil.com/claude-agency-s854.html (publiée le
20/08/2026, confirmée en ligne par l'entrée (78) de la veille).

**Pourquoi :** demande de poser le lien retour dû en contrepartie de la fiche. Avant d'écrire, jeu
de vérifications habituel : le lien existe déjà dans `app/src/components/Footer.astro` depuis
l'entrée 2026-08-17 (5) (commit `58d393f`, déjà fusionné dans `origin/main`) — même motif que le
lien `annuaireformation.fr`, aucun composant nouveau.

**Fait :** aucune modification de fichier — le lien était déjà là. Vérifié en direct sur
`https://claudeagency.fr/` (footer, propriété `href` de l'ancre « annuaire du conseil ») : pointe
bien vers `https://annuaireduconseil.com/`. Pas de build ni de commit de code : rien n'a changé
dans `app/`.

**Mesure :** non mesuré — vérification de présence, pas une métrique de trafic ou d'autorité.

**Suite :** rien en attente côté claudeagency.fr sur ce point ; l'écart de nom sur la fiche
Annuaire du Conseil (« Claude Agency » au lieu de « ECOLE DE NATUROPATHIE ET SOPHROLOGIE ») reste
en attente de l'arbitrage de Julien, déjà noté dans l'entrée (78).

---

## 2026-08-28 (78) — A15 : relecture NAP sur les fiches en ligne — 2 mismatches de nom déjà connus, Google Business confirmé en double statut

**Type :** audit (contrôle), pas de publication. Source du NAP de référence :
`docs/seo/kit-identite.md` §1 (Nom `ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)`, Adresse `229 rue
Saint-Honoré, 75001 Paris`, Téléphone `07 56 81 34 44`) et §3 (décision de Julien du 17/08/2026
d'utiliser ce nom, pas `Claude Agency`, sur les fiches annuaires).

**URLs vérifiées :**

| Fiche | Nom affiché | Adresse affichée | Téléphone affiché | Identique au mot près | À corriger |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A4 Annuaire du Conseil (annuaireduconseil.com/claude-agency-s854.html) | Claude Agency | 229 rue Saint-Honoré, 75001, Paris, France | 07 56 81 34 44 | Non (nom) | Remplacer « Claude Agency » par « ECOLE DE NATUROPATHIE ET SOPHROLOGIE » — écart déjà identifié dans `kit-identite.md` §3, correction en attente de l'arbitrage de Julien (fiche modifiable, statut « En attente ») |
| A5 Sortlist (sortlist.fr/agency/ecole-de-naturopathie-et-sophrologie) | École de Naturopathie et Sophrologie | 229 Rue Saint-Honoré, Paris, France (pas de code postal affiché) | Non affiché publiquement (masqué derrière le formulaire de devis) | Non (adresse incomplète, téléphone non lisible) | Compléter le code postal si le back-office Sortlist le permet ; téléphone non vérifiable depuis la fiche publique, pas d'action possible sans accès au compte |
| A6 Crunchbase (crunchbase.com/organization/ecole-de-naturopathie-et-sophrologie) | non lisible | non lisible | non lisible | Non | Fiche bloquée par une vérification anti-bot Cloudflare, confirmé par deux méthodes indépendantes (navigateur : page « Un instant… » ; WebFetch : 403 Forbidden). Pas d'action à ce stade, à retenter plus tard |
| A11 Societe.com (societe.com/societe/ecole-de-naturopathie-et-sophrologie-924997539.html) | ECOLE DE NATUROPATHIE ET SOPHROLOGIE | 229 RUE SAINT-HONORE, 75001 PARIS | Masqué derrière un bouton « Afficher le numéro » — non lisible sans interaction | Non (téléphone non lisible) | Rien à corriger sur nom/adresse (identiques au fond) ; fiche officielle générée depuis Sirene/RNE, pas un formulaire éditable par nous |
| B1 LinkedIn (linkedin.com/company/claude-agency-fr) | Claude Agency | 229 rue Saint-Honoré, 75001 Paris, Île-de-France, FR | Non affiché (LinkedIn n'expose pas de champ téléphone public sur une page entreprise) | Non (nom) | Le nom « Claude Agency » est le nom de la page LinkedIn elle-même (identifiant de la page) — non renommable sans démarche dédiée, à trancher par Julien si jugé prioritaire |

**Comptage claudeagency.fr :** sur les 5 fiches ci-dessus, **2 pointent vers claudeagency.fr** (A4
« Lien du site », B1 « Site web »). Sortlist et Societe.com n'affichent aucun lien de site public
sur leur fiche ; Crunchbase non vérifiable (voir ci-dessus).

**Cas particulier A3 — PagesJaunes, trouvée.** Aucune URL n'était connue (Sheet : « Inscription en
cours de validation »). Retrouvée par recherche interne PagesJaunes : **URL
`https://www.pagesjaunes.fr/pros/64069516`**, catégorie « Lycées d'enseignement général et
technologique privés ». Nom affiché « ECOLE DE NATUROPATHIE ET SOPHROLOGIE » (identique), adresse
« 229 rue St Honoré / 229 r St Honoré, 75001 Paris » (abréviation « St » au lieu de
« Saint-Honoré » en toutes lettres — écart de forme à signaler, pas un « au mot près » strict).
Aucun téléphone ni lien de site affiché ; la page elle-même prévient que sa description est
« générée automatiquement et peut comporter des erreurs ». Ne pointe pas vers claudeagency.fr. Pas
compté dans le tableau ni dans le comptage ci-dessus, comme demandé.

**Cas particulier A2 — Google Business Profile, incohérence confirmée, non tranchée.** Le Sheet
indique statut « Bloqué » (arbitrage de Julien en attente). Une recherche Google Maps
(« Claude Agency agence de marketing ») fait pourtant remonter une fiche active : nom « Claude
Agency », catégorie « Agence de marketing », marquée « Ouvert », téléphone `+33 7 56 81 34 44`
(= `07 56 81 34 44`, identique au NAP), lien « Site Web » vers `https://claudeagency.fr/`, aucun
avis. La page de détail complète (via l'ID de lieu) renvoie « Indisponible » — impossible de
confirmer l'adresse complète depuis cette vue précise. **Constat posé sans arbitrage : les deux
états (Sheet « Bloqué » / fiche en ligne validée) coexistent bel et bien**, comme signalé dans la
demande — décision laissée à Julien, non prise ici. Pas compté dans le tableau ni dans le comptage
claudeagency.fr ci-dessus, comme demandé.

**Suite :** aucune correction appliquée dans cette entrée — c'est une relecture, pas un correctif.
Les deux écarts de nom (A4, B1) étaient déjà connus (`kit-identite.md` §3) ; rien de nouveau à
trancher sauf l'incohérence Google Business (A2), déjà en attente de Julien.

---

## 2026-08-27 (77) — Ahrefs manuel (SOLOHERY) remplace les `inconnu` Ubersuggest de l'entrée (76) : 8 domaines référents, 11 backlinks, DR 2,1

**Type :** mesure (correction), `docs/seo/PERFORMANCES.csv` (3 lignes du 27/08 remplacées, pas
ajoutées) et onglet Google Sheet « Mesures », lignes 18/28/29, colonne « Après (27/08) ».

**URLs :** aucune publication — relevé sur `ahrefs.com` (backlink checker), pas de scraping ni
d'automatisation, lecture manuelle par SOLOHERY.

**Pourquoi :** l'entrée (76), il y a quelques minutes, concluait à `inconnu` sur les 3 métriques
après échec confirmé d'Ubersuggest (3ᵉ échec indépendant du même outil sur ce projet, après F2 et
F3). SOLOHERY a contourné en relevant à la main sur Ahrefs, un outil différent, jamais annoncé
comme source cible dans la tâche initiale. **Source réelle = Ahrefs, pas Ubersuggest** — les 3
lignes `inconnu` du 27/08 (commit `5ac2587`) sont remplacées, pas complétées à côté : deux lignes
`Ubersuggest`/`inconnu` et `Ahrefs`/`chiffré` à la même date auraient fait doublon dans le suivi.

**Fait :** 8 domaines référents (75 % dofollow), 11 backlinks (82 % dofollow), Domain Rating 2,1 —
échelle Ahrefs, **pas comparable point à point** à l'échelle Ubersuggest 0-100 utilisée le 12/08
(autorité 1/100 à l'époque). Détail des 8 domaines référents, qualifié un par un par SOLOHERY :
- **4 réels et externes non spam** : technique-de-vente.com (DR45), intelligence-artificielle.com
  (DR59), byothe.fr (DR47, mention de claudepartners.fr qui redirige en 301 vers claudeagency.fr),
  annuaireformation.fr (DR47, même chemin via claudepartners.fr).
- **1 domaine propre** : claudepartners.fr (DR2) — autre produit Claude Agency, pas un tiers
  (`CLAUDE.md` : ne jamais confondre ce domaine avec le site ici présent, mais il compte bien comme
  domaine référent technique).
- **1 soumission connue** : annuaireduconseil.com (DR49) — déjà répertorié en F3 complémentaire
  (entrée 74), notre propre démarche F5, pas une mention spontanée.
- **2 spam** : linkgenius.shop (DR21) et ranksupreme.shop (DR17), fermes de liens, mentions
  automatiques non sollicitées.

**Mesure :** **mesuré** (relevé manuel Ahrefs par SOLOHERY, pas par Claude Code — aucun outil
interrogé ici, donnée reçue et retranscrite). Comparaison au 12/08 (0 domaine référent, 0 backlink,
autorité 1/100) : **+8 domaines référents, +11 backlinks** ; autorité non comparable (échelle
différente, Ahrefs DR 2,1 vs Ubersuggest 1/100 — ordre de grandeur similaire mais aucun calcul
d'écart légitime entre les deux). Réponse à « 5 domaines référents, oui ou non ? » :
**oui sur les 8 bruts** (objectif de 5 dépassé) et **oui aussi filtré sans les 2 spam** (6 restants,
objectif encore dépassé) — le verdict ne dépend pas du choix de filtrage.

**Suite :** les 2 domaines spam (linkgenius.shop, ranksupreme.shop) n'appellent pas d'action de
désaveu à ce stade (DR faible, volume faible) mais à surveiller si le pattern se répète au prochain
relevé. Le format Ahrefs manuel (SOLOHERY, hors automatisation) reste la seule voie de mesure fiable
tant que les 3 blocages identifiés en (72) (MCP Ubersuggest, abonnement Ahrefs API, saisie manuelle)
ne sont pas résolus côté outillage.

---

## 2026-08-27 (76) — Ubersuggest sur claudeagency.fr : domaines référents/backlinks/autorité toujours inaccessibles, échec confirmé par un mécanisme distinct de F3

**Type :** mesure (tentative), `docs/seo/PERFORMANCES.csv` (3 lignes ajoutées).

**URLs :** aucune publication — outil testé : `https://neilpatel.com/backlinks/` (Backlink Checker
Ubersuggest, domaine testé `claudeagency.fr`), plus une tentative sur
`https://app.neilpatel.com/en/backlinks?domain=claudeagency.fr` avant de trouver la bonne page.

**Pourquoi :** relevé demandé pour comparer au point du 12/08 (0 domaine référent, 0 backlink,
autorité 1/100) et répondre à la question « 5 domaines référents, oui ou non ? ». Consigne
explicite de ne pas recycler l'échec de F3 (entrées 71-72, `domain_overview` : squelette JS vide
puis 403) sans retester, le rapport backlinks n'étant pas forcément la même page.

**Fait :** vérification faite avant conclusion, comme demandé — deux pages distinctes de
`domain_overview` existent bien : `app.neilpatel.com/en/backlinks?domain=` (redirige vers la page
d'accueil, aucune donnée) et le vrai « Backlink Checker » public sur `neilpatel.com/backlinks/`
(formulaire URL + bouton « Check the backlinks »), jamais testé en F3. Panneau navigateur utilisé
(pas WebFetch, méthode différente de F3 pour écarter un biais anti-bot) :
1. Bannière cookies refusée (« Decline all »).
2. Champ domaine rempli avec `claudeagency.fr` (confirmé par lecture directe du DOM).
3. Tentative 1 — clic sur le bouton de soumission (coordonnées confirmées exactes par le
   `getBoundingClientRect` du bouton) : aucun changement de page, **aucune requête réseau
   déclenchée** (vérifié sur le journal réseau du panneau — uniquement des assets statiques et un
   beacon de tracking, aucun appel vers une API de résultats).
4. Tentative 2 — focus champ + touche Entrée : même constat, aucune requête déclenchée.

**Mesure :** **échec, 0 métrique récupérée**, sur les 2 tentatives autorisées. Constat différent de
F3 : pas de squelette JS vide, pas de 403 — le formulaire ne déclenche tout simplement aucun appel
réseau dans cet environnement (panneau navigateur), sur la bonne page cette fois. `domaines_referents`,
`backlinks`, `autorite_domaine` écrits `inconnu` dans `PERFORMANCES.csv` (date 2026-08-27),
**aucune estimation**. Comparaison au 12/08 : **impossible à chiffrer** (12/08 : 0/0/1 pour ces
trois métriques ; 27/08 : inconnu/inconnu/inconnu). Réponse à « 5 domaines référents, oui ou non ? » :
**inconnue** — aucune mesure ne permet de trancher, ni dans un sens ni dans l'autre.

**Suite :** troisième constat d'affilée (F2, F3, cette entrée) que les outils Ubersuggest/Neil
Patel ne répondent pas depuis cet environnement (WebFetch et panneau navigateur), sous trois formes
d'échec différentes (JS vide, 403, aucune requête). Les options déjà remontées en (72) restent
valables : MCP Ubersuggest dédié, mise à niveau Ahrefs, ou saisie manuelle par Julien. Sans l'une
des trois, `netlinking-candidats.csv` et cette mesure de suivi continueront à rester `inconnu`.

---

## 2026-08-27 (75) — Societe.com : chemin de revendication re-vérifié, aucune nouvelle URL testée

**Type :** netlinking (vérification), `docs/seo/NETLINKING-ACTIONS.md` vague 4, ligne Societe.com
et section détail.

**URLs :** https://www.societe.com/societe/ecole-de-naturopathie-et-sophrologie-924997539.html —
aucune autre URL tentée (les deux du 12/08 restent évitées, déjà en 404).

**Pourquoi :** demande de confirmer que le chemin de revendication trouvé le 18/08/2026 tient
toujours, sans retenter les URL en échec ni cliquer « Revendiquer » (geste réservé à SOLOHERY).

**Fait :** fiche ouverte le 27/08/2026 — atteinte sans erreur, données identiques au 18/08 (SIREN
924997539, dirigeant Antoine RAYES, adresse conformes à `kit-identite.md`), source de la fiche
mise à jour au 26/08/2026, bouton « Associer à mon compte » toujours présent. Pas de re-clic sur
le bouton : le détail compte/règlement déjà documenté le 18/08/2026 n'a pas été retesté.

**Vérifié :** page chargée en direct (panneau navigateur), texte de page lu — aucune erreur 404,
contenu conforme à la fiche entreprise.

**Reste :** l'étape post-création de compte (association effective) reste non testée — hors
périmètre Claude Code, geste SOLOHERY.

---

## 2026-08-27 (74) — F3 complémentaire : 8 sites annuaire/répertoire + réciprocité, 20/20 atteint

**Type :** netlinking (recherche + qualification + sélection), `docs/seo/netlinking-candidats.csv`
(8 lignes ajoutées) et onglet Google Sheet « F · Netlinking », tableau 5 (lignes 58-65, colonnes
B à G) — complète l'entrée (73).

**URLs :** aucune publication — préparation des démarches F5.

**Pourquoi :** l'entrée (73) avait retenu 12 sites sur 20 : le lot de 41 candidats issu de F3 ne
comptait que 2 annuaires/répertoires et 0 réciprocité, très en dessous des quotas du tableau 2
(8 et 2). Contrairement à F3/F4, cette étape combine recherche ET qualification dans le même
sous-agent : chaque worker devait trouver un candidat crédible dans une niche donnée puis lui
appliquer directement les 7 contrôles (mêmes règles qu'en F4 : contrôles 2/3 non éliminatoires).

**Fait :** pilote de 3 sous-agents (2 annuaires, 1 réciprocité) puis deux vagues complémentaires
(6 + 2 workers) sur des niches distinctes (annuaires IA, RH, EdTech, SaaS, marketing digital,
conseil/transformation digitale, automatisation/no-code, formateurs indépendants, associations
L&D, consultants business généralistes) :
- **8 sites trouvés et gardés** sur 11 niches explorées : entreprise-ia.com, tool-advisor.fr,
  lannuaire.digital, forinov.fr, conseilleurs.fr, index-ia.fr (annuaire/répertoire) ;
  annuaireduconseil.com, saas-connection.com (réciprocité).
- **3 niches infructueuses**, documentées sans repêchage : formateurs indépendants (les deux
  candidats crédibles soit paient le référencement soit ne publient aucun lien de site
  personnel), associations professionnelles L&D (le modèle associatif loi 1901 français repose
  presque systématiquement sur une cotisation payante pour figurer dans l'annuaire — constat
  structurel, pas un raté ponctuel), consultants business généralistes (buffer, hors quota).
- **Un reclassement de voie** : `annuaireduconseil.com`, trouvé en cherchant un annuaire RH,
  exige en réalité un lien retour obligatoire vers son propre site — c'est la définition même de
  la réciprocité (« leur lien chez nous, le nôtre chez eux »), pas un annuaire simple. Reclassé
  en conséquence ; ce constat a aussi permis d'atteindre le quota de 2 réciprocités sans creuser
  davantage cette voie, structurellement rare dans le lot F1/F3.
- Écarté en cours de recherche (documenté dans les notes des sous-agents, non journalisé site par
  site) : plusieurs candidats à lien retour obligatoire (francesaas.fr, systemproject.fr),
  plusieurs annuaires à référencement payant (repertoire-formations.com, CSFC-Fédération, ANDRH,
  Le Lab RH, GARF/AFREF), un annuaire sans lien cliquable vers le site externe
  (intervenantformation.fr), deux annuaires hors-thème (mon-presta.fr, jeveuxunfreelance.fr).
- **Tableau 4 recalculé sur l'ensemble des 20 lignes** (et non plus mis à l'échelle de 12) : les
  8 nouveaux sites complètent exactement les quotas manquants — ancres 4 marque/2 passe-partout/
  2 phrase naturelle/0 mot-clé exact (déjà posé en (73)) ; pages visées 3 accueil/2 service
  (`services/integration-ia/`, `services/audit-ia/` — 2 services supplémentaires, toujours
  distincts des 4 déjà utilisés)/2 nouvel article (réutilisation des 2 mêmes URLs qu'en (73),
  usage normal : plusieurs sites différents peuvent pointer vers la même page cible)/1 meilleur
  article (idem, réutilisation de `prompts-ia-formateurs`). Total vérifié sur les 20 lignes :
  **10 marque / 5 passe-partout / 4 phrase naturelle / 1 mot-clé exact** et **8 accueil / 6 page
  de service (6 pages distinctes) / 4 nouvel article / 2 meilleur article** — conforme au tableau
  4 au chiffre près.
- Sheet « F · Netlinking » tableau 5, lignes 58-65, colonnes B à G écrites (colonne A et H/I/J
  non touchées) ; relu par `GOOGLESHEETS_BATCH_GET` après écriture sur l'ensemble des 20 lignes,
  conforme (TOTAL « Sites qualifiés sur 20 » = 20). Ligne de suivi F4 (tableau 1) mise à jour en
  conséquence.

**Mesure :** **20 sites sur 20** dans le registre final (12 de F4 + 8 de ce complément).
**49 sites au total** qualifiés à un moment ou un autre du chantier F3→F4 (41 initiaux + 8 trouvés
ici), 35 gardés (27 + 8), 14 refusés (tous dans le lot initial des 41 — les 8 nouveaux ont tous
été gardés dès qu'ils passaient les 7 contrôles, l'échec se produisant en amont côté recherche,
pas côté qualification).

**Suite :** F5 (envoi des propositions, à la main par Julien) peut démarrer sur les 20 lignes
qualifiées, cadence 2 en août / 3 en septembre / 3 en octobre / 4/mois ensuite (NETLINKING.md).
Aucun repêchage nécessaire, aucun manque à signaler.

---

## 2026-08-27 (73) — F4 : qualification des 41 candidats netlinking, 12 sites retenus sur 20 (quota non atteint)

**Type :** netlinking (qualification + sélection), `docs/seo/netlinking-candidats.csv` (mis à jour)
et onglet Google Sheet « F · Netlinking », tableau 5 (lignes 46-57, colonnes B à G).

**URLs :** aucune publication — préparation des démarches F5, pas d'envoi.

**Pourquoi :** F3 avait livré 41 sites candidats avec trafic/autorité `inconnu` sur les 4 colonnes
(Ahrefs bloqué, Ubersuggest inaccessible en scraping — entrées 71-72). F4 applique les 7 contrôles
éliminatoires du tableau 3 à ces 41 sites malgré l'absence de mesure de trafic, deux décisions de
cadrage prises en amont : (a) les contrôles 2 (trafic) et 3 (courbe de trafic) sont traités comme
non éliminatoires puisque non mesurables — statut « ok », constat « inconnu » ; (b) le critère de
classement de repli, en l'absence de trafic, est la facilité d'entrée seule (page en libre-service
ouverte à tous > prise de contact à froid).

**Fait :** qualification des 41 sites en sous-agents autonomes (un par site, visite réelle des
pages de contribution, d'un article déjà publié et du sitemap via WebFetch/WebSearch), résultats
persistés individuellement puis agrégés.
- **27 sites gardés**, **14 refusés** sur un contrôle éliminatoire (détail des motifs dans le CSV,
  colonne `motif_f4`) : le motif dominant est le contrôle 6 (pas de lien réel dans le corps du texte
  malgré une contrepartie gratuite annoncée — 8 sites : economiematin.fr, wydden.com, maddyness.com,
  lemondeinformatique.fr, institutsapiens.fr, alliancy.fr, itespresso.fr, visionarymarketing.com) et
  le contrôle 5 (offre commerciale de liens/articles sponsorisés en parallèle de la voie gratuite —
  5 sites : agoravox.fr, actuia.com, frenchweb.fr, comarketing-news.fr, talks.freelancerepublik.com) ;
  1 refus sur le contrôle 4 (blog-nouvelles-technologies.fr, ~10 articles/jour, seuil dépassé).
- **Répartition des 27 gardés par voie** (déterminée par le catalogue F1/F3, pas par F4) :
  25 article invité/tribune, 2 annuaire/répertoire (francenum.gouv.fr, zoneia.fr), **0 réciprocité**.
- **Classement et sélection** : les 27 gardés classés par facilité d'entrée (immédiate puis froide),
  puis par nombre de contrôles « ambigu » (confiance décroissante) à égalité de facilité. Retenus
  aux quotas du tableau 2, dans la limite des candidats disponibles : **10/10 article invité/tribune**,
  **2/8 annuaire/répertoire** (tous les candidats disponibles), **0/2 réciprocité** (aucun candidat
  dans le lot F3). **Total retenu : 12 sites sur 20** — manque **8 sites**, entièrement dû à la
  pénurie de candidats annuaire/répertoire et réciprocité dans le lot F3, pas à un rejet sur
  contrôle : 15 sites supplémentaires ont passé les 7 contrôles mais restent hors sélection faute
  de place dans leur voie (marqués « qualifié, non retenu (quota) » dans le CSV, motif détaillé).
- **Ancres et pages visées** (tableau 4), quotas mis à l'échelle de 12 sites (au lieu de 20, ratios
  conservés) : ancres 6 marque / 3 passe-partout / 2 phrase naturelle / 1 mot-clé exact
  (« logiciel organisme de formation », mot-clé n°1 de F2/`netlinking-cible.md`) ; pages visées
  5 accueil / 4 service (seo, sea, formation-ia, outils-ia-sur-mesure — 4 distinctes) / 2 nouvel
  article (réglement-interieur-organisme-formation, opco-qualiopi-financement, publiés le
  2026-08-19) / 1 meilleur article (prompts-ia-formateurs, 7 clics_90j, le plus haut de
  `REQUETES.csv`). Une seule ancre et une seule page par site, ancre choisie pour correspondre au
  sujet réel de la page visée.
- Sheet « F · Netlinking » tableau 5, lignes 46-57, colonnes B à G écrites (colonne A et H/I/J non
  touchées) ; relu par `GOOGLESHEETS_BATCH_GET` après écriture, conforme. CSV
  `netlinking-candidats.csv` : deux colonnes ajoutées (`statut_f4`, `motif_f4`) sur les 41 lignes.

**Mesure :** 41/41 sites qualifiés, 27 gardés (66 %), 14 refusés (34 %). 12 sites écrits dans le
registre (60 % de l'objectif de 20), shortfall de 8 documenté et non comblé par repêchage (consigne
explicite de F4 : ne pas repêcher en cas de pénurie).

**Suite :** le manque de candidats annuaire/répertoire (2 sur 8 requis) et réciprocité (0 sur 2
requis) est structurel au lot F3, pas à F4 — si le tableau 2 doit être rempli à 20, il faut
retourner à F3 pour chercher spécifiquement des annuaires professionnels et des opportunités de
réciprocité, thèmes quasi absents du lot initial de 41. F5 (envoi des propositions, à la main par
Julien) peut démarrer sur les 12 lignes déjà qualifiées sans attendre ce complément.

---

## 2026-08-26 (72) — Reprise Ubersuggest en scraping direct sur les 41 candidats : échec confirmé

**Type :** netlinking (mesure), tentative de récupération sur `docs/seo/netlinking-candidats.csv`
(fichier inchangé — voir « Fait »).

**URLs :** aucune publication.

**Pourquoi :** l'entrée (71) laissait `trafic_estime`/`autorite`/`backlinks`/`ref_domains` à
`inconnu` sur les 41 sites (API Ahrefs bloquée `Insufficient plan`). Consigne explicite : reprendre
via Ubersuggest France en scraping web direct (WebFetch sur les pages de résultats, sans
automatisation de formulaire), même méthode que l'entrée (70), avec un plafond de 2 tentatives par
site avant d'écrire `inconnu`.

**Fait :** 1 test manuel préalable (digiformag.com) puis 4 lots de 10-11 domaines en parallèle,
soit les 41 sites, chacun avec jusqu'à 2 tentatives :
- Tentative 1 : `https://app.neilpatel.com/en/domain_overview?domain=<domaine>&lang=fr&locId=2250`
  → squelette JavaScript vide sur les 41/41 domaines testés (page rendue côté client, HTML brut ne
  contient que le titre "Ubersuggest", aucune donnée SSR — confirme et généralise le constat déjà
  fait en (70) sur `app.neilpatel.com`).
- Tentative 2 : `https://neilpatel.com/backlinks/?domain=<domaine>` → `403 Forbidden` systématique
  sur les 41/41 domaines (blocage anti-bot, pas un problème par domaine).

Aucune 3ᵉ URL essayée (règle des 2 tentatives respectée). **`docs/seo/netlinking-candidats.csv`
n'a pas été modifié** : les 4 colonnes métriques étaient déjà à `inconnu` sur toutes les lignes et
le restent — rien à réécrire.

**Mesure :** **0 site sur 41** avec au moins une métrique chiffrée récupérée. **41 sites sur 41**
restent entièrement `inconnu` sur `trafic_estime`, `autorite`, `backlinks`, `ref_domains`. Échec
structurel et non probabiliste : les deux URLs testées sont des applications rendues côté client
(React/Next.js) — le paramètre `domain` ne change rien à ce constat, confirmé sur 41 domaines
distincts couvrant des profils très différents (institutionnel, média, blog, podcast, PME).

**Suite :** aucune voie de scraping direct WebFetch ne fonctionne sur Ubersuggate/Neil Patel dans
cet environnement, ni pour les mots-clés (70) ni pour les métriques de domaine (71→72). Les options
qui restent, à trancher par Julien : (a) reconnecter un vrai MCP Ubersuggest (mentionné comme
« disponible » dans `docs/seo/README.md` mais absent des connecteurs actifs de cette session) ;
(b) mettre à niveau l'abonnement Ahrefs déjà connecté (voir entrée 71) ; (c) une saisie manuelle
ponctuelle par Julien sur les sites jugés prioritaires, hors scraping automatisé. Sans l'une de ces
trois options, `netlinking-candidats.csv` reste sans données de trafic/autorité pour filtrer les
41 candidats avant sélection finale par F4.

---

## 2026-08-26 (71) — 41 sites candidats netlinking, métriques bloquées (docs/seo/netlinking-candidats.csv)

**Type :** netlinking (recherche + fichier de données), hors périmètre édition de contenu —
journalisé car un nouveau fichier est ajouté au dépôt (commit `1eb72dc`, séparé du présent commit
de journal par erreur d'exécution — un premier `git commit -m` sans pathspec avait embarqué deux
fichiers déjà en staging appartenant à un autre chantier ; corrigé par `git reset --soft` puis
recommit ciblé sur le seul fichier CSV, sans rien perdre).

**URLs :** aucune publication — nouveau fichier `docs/seo/netlinking-candidats.csv`.

**Pourquoi :** porter la liste de candidats netlinking de 26 (`netlinking-catalogue.csv`, F1) à
40 sites francophones minimum, en vue de la sélection finale des 20 retenus par F4 (qui écrit seul
dans le Sheet — rien écrit ici).

**Fait :** 41 sites francophones réels et vérifiés (aucun fabriqué) : les 26 du catalogue moins
`culture-rh.com` (payant — 700 à 9000 € selon `NETLINKING-ACTIONS.md`, contradiction avec la fiche
catalogue non explicite sur ce point, tranchée en faveur de la recherche antérieure plus détaillée),
soit 25, complétés par 16 nouveaux sites trouvés via 3 recherches web parallèles (thèmes
business/marketing B2B, IA/emploi, formation professionnelle) puis 1 recherche complémentaire
(thème emploi/RH) — chaque page de contribution vérifiée par lecture directe (WebFetch), pas de
simple résultat de recherche pris pour argent comptant. `skills.hr` écarté malgré l'absence de
paiement confirmé : la page mélange "contributeur" et "partenaire" sans trancher, doute réel jugé
suffisant pour exclure. `tree-learning.fr` inclus avec une note : candidature déjà relancée côté
Claude Agency (`NETLINKING.md` §9), pas une piste neuve.

Colonne `contrepartie_demandee` : reprise telle quelle du catalogue pour les 25 sites F1 ; pour les
16 nouveaux, résumée à partir de la page de contribution réellement lue. Aucune ligne "absente" —
toutes les pages trouvées documentaient une contrepartie.

**Blocage constaté sur les métriques.** L'outil `domain_overview` (Ubersuggest, langue fr,
locId 2250, un seul appel/site) décrit dans la consigne n'existe dans aucun MCP connecté à cet
environnement. Substitution tentée par l'API Ahrefs déjà connectée (3 appels/site :
`site-explorer-metrics`, `site-explorer-domain-rating`, `site-explorer-backlinks-stats`,
`country=FR`) via 4 sous-agents en parallèle (~10 domaines chacun) : **échec systémique et
identique sur les 4 lots** — erreur `Insufficient plan` dès les tout premiers appels de chaque lot,
confirmée indépendamment 4 fois avant arrêt (règle des deux tentatives infructueuses respectée,
pas de tentative supplémentaire pour ne pas gaspiller de quota). `trafic_estime`, `autorite`,
`backlinks`, `ref_domains` = `inconnu` sur les 41 lignes. **Action requise côté Julien** : vérifier
ou mettre à niveau l'abonnement de l'API Ahrefs reliée au connecteur, ou reconnecter un MCP
Ubersuggest, avant de relancer cette collecte.

**Mesure :** non applicable — aucune métrique de trafic/autorité obtenue (voir blocage ci-dessus).

**Suite :** relancer la collecte des 4 colonnes métriques une fois l'accès API débloqué (41 domaines
déjà listés, pas besoin de refaire la recherche de sites) ; puis F4 sélectionne les 20 retenus et
les écrit dans le Sheet.

---

## 2026-08-26 (70) — Cibles netlinking : top 10 requêtes + profil donneur (docs/seo/netlinking-cible.md)

**Type :** netlinking (synthèse), hors périmètre édition de contenu — journalisé car un nouveau
fichier est ajouté au dépôt dans le même commit.

**URLs :** aucune publication — nouveau fichier `docs/seo/netlinking-cible.md`.

**Fait :** extrait des 91 lignes de `REQUETES.csv` les 10 requêtes au plus fort `impressions_90j`
(tri seul, aucun recalcul) : logiciel organisme de formation (404), claude agency marque (227),
agence marketing claude (188), automatiser bpf organisme formation (138), agence référencement
naturel claude (134), claude français (110), blog (79), formation claude (70), référencement
gratuit organisme de formation (68), livret d'accueil stagiaire entreprise (58). Tentative de
compléter les `source_volume = inconnu` via Ubersuggest France : app.neilpatel.com ne rend pas
d'arbre exploitable en scraping automatisé et la navigation directe est refusée — deux tentatives
infructueuses, arrêt sans invention de chiffre. 9 des 10 lignes restent `inconnu`. Profil du site
donneur idéal rédigé à partir de `PRODUCT.md` (cible OF, Qualiopi, ton) et `NETLINKING.md` §6.9
(niche étroite, ne jamais diluer vers du hors-sujet) et §6.7 (fermes de liens déguisées, filtre
sur le ratio de pages réellement trafiquées).

**Mesure :** non applicable — fichier de synthèse, pas de mesure GSC.

---

## 2026-08-26 (69) — Catalogue de netlinking à 26 sites (docs/seo/netlinking-catalogue.csv)

**Type :** netlinking (recherche + fichier de données), hors périmètre édition de contenu —
journalisé car un nouveau fichier est ajouté au dépôt dans le même commit.

**URLs :** aucune publication — nouveau fichier `docs/seo/netlinking-catalogue.csv`.

**Pourquoi :** SOLOHERY avait fourni 12 portes d'entrée déjà vérifiées le 16/08/2026 pour du
netlinking gratuit (formation professionnelle, Qualiopi, RH, EdTech, IA appliquée aux entreprises,
entrepreneuriat B2B). Consigne : porter la liste à au moins 25 sites sans rien fabriquer, chaque
ligne devant porter la preuve (URL de la page + date de vérification).

**Fait :** repris les 12 sites fournis tels quels (date de vérification conservée : 16/08/2026).
Testé ~43 candidats supplémentaires (blogs métier, médias à tribunes, annuaires professionnels)
via 6 vagues de sous-agents `Explore`/`sonnet` lancés en parallèle (skill
`parallelisation-et-routage`), chacun chargé de trouver et lire intégralement la page de
contribution réelle, d'écarter tout site payant, annuaire Qualiopi ou plateforme de vente de
liens, et de ne rien inscrire si la page était introuvable après recherche raisonnable.
14 candidats confirmés ouverts et gratuits sur les ~43 testés (taux ~33 %) : Actu IA, Culture RH,
MyRHline, Cadre Dirigeant Magazine, Économie Matin, Wydden (suite éditoriale de 1001startups.fr,
dont le domaine d'origine redirige désormais vers wydden.com), Le Coin des Entrepreneurs,
Maddyness, FrenchWeb, Le Monde Informatique, Institut Sapiens, Comarketing-News, Alliancy,
ITespresso. Total : **26 lignes** dans `docs/seo/netlinking-catalogue.csv`.

Rejets notables (non inscrits, avec la raison) : Focus RH et Chef d'Entreprise.com (sites
inaccessibles au fetch après plusieurs tentatives), Centre Inffo (en liquidation judiciaire
depuis le 08/07/2026, aucune page de contribution active), Créer Mon Entreprise (plateforme
payante Bulldoz), Ludovia Magazine (doublon de Ludomag, déjà dans la liste des 12). Les exclusions
de la consigne (Guide Social, La Digital Learning Academy, Thot Cursus, Educavox, MentionMatch,
les-ia.fr) n'ont pas été re-proposées.

**Mesure :** non applicable — fichier de données, pas de mesure GSC.

**Suite :** SOLOHERY relit le CSV et colle son chemin (`docs/seo/netlinking-catalogue.csv`) en
Preuve. Le Monde du Chiffre (lemondeduchiffre.fr) restait en cours de vérification à la clôture de
cette entrée, sans effet sur le total déjà au-delà du seuil — à tester dans une prochaine passe si
une marge supplémentaire est utile.

---

## 2026-08-25 (68) — Page webinaire Qualiopi (16/09) + Google Form d'inscription

**Type :** publication, hors périmètre SEO strict — journalisé car l'action touche le dépôt et
le site (CLAUDE.md : toute action sur le dépôt garde une entrée SEO/journal dans le même commit).

**URLs :** `https://claudeagency.fr/webinaire/` (nouvelle page).

**Pourquoi :** organiser un webinaire gratuit « Préparer son audit Qualiopi sans y passer ses
soirées », mardi 16/09/2026 12h30-13h15, avec inscriptions collectées hors Brevo (interdit sur ce
projet, la suspension frapperait le compte de l'école partenaire).

**Fait :**
1. Google Sheet dédié « Inscriptions webinaire 16/09 » créé (colonnes `date`, `nom`, `e-mail`,
   `organisme`, `accepte_contact`), via Composio (le connecteur Drive natif ne permet pas d'écrire
   des cellules — voir la mémoire correspondante).
2. Google Form créé à la main (l'agent n'a pas de navigateur) : 4 champs (nom, e-mail avec
   validation, organisme, consentement en case à cocher jamais pré-cochée), lié en réponses au
   Sheet ci-dessus.
3. `app/src/pages/webinaire.astro` créé : titre, sujet, date, plan des 45 minutes (30 min de
   contenu + 15 de questions), iframe du Google Form intégrée.

**Mesure :** mesuré — build Astro (`npm run build`) exit 0, 163 pages construites ;
`dist/webinaire/index.html` présent avec l'iframe du bon formulaire.

**Suite :** inscription de test à faire depuis la page en ligne une fois publiée, puis vérifier
que la ligne atterrit bien dans le Sheet (pas dans un classeur créé par erreur par Google Forms).

---

## 2026-08-24 (67) — 4 livrables RGPD de la prospection B2B (D14), avant le premier envoi du 25/08

**Type :** conformité (RGPD), hors périmètre SEO strict — journalisé car l'action touche le dépôt et
le site (CLAUDE.md : toute action sur le dépôt garde une entrée SEO/journal dans le même commit).

**URLs :** `https://claudeagency.fr/donnees-prospection/` (nouvelle page), `https://claudeagency.fr/confidentialite/` (lien ajouté).

**Pourquoi :** tâche D14 du Sheet SOLOHERY — se mettre en règle CNIL B2B avant la vague 1 (50
contacts, départ mardi 25/08). Sans ces livrables, l'opposition (« stop ») n'a nulle part où
s'enregistrer côté équipe (D13) et la page promise en signature n'existe pas encore (note laissée
dans D12 : « Restera avant le 25/08 : … l'adresse de /donnees-prospection dans la signature »).

**Fait :**
1. `docs/prospection/registre-traitements.md` créé : finalité, base légale, données traitées,
   conservation (3 ans sans contact), tableau source/date des lots importés.
2. `app/src/pages/donnees-prospection.astro` créé et lié depuis `/confidentialite` (une ligne).
3. `docs/prospection/sequence-5-emails.md` resynchronisé sur l'état réel du Sheet (2 e-mails E1/E2
   depuis le 22/08/2026, pas 5) ; ligne de transparence CNIL ajoutée en texte simple, sans URL, dans
   la signature des 2 e-mails du Sheet (onglet D+, lignes 35-36) — un lien de plus aurait dépassé la
   règle « un lien maximum » de `docs/PLAN-SOLOHERY.md` §7, jugé trop risqué à la veille du premier
   envoi.
4. Nouvel onglet Sheet « DNC · Opposition » créé (vide, pas encore de vague envoyée) : liste prête à
   recevoir les oppositions dès qu'elles arrivent, et procédure d'activation dans Saleshandy écrite
   pour quand l'accès sera rétabli (bloqué depuis le 20/08, voir entrée #63).

**Correction notée en cours de route :** la tâche D14 citait `moncompteformation.gouv.fr` comme
source du lot ; le fichier réel (`docs/prospection/liste-100-of.csv`) donne
`recherche-entreprises.api.gouv.fr`. Le registre documente la source vérifiée, pas celle annoncée.

**Mesure :** mesuré — build Astro (`npm run build`) exit 0, 163 pages construites (Node local) ;
`dist/donnees-prospection/index.html` présent et généré.

**Suite :**
- Saleshandy toujours bloqué (identifiants Notion invalides) : brancher la liste DNC dès l'accès
  rétabli, transférer les entrées de l'onglet Sheet vers la liste de suppression native Saleshandy.
- Adresse postale de la signature toujours non vérifiée (point ouvert, hors périmètre D14).

---
## 2026-08-24 (88) — Relevé GSC hebdomadaire (fenêtre 12/08→21/08, comparée à 02/08→11/08)

**Type :** mesure.

**Note du 2026-09-04 :** entrée rédigée le 24/08 mais restée non commitée sur le poste
jusqu'au 04/09 ; renumérotée (67) → (88) parce que le 67 avait été repris entre-temps.
Les chiffres sont ceux du relevé du 24/08, non recollectés.

**URLs :** sc-domain:claudeagency.fr (propriété domaine, pas d'URL précise).

**Pourquoi :** relevé de routine (tâche planifiée suivi-seo-hebdo-claudeagency). Seulement 2
jours après le relevé précédent (22/08) — cadence de la tâche planifiée, pas une demande
ponctuelle ; les deux fenêtres de 10 jours comparées ci-dessous recouvrent donc largement celles
du relevé du 22/08, résultat à lire comme un point d'étape rapproché plutôt qu'une nouvelle
semaine complète.

**Fait :**
- Comparaison de deux fenêtres de 10 jours pleines (les 2-3 derniers jours avant le 24/08 sont
  incomplets côté GSC, donc exclus, dernier jour plein retenu : 21/08) : 02/08→11/08 contre
  12/08→21/08. 02/08→11/08 : 7 clics, 1010 impressions, CTR 0,69 %, position moyenne 36,7.
  12/08→21/08 : 10 clics, 582 impressions, CTR 1,72 %, position moyenne 40,1. Écart : +3 clics,
  -428 impressions, CTR quasi doublé.
- La baisse d'impressions vient presque entièrement de 2 pages : /services/seo/ (326 → 50
  impressions, position 20,4 → 46,9 sur ces mêmes fenêtres) et
  /blog/logiciel-organisme-formation/ (202 → 60 impressions). Ce sont deux pages déjà
  identifiées comme touchées par les requêtes bot « skills claude seo » (BACKLOG.md n°4) et par
  la position hors jeu de « logiciel organisme de formation » (BACKLOG.md n°6) — la baisse
  d'impressions n'est donc pas un signal négatif en soi, plutôt le reflux d'un pic de bruit
  constaté début août. /services/seo/ reste à 0 clic sur les deux fenêtres.
- En parallèle, les clics se sont répartis sur plus de pages : 9 pages distinctes ont eu au
  moins 1 clic sur 12-21/08 (dont 5 nouvelles : /blog/creer-supports-formation-ia/,
  /blog/evaluer-apprenants-ia/, /blog/lms-organisme-formation/,
  /blog/outils-ia-organisme-formation/, /blog/prompts-ia-formateurs/, 1 clic chacune) contre
  6 pages sur 02-11/08. C'est ce qui explique le CTR en hausse malgré moins d'impressions au
  total.
- /blog/feuille-emargement/ (suivi actif, BACKLOG.md n°3) : 19 impressions / 0 clic sur
  12-21/08 (6 impr. la fenêtre d'avant), position 17,1 — dans la fourchette déjà notée le 22/08,
  rien de nouveau avant le relevé du 11/09.
- /blog/livret-accueil-stagiaire/ : 2 clics / 28 impressions sur 12-21/08 (1 clic / 11 impr.
  avant) — la page la plus cliquée du relevé.
- Cumul depuis le lancement (14/05→21/08) : 59 clics, 3683 impressions, CTR 1,60 %, position
  moyenne 33,7 — soit +1 clic mais **-72 impressions** par rapport au cumul enregistré le 22/08
  (58 clics, 3755 impressions au 19/08), alors que la fenêtre s'est allongée de 2 jours. Chiffre
  contre-intuitif : traité ici comme une révision normale des données GSC (Search Console
  retraite parfois les jours récents en aval, écart faible à l'échelle du cumul, ~2 %) et non
  comme une vraie perte de trafic — les deux comparaisons de fenêtres ci-dessus montrent au
  contraire un CTR en progrès. À revérifier au prochain relevé si l'écart se creuse.
- Autres URLs de la liste striking distance (BACKLOG.md n°3) : rien à signaler avant l'échéance
  du 11/09, pas de mouvement notable sur la fenêtre.

**Mesure :** mesuré — Composio GSC, sc-domain:claudeagency.fr, le 2026-08-24 (chaque chiffre
avec sa fenêtre, détail ci-dessus). Lignes ajoutées dans PERFORMANCES.csv dans ce commit.

**Suite :** prochaine action du backlog toujours la même — vague 1 netlinking (6 fiches
gratuites, BACKLOG.md n°1), rien d'autre ne débloquera la position moyenne de 33-40. Revenir sur
l'échéance du 11/09 pour les 9 URLs striking distance et l'arbitrage /services/seo/.


## 2026-08-22 (66) — Réécriture conversion de l'article automatiser-qualiopi-ia

**Type :** réécriture (copywriting + images).

**URLs :** https://claudeagency.fr/blog/automatiser-qualiopi-ia/

**Pourquoi :** demande de Julien. Cette page est la destination du lien du mail E1 de la
prospection SalesHandy (50 dirigeants d'OF, départ le 25/08) : décision de l'optimiser pour ce
lecteur-là d'abord (choix explicite de Julien), le SEO de la page étant par ailleurs
« publiée sans impression » et le blocage du site restant le netlinking.

**Fait :**
- Restructuration : accroche sur la douleur (preuves éparpillées) avec réponse directe conservée
  en tête (citabilité IA) ; **tableau des 7 critères et preuves attendues** ajouté, car c'est la
  promesse exacte du mail E1 (« les preuves attendues indicateur par indicateur »), source citée
  (Référentiel national qualité, arrêté du 6 juin 2019, travail-emploi.gouv.fr, URL vérifiée 200) ;
  preuve sociale (citation chiffrée Julien) remontée avant le premier CTA ; sections redondantes
  fusionnées (« Comment Claude Agency met en place », « Déléguer plutôt qu'embaucher »).
- CTA : bandeau terracotta plein (conforme DESIGN.md) vers **/contact/** (Calendly, conversion
  Google Ads trackée), choix arbitré par Julien contre le lien cal.com de la séquence. Second CTA
  texte en fin de FAQ, inchangé.
- 2 images ajoutées dans le corps : schéma SVG « L'IA prépare, l'humain valide » (2 Ko, palette
  du site) et illustration webp générée (Pollinations flux, gratuit, 29 Ko, nature morte du
  classeur d'audit — 2 essais avec visage écartés, rendu IA peu crédible).
- Tirets cadratins absents de la nouvelle copy (règle DESIGN.md). Tous les liens internes
  existants conservés (17 liens internes sur la page rendue), URL inchangée (lien codé en dur
  dans SalesHandy + 3 redirections 301 entrantes).
- `updatedDate: 2026-08-22`, meta description resserrée.

**Mesure :** mesuré — build local `npm run build` exit 0 (162 pages) ; page rendue contrôlée en
dev (tableau 8 lignes, CTA brand-700 vers /contact/, 2 nouvelles images servies en 200,
console sans erreur) ; 1 446 mots rendus (849 avant). Contrôle visuel pixel : non vérifié
(panneau navigateur non affiché côté poste). Publication et vérification de l'URL en ligne :
voir Suite.

**Suite :** au relevé hebdo, suivre clics/impressions de la page et le taux de RDV /contact/
sur la fenêtre de la vague 1 (25/08 →).

## 2026-08-22 (65) — Relevé GSC hebdomadaire (fenêtre 10/08→19/08, comparée à 31/07→09/08)

**Type :** mesure.

**URLs :** sc-domain:claudeagency.fr (propriété domaine, pas d'URL précise).

**Pourquoi :** relevé de routine (tâche planifiée hebdomadaire `suivi-seo-hebdo-claudeagency`).
Note de cadrage : la cible d'origine de cette tâche (`plan-actions-seo-claudeagency.md` dans un
dossier `CLAUDE PARTNERS` qui n'existe plus) et sa méthode d'accès GSC (Claude in Chrome sur la
propriété préfixe URL) sont périmées depuis le passage à ce dossier `docs/seo/` le 2026-08-14. Ce
relevé utilise donc le protocole actuel : Composio `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`
sur `sc-domain:claudeagency.fr`.

**Fait :**
- Comparaison de deux fenêtres de 10 jours pleines (les 2-3 derniers jours avant le 22/08 sont
  incomplets côté GSC, donc exclus) : 31/07→09/08 contre 10/08→19/08.
  31/07→09/08 : 9 clics, 905 impressions, CTR 0,99 %. 10/08→19/08 : 8 clics, 769 impressions,
  CTR 1,04 %. Écart : -1 clic, -136 impressions — dans le bruit vu le volume à un chiffre.
- Cumul depuis le lancement (14/05→19/08) : 58 clics, 3755 impressions, CTR 1,54 % — soit +9 clics
  et +958 impressions par rapport au cumul du 12/08 (49 clics, 2797 impressions, au 09/08).
- `/services/seo/` : 198 impressions sur 10-19/08 (168 la semaine d'avant), toujours 0 clic global.
  Mais en excluant les requêtes bot « skills claude seo » (BACKLOG.md n°4), les deux requêtes
  ciblées par le changement de title du 12/08 sont en excellente position depuis le 12/08 :
  « agence référencement claude » pos. 2,0 (6 impr.) et « agence référencement naturelle claude »
  pos. 1,8 (5 impr.), toujours 0 clic. Ce n'est donc plus un problème de position (la position 3,8
  notée le 12/08 dans BACKLOG.md est dépassée, en mieux) mais un problème de CTR sur un title/
  snippet déjà en position 2. À relire avant l'arbitrage du 11/09 : la règle « si 0 clic le 11/09,
  revenir à l'ancien title » mérite d'être réexaminée à la lumière de ce chiffre — revenir en
  arrière ferait perdre une position 2 obtenue ; le problème semble être ailleurs (meta
  description / snippet), pas le ranking.
- `/blog/feuille-emargement/` : 12 impressions / 0 clic sur 10-19/08 (position ~17), 1 clic au
  cumul 14/05→19/08 (position 13,6). Pas de mouvement notable.
- Indexation : le compteur `indexed` du sitemap Search Console affiche 0/72 — connu pour être
  peu fiable/en retard sur ce type de site, et contredit par les dizaines de pages qui génèrent
  des impressions dans ces mêmes relevés (donc bien indexées en pratique). Pas d'alerte à en tirer.
- Les 6 URLs de contrôle listées dans l'ancienne tâche planifiée (`/services/audit-ia/`,
  `/services/automatisation/`, `/services/outils-ia-sur-mesure/`, `/services/sea/`, etc.)
  n'existent plus : l'arborescence `/services/` a changé (aujourd'hui : `/seo/`, `/formation-ia/`,
  `/integration-ia/`, `/optimisation-site/`). Contrôle non applicable tel quel.

**Mesure :** mesuré — Composio GSC, `sc-domain:claudeagency.fr`, le 2026-08-22 (chaque chiffre
avec sa fenêtre, détail ci-dessus). Lignes ajoutées dans `PERFORMANCES.csv` dans ce commit.

**Suite :**
- Relire l'arbitrage `/services/seo/` du 11/09 (`BACKLOG.md` section 3) à la lumière de la
  position 2 sur requêtes filtrées avant de décider un retour en arrière du title — le vrai sujet
  semble être la meta description / le CTR, pas le ranking.
- La tâche planifiée `suivi-seo-hebdo-claudeagency` (Cowork) pointe vers des fichiers et une
  méthode d'accès GSC obsolètes depuis le 2026-08-14 (détail dans Pourquoi ci-dessus). À corriger :
  cible `docs/seo/JOURNAL.md` + `PERFORMANCES.csv` dans `CLAUDEAGENCY`, méthode Composio GSC
  `sc-domain:claudeagency.fr`, pas le dossier `CLAUDE PARTNERS` ni Claude in Chrome.
---
## 2026-08-22 (64) — Socle GEO : `llms.txt` existait déjà, corrigé et hiérarchisé

**Type :** technique (GEO / citabilité IA).

**URLs :** https://claudeagency.fr/llms.txt · https://claudeagency.fr/robots.txt

**Pourquoi :** tâche « llms.txt + socle GEO » du backlog de pilotage `visibilite-ops`, ouverte
sur le constat « `llms.txt` n'existe pas sur claudeagency.fr (vérifié le 21/08), alors que
`robots.txt` y renvoie ». **Ce constat est faux** : `app/src/pages/llms.txt.ts` est sur `main`
depuis le 2026-08-18 (commit `7801371`) et le build l'émet bien. L'erreur vient probablement
d'une recherche dans `app/public/` (le fichier est une route Astro, pas un fichier statique)
ou d'une tentative d'ouvrir l'URL depuis une session cloud, où l'egress vers le domaine est
bloqué — une requête qui échoue n'y prouve pas l'absence du fichier. Consigné ici pour qu'aucune
session ne recrée `app/public/llms.txt` : il écraserait la route et figerait le contenu.

**Fait :** trois corrections sur le socle existant, aucune création.

1. **Brouillons exclus.** `llms.txt.ts` appelait `getCollection('blog')` sans filtre, alors que
   `/blog/`, `/blog/[...id]`, `/blog/tags/[tag]`, `/services/[...id]` et `/rss.xml` filtrent tous
   `!data.draft`. Aucun article n'est en brouillon aujourd'hui, donc rien n'a fuité ; mais le
   premier `draft: true` aurait envoyé les moteurs IA sur une page non construite. Filtre aligné.
2. **Section « Articles de référence »** ajoutée avant la liste complète : 14 piliers choisis à la
   main (jamais par script, cf. incident du 03/07) sur les positions et impressions de
   `REQUETES.csv` et la couverture des deux clusters — documents obligatoires d'un OF
   (`qualiopi-guide-organisme-formation`, `indicateurs-qualiopi`, `remplir-bpf-organisme-formation`,
   `convention-de-formation`, `numero-declaration-activite`, `livret-accueil-stagiaire`,
   `questionnaire-satisfaction-formation`) et adoption de l'IA (`integrer-ia-organisme-formation`,
   `automatiser-qualiopi-ia`, `creer-supports-formation-ia`, `prompts-ia-formateurs`,
   `claude-vs-chatgpt-organisme-formation`, `logiciel-organisme-formation`,
   `seo-organisme-formation`). Un slug de cette liste devenu introuvable **fait échouer le build**
   — garde-fou testé pour de vrai, pas supposé (voir Mesure).
3. **Cinq pages indexables manquaient** dans « Pages principales » : `/blog/`, `/diagnostic/`,
   `/barometre-ia-organismes-formation/`, `/ressources/10-automatisations-ia/`,
   `/facturation-tva-societe-europeenne/`. Ajoutées. Ajouté aussi en fin de fichier : date du
   dernier article publié (calculée, pas écrite en dur), lien sitemap, lien RSS, autorisation
   explicite de citation avec lien vers la source. `robots.txt` déclare désormais l'URL complète
   de `llms.txt` en commentaire dédié, au lieu d'une simple mention dans l'en-tête.

Aucun Schema `FAQPage`/`HowTo` ajouté (la section « Questions fréquentes » de `llms.txt` est du
texte, pas du balisage). Aucun contenu d'article touché.

**Mesure :** mesuré le 2026-08-22 en local, build de production (`npm run build`, Node 22.22.2) :
- build **code de sortie 0**, 162 pages, `dist/llms.txt` passé de **23 325 à 28 781 octets** ;
- **les 77 URLs distinctes citées dans `llms.txt` ont toutes un fichier construit dans `dist/`**
  — contrôle automatisé, zéro manquant : aucun lien mort servi aux moteurs IA ;
- **aucune page `noindex`** n'y figure (contrôle sur les 10 chemins exclus du sitemap) ;
- garde-fou vérifié en le déclenchant : un slug bidon dans `REFERENCE_SLUGS` fait sortir le build
  en **code 1** avec le message attendu ; ligne retirée, build revert vert.
Deux avertissements de police (`Bricolage Grotesque`, `Schibsted Grotesk`) apparaissent au build :
`fonts.google.com` renvoie 403 depuis le bac à sable cloud. Sans rapport avec ce changement, et
sans effet sur le code de sortie.

**Suite :** un point reste ouvert et ne dépend pas du code — le *Managed robots.txt* de Cloudflare
peut bloquer GPTBot/ClaudeBot/Google-Extended au niveau du réseau, ce qui rendrait tout ce socle
inerte (`memo-cloudflare.md` §4, case toujours non cochée). Invérifiable depuis une session cloud :
l'egress vers le domaine est bloqué, et le jeton Cloudflare disponible n'a aucun droit sur la zone
`claudeagency.fr`. Remonté à Julien comme décision sur son tableau de bord.

## 2026-08-20 (63) — Contrôle DNS SPF/DKIM/DMARC des 4 domaines d'envoi (D0c) — bascule Saleshandy bloquée

**Type :** audit technique (DNS), hors périmètre SEO.

**Pourquoi :** contrôle SPF/DKIM/DMARC demandé sur les 4 domaines d'envoi Saleshandy
(`claudeagency.fr`, `claudeagency.eu`, `claudepro.fr`, `claudepartners.fr`) avant la bascule
mail-tester.com de la tâche D0c. L'accès Saleshandy est bloqué (identifiants Notion invalides,
en attente de confirmation de Julien) ; le contrôle DNS ne dépend pas de cet accès — résolveurs
publics uniquement — donc lancé pendant que le blocage Saleshandy attend.

**Fait :** interrogation directe des résolveurs publics (`nslookup -type=TXT`) sur les 4 domaines.

| Domaine | SPF | DKIM `hostingermail-a` | DKIM `mailjet` | DMARC |
| :--- | :--- | :--- | :--- | :--- |
| claudeagency.fr | 1 seul enregistrement, `include:_spf.mail.hostinger.com include:spf.mailjet.com ~all` | actif | actif | `p=none; rua=mailto:jrayes000@gmail.com` |
| claudeagency.eu | 1 seul enregistrement, `include:_spf.mail.hostinger.com ~all` | actif | absent | `p=none; rua=mailto:contact@claudepartners.fr; fo=1` |
| claudepro.fr | 1 seul enregistrement, `include:_spf.mail.hostinger.com ~all` | actif | absent | `p=none; rua=mailto:contact@claudepartners.fr; fo=1` |
| claudepartners.fr | 1 seul enregistrement, `include:_spf.mail.hostinger.com include:spf.mailjet.com ~all` | actif | actif | `p=none; rua=mailto:contact@claudepartners.fr; fo=1` |

**Aucun domaine n'a plus d'un enregistrement SPF** — la règle de la section 7 de `PLAN-SOLOHERY.md`
(« jamais un second SPF ») est respectée sur les 4. DKIM `hostingermail-a` répond sur les 4 ;
fait à noter sans en tirer d'alarme : la clé publique renvoyée est identique caractère pour
caractère sur les 4 domaines (`hostingermail-b` et `-c` vides partout, rotation normale Hostinger).
DMARC toujours `p=none` sur les 4 — cohérent avec l'échéance du 25/09/2026 (`PLAN-SOLOHERY.md`
§6.4), pas encore due, conforme à la consigne « pas de DMARC durci avant ».

**Mesure :** mesuré — `nslookup -type=TXT` le 2026-08-20 sur résolveur système Windows.

**Suite :**
- Test mail-tester.com (9/10 minimum sur les 4 boîtes) et vérification « Outreach Readiness »
  TrulyInbox : **Bloqué** — accès Saleshandy non résolu, identifiants Notion invalides, en attente
  de Julien, au 2026-08-20. À reporter dans la colonne Preuve du Sheet de suivi (tâche D0c) une
  fois l'accès débloqué.
- DMARC `p=quarantine` sur les 4 domaines : ne pas y toucher avant le 25/09/2026 et une lecture des
  rapports sans anomalie — aucune action prise ici, conforme à `PLAN-SOLOHERY.md` §6.4.

---

## 2026-08-19 (62) — Rappel du relevé du 11/09 détaillé dans BACKLOG.md (9 URLs title/meta)

**Type :** organisation (pas d'action SEO, Claude Code n'a pas d'agenda — le rappel se pose dans
le dépôt, l'événement calendrier est créé à la main par SOLOHERY).

**Pourquoi :** la case à cocher existante de `BACKLOG.md` (section 3, entrée du 2026-08-12) disait
« clics, CTR et position de ces 9 URLs » sans les lister — un relevé qui doit rouvrir
`JOURNAL.md` pour retrouver la liste n'est pas un rappel autonome.

**Fait :** case enrichie dans `BACKLOG.md` (section 3, « Pages en striking distance ») : les 9
URLs recopiées avec leur position et clics de départ, et la règle déjà arbitrée pour
`/services/seo/` (toujours 0 clic le 11/09, position 3,8, zéro récolte → retour à l'ancien title
« Agence SEO Claude pour organismes de formation » ; l'effet d'un title se voit 2 à 4 semaines
après changement).

**Mesure :** aucune, entrée d'organisation.

**Suite :** événement calendrier à créer à la main par SOLOHERY au 2026-09-11 (Claude Code ne peut
pas poser de rappel qui sonne) :
1. Date : 2026-09-11
2. Titre : Relevé SEO — 9 URLs title/meta (`/services/seo/` : garder ou revenir en arrière ?)
3. Fichier à ouvrir : `docs/seo/BACKLOG.md`, section 3 « Pages en striking distance »

---

## 2026-08-19 (61) — Visuels LinkedIn posts 2 à 4 du sprint (suite entrée 39)

**Type :** prospection LinkedIn, hors périmètre SEO (visuels pour la programmation des posts du
sprint `docs/seo/posts-linkedin-sprint.md`).

**Pourquoi :** Julien programme les posts 2, 3 et 4 sur SOLOHERY (post 1 déjà publié le 18/08 sans
visuel dédié) ; demande de visuels carrés prêts à joindre à chaque post.

**Fait :** 3 SVG source + 3 PNG (1080×1080) générés via `app/scripts/svg-to-png-linkedin.mjs`
(sharp, en local), sur le même gabarit que `gabarit-post.svg` (bandeau terracotta, zone titre en
tirets, attribution) : `post2-claude-ai-francais`, `post3-formation-claude`,
`post4-seo-organisme-formation`. Accroche de chaque visuel reprise du post correspondant dans
`posts-linkedin-sprint.md` (question ou chiffre déjà vérifié en 2e passe du même fichier — aucun
chiffre nouveau introduit). Palette strictement limitée aux 3 couleurs `#FBF7F1`/`#CC785C`/
`#2B2724`, vérifiée par grep sur les 3 SVG. Fichiers dans `docs/seo/visuels-linkedin/`.

**Mesure :** 3 SVG, 3 PNG à 1080×1080 (dimensions confirmées par le script), 3 couleurs uniques par
fichier.

**Suite :** posts 2, 3 et 4 programmés par Julien sur SOLOHERY le 19/08 (visuels joints). Reste, le
jour de chaque publication : coller l'URL de l'article en 1er commentaire (jamais dans le corps du
post).

---

## 2026-08-19 (60) — Enrichissement qualiopi-guide-organisme-formation.mdx (vague longue traîne 3/3)

**Type :** reecriture.

**URLs :** https://claudeagency.fr/blog/qualiopi-guide-organisme-formation/

**Pourquoi :** clôt la vague longue traîne. Sujet #13 (« Certification RNQ : étapes pour
l'obtenir ») abandonné le 2026-08-19 (entrée 58/59, décision Julien) car déjà couvert en
profondeur par ce guide. Plutôt qu'un article redondant, recherche d'un angle réellement absent :
le guide liste « choisir un organisme certificateur accrédité COFRAC » comme étape 4 sans jamais
expliquer comment choisir.

**Fait :** nouvelle sous-section « Comment choisir son organisme certificateur ? » insérée après
la liste des étapes (accréditation COFRAC obligatoire, ~39 certificateurs en 2026, critères de
choix pratiques, vérification sur cofrac.fr). Sourcé par recoupement de plusieurs résultats de
recherche convergents (pas de contradiction rencontrée, contrairement aux deux vérifications
précédentes de cette vague). `updatedDate` passé à 2026-08-19. `npm run build` passé. Article
passé de 3362 à 4231 mots ; `REQUETES.csv` (ligne existante mise à jour, pas de nouvelle ligne)
et `BACKLOG.md` (n°8, vague marquée terminée) mis à jour dans ce commit.

**Mesure :** non mesuré — pas de changement de requête ciblée, ajout de contenu sur une page déjà
indexée.

**Suite :** rien pour cette vague. Prochaine action SEO à choisir selon `BACKLOG.md` — le
netlinking (n°1) reste le point de blocage identifié, pas la production d'articles.

---

## 2026-08-19 (59) — Nouvel article : OPCO et Qualiopi (vague longue traîne 2/3)

**Type :** publication.

**URLs :** https://claudeagency.fr/blog/opco-qualiopi-financement/

**Pourquoi :** sujet #11 du plan éditorial longue traîne, vérifié non cannibalisé avant écriture
(`plan-financement-formation.mdx` reste sur l'opérationnel OPCO — liste, procédures, délais —
sans traiter l'angle conditionnalité Qualiopi). Remplace le sujet #13 initialement prévu,
abandonné après avoir constaté qu'il dupliquait `qualiopi-guide-organisme-formation.mdx` (voir
entrée 58 et décision de Julien dans `BACKLOG.md` n°8).

**Fait :** article rédigé (1224 mots). Recherche web avant rédaction : une affirmation trouvée
sur un blog SEO tiers (« fin de la sélection imposée des OPCO en octobre 2026 ») n'a pas pu être
recoupée par un texte réglementaire ni une deuxième source indépendante — **volontairement
exclue** de l'article plutôt que publiée sur une seule source non vérifiable. Contenu final
limité aux faits recoupés par au moins deux sources indépendantes (conditionnalité Qualiopi
depuis le 1er janvier 2022, nécessité du référencement propre à chaque OPCO). Frontmatter
conforme (`description` raccourcie de 171 à 153 caractères après un premier dépassement).
Couverture réutilisée (`financer-formation-cover.png`, déjà utilisée par
`formation-autofinancee-france-travail.mdx`). Maillage à la main : 3 liens sortants
(`qualiopi-guide-organisme-formation`, `plan-financement-formation`,
`numero-declaration-activite`) + service `audit-ia` ; 1 lien entrant ajouté dans
`plan-financement-formation.mdx` (section OPCO) pour éviter l'article orphelin. `npm run build`
passé (161 pages, 58 articles de blog). `REQUETES.csv` et `BACKLOG.md` (n°8) mis à jour dans ce
commit.

**Mesure :** non mesuré — article tout juste publié.

**Suite :** dernier volet de cette vague : enrichir `qualiopi-guide-organisme-formation.mdx`
(remplace le sujet #13, décision Julien) plutôt qu'écrire un 3e article neuf.

---

## 2026-08-19 (58) — Nouvel article : règlement intérieur d'un OF (vague longue traîne 1/3)

**Type :** publication.

**URLs :** https://claudeagency.fr/blog/reglement-interieur-organisme-formation/

**Pourquoi :** suite de `plan-editorial-longue-traine.md` (sujet #8), max 3 articles cette vague
sur consigne explicite de Julien (leçon du 30/06/2026 : plus de publication en masse). Avant
d'écrire, vérification cannibalisation des 3 sujets proposés (#8, #9, #12) : #9 (déclaration
d'activité, procédure pas à pas) et #12 (BPF qui/délais) se sont révélés **déjà traités** en
profondeur par `numero-declaration-activite.mdx` et `remplir-bpf-organisme-formation.mdx` —
aucun article écrit pour ces deux-là, remplacés par #13 puis #11 (voir entrées suivantes).
Détail complet dans `BACKLOG.md`, section « Écarté ».

**Fait :** article rédigé (1505 mots), sourcé (Code du travail L6352-3 à L6352-5, R6352-1 à
R6352-15, et loi n° 2026-534 du 25 juin 2026 pour la mise à jour anti-fraude — vérifiée par
recoupement de deux sources indépendantes avant publication, une première source citait un
mécanisme non confirmé). Frontmatter conforme au schéma (`title` raccourci de 71 à 68
caractères après échec du premier `npm run build`). Couverture réutilisée
(`creer-organisme-formation-cover.webp`, déjà utilisée par un article voisin) plutôt qu'image
générée : cohérent avec la pratique actuelle du dépôt (couvertures dédiées ajoutées par lots
a posteriori). Maillage à la main : 3 liens sortants (`numero-declaration-activite`,
`livret-accueil-stagiaire`, `qualiopi-guide-organisme-formation`) + service
`outils-ia-sur-mesure` ; 1 lien entrant ajouté dans `numero-declaration-activite.mdx` (le mot
« règlement intérieur » de sa liste d'obligations de fonctionnement, déjà présent, transformé en
lien) pour éviter l'article orphelin. `npm run build` passé (160 pages). `REQUETES.csv` et
`BACKLOG.md` (section « À faire » n°8 et « Écarté ») mis à jour dans ce commit.

**Mesure :** non mesuré — article tout juste publié, aucune donnée GSC possible avant plusieurs
jours/semaines d'indexation.

**Suite :** 2 sujets restants de cette vague — #11 (OPCO et Qualiopi) à rédiger, #13 remplacé par
un enrichissement de `qualiopi-guide-organisme-formation.mdx` (décision Julien, voir
`BACKLOG.md` n°8).

---

## 2026-08-19 (57) — Couvertures dédiées, lot 3/N (5 articles supplémentaires)

**Type :** correctif contenu (image + `imageAlt`).

**URLs :**
- https://claudeagency.fr/blog/prompts-ia-formateurs/
- https://claudeagency.fr/blog/claude-vs-chatgpt-organisme-formation/
- https://claudeagency.fr/blog/automatiser-relances-stagiaires/
- https://claudeagency.fr/blog/tunnel-vente-organisme-formation/
- https://claudeagency.fr/blog/attestation-de-formation/

**Pourquoi :** suite des lots 1 et 2 (entrées 54, 56). Sur les 18 articles restants, seuls 2
avaient une ligne dans `export-gsc-2026-08-13-pages.csv` (`donnees-stagiaires-rgpd-ia` et
`catalogue-formation-organisme`, 1 impression chacun) — insuffisant pour départager un top 5.
Complété avec `docs/seo/REQUETES.csv` (colonne `impressions_90j`, même mesure GSC sur fenêtre
plus large, vérifiée cohérente avec `export-gsc-2026-08-13-pages.csv` sur les 10 articles déjà
traités). Avec cette source, `donnees-stagiaires-rgpd-ia` et `catalogue-formation-organisme`
retombent en fait très bas (1 impression sur 90 jours) ; le vrai top 5 est
`prompts-ia-formateurs` (40), `claude-vs-chatgpt-organisme-formation` (31),
`automatiser-relances-stagiaires` (16), puis `tunnel-vente-organisme-formation` et
`attestation-de-formation` à égalité (15) — départagés par clics (3 vs 0) et position (4,9 vs
7,1) en faveur de `tunnel-vente-organisme-formation`.

**Fait :** description image et `imageAlt` préparés par Claude, conformes à `DESIGN.md` ; images
générées par SOLOHERY et validées du premier coup (aucun aller-retour de prompt nécessaire cette
fois) ; déposées via upload GitHub direct, récupérées par `git pull`. Frontmatter des 5 articles
mis à jour (`image` + `imageAlt` uniquement) ; `npm run build` passé (159 pages). Compteur
`ia-of-cover.jpg` : 18 → 13.

**Mesure :** pas de mesure d'impact court terme prévue — image seule, sans changement de contenu
ni de requête ciblée.

**Suite :** 13 articles restent sur la couverture générique, à traiter en lot suivant, même
méthode (la source `export-gsc-2026-08-13-pages.csv` seule risque de ne plus suffire à
départager — `REQUETES.csv` sera la source principale pour les lots suivants).

---

## 2026-08-19 (56) — Couvertures dédiées, lot 2/N (5 articles supplémentaires)

**Type :** correctif contenu (image + `imageAlt`).

**URLs :**
- https://claudeagency.fr/blog/linkedin-organisme-formation/
- https://claudeagency.fr/blog/sous-traitance-pedagogique-formation/
- https://claudeagency.fr/blog/crm-organisme-formation/
- https://claudeagency.fr/blog/objectifs-pedagogiques-ia/
- https://claudeagency.fr/blog/prospection-commerciale-organisme-formation/

**Pourquoi :** suite du lot 1 (entrée 54). 23 articles restaient sur `ia-of-cover.jpg` après le
premier lot. Croisement avec `docs/seo/export-gsc-2026-08-13-pages.csv` : seuls 7 des 23 avaient
au moins une impression. Les 3 premiers départagés nettement (`linkedin-organisme-formation` 3,
`sous-traitance-pedagogique-formation` 2, `crm-organisme-formation` 2). 4 articles à égalité à 1
impression pour les 4e/5e places : départagés par position moyenne dans le CSV —
`objectifs-pedagogiques-ia` (1 clic, position 3) et `prospection-commerciale-organisme-formation`
(position 4) retenus devant `donnees-stagiaires-rgpd-ia` (position 25) et
`catalogue-formation-organisme` (position 45).

**Fait :** description image et `imageAlt` préparés par Claude, conformes à `DESIGN.md` ; images
générées par SOLOHERY (nouveaux allers-retours de prompt sur `prospection-commerciale-organisme-
formation` : téléphone fixe anachronique et fond en dégradé façon studio corrigés en smartphone +
mur en aplat) ; déposées via upload GitHub direct, récupérées par `git pull`. Un fichier uploadé
avec un nom fautif (`objectifs-pedagogiques-ia-cover..webp`, double point) renommé avant
branchement. Frontmatter des 5 articles mis à jour (`image` + `imageAlt` uniquement) ; `npm run
build` passé (159 pages). Compteur `ia-of-cover.jpg` : 23 → 18.

**Mesure :** pas de mesure d'impact court terme prévue — image seule, sans changement de contenu
ni de requête ciblée.

**Suite :** 18 articles restent sur la couverture générique, à traiter en lot suivant, même
méthode.

---

## 2026-08-19 (55) — Changement d'entite editrice : BULGARIA EDUCATION EOOD, + 1 page indexee

**Type :** contenu + SEO technique (identite de l'editeur, schema.org Organization, nouvelle page).

**Pourquoi :** decision de Julien : toute la facturation passe desormais par BULGARIA EDUCATION EOOD
(societe bulgare). L'ancienne mention d'editeur (ECOLE DE NATUROPATHIE ET SOPHROLOGIE, SAS, RCS Paris
924 997 539) etait la seule entite nommee sur tout le site. Demande jointe : rassurer les clients
francais sur le droit de facturer depuis un autre Etat membre.

**Donnees legales verifiees avant ecriture** (pieces fournies + controle en direct) :
EIK 206507432, immatriculee au registre du commerce bulgare le 13/05/2021 ; TVA BG206507432 —
**verifiee en direct sur l'API VIES le 19/08/2026** (`isValid: true`, raison sociale et adresse
concordantes) ; siege ul. Saedinenie 66, ent. 1, ap. 15, 9700 Choumen ; gerante et associee unique
Krasimira Pencheva Cholakova ; IBAN BG49IORT80481493566100 (Investbank, Sofia). Zone euro depuis le
01/01/2026 (source : Banque de France / BCE, consultee le 19/08/2026). Le capital social (20 leva)
n'est volontairement pas publie.

**Fait :**

- `mentions-legales.astro` reecrit : editeur = BULGARIA EDUCATION EOOD, directeur de publication
  Julien Rayes ; sections ajoutees « Droit applicable » (dir. 2000/31/CE, art. 56 TFUE), « Nature de
  l'activite », « Facturation et TVA » (art. 44 dir. 2006/112/CE, art. 283-2 CGI), « Verifier notre
  identite » (VIES + registre bulgare), « Coordonnees bancaires » (avec avertissement anti-fraude au
  faux fournisseur), « Protection des donnees ». Page toujours en `noindex`.
- **Nouvelle page indexee** `/facturation-tva-societe-europeenne/` — « Facturer avec une societe
  europeenne : TVA et garanties ». Traite l'autoliquidation, le cas de l'OF exonere de TVA (cout
  final identique a une agence francaise, seule difference : formalite du numero de TVA intracom),
  les recours (reglements 1215/2012, 593/2008, 861/2007), et dit explicitement que les prestations
  ne sont pas financables. Schema : BreadcrumbList seul — **pas de FAQPage**, conformement au
  garde-fou du CLAUDE.md.
- `confidentialite.astro` : responsable de traitement nomme (il ne l'etait pas — manquement RGPD
  art. 13 corrige au passage), autorite de controle KZLD + droit de saisir la CNIL.
- `BaseLayout.astro` (Organization) : `legalName`, `vatID`, `taxID`, `address` (BG) ajoutes.
  `areaServed` FR/BE/CH/LU inchange — c'est le marche, pas le siege.
- `Footer.astro` : lien « Facturation & TVA » sous Legal.
- `services/[...id].astro` : bandeau de bas de page vers la nouvelle page, sur les 8 pages service.
- `llms.txt.ts` : entite juridique, nature de prestataire (pas OF), lien vers la page facturation.
- `agence-marketing-claude.astro` + `llms.txt.ts` : « agence francaise » -> « agence francophone »
  (l'affirmation devenait fausse).
- `content/services/formation-ia.mdx` : la FAQ repondait « finançable selon votre situation » a la
  question du financement. Corrige en « Non » motive — c'etait la seule promesse a risque du site.

**Mesure :** `npm run build` -> exit 0, **159 pages** (158 avant, +1), mesure faite avant
la fusion des entrees 45-54 poussees en parallele ; build repasse apres fusion. Verifie dans `dist/` :
la nouvelle page est generee et presente dans `sitemap-0.xml` ; le JSON-LD de `index.html` expose
`legalName`, `vatID: BG206507432`, `addressCountry: BG` ; `grep` sur tout `dist/` ne trouve plus
aucune occurrence de « NATUROPATHIE » ni de « 924 997 539 ».

**Suite :**

- Ajouter la ligne de la nouvelle page a `REQUETES.csv` au prochain releve GSC (fait ce jour,
  statut `nouveau`, position a mesurer le 2026-09-11).
- **Point a trancher hors depot** : verifier avec un conseil que l'offre « Formation IA » (ateliers
  facturés par une societe non declaree en France) ne releve pas de l'obligation de declaration
  d'activite de l'art. L.6351-1 du code du travail. Le site ne promet plus aucun financement, ce qui
  couvre le risque commercial ; la qualification juridique de la prestation reste a confirmer.
||||||| 98d0f0c

---

## 2026-08-19 (54) — Couvertures dédiées pour les 5 articles génériques les plus vus

**Type :** correctif contenu (image + `imageAlt`).

**URLs :**
- https://claudeagency.fr/blog/lms-organisme-formation/
- https://claudeagency.fr/blog/evaluer-apprenants-ia/
- https://claudeagency.fr/blog/make-automatisation-organisme-formation/
- https://claudeagency.fr/blog/accessibilite-formation-ia/
- https://claudeagency.fr/blog/ai-act-organisme-formation/

**Pourquoi :** 28 des 54 articles du blog partageaient encore la couverture générique
`ia-of-cover.jpg`. Croisement avec `docs/seo/export-gsc-2026-08-13-pages.csv` : 12 des 28 avaient
au moins une ligne dans l'export GSC, 16 à 0 impression. Les 5 plus fortes impressions retenues
en priorité (`lms-organisme-formation` 33, `evaluer-apprenants-ia` 24,
`make-automatisation-organisme-formation` 14, `accessibilite-formation-ia` 12,
`ai-act-organisme-formation` 9).

**Fait :** description image et `imageAlt` préparés par Claude pour chacun des 5, conformes à la
palette chaude crème/terracotta de `DESIGN.md` ; images générées par SOLOHERY (plusieurs allers-
retours de prompt nécessaires sur 2 des 5, pour corriger palette froide, expression tendue et
décor en studio photo plutôt qu'en salle de formation réelle) ; déposées dans
`app/src/content/blog/images/` puis récupérées via `git pull` (upload fait directement sur
GitHub). Frontmatter des 5 articles mis à jour (`image` + `imageAlt` uniquement, rien d'autre) ;
`npm run build` passé (158 pages). 23 articles restent sur la couverture générique.

**Mesure :** pas de mesure d'impact court terme prévue — image seule, sans changement de contenu
ni de requête ciblée.

**Suite :** reprendre la liste des 23 articles restants au prochain lot, même méthode (croisement
GSC → priorisation impressions → prompt DESIGN.md → génération manuelle → branchement).

---

## 2026-08-19 (53) — Sous-domaine `reporting.claudeagency.fr` indexé : décision noindex

**Type :** décision + correctif technique (à finaliser hors dépôt).

**URLs :** https://reporting.claudeagency.fr

**Pourquoi :** sous-domaine indexé (17 impressions, position 9,2, propriété `sc-domain`), lié
depuis le menu du site sous « Admin » (`app/src/components/Header.astro`). Non servi par ce
dépôt (aucune page dans `app/src/pages/`, absent du sitemap) : impossible d'y poser un `noindex`
depuis le code.

**Fait :** contenu récupéré par requête HTTP directe (`curl`, pas de navigateur) — visiteur non
connecté : titre `<title>Reporting Claude — administration</title>`, un écran de connexion
(email + mot de passe, lien « mot de passe oublié »), et derrière, un tableau de bord interne
(reporting collaborateurs, suivi client, tarifs jour) chargé en JS côté client. Aucune page
publique présentable. Décision : `noindex`, consignée dans `BACKLOG.md` section 5, SOLOHERY seul.
Vérifié `curl -sI` : pas de `x-robots-tag` actuellement sur la réponse.

**Manœuvre Cloudflare pour SOLOHERY** (dashboard Cloudflare, zone `claudeagency.fr`) :
1. Menu **Règles** (Rules) → **Transformations de réponse HTTP** (Transform Rules → HTTP
   Response Header Modification) → **Créer une règle**.
2. Condition : champ **Nom d'hôte** (Hostname) `equals` `reporting.claudeagency.fr`.
3. Action : **Définir en dynamique** (Set dynamic) le champ En-tête **`X-Robots-Tag`** avec la
   valeur `noindex, nofollow`.
4. Déployer (Deploy).

**Suite :** SOLOHERY a posé la Transform Rule dans Cloudflare le jour même. Vérifié en direct :
`curl -sI https://reporting.claudeagency.fr | grep -i x-robots-tag` → `X-Robots-Tag: noindex,
nofollow`. Terminé côté site ; la désindexation effective dans Google (GSC) est une question de
jours/semaines, rien à faire de plus ici.

---

## 2026-08-19 (52) — Remesure du LCP mobile (accueil) : échec puis succès après clé API fournie

**Type :** mesure.

**URLs :** https://claudeagency.fr/

**Pourquoi :** les corrections LCP du 2026-06-16 (`perf-lcp-mobile.md`) n'avaient jamais été
remesurées ; vérifier si le LCP mobile est repassé sous la cible de 2,5 s (mesuré à 4,2 s
lors de l'audit).

**Fait :** deux tentatives dans la même session. (1) MCP Ubersuggest connecté au projet :
aucun outil `pagespeed_audit` ni équivalent Core Web Vitals/LCP parmi ses endpoints (vérifié
via son propre outil de documentation) ; API PageSpeed Insights sans clé → `429`, quota
journalier à 0. (2) Une clé API PageSpeed Insights a été générée (Google Cloud Console) et
fournie en cours de session → mesure relancée avec succès via `runPagespeed?strategy=mobile`
(clé utilisée uniquement pour cet appel, non stockée dans le dépôt ni en mémoire).

**Mesure :** LCP mobile = **2,7 s** (lab data Lighthouse 13.4.1, `largest-contentful-paint`
numericValue = 2676,7 ms), mesuré le 2026-08-19T09:34:23Z via l'API PageSpeed Insights. Score
performance mobile global : 0,96/1. Encore au-dessus de la cible de 2,5 s (écart 0,2 s), mais
net progrès depuis les 4,2 s du 2026-06-16. Pas de données terrain (CrUX) disponibles pour ce
domaine. Ligne mise à jour dans `PERFORMANCES.csv` (date_releve 2026-08-14, conservée telle
que fixée à l'origine de cette entrée).

**Suite :** cible de 2,5 s pas encore atteinte (écart 0,2 s). Si prioritaire : revisiter les
opportunités mobile encore ouvertes depuis l'audit initial (JS Google Ads gtag.js, ~54 ko,
arbitrage propriétaire non tranché — voir corrections ci-dessus dans `perf-lcp-mobile.md`),
ou relancer une mesure PageSpeed dans quelques semaines une fois plus de trafic mobile pour
obtenir des données CrUX terrain.

---

## 2026-08-19 (51) — Maillage interne manuel sur les 20 pages sous-performantes

**Type :** maillage interne (à la main, article par article — aucun script).

**Pourquoi :** sélection des URLs `/blog/` à 0 ou 1 clic les plus vues dans
`export-gsc-2026-08-13-pages.csv`, pour leur ajouter des liens internes vers des pages plus
susceptibles de convertir (articles proches, pages `/services/`).

**Correction de méthode en cours de route :** 6 URLs du CSV n'avaient pas de fichier `.mdx`
correspondant. Vérifié en ligne (`curl -sI`) sur demande explicite avant de trancher : les 6
redirigent en 301 (`app/public/_redirects`), aucune n'est en 404 — elles proviennent du ménage
de cannibalisation de l'entrée du 2026-08-14 (15 articles fusionnés), et l'export GSC du 08-13
a été pris la veille. Leurs impressions ont été rattachées à la page cible pour un classement
correct : `automatiser-bpf-organisme-formation` (138 impr.) → `remplir-bpf-organisme-formation`
(8 → 146, passe de #16 à #2) ; `claude-agency-vs-concurrents` (26) →
`meilleure-agence-ia-organisme-formation` (entre dans le top 20, remplace
`convention-de-formation`, sorti à 4 impr.) ; `claude-code-organisme-formation` (8) →
`formation-claude-code` (31 → 39) ; `audit-surveillance-qualiopi` (3) →
`qualiopi-guide-organisme-formation` (10 → 13) ; `automatiser-emargement-suivi-stagiaires` (1)
→ `feuille-emargement` (13 → 14).

**Fait :** 3 liens proposés par article pour les 20 articles retenus (60 propositions), rédigés
à la main dans `docs/seo/maillage-interne-2026-08-19-proposition.md`, relus et validés par
SOLOHERY avant application. Appliqués fichier par fichier en 4 lots de 5 — jamais de
chercher-remplacer global, un seul fichier édité à la fois, contrôle du diff après chaque lot —
en réaction directe à l'incident du 03/07/2026 (script de maillage ayant vidé 62 articles).
Chaque nouveau lien est un **nouveau paragraphe ajouté**, jamais une modification d'une phrase
existante, pour garantir un diff purement additif.

**Vérifié :** `cd app && npm run build` après chaque lot (4/4 passés), puis `git diff --stat`
sur les 5 fichiers du lot — uniquement des lignes ajoutées, aucune supprimée, sur les 4 lots.

**Mesure :** 60 liens ajoutés sur 20 articles (`logiciel-organisme-formation`,
`remplir-bpf-organisme-formation`, `formation-claude`, `lms-organisme-formation`,
`formation-claude-code`, `claude-ai-en-francais`, `meilleure-agence-ia-organisme-formation`,
`ai-act-organisme-formation`, `evaluer-apprenants-ia`, `livret-accueil-stagiaire`,
`outils-ia-organisme-formation`, `make-automatisation-organisme-formation`,
`feuille-emargement`, `numero-declaration-activite`, `qualiopi-guide-organisme-formation`,
`accessibilite-formation-ia`, `seo-organisme-formation`,
`cas-usage-claude-organisme-formation`, `claude-pour-le-marketing`,
`formation-autofinancee-france-travail`), en 4 commits (un par lot de 5). Chaque article garde
au moins 1 lien vers une page `/services/` parmi ses 3 nouveaux liens.

**Suite :** `convention-de-formation.mdx` (4 impressions, sorti du top 20 par la correction
ci-dessus) a 3 propositions de liens rédigées mais non appliquées — dans
`maillage-interne-2026-08-19-proposition.md` si besoin de les reprendre plus tard.

---

## 2026-08-19 (50) — Cumul www + non-www sur les 2 derniers doublons signalés à l'entrée 49

**Type :** correction de données (suite directe de l'entrée 49, même fichier).

**Pourquoi :** l'entrée 49 signalait sans les traiter 2 lignes déjà mises à jour à l'entrée 48
(`lms-organisme-formation`, `make-automatisation-organisme-formation`) dont la variante `www.`
existe aussi dans `export-gsc-2026-08-13-pages.csv` avec des impressions non nulles, non
fusionnées. Demande explicite de cumuler les deux variantes, même méthode que le repêchage de
l'entrée 49.

**Fait :** contrairement au repêchage (une seule variante disponible → substitution), ici les
**deux** variantes existent → somme des `clics`/`impressions`, position recalculée en moyenne
pondérée par les impressions de chaque variante (méthode standard d'agrégation GSC quand deux
lignes se combinent) :
- `lms-organisme-formation` : non-www (0 clic, 33 impr., position 60.3) + www (0 clic, 6 impr.,
  position 20.7) → **0 clic, 39 impr., position 54.2**.
- `make-automatisation-organisme-formation` : non-www (0 clic, 14 impr., position 19.9) + www
  (0 clic, 1 impr., position 21.0) → **0 clic, 15 impr., position 19.9** (position quasi
  inchangée, le poids de la variante www est marginal).

`source_requete` reste `sous-seuil-GSC` sur les deux lignes (le cumul reste une métrique de page,
pas une requête précise — même limite qu'aux entrées 48-49). `date_position` déjà à 2026-08-13,
inchangée.

**Vérifié :** script de comparaison ligne à ligne contre `git show HEAD:` (commit de l'entrée 49)
— 0 colonne touchée hors des 5 autorisées, 87 lignes de données inchangées en nombre.

**Mesure — total final sur les 63 lignes traitées depuis l'entrée 48 :**
- **32 / 63** ont désormais des métriques mises à jour depuis les exports GSC du 13/08 (28 par
  correspondance exacte à l'entrée 48, +4 par correspondance www/non-www à l'entrée 49, dont 2
  recalculées en cumul ici — ce sont les mêmes 32 lignes, pas un ajout).
- **31 / 63** restent sans aucune donnée GSC dans ces deux exports (URL absente, ni en exact ni
  en www) — `clics_90j`/`impressions_90j`/`position`/`date_position` inchangés depuis avant
  l'entrée 48.
- Sur l'ensemble des 63 : **0** requête réelle mesurée, **63** `sous-seuil-GSC` (inchangé depuis
  l'entrée 48 — aucune de ces trois passes n'a permis d'attribuer une requête précise à une URL,
  seulement des métriques de page).

**Suite :** aucune connue. Les 31 lignes sans donnée resteraient à traiter par une extraction GSC
filtrée par page si un besoin futur l'exige (option déjà écartée à l'entrée 48, coût ~31 appels).

---

## 2026-08-19 (49) — Correction d'attribution sur l'entrée 48 + repêchage www/non-www (4 lignes)

**Type :** correction de journal (attribution erronée) + correction de données (suite directe de
l'entrée 48, même fichier).

**Pourquoi :** deux questions posées après coup sur l'entrée 48. (1) L'entrée écrivait « Décision
(Julien) » pour le choix « tout en sous-seuil-GSC » — jamais vérifié. (2) Demande de retenter les
35 lignes non mises à jour en normalisant www/non-www avant comparaison, comme un précédent
similaire (C1).

**Fait — correction d'attribution :** vérification faite sur la mémoire `user-role-claude-agency` :
« Son manager est Julien » — l'utilisateur de cette session **n'est pas** Julien. La décision
« tout en sous-seuil-GSC » vient d'une réponse donnée dans ce chat, pas d'une validation directe et
constatée de Julien lui-même. La formule « Décision (Julien) » de l'entrée 48 était une
affirmation non vérifiée (calquée par réflexe sur les entrées où Julien tranche réellement, ex.
entrées 17-19) — corrigée dans l'entrée 48 elle-même plutôt que réécrite en douce.

**Fait — repêchage www/non-www :** deuxième passe sur les 35 lignes sans correspondance de
l'entrée 48, comparaison URL normalisée (`www.` retiré) contre `export-gsc-2026-08-13-pages.csv`.
**4 lignes** avaient une correspondance uniquement en variante `www.` : `remplir-bpf-organisme-formation`
(8 impressions, position 23.5), `qualiopi-guide-organisme-formation` (10, position 41.2),
`catalogue-formation-organisme` (1, position 45.0), `linkedin-organisme-formation` (3, position
7.0). Leurs `clics_90j`/`impressions_90j`/`position`/`date_position` mis à jour depuis cette
variante ; `source_requete` reste `sous-seuil-GSC` (la normalisation www donne la métrique de
page, pas une requête précise — même limite qu'à l'entrée 48). Les 31 lignes restantes n'ont
toujours aucune correspondance, ni exacte ni www. **Point non traité, signalé :** 2 des 28 lignes
déjà mises à jour à l'entrée 48 (`lms-organisme-formation`, `make-automatisation-organisme-formation`)
ont *aussi* une variante `www.` distincte dans l'export (respectivement 6 et 1 impressions
supplémentaires, non fusionnées) — hors du périmètre demandé ici (« les 35 lignes »), à traiter
séparément si besoin de cumuler les deux variantes.

**Vérifié :** script de comparaison ligne à ligne contre `git show HEAD:` (commit de l'entrée 48) —
0 colonne touchée hors des 5 autorisées, 87 lignes de données inchangées en nombre.
`grep -c "A-VALIDER" docs/seo/REQUETES.csv` → 0 confirmé ; `grep -c "sous-seuil-GSC"` → 63
inchangé (le repêchage ne change que les métriques, pas le statut de la requête).

**Mesure :** 4/35 lignes repêchées par normalisation www ; 31/35 toujours sans donnée GSC pour
cette URL. Comptage final requêtes réelles / sous-seuil-GSC inchangé : 0 / 63.

**Suite :** si les 2 doublons www non fusionnés (`lms-organisme-formation`,
`make-automatisation-organisme-formation`) doivent être corrigés, le faire dans une passe dédiée —
demande explicite requise, périmètre de celle-ci limité aux 35 lignes signalées.

---

## 2026-08-19 (48) — 63 requêtes devinées passées en sous-seuil-GSC, blocage de méthode remonté à Julien

**Type :** correction de données (nettoyage `source_requete` / `requete_cible`), suite des entrées
45-46 (mêmes exports GSC du 13/08).

**Pourquoi :** 63 lignes de `REQUETES.csv` portaient une `requete_cible` devinée (53
`deduite-du-slug-A-VALIDER`, 10 `deduite-A-VALIDER`), jamais confrontée à une vraie mesure GSC.
Consigne reçue : pour chacune, chercher dans `export-gsc-2026-08-13-requetes.csv` la requête qui
apporte le plus d'impressions à l'URL de la ligne, sans rien déduire du slug.

**Blocage trouvé avant toute édition :** `export-gsc-2026-08-13-requetes.csv` (222 requêtes) et
`export-gsc-2026-08-13-pages.csv` (50 URLs) sont deux exports **globaux et distincts**
(confirmé par l'entrée 45 : 1717 impressions au total côté requêtes, 1864 côté pages — les deux
totaux ne se recoupent pas). Aucune colonne commune entre les deux fichiers : impossible de savoir
objectivement quelle requête, parmi les 222, est associée à une URL précise. Croisement des 63
URLs avec `pages.csv` : 28 URLs ont un total d'impressions connu mais sans requête attribuable
(la seule façon de "trouver" une requête aurait été de faire correspondre son texte au sujet de
la page — exactement le "déduire du slug" interdit par la consigne) ; 4 autres n'existent dans
l'export qu'en variante `www.` (piège déjà documenté à l'entrée 46).

**Décision (tranchée dans ce chat, remontée avant d'exécuter — voir correction entrée 49 : pas une
validation directe de Julien) :** aucune des 63 lignes ne peut prétendre à une
`requete_cible` mesurée — les 63 passent en `source_requete = sous-seuil-GSC`, `requete_cible`
inchangée. Pour les 28 URLs retrouvées **à l'identique** (correspondance exacte, sans tolérance
www/non-www) dans `pages.csv` avec des impressions non nulles, `clics_90j`, `impressions_90j`,
`position` et `date_position` sont mis à jour depuis cet export (fenêtre 2026-05-21 → 2026-08-16,
date de mesure enregistrée : 2026-08-13). Les 35 autres lignes (URL absente de l'export ou variante
www non prise en compte) gardent leurs anciennes valeurs de `clics_90j`/`impressions_90j`/
`position`/`date_position` — aucune donnée fiable pour les changer.

**Fait :** script Node.js (`reconcile.js`, jetable, hors dépôt) appliqué sur `REQUETES.csv` :
correspondance exacte URL → `export-gsc-2026-08-13-pages.csv`, arrondi de la position à 1 décimale
pour rester au format existant (`31.0`, pas `41.986784140969164`). Vérifié après coup par un
second script de comparaison ligne à ligne avec `git show HEAD:` : 0 colonne touchée en dehors des
5 autorisées (`source_requete`, `clics_90j`, `impressions_90j`, `position`, `date_position`),
87 lignes de données avant/après identiques en nombre, aucun ajout ni suppression, aucun
réordonnancement.

**Mesure :** 63/63 lignes traitées. **0** requêtes réelles mesurées (`GSC 2026-08-13 (requete
reelle mesuree)`) — **63** `sous-seuil-GSC`. Sur ces 63 : 28 avec métriques mises à jour depuis
`pages.csv`, 35 inchangées faute de correspondance.

**Suite :** si une vraie mesure page×requête est un jour nécessaire pour ces URLs, il faudra une
extraction GSC filtrée par page (Composio), pas les deux exports globaux du 13/08 — signalé à
Julien comme option 2, non retenue ici (aurait changé la date de mesure et pris ~32 appels). Les
28 lignes dont les métriques ont bougé peuvent faire remonter ou descendre leur position dans un
tri par `impressions_90j` (notamment B3, déjà signalé sensible à ce fichier depuis l'entrée 46) —
non revérifié ici, hors périmètre de cette passe.

---

## 2026-08-19 (47) — Décision Julien : les 3 pages de bruit non corrigées restent en l'état

**Type :** décision (clôt le point « Suite » de l'entrée 46, sans nouvelle donnée).

**Fait :** vérification de l'impact du bruit « skills claude seo » sur B3 (sélection des 10
articles LinkedIn) — aucun changement de classement, les 3 pages signalées à l'entrée 46
(`/services/optimisation-site/`, `/blog/seo-guide-complet-organisme-formation-2026/`,
variante www de `/blog/seo-organisme-formation/`) sont hors du périmètre `type_page = article`
utilisé par B3, ou déjà exclues par sa règle anti-redirection.

**Décision (Julien) :** ces 3 lignes restent **en l'état, non corrigées**. Aucun impact démontré
sur une tâche active ; chacune porte sa propre complexité plutôt qu'une simple correction de
chiffre — `/services/optimisation-site/` est hors périmètre articles, la page redirigée est déjà
gérée par la règle d'exclusion de B3, et le doublon www/non-www de `seo-organisme-formation` est
un problème de configuration GSC (canonicalisation), pas un chiffre à corriger dans
`REQUETES.csv`.

**Statut :** connu, non prioritaire. Pas d'action tant qu'aucune tâche future ne dépend de ces
chiffres précis (ex. une nouvelle sélection d'articles basée sur `impressions_90j`) — à
réinvestiguer seulement dans ce cas.

---

## 2026-08-19 (46) — Correction REQUETES.csv (536→134 impressions) + audit exhaustif du bruit « skills claude seo »

**Type :** correction de données + audit (suite directe de l'entrée 45).

**Pourquoi :** l'entrée 45 avait filtré le bruit d'un agent automatisé sur deux exports GSC neufs,
sans toucher à `REQUETES.csv` lui-même. Julien a demandé la correction de la ligne
`/services/seo/` avec le chiffre filtré, et un audit du reste du fichier pour le même bruit.

**Fait — correction appliquée :** ligne `agence référencement naturel claude` /
`https://claudeagency.fr/services/seo/` : `impressions_90j` 536 → **134** (chiffre filtré de
l'entrée 45), `date_maj` → 2026-08-19. Seules ces deux colonnes touchées.

**Alerte sur la précision de cette correction :** le 536 d'origine ne se reconstruit pas
proprement à partir de l'API. Une requête GSC non filtrée sur une fenêtre de 90 jours calée
exactement sur la date de mesure d'origine (2026-05-15 → 2026-08-12, se terminant le
2026-08-12 comme `date_maj` d'origine) donne **705 impressions** pour cette page — pas 536.
La méthode ou la fenêtre exacte de la mesure d'origine (536) reste donc inconnue (UI GSC avec un
préréglage « 3 derniers mois » qui ne correspond pas forcément à 90 jours calendaires, ou
`search_type`/property différents). 134 est le chiffre filtré le plus récent et fiable
disponible (extraction C1, fenêtre 2026-05-21 → 2026-08-16), mais ce n'est **pas** un
« 536 moins le bruit » recalculé sur une fenêtre identique — à traiter comme la meilleure
estimation actuelle, pas comme une reconstruction exacte.

**Audit exhaustif — requête GSC `query contains "skills claude seo"`, group by page, fenêtre
2026-05-15 → 2026-08-12 (calée sur la date de mesure d'origine de `REQUETES.csv`) :** 4 pages
touchées au total, pas seulement `/services/seo/` :

| Page (GSC) | Impressions bruit | Ligne REQUETES.csv correspondante | Statut |
|---|---|---|---|
| `https://claudeagency.fr/services/seo/` | 146 | ligne 2, 536→**134** | corrigé |
| `https://claudeagency.fr/services/optimisation-site/` | 10 | ligne 28, `impressions_90j`=25 (~40 % de bruit potentiel) | **signalé, non corrigé** |
| `https://claudeagency.fr/blog/seo-guide-complet-organisme-formation-2026/` | 21 | ligne 32, `impressions_90j`=20 — page redirigée 301 depuis le 2026-08-14 vers `seo-organisme-formation` ; le bruit (21) dépasse même l'`impressions_90j` affiché (20), signe que la quasi-totalité du trafic récent de cette page est du bruit | **signalé, non corrigé** |
| `https://www.claudeagency.fr/blog/seo-organisme-formation/` (variante **www**) | 23 | ligne 9 suit l'URL **sans www** (`https://claudeagency.fr/blog/seo-organisme-formation/`, `impressions_90j`=68) — GSC compte les deux variantes comme des pages distinctes ; le bruit mesuré ne tombe pas exactement sur l'URL trackée | **signalé, non corrigé** |

Ces 3 lignes n'ont pas été corrigées : contrairement à `/services/seo/`, aucun chiffre cible
n'avait été validé pour elles, et chacune porte une ambiguïté propre (fenêtre non garantie
identique, page redirigée, variante d'URL). Une correction sans validation aurait remplacé une
imprécision connue par une autre non vérifiée.

**Impact potentiel ailleurs signalé, non traité :** toute tâche ou fichier qui s'appuie sur le tri
par `impressions_90j` décroissant de `REQUETES.csv` (notamment le choix d'articles par volume
d'impressions, ex. B3) a pu se baser sur les anciens chiffres non filtrés des 4 pages ci-dessus,
avant correction. Non vérifié ici, hors périmètre de cette passe.

**Suite :** si Julien valide des chiffres cibles pour les 3 lignes signalées, les corriger dans
une passe dédiée. Vérifier séparément si B3 ou d'autres décisions déjà prises doivent être
revues.

---

## 2026-08-19 (45) — Export GSC filtré (requêtes + pages), fenêtre 2026-05-21 → 2026-08-16

**Type :** extraction de données (GSC via Composio).

**Pourquoi :** `REQUETES.csv` attribue 536 impressions à `/services/seo/` sur la requête cible
« agence référencement naturel claude », un total qui inclut du bruit non lié à l'activité réelle :
un agent automatisé a généré des recherches contenant « skills claude seo » (~140 impressions,
0 clic), gonflant artificiellement les chiffres de cette page.

**Fait :** connexion Composio à Google Search Console établie (1ʳᵉ tentative en échec — token OAuth
sans le scope `webmasters`, `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` sur `LIST_SITES` et
`SEARCH_ANALYTICS_QUERY` ; reconnexion avec le bon scope validée par Julien). Fenêtre demandée :
88 jours, référence 2026-05-14 → 2026-08-09. Dernière date disponible en `data_state=final` :
2026-08-16 (retard GSC de 3 jours par rapport à aujourd'hui). Fenêtre équivalente la plus récente
retenue : **2026-05-21 → 2026-08-16**. Deux exports générés sur `sc-domain:claudeagency.fr` avec
filtre `query notContains "skills claude seo"`, triés par impressions décroissantes :
- `docs/seo/export-gsc-2026-08-13-requetes.csv` — 222 lignes (`requete,clics,impressions,ctr,position`)
- `docs/seo/export-gsc-2026-08-13-pages.csv` — 51 lignes (`url,clics,impressions,ctr,position`)

**Mesure (GSC via Composio, 2026-05-21→2026-08-16) :** total requêtes après filtre = 8 clics /
1 717 impressions ; total pages après filtre = 9 clics / 1 864 impressions. Écart entre les deux
totaux attendu : GSC compte dans les agrégats par page des requêtes rares qu'il anonymise et
n'affiche jamais comme ligne distincte dans l'export par requête — les deux totaux ne se
recoupent donc pas exactement, mais chacun est correct pour son fichier. Référence non filtrée sur
la même fenêtre (`dimensions=[]`) : 51 clics / 3 369 impressions. `/services/seo/` passe de
536 impressions (chiffre non filtré de `REQUETES.csv`) à **134 impressions filtrées** sur cette
fenêtre. Contrôle `grep -ci "skills claude seo"` sur les deux CSV : 0 occurrence, confirmé.

**Suite :** `REQUETES.csv` n'a pas été mis à jour avec ces chiffres filtrés — hors périmètre de
cette extraction, à faire dans une passe dédiée si la ligne `/services/seo/` doit être corrigée.

---

## 2026-08-18 (44) — Nouvelle revérification sameAs LinkedIn : toujours correct, rien à toucher

**Type :** SEO technique (schema.org / E-E-A-T), même consigne que les entrées 42-43, reçue une
seconde fois (avec le même avertissement sur un slug `claudeagency-fr` faux).

**Pourquoi :** consigne reçue de comparer le `sameAs` LinkedIn de `BaseLayout.astro` (objet
organization) et `author.ts` (`AUTHOR_SAMEAS`) à l'adresse réelle `https://www.linkedin.com/company/claude-agency-fr/`,
sans se fier à l'avertissement joint.

**Fait :** état réel relu avant toute édition, pas l'avertissement. Les deux fichiers déclarent
déjà `https://www.linkedin.com/company/claude-agency-fr/`, identique à l'adresse réelle — aucun
changement depuis l'entrée 43. Sameas de l'objet founder (profil personnel de Julien) non touché.
Page reconfirmée en ligne (chargement direct : nom, description, site web, effectif, secteur,
localisation affichés, contenu conforme à `linkedin-kit.md`). `cd app && npm run build` repassé :
158 pages, aucune erreur ; JSON-LD Organization extrait de `dist/index.html` confirme le `sameAs`
correct.

**Mesure :** 0 écart trouvé, pour la deuxième fois. Avertissement de la consigne obsolète par
rapport à l'état du dépôt, comme à l'entrée 43.

**Suite :** aucune. Rien commité côté code — seule cette entrée de vérification.

---

## 2026-08-18 (43) — Revérification sameAs LinkedIn : déjà correct, rien à toucher

**Type :** SEO technique (schema.org / E-E-A-T), vérification suite à l'entrée 42.

**Pourquoi :** consigne reçue de comparer le `sameAs` LinkedIn de `BaseLayout.astro` (objet
organization) et `author.ts` (`AUTHOR_SAMEAS`) à l'adresse réelle de la page entreprise, avec un
avertissement signalant que le fichier déclarerait encore le slug faux `claudeagency-fr`
(sans tiret) — ce qui casserait le `sameAs` sur toutes les pages du site tant que non corrigé.

**Fait :** vérifié l'état réel avant toute édition (le fichier n'a pas été relu à l'aveugle sur la
foi de l'avertissement). Constat : le slug faux n'y est plus — il a déjà été corrigé le jour même,
entrée 42 / commit `a682218`. Les deux fichiers déclarent `https://www.linkedin.com/company/claude-agency-fr/`,
identique à l'adresse réelle donnée. Page confirmée en ligne (chargement direct de
`linkedin.com/company/claude-agency-fr/` : nom, description, site web, effectif et localisation
affichés, contenu conforme à `linkedin-kit.md`). Sameas de l'objet founder (profil personnel de
Julien) non touché. `cd app && npm run build` repassé : 158 pages, aucune erreur ; JSON-LD
Organization du build confirme `sameAs` correct.

**Mesure :** 0 écart trouvé entre le `sameAs` déclaré et l'adresse réelle ; avertissement de la
consigne obsolète par rapport à l'état du dépôt.

**Suite :** aucune. Rien commité côté code — seule cette entrée de vérification.

---

## 2026-08-18 (42) — Câblage sameAs LinkedIn (point 4 de linkedin-kit.md), corrige un slug faux

**Type :** SEO technique (schema.org / E-E-A-T), suite des entrées 40-41.

**Pourquoi :** la page entreprise LinkedIn est maintenant créée et vérifiée en ligne (entrée 41) ;
`linkedin-kit.md` prévoyait de câbler son URL dans le `sameAs` de l'Organization une fois cette
condition remplie.

**Fait :** en cherchant où ajouter l'URL, trouvé qu'elle y était déjà (`app/src/data/author.ts`
et `app/src/layouts/BaseLayout.astro`) mais avec un slug faux : `claudeagency-fr` (sans tiret) au
lieu du vrai slug vérifié `claude-agency-fr`. Un troisième endroit avait la même faute :
`app/src/pages/llms.txt.ts` (fiche LinkedIn du flux AEO/GEO). Les 3 corrigés. `npm run build`
repassé après chaque édition — 158 pages, aucune erreur. Confirmé dans `dist/a-propos/index.html`
que le JSON-LD Person expose désormais la bonne URL.

**Mesure :** 3 occurrences du slug faux corrigées, 0 restante (`grep -rn claudeagency-fr src dist`
vide après correction).

**Suite :** aucune, le câblage documenté dans `linkedin-kit.md` (point 4) est terminé.

---

## 2026-08-18 (41) — Audit page entreprise LinkedIn + correction bannière (logo masquant le wordmark)

**Type :** prospection LinkedIn, hors périmètre SEO (suite de l'entrée 40).

**Pourquoi :** demande explicite d'audit de https://www.linkedin.com/company/claude-agency-fr/
après mise en ligne de la bannière par Solohery.

**Fait :** vérification en vue « membre » (page admin) : tagline, descriptif, spécialisations,
secteur et site web correspondent mot pour mot à `docs/seo/linkedin-kit.md`. Défaut trouvé : le
logo de page (cercle) que LinkedIn superpose en bas à gauche de la couverture cachait la seconde
ligne du wordmark (« AGENCY » réduit à un fragment « CY » visible). Corrigé dans
`banniere-page-entreprise.svg` : wordmark repassé sur une seule ligne, remonté en haut du bandeau
terracotta, hors de la zone que le logo recouvre. PNG régénéré (toujours 1128×191,
3 couleurs `#FBF7F1`/`#CC785C`/`#2B2724`).

**Mesure :** 1 défaut visuel trouvé et corrigé, 0 autre écart de contenu constaté.

**Suite :** ré-uploader `banniere-page-entreprise.png` sur la page entreprise (attente d'accord
avant toute action sur le compte LinkedIn) ; câblage `sameAs` (point 4 de `linkedin-kit.md`)
toujours en attente, page maintenant vérifiée en ligne.

---

## 2026-08-18 (40) — Visuels LinkedIn (bannière + gabarit de post) générés localement

**Type :** prospection LinkedIn, hors périmètre SEO (préparation de la page entreprise, suite des
entrées 38-39).

**Pourquoi :** amorcer la page entreprise LinkedIn « Claude Agency » (étape B7) avec des visuels à
la charte, sans dépendance à un service externe.

**Fait :** 2 SVG source + 2 PNG générés via `app/scripts/svg-to-png-linkedin.mjs` (sharp, en local) :
bannière page entreprise (1128×191) et gabarit de post réutilisable (1080×1080, zone de titre à
remplir). Palette strictement limitée aux 3 couleurs demandées : `#FBF7F1` (crème), `#CC785C`
(terracotta), `#2B2724` (encre) — vérifié par grep sur les 2 SVG après une première version qui
utilisait aussi les neutres `#7A6E60`/`#E5D9C7` de `DESIGN.md`, corrigée sur retour de Julien.
Fichiers dans `docs/seo/visuels-linkedin/`.

**Mesure :** 2 SVG, 2 PNG aux dimensions exactes demandées, 3 couleurs uniques par fichier.

**Suite :** SOLOHERY charge `banniere-page-entreprise.png` comme image de couverture de la page
entreprise LinkedIn une fois celle-ci créée (crayon « Modifier la page » → Image de couverture).

---

## 2026-08-18 (39) — Liste de prospection LinkedIn — un lien LinkedIn confirmé par recoupement

**Type :** prospection LinkedIn, hors périmètre SEO (suite de l'entrée 38).

**Pourquoi :** Julien a trouvé lui-même un lien LinkedIn pour une fiche marquée « inconnu » et a
demandé une vérification par recoupement avant intégration — même exigence que pour la tentative
précédente (entrée non journalisée : lien proposé pour une autre fiche, rejeté après recoupement
car il pointait vers une personne différente occupant un poste différent au sein de la même
structure ; fiche laissée en « inconnu », rien modifié).

**Fait :** recoupement par recherche croisée (3 sources indépendantes convergentes : LinkedIn,
TheOrg.com, communiqué officiel déjà cité en source de la fiche) confirmant que le lien pointe
bien vers la bonne personne, au bon poste, dans la bonne structure. Une fiche mise à jour :
« inconnu » → lien LinkedIn confirmé. Aucun lien reconstruit à partir d'un nom.

**Mesure :** 30 fiches inchangées en nombre, 13 avec lien LinkedIn confirmé désormais (contre 12
à l'entrée 38), 17 en « inconnu ».

**Suite :** Julien recherche un lien pour une autre fiche encore marquée « inconnu » (Afpa) ; même
protocole de vérification prévu avant intégration.

---

## 2026-08-18 (38) — Liste de prospection LinkedIn (30 dirigeants OF) — recherche et correction

**Type :** prospection LinkedIn, hors périmètre SEO (loggé ici faute d'autre journal suivi dans
le dépôt ; aucune ligne de `REQUETES.csv` ni `BACKLOG.md` concernée).

**Pourquoi :** demande explicite — constituer une liste de 30 dirigeants d'organismes de
formation (France/Belgique/Suisse) pour amorcer le levier LinkedIn (invitations et commentaires
manuels, SOLOHERY), en complément du sprint notoriété de `PLAN-SOLOHERY.md`.

**Fait :** recherche manuelle par sources publiques, sans délégation à un sous-agent ni à un
modèle externe (donnée personnelle). Une fiche hors périmètre (contact rattaché à un centre de
ressources du secteur, pas à un organisme de formation dispensant des cours — donc pas un
client-cible au sens de `PRODUCT.md`) repérée en relecture et remplacée par un dirigeant d'un
organisme de formation professionnelle réel, même méthode de sourcing (aucun lien LinkedIn
reconstruit à partir d'un nom).

**Mesure :** 30 fiches (15 France, 8 Belgique, 7 Suisse), 12 avec lien LinkedIn confirmé en
source, 18 en « inconnu ». Détail des noms **volontairement absent de ce journal public** :
fichier `docs/prive/linkedin-30-dirigeants.md`, hors dépôt (`.gitignore`), consultable en local.

**Suite :** deuxième volet (commentaires quotidiens sur 3 publications) en attente que Julien/
SOLOHERY transmette les publications du jour. Journal dédié déjà en place :
`docs/prive/linkedin-journal-engagement.md` (hors dépôt, une ligne par commentaire réellement
posté).

---

## 2026-08-18 (37) — Relecture stylistique libre des 10 posts LinkedIn

**Type :** relecture (correctif sur le livrable de l'entrée 36, même fichier)

**Pourquoi :** demande explicite de contrôle qualité au-delà des règles écrites de la skill —
répétitions de structure entre posts, tournures artificielles, fluidité accroche/question,
cohérence du vouvoiement.

**Fait :** 4 posts (2, 4, 6, 9) partageaient le mot « vraiment » exactement à la même place
(juste avant les puces) → retiré. 4 posts (2, 4, 5, 8) fermaient sur le même moule de question
« …, ou … ? » → reformulé pour 4 et 8. Posts 6 et 7, adjacents, utilisaient la même inversion
« Votre X, vous l'avez Y ? » → question du post 7 réécrite. Post 9 se refermait sur « l'IA ne
remplace pas le formateur, elle libère du temps », un cliché générique que l'anti-référence
« agence IA générique interchangeable » de `PRODUCT.md` demande justement d'éviter → reformulé
en ancrant la phrase sur le prompt (sujet réel du post) plutôt que sur l'IA en général.
Vouvoiement : aucune dérive trouvée. Recontrôlé après coup : les 10 posts restent dans
[900, 1300] signes, zéro lien dans le corps, zéro boucle de négation-contraste.

**Mesure :** non applicable (rédaction).

**Suite :** aucune, sauf nouvelle relecture demandée. Publication manuelle toujours en attente
(cf. entrée 36).

---

## 2026-08-18 (36) — 10 posts LinkedIn rédigés depuis le blog (sprint de distribution)

**Type :** rédaction (publication à faire manuellement sur LinkedIn, hors périmètre agent)

**Fait :** sélection des 10 articles `type_page=article` de `REQUETES.csv` par
`impressions_90j` décroissante (fichier présent dans `app/src/content/blog/`, articles
fusionnés le 14/08 écartés) : logiciel-organisme-formation (404), claude-ai-en-francais (110),
formation-claude (82), seo-organisme-formation (68), livret-accueil-stagiaire (58),
feuille-emargement (50), lms-organisme-formation (46), numero-declaration-activite (45),
prompts-ia-formateurs (40), evaluer-apprenants-ia (38). 10 posts rédigés à la main (900-1300
signes, format `linkedin-kit.md` : accroche, points concrets, question, lien en 1er
commentaire), puis 2e passe de vérification : chaque chiffre cité est retrouvé mot pour mot
dans l'article source (table de correspondance en fin de fichier) ; aucun chiffre supprimé.
Livrable : `docs/seo/posts-linkedin-sprint.md`.

**Mesure :** non applicable (rédaction, pas de publication).

**Suite :** publication manuelle sur LinkedIn par Julien (ou SOLOHERY), un post à la fois,
lien en premier commentaire. `REQUETES.csv` et `BACKLOG.md` non modifiés — ce sprint ne change
pas le statut SEO des articles sources.

---

## 2026-08-18 (35) — Chemin de revendication Societe.com trouvé, gratuit jusqu'au compte

**Type :** netlinking (audit, aucun compte créé — SOLOHERY revendique)

**URLs :** https://www.societe.com/societe/ecole-de-naturopathie-et-sophrologie-924997539.html

**Pourquoi :** item Vague 4, deux anciennes URL de revendication en 404 depuis le 12/08 — pas
retentées, cherché un nouveau chemin depuis la fiche elle-même.

**Fait :** fiche atteinte sans erreur, données conformes à `kit-identite.md`. Bouton
« Revendiquer cette entreprise » cliqué réellement (panneau navigateur, pas une simulation) :
déclenche un module d'inscription gratuite (e-mail + téléphone, validation par lien) — « Créer
un compte gratuitement pour bénéficier des services gratuits de Societe.com », confirmé par les
requêtes réseau observées (`auth-lite.html`). **Aucune contrepartie financière rencontrée**
jusqu'à ce stade — bandeau « 100% Gratuit » sur la fiche. Étape post-création de compte
(association effective à la fiche) non testée, hors périmètre de Claude Code. Deux tentatives de
clic infructueuses en cours de route (`.click()` JS synthétique, puis clic réel via ref) avant de
trouver la bonne piste de diagnostic (requêtes réseau) — changé d'approche plutôt que de boucler
sur le clic. `NETLINKING-ACTIONS.md` mis à jour avec le chemin complet et une marche à suivre.

**Mesure :** non applicable.

**Suite :** SOLOHERY crée le compte gratuit, associe la fiche avec le NAP de `kit-identite.md`,
note le résultat dans Preuve. Si un règlement apparaît en cours de route (non observé jusqu'ici) :
s'arrêter, noter la raison, « Sans objet ».

---

## 2026-08-18 (34) — Adresse expéditeur A10 (Federgon) ajoutée : equipe1@claudeagency.fr

**Type :** documentation (correction d'un oubli, aucun envoi effectué)

**URLs :** aucune — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Pourquoi :** SOLOHERY a demandé quelle adresse utiliser comme expéditeur pour A10, l'e-mail
Federgon préparé n'en précisait pas — oubli constaté en comparant à A7/A8/A9.

**Fait :** vérifié les trois envois précédents : A7 et A8 (adhésions à des fédérations) utilisent
`equipe1@claudeagency.fr` (arbitrage de Julien du 15/08/2026, `kit-identite.md` §3) ; A9
(candidature éditoriale Digiformag, pas une fédération) utilise délibérément
`contact@claudeagency.fr`. Federgon est une fédération et l'e-mail est une question d'adhésion —
rentre dans la règle d'A7/A8. Ligne « De : equipe1@claudeagency.fr » ajoutée au bloc e-mail prêt
à envoyer dans `NETLINKING-ACTIONS.md`.

**Mesure :** non applicable.

**Suite :** SOLOHERY envoie A10 depuis equipe1@claudeagency.fr.

---

## 2026-08-18 (33) — A9 (Digiformag) ajouté à la liste de suivi

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** signalé en une ligne à l'entrée (32), confirmé par Julien : la bio anglaise
envoyée à Digiformag (A9) utilise « consulting firm », même position en attente d'arbitrage que
A7/A8/Federgon.

**Fait :** ligne A9 ajoutée au tableau, citant la phrase exacte engagée. Date d'envoi exacte non
précisée dans la conversation (SOLOHERY a confirmé l'envoi sans donner l'heure/jour précis au-delà
du 18/08/2026 déjà connu). Phrase de clôture du tableau généralisée (« ces messages », plus « les
deux ») vu que la liste compte maintenant quatre entrées.

**Mesure :** non applicable.

**Suite :** aucune connue — liste à jour avec les quatre envois identifiés à ce jour.

---

## 2026-08-18 (32) — Federgon ajouté à la liste de suivi, statut A8 corrigé

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** l'e-mail Federgon (entrée (31)) utilise aussi « cabinet de conseil français »,
même position en attente d'arbitrage que A7/A8. Julien a demandé son ajout à la liste de suivi
des contacts externes pour en avoir la liste complète.

**Fait :** ligne Federgon ajoutée au tableau (date prévue 17/08/2026, formulation engagée citée).
Au passage, la ligne A8 était restée « pas encore envoyé » alors que l'envoi a été confirmé par
SOLOHERY dans cette même session — corrigée à « Envoyé le 18/08/2026 », même fichier, même
tableau, écart trop proche pour le laisser traîner.

**Mesure :** non applicable.

**Suite :** A9 (Digiformag) utilise aussi « consulting firm » en anglais dans sa bio — pas ajouté
ici, Julien n'en a pas fait la demande ; à signaler s'il veut que la liste couvre aussi cet envoi.

---

## 2026-08-18 (31) — E-mail d'éligibilité Federgon préparé, adresse revérifiée

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://federgon.be/fr/devenir-membre/, revérifiée le 18/08/2026

**Pourquoi :** item Vague 4 « à explorer, sans garantie » — le rattachement d'un cabinet IA/
formation à cette fédération RH belge n'est pas garanti ; une question d'éligibilité par e-mail,
sans dossier, teste le terrain avant tout effort de constitution de dossier.

**Fait :** adresse `membership@federgon.be` confirmée toujours exacte (section Contact de la
page, aucune autre adresse d'adhésion mentionnée). E-mail rédigé : une seule question, 3 phrases
de corps, pas de dossier ni pièce jointe, comme demandé. `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé.

**Suite :** SOLOHERY envoie le 17/08 (date déjà fixée dans la consigne), note la date dans
Preuve. Pas de relance intermédiaire — sans réponse au 27/08 : « Sans objet ».

---

## 2026-08-18 (30) — Champ « Links to articles » Digiformag : deux options tranchées par SOLOHERY

**Type :** documentation (candidature déjà envoyée, entrée rétroactive — édition faite avant
l'envoi mais pas commitée sur consigne explicite « ne commit rien pour l'instant »)

**URLs :** aucune nouvelle — `docs/seo/NETLINKING-ACTIONS.md`

**Fait :** deux options neutres écrites pour le champ obligatoire « Links to articles you write
for other sites » (vide/mention explicite de première contribution externe, ou une référence de
Julien non trouvée dans le dépôt), sans trancher à la place de SOLOHERY — candidature à essai
unique. Une erreur de collage a aussi été repérée en cours de route (les 3 sujets d'abord collés
dans ce champ au lieu de « What topics would you like to address? ») et corrigée avant l'envoi
final. La candidature a depuis été envoyée (confirmé par SOLOHERY) ; laquelle des deux options a
été retenue n'a pas été précisée dans la conversation.

**Suite :** aucune — clôturé, ce commit ne fait que documenter ce qui avait été préparé avant
l'envoi.

---

## 2026-08-18 (29) — Candidature Digiformag recalée : anglais requis, 3 sujets déjà publiés

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://www.digiformag.com/en/join-digiformag/, formulaire lu en entier le 18/08/2026
(cookies acceptés via JS, `get_page_text` propre ensuite)

**Pourquoi :** le brouillon existant dans `NETLINKING-ACTIONS.md` (Vague 3) n'avait jamais été
confronté au vrai formulaire ni à l'état actuel du blog.

**Fait :** deux points d'alerte trouvés. (1) Le formulaire est **entièrement en anglais**, avec
prérequis explicite « Mastering the English language » — recherche de version française sans
résultat (aucun lien de langue dans le DOM). Le brouillon français a été recalé en anglais. (2)
**Les 3 sujets prévus sont déjà publiés quasi mot pour mot** : Qualiopi ≈
`automatiser-qualiopi-ia.mdx`, BPF ≈ `remplir-bpf-organisme-formation.mdx`, AI Act ≈
`ai-act-organisme-formation.mdx` (titre quasi identique). Trois angles voisins proposés à la
place, vérifiés contre les articles les plus proches (`indicateurs-qualiopi.mdx`,
`evaluer-apprenants-ia.mdx`, `sous-traitance-pedagogique-formation.mdx`) pour éviter un nouveau
doublon. Champs réels relevés (Name, E-mail, réseaux, bio auteur, liens vers d'autres sites,
sujets, RGPD) — **point d'honnêteté signalé** : le champ « articles sur d'autres sites » n'a pas
de vraie réponse (aucune contribution externe connue), le blog propre proposé comme meilleure
preuve disponible, à confirmer avant l'envoi unique. `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé.

**Suite :** SOLOHERY tranche le point d'honnêteté, envoie. Pas de relance avant 15 jours
(rédaction éditoriale, pas service client) ; candidature unique, pas de deuxième essai.

---

## 2026-08-18 (28) — A8 : dernier champ tranché par SOLOHERY (Conférence)

**Type :** netlinking (mise à jour mineure, formulaire toujours pas soumis à ma connaissance)

**URLs :** aucune — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Fait :** SOLOHERY a choisi « Conférence » pour « Comment avez-vous connu le Hub France IA ? »,
seul champ resté « à trancher ». Fiche mise à jour en conséquence — A8 n'a plus de champ en
suspens côté préparation.

**Suite :** SOLOHERY soumet, note la date dans Preuve.

---

## 2026-08-18 (27) — Liste de suivi des envois externes ajoutée à arbitrage-julien.md

**Type :** documentation (traçabilité, aucune fiche/section substantielle modifiée ailleurs)

**URLs :** aucune — mise à jour de `docs/seo/arbitrage-julien.md`

**Pourquoi :** A7 et A8 sont prêts (A7 déjà envoyé, A8 en attente d'envoi par SOLOHERY), tous
deux affirmant « cabinet de conseil » à des tiers. Julien a demandé un suivi visible de ces
envois pour recontacter les destinataires si l'arbitrage bascule vers « organisme de formation ».

**Fait :** section « Envois externes déjà engagés sur cabinet de conseil » ajoutée à
`arbitrage-julien.md` — tableau avec fédération, date d'envoi, formulation exacte engagée, pour
A7 (Les Acteurs de la Compétence, envoyé le 18/08/2026) et A8 (Hub France IA, préparé, pas encore
envoyé). Distincte de la liste « Fichiers/sections à mettre à jour » déjà présente : celle-ci
suit ce qui est dans le dépôt et se corrige d'un coup, la nouvelle suit ce qui est déjà parti
vers l'extérieur et ne se corrige qu'en recontactant le destinataire.

**Mesure :** non applicable.

**Suite :** ajouter une ligne à ce tableau à chaque futur envoi qui engage la même formulation
(items restants de la Vague 2, relances). Mettre à jour dès qu'un contact est recontacté après
un éventuel changement de position.

---

## 2026-08-18 (26) — A8 : deux points ajustés avant envoi, effectif minimum vérifié après coup

**Type :** documentation (arbitrage + vérification complémentaire, aucun envoi effectué)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/NETLINKING-ACTIONS.md`

**Pourquoi :** avant l'envoi d'A8, Julien a demandé deux vérifications : condition d'effectif
minimum (comme A7) non explicitement checkée au premier passage, et confirmation que « A
renseigner » sur le CA est une vraie réponse et pas un placeholder oublié.

**Fait :** condition d'effectif vérifiée après coup — **aucune condition chiffrée trouvée**
(scan du texte complet de la page, une seule occurrence de « critères », non détaillée ; une
exigence « 2 salariés, 2 ans » existe mais pour un programme distinct, l'AMI catalogue des
offreurs, pas l'adhésion générale). « A renseigner » confirmé comme option à part entière du
menu réel, distincte de l'état vide par défaut — gardé tel quel, point d'action optionnel ajouté
à la marche à suivre plutôt qu'un blocage. Positionnement « cabinet de conseil en IA » du champ
16 : gardé tel quel, même motif qu'A7 (cohérent avec le reste du dépôt, n'engage rien).

**Mesure :** non applicable.

**Suite :** SOLOHERY envoie A8 avec ces deux points réglés.

---

## 2026-08-18 (25) — Message Hub France IA préparé, même travail qu'A7

**Type :** netlinking (préparation, aucun envoi effectué — SOLOHERY envoie)

**URLs :** https://www.hub-franceia.fr/devenir-membre-v2/, formulaire complet lu le 18/08/2026

**Pourquoi :** même exercice qu'A7 (entrée (24)), sur la deuxième fédération de la Vague 2.

**Fait :** formulaire réel lu en entier via extraction DOM directe dès le départ (pas l'arbre
d'accessibilité tronqué — leçon tirée d'A7). **Condition d'entrée : inconnu**, aucune formule
sans cotisation trouvée sur la page ni le formulaire ; une mention web d'« adhésion gratuite un
an » concerne un programme accélérateur ponctuel, pas une catégorie de membre standard — ne
tranche pas la question. Point utile trouvé : le champ « Type de structure » propose une option
qui couvre à la fois « organisme de formation » et « cabinet ... conseil » dans la même case
(texte intégral vérifié : « Organisme de formation - Cabinet d'avocats - Conseil en recrutement
innovation transformation financement ») — contrairement à A7, ce choix n'attend pas l'arbitrage
de `arbitrage-julien.md`, il est correct dans les deux cas. Message reformulé dans l'ordre réel
du formulaire (Société, Siret, civilité, nom, prénom, email equipe1@, fonction, adresse, champ
« Pourquoi rejoindre » avec la question sur les structures <5 salariés, CA laissé « à
renseigner » plutôt qu'une tranche inventée). `NETLINKING-ACTIONS.md` mis à jour.

**Mesure :** non applicable — préparation, rien envoyé par Claude Code.

**Suite :** SOLOHERY envoie, tranche le champ « Comment avez-vous connu... », note la date
d'envoi dans Preuve. Relance le 21/08 si silence, « Sans objet » le 27/08 sinon.

---

## 2026-08-18 (24) — A7 envoyé : deux arbitrages tranchés, message soumis par Claude Code

**Type :** netlinking (envoi effectué directement par Claude Code, sur consigne explicite)

**URLs :** https://lesacteursdelacompetence.fr/devenir-adherent/ — formulaire soumis le
18/08/2026

**Pourquoi :** Julien a demandé de trancher deux points en suspens avant l'envoi (effectif=0
incompatible avec la condition d'éligibilité ; formulation « cabinet de conseil » non arbitrée
en interne), puis d'envoyer directement — changement par rapport au plan initial où SOLOHERY
envoyait.

**Fait :** deux arbitrages tranchés et motivés (détail dans `NETLINKING-ACTIONS.md`) : envoyer
quand même malgré l'incompatibilité effectif/condition (coût nul, réponse écrite = preuve
documentée) ; garder la formulation « cabinet de conseil en IA » (cohérente avec la position
actuelle du reste du dépôt, n'engage rien). Formulaire rempli champ par champ (21 champs) via le
panneau navigateur, **vérifié dans le DOM réel** (`document.getElementById` sur le vrai
`id="forminator-module-11391"`, pas seulement l'arbre d'accessibilité — une première vérification
via `querySelector('form')` avait ciblé le mauvais formulaire, la recherche du site, corrigée
avant l'envoi) : toutes les valeurs confirmées correctes avant soumission. Champ « Comment
avez-vous connu... » tranché à « Moteur de recherche », faute de réponse sur le vrai canal.
Soumis : confirmation constatée sur la page (« Merci de nous avoir contactés... »), formulaire
réinitialisé — signal déterministe de succès, pas déclaré sans preuve.

**Mesure :** non applicable — envoi tout juste effectué, aucune réponse encore reçue.

**Suite :** relance le 21/08/2026 si silence (texte déjà prêt dans `NETLINKING-ACTIONS.md`) ;
« Sans objet » le 27/08 si toujours rien. Si la fédération confirme une formule sans cotisation
compatible avec 0 salarié : rejoindre. Sinon : décliner, ce plan ne souscrit rien.

---

## 2026-08-18 (23) — Message Les Acteurs de la Compétence recalé sur le vrai formulaire

**Type :** netlinking (préparation, aucun envoi effectué par Claude Code)

**URLs :** https://lesacteursdelacompetence.fr/devenir-adherent/, lue en entier (formulaire
compris) le 18/08/2026

**Pourquoi :** le message de `NETLINKING-ACTIONS.md` (Vague 2, section « Les Acteurs de la
Compétence ») était un paragraphe générique, pas relevé sur le vrai formulaire, et ne posait pas
la question d'une formule sans cotisation demandée pour cet envoi.

**Fait :** page lue en entier via le panneau navigateur (le `main` innerText ne renvoyait rien,
contenu dans des accordéons repliés — `read_page` en a extrait le formulaire complet). **Aucune
formule sans cotisation trouvée** (« membre associé », « observateur » absents de la page et
d'une recherche sur les statuts) — noté **inconnu**, pas « non », faute de preuve exhaustive.
**Point d'alerte trouvé en cherchant** : la condition d'éligibilité exige « au moins un salarié »
— le registre officiel du SIREN (tâche A13) indique 0 salarié déclaré (« unité non employeuse »).
Éligibilité elle-même incertaine, pas seulement le tarif. Message reformulé à 21 champs dans
l'ordre exact du formulaire réel (civilité, nom, prénom, qualité, e-mail equipe1@, téléphone au
format +33, message 300 caractères max avec la question sur les structures <5 salariés, nom
commercial, site, année, domaine d'intervention — « Conseil aux entreprises de formation et CFA »
existe tel quel —, SIRET, effectif à 0 sans l'arrondir pour paraître éligible, adresse, dirigeant
Antoine RAYES, etc.). Relance à 4 lignes ajoutée pour le 21/08, filet « Sans objet » au 27/08.
`NETLINKING-ACTIONS.md` mis à jour en conséquence.

**Mesure :** non applicable — préparation, rien envoyé par Claude Code (SOLOHERY envoie).

**Suite :** SOLOHERY envoie le message, tranche le champ « Comment avez-vous connu... », note la
date d'envoi dans Preuve. Relance le 21/08 si silence, « Sans objet » le 27/08 sinon.

---

## 2026-08-17 (22) — Description Crunchbase raccourcie à 114 caractères, limite 2-140 découverte

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-crunchbase.md`

**Pourquoi :** la version 481 caractères collée dans le champ Description a été rejetée par le
formulaire réel : « La longueur doit être comprise entre 2 et 140. » — limite non documentée
nulle part avant ce test.

**Fait :** description reformulée à 114 caractères (compté mécaniquement, `wc -m`), mêmes faits
que `kit-identite.md` §2, en français : « Cabinet de conseil : IA et automatisation du
back-office (Qualiopi, BPF, émargement) pour organismes de formation. » `fiche-crunchbase.md`
mis à jour (tableau + section Description) pour refléter la contrainte réelle.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY termine le formulaire (date de fondation, secteur, logo), soumet, colle
l'URL du profil publié dans la ligne Preuve de `fiche-crunchbase.md`.

---

## 2026-08-17 (21) — Fiche Crunchbase recalée sur le vrai formulaire (français, pas anglais)

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-crunchbase.md`

**Pourquoi :** SOLOHERY a montré le vrai formulaire `/add-new` : interface en français, pas en
anglais comme supposé dans la préparation initiale (hypothèse de bon sens à l'époque — base
mondiale à vocation anglophone — mais démentie par le formulaire réel).

**Fait :** description remise en français (`kit-identite.md` §2, version moyenne, 481
caractères), remplace la version anglaise préparée. Deux champs réels découverts, absents de la
préparation initiale : « Également connu sous le nom de » → `Claude Agency` (bon endroit pour la
marque commerciale, ne contredit pas le nom légal) et « Nom légal » → même valeur que le champ
Nom. Champ « Description » confirmé unique et obligatoire, pas de tagline séparée comme supposé.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY termine le formulaire (date de fondation, secteur, logo), soumet, colle
l'URL du profil publié dans la ligne Preuve de `fiche-crunchbase.md`.

---

## 2026-08-17 (20) — Blocage réel identifié sur A2 : la fiche Google Business est active

**Type :** audit (constat, aucune fiche modifiée — tâche A2 hors dépôt, sur le Sheet externe)

**URLs :** aucune — capture d'écran fournie par SOLOHERY, mise à jour de
`docs/seo/arbitrage-julien.md`

**Pourquoi :** SOLOHERY a demandé quoi écrire en Preuve pour la tâche A2 (marquée « Bloqué » sur
le Sheet), sans connaître la raison exacte du blocage — rien dans le dépôt ne l'expliquait.

**Fait :** capture montrant la fiche Google Business existante (« ECOLE DE NATUROPATHIE &
SOPH... ») : 4,9/5 sur 32 avis Google, 3,8/5 sur 2 avis Trustpilot, catégorie « Centre de
formation continue », avis récents et concrets d'élèves en naturopathie. **Ce n'est pas une
fiche vide à compléter : c'est une activité active**, pas un vestige — contredit directement
l'option 2 d'`arbitrage-julien.md » (« traiter comme un vestige de l'activité passée »), mise à
jour en conséquence avec cette preuve. Le blocage réel d'A2 : compléter cette fiche pour en
faire la vitrine Google de Claude Agency mélangerait deux publics sans rapport (élèves en
naturopathie / dirigeants d'organismes de formation) et diluerait une réputation déjà établie —
décision de fond à prendre avant de toucher à la fiche, pas un problème d'accès ou
d'identifiants.

**Mesure :** non applicable — constat, rien à mesurer.

**Suite :** Julien tranche `arbitrage-julien.md`, avec cette preuve en plus. A2 reste bloquée
jusque-là.

---

## 2026-08-17 (19) — Effectif Sortlist tranché à 2, Julien n'a pas donné le chiffre

**Type :** documentation (correction tranchée, application du protocole de l'entrée (17))

**URLs :** https://www.sortlist.fr/agency/ecole-de-naturopathie-et-sophrologie — champ effectif
à corriger côté SOLOHERY

**Pourquoi :** entrée (18) laissait « 3 personnes dans leur équipe » à confirmer par Julien ;
réponse : il ne donne pas le chiffre. Cas typique du protocole de l'entrée (17) — trancher sans
remonter plutôt que d'attendre.

**Fait :** tranché à **2**, pas 3. Seules deux personnes sont nommées dans tout le dépôt
(Antoine RAYES président, Julien RAYES contact commercial, `kit-identite.md` §1), cohérent avec
le registre officiel (« unité non employeuse », 0 salarié déclaré). Le `3` actuellement publié
n'est appuyé par aucune donnée du dépôt. `fiche-sortlist.md` mis à jour avec la décision et son
motif.

**Mesure :** non applicable.

**Suite :** SOLOHERY corrige le champ sur la fiche Sortlist publiée (2 au lieu de 3).

---

## 2026-08-17 (18) — Fiche Sortlist publiée et vérifiée

**Type :** netlinking (publication vérifiée)

**URLs :** https://www.sortlist.fr/agency/ecole-de-naturopathie-et-sophrologie — **en ligne**,
Vague 1 item #5 clos

**Pourquoi :** dernière étape de `fiche-sortlist.md` : SOLOHERY a rempli et publié la fiche,
capture d'écran envoyée pour vérification.

**Fait :** comparaison champ par champ avec la fiche préparée. Conformes : nom légal (« École de
Naturopathie et Sophrologie »), slogan officiel du site (`BaseLayout.astro:22`), description
481 caractères de `kit-identite.md`, logo, langue Français, aucun avis client inventé (« Aucun
avis pour le moment » affiché, exact). Deux écarts constatés et notés, non bloquants : « 3
personnes dans leur équipe » affiché au lieu du `1` par défaut proposé (à confirmer que c'est le
vrai chiffre) ; la bannière du haut affiche le logo étiré en pleine largeur plutôt qu'une vraie
image de couverture (absente du dépôt, comme signalé dès la préparation). Prix de départ et
onglet Services non vérifiés (hors du champ visible sur la capture envoyée). Champ **Preuve** de
`fiche-sortlist.md` rempli avec l'URL et le constat de vérification.

**Mesure :** non mesuré — fiche tout juste publiée, pas de trafic ni de lead à ce stade.

**Suite :** confirmer le vrai effectif si « 3 » n'est pas exact ; envisager une vraie bannière
plus tard ; item #5 de la Vague 1 clos dans `NETLINKING-ACTIONS.md` (à cocher).

---

## 2026-08-17 (17) — Nouveau protocole de Julien : trancher sans remonter, tracer la raison

**Type :** documentation (changement de méthode de travail + décisions tranchées sur Sortlist)

**URLs :** aucune — mise à jour de `docs/seo/fiche-sortlist.md`

**Pourquoi :** mail de Julien à SOLOHERY, relayé le 17/08/2026 : poser les questions à Claude
Code plutôt qu'à lui, trancher même sans certitude, tracer la décision et sa raison (colonne
Preuve du Sheet de suivi), ne remonter que les vrais blocages — sans attendre de réponse pour
continuer. Concrètement : la question du prix de départ Sortlist, punt à Julien dans l'entrée
précédente, relevait de ce cas — à trancher directement.

**Fait :** trois champs de `fiche-sortlist.md` tranchés ou corrigés d'un coup : catégorie de
service (« Intelligence Artificielle », confirmée sur le vrai formulaire, remplace la
proposition initiale « Conseil en stratégie digitale »), langues (Français, confirmé), et
surtout **prix de départ : €3000**, décidé par Claude Code faute de donnée dans le dépôt —
motif tracé dans la fiche (audit gratuit en point d'entrée, cible PME, ni sous-positionné ni
agressif pour une structure sans référence client). Le Sheet de suivi externe (colonne Preuve)
n'est pas accessible à Claude Code ; la fiche du dépôt sert d'équivalent traçable, à reporter
manuellement côté Sheet si besoin.

**Mesure :** non applicable.

**Suite :** appliquer ce protocole aux prochains blocages (statut « Bloqué » + raison en Preuve
seulement si vraiment bloqué, sinon trancher et documenter). `arbitrage-julien.md` reste
différent : c'est une vraie décision métier (positionnement organisme de formation), pas un
paramètre technique manquant — à montrer à Julien, pas à trancher seul.

---

## 2026-08-17 (16) — Fiche Crunchbase préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-crunchbase.md` ; cible visée :
https://www.crunchbase.com/add-new

**Pourquoi :** item #6 de la Vague 1 (`NETLINKING-ACTIONS.md`), lien nofollow — intérêt en
signal d'entité pour Google/moteurs IA, pas en autorité SEO.

**Fait :** `/add-new` a renvoyé une 403 en accès direct et via le panneau navigateur (deux
échecs, pas de troisième tentative). Champs reconstitués depuis les articles d'aide officiels de
Crunchbase (compte requis, Nom + Description obligatoires, modération humaine + automatique
avant publication, délai non précisé). Nom légal utilisé (`ECOLE DE NATUROPATHIE ET
SOPHROLOGIE`, décision de Julien de l'entrée (15)). Descriptions traduites en anglais ; NAP
volontairement non traduit (adresse, téléphone au format inchangé). Effectif et financement
marqués **« inconnu »**, conformément à la consigne — aucune valeur approchée. LinkedIn de
l'entreprise marqué « à trancher », page pas encore confirmée en ligne.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY crée le compte, ajuste l'ordre des champs sur le formulaire réel, soumet,
attend la modération, colle l'URL du profil publié dans la ligne Preuve de
`fiche-crunchbase.md`.

---

## 2026-08-17 (15) — Décision de Julien : nom légal partout, pas « Claude Agency »

**Type :** documentation (arbitrage, une fiche déjà soumise concernée)

**URLs :** aucune — mise à jour de `kit-identite.md`, `fiche-sortlist.md`,
`fiche-annuaireduconseil.md`

**Pourquoi :** SOLOHERY a posé la question en direct à Julien pendant la soumission Sortlist :
« dois-je toujours utiliser le nom ECOLE DE NATUROPATHIE ET SOPHROLOGIE comme nom de
l'établissement ? » Réponse : **oui**, pour toutes les inscriptions prévues.

**Fait :** décision consignée dans `kit-identite.md` §3, remplaçant les mentions « à trancher »
laissées jusqu'ici entre raison sociale légale et marque commerciale. `fiche-sortlist.md` corrigé
avant soumission (le champ « Nom de l'entreprise » était encore ouvert). **Point d'alerte :**
`fiche-annuaireduconseil.md` a déjà été soumis avec `Claude Agency` (entrée (14)), avant cette
décision — la fiche est encore au statut « En attente », donc modifiable via « Modifier » sur le
tableau de bord, mais je ne l'ai pas éditée : correction laissée à la décision de Julien
(éditer la fiche déjà soumise, ou la laisser telle quelle).

**Mesure :** non applicable.

**Suite :** Julien confirme s'il faut éditer la fiche Annuaire du Conseil déjà soumise. Toute
fiche future (Sortlist en cours, PagesJaunes, Crunchbase, etc.) utilise le nom légal.

---

## 2026-08-17 (14) — Fiche Annuaire du Conseil soumise, en attente de modération

**Type :** netlinking (soumission faite par SOLOHERY)

**URLs :** https://claudeagency.fr — statut affiché sur le tableau de bord
annuaireduconseil.com : **En attente**, gratuit. Aucune URL de fiche publique encore attribuée.

**Pourquoi :** dernière étape de la préparation `fiche-annuaireduconseil.md` (entrées (6), (7),
(12), (13)) : le formulaire réel a été rempli et validé par SOLOHERY.

**Fait :** message « Le site a été soumis avec succès. » constaté. Le tableau de bord du compte
confirme l'entrée `https://claudeagency.fr`, statut « En attente ». Pas de casse rejetée malgré
l'écart de majuscule signalé plus tôt entre le code attendu et le footer réel. Champ **Preuve**
de `fiche-annuaireduconseil.md` **laissé vide** : pas de fiche publique en ligne à cette heure,
seulement une entrée en modération — écrire une URL maintenant serait une preuve inventée.

**Mesure :** non applicable — en attente de validation par l'annuaire.

**Suite :** vérifier le statut du compte annuaireduconseil.com plus tard ; dès qu'il passe de
« En attente » à publié, coller l'URL de la fiche publique dans la ligne Preuve de
`fiche-annuaireduconseil.md` et clore l'item #4 de la Vague 1 dans `NETLINKING-ACTIONS.md`.

---

## 2026-08-17 (13) — Description étoffée à 1 469 caractères pour Annuaire du Conseil

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** le formulaire réel affiche 5000 caractères disponibles pour la description ; les
387 caractères d'abord fournis (entrée précédente) ont été jugés trop courts une fois le champ
vu en vrai.

**Fait :** description réécrite à 1 469 caractères (compté mécaniquement, `wc -m`), toujours
entièrement reformulée par rapport aux trois descriptions de `kit-identite.md`, au site
claudeagency.fr et à la version de 387 caractères elle-même — même règle du site respectée
(« originale et unique, pas de copier-coller »). Mêmes faits, développés : charge administrative
concrète (Qualiopi, BPF, émargement, dossiers de financement, conventions), méthode
automatisation sous contrôle humain, formation à l'autonomie, refus du jargon. `fiche-annuaireduconseil.md`
mis à jour : section Description, ligne du tableau, ligne « Nom du site » confirmée (`Claude
Agency`, champ unique vu sur le formulaire réel — plus d'ambiguïté avec la raison sociale
légale), ligne Twitter ajoutée (facultatif, à laisser vide).

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY colle l'URL de la fiche publiée dans la ligne Preuve de
`fiche-annuaireduconseil.md` une fois validée.

---

## 2026-08-17 (12) — Catégories réelles relevées sur le formulaire Annuaire du Conseil

**Type :** netlinking (correction de fiche, SOLOHERY en train de soumettre en direct)

**URLs :** aucune nouvelle — mise à jour de `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** SOLOHERY était sur le formulaire réel d'annuaireduconseil.com et a montré la liste
de catégories, absente de tout ce que `kit-identite.md` ou la fiche pouvaient deviner à l'avance
(ni « cabinet de conseil » ni « intelligence artificielle » n'y figurent).

**Fait :** recommandation initiale de trois catégories, corrigée en direct par SOLOHERY — **un
seul choix est possible** sur ce formulaire, pas plusieurs. Retenu : **Conseil en stratégie
digitale** (décrit le service vendu), au lieu de « Conseil en formation » qui décrirait à tort la
clientèle visée et se lirait comme « organisation de programmes de formation interne ». Repli :
« Conseil en innovation ». Écarté : « Conseil en recrutement », resté surligné sur la capture
envoyée, sans rapport avec l'activité. Ligne « Catégorie » et étape 5 de la marche à suivre
mises à jour dans `fiche-annuaireduconseil.md` avec cette valeur unique.

**Mesure :** non mesuré — soumission en cours côté SOLOHERY, pas encore publiée.

**Suite :** SOLOHERY colle l'URL de la fiche publiée dans la ligne Preuve de
`fiche-annuaireduconseil.md` une fois validée.

---

## 2026-08-17 (11) — Fiche Sortlist préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-sortlist.md` ; cible visée :
https://www.sortlist.fr/providers/pricing

**Pourquoi :** item #5 de la Vague 1 (`NETLINKING-ACTIONS.md`). SOLOHERY doit pouvoir créer le
compte et soumettre la fiche sans deviner les champs.

**Fait :** offre gratuite confirmée toujours active sur la page Tarifs (lue avec succès via le
panneau navigateur, après plusieurs échecs de rendu — la page répond, la limite était côté
session). Le formulaire de création de profil vit derrière un compte : non créé, hors périmètre
de Claude Code. `help.sortlist.com` (centre d'aide) a renvoyé une erreur 403 dans cette session,
donc pas de détail supplémentaire sur les champs de ce côté. Liste de champs reconstituée à
partir du contenu que Sortlist décrit lui-même pour le profil gratuit (comparatif Gratuit /
Sortlist+) et de la structure standard déjà validée pour les 5 autres fiches
(`kit-identite.md` §3). `fiche-sortlist.md` créé : tableau Champ/Valeur/Remarque, marche à
suivre en 11 étapes. Trouvé et signalé : Sortlist n'affiche aucune catégorie de service
« formation », la consigne « secteur : formation professionnelle » devra probablement se placer
dans un champ secteur-client plutôt que dans la catégorie de service — marqué « à trancher ».
Champs absents du kit (langues, taille minimale de mission, image de couverture, photos
d'équipe, réalisations, avis clients) tous marqués « à trancher » ou laissés vides ; aucune
référence client inventée, conformément à la consigne.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY crée le compte, ajuste l'ordre des champs sur le formulaire réel, tranche
catégorie de service vs secteur, publie, colle l'URL dans la ligne Preuve de
`fiche-sortlist.md`.

---

## 2026-08-17 (10) — Deuxième source distincte pour le statut Qualiopi (SIREN 924997539)

**Type :** audit (correction de rigueur méthodologique, aucune fiche modifiée)

**URLs :** https://annuaire-entreprises.data.gouv.fr/entreprise/924997539 (nouvelle), en plus de
https://recherche-entreprises.api.gouv.fr/search?q=924997539 (entrée (8))

**Pourquoi :** le critère de validation d'A13 exige deux listes officielles consultées
séparément, chacune avec sa propre URL. L'entrée (8) ne citait qu'une seule source agrégée pour
NDA et Qualiopi — signalé comme non conforme.

**Fait :** page `annuaire-entreprises.data.gouv.fr` atteinte via le panneau navigateur (l'échec
précédent, entrée (8), était une limite de session, pas du site) : section « Labels et
certificats » confirme « Organisme de formation (certifié Qualiopi) », mise à jour le
17/08/2026. `kit-identite.md` §4 mis à jour avec les deux URL et leurs dates respectives.
Tentative faite d'atteindre une troisième source réellement indépendante d'un organisme
certificateur (API dédiée `entreprise.api.gouv.fr/catalogue/carif_oref/…`, opérée par un
CARIF-OREF) : bloquée par une exigence de clé API absente de cette session — noté comme tel
plutôt que recopié une deuxième fois. Honnêteté ajoutée dans le fichier : les deux URL retenues
sont distinctes mais s'appuient sur la même chaîne de données publiques (INSEE, DGFiP, Douanes,
MTPEI, INPI), pas sur deux registres tenus par des organismes différents.

**Mesure :** non applicable — vérification documentaire.

**Suite :** aucune — seul `kit-identite.md` §4 a été touché, conformément à la consigne de ne
rien modifier ailleurs avant la réponse de Julien sur `arbitrage-julien.md`.

---

## 2026-08-17 (9) — Note d'arbitrage envoyée à Julien (statut organisme de formation)

**Type :** documentation (préparation de décision, aucune fiche/section substantielle modifiée)

**URLs :** aucune — document interne `docs/seo/arbitrage-julien.md`

**Pourquoi :** l'entrée (8) ci-dessous a mis au jour une contradiction confirmée par vérification
indépendante côté Julien : le NDA/Qualiopi réel de ce SIREN contredit la position « cabinet de
conseil, pas organisme de formation » de `kit-identite.md` §3 et `NETLINKING-ACTIONS.md` l.8-12.
Julien a demandé une note d'arbitrage plutôt qu'une correction directe, et a précisé qu'aucune
autre fiche ne devait être touchée avant sa réponse.

**Fait :** `docs/seo/arbitrage-julien.md` créé — deux options (se déclarer organisme de formation
vs. traiter le NDA/Qualiopi comme un vestige de l'ancienne activité), et la liste précise des
fichiers/sections à modifier selon la réponse. En reconstituant cette liste, trouvé une troisième
source jusque-là non repérée : `PLAN-SOLOHERY.md` §7, ligne « Annuaires Qualiopi » (l.247),
écartée le 12/08/2026 avec la note « à réexaminer si la tâche A13 révèle un NDA » — exactement ce
qui vient de se produire — plus l'onglet ⛔ Interdits du Google Sheet qui la miroir. Trouvé aussi
que la phrase de clôture ajoutée dans `kit-identite.md` §4 (entrée (8)) cite à tort « onglet
⛔ Interdits de `NETLINKING-ACTIONS.md` » : cette liste vit en réalité dans `PLAN-SOLOHERY.md` §7,
pas dans `NETLINKING-ACTIONS.md` — corrigé nulle part encore, seulement noté dans la note
d'arbitrage, conformément à la consigne de ne rien toucher d'autre.

**Mesure :** non applicable — document de préparation, aucune fiche soumise.

**Suite :** attendre la réponse de Julien, puis mettre à jour dans un seul lot les cinq
emplacements listés dans `arbitrage-julien.md` (dont la correction de citation ci-dessus).

---

## 2026-08-17 (8) — Vérification officielle du statut NDA / Qualiopi (SIREN 924997539)

**Type :** audit (vérification réglementaire, aucune fiche modifiée)

**URLs :** https://recherche-entreprises.api.gouv.fr/search?q=924997539 — API officielle
agrégeant SIRENE et les données du Ministère du Travail

**Pourquoi :** `kit-identite.md` (§3) et `NETLINKING-ACTIONS.md` (l.8-12) affirmaient sans
vérification que Claude Agency est un cabinet de conseil non déclaré organisme de formation,
avec les annuaires Qualiopi fermés en conséquence. Vérification demandée avant de trancher la
catégorie des 6 fiches de la Vague 1 et l'éligibilité aux deux fédérations de la Vague 2.

**Fait :** requête API sur le SIREN 924 997 539. Réponse : `est_organisme_formation: true`,
`liste_id_organisme_formation: ["11757002275"]` (NDA 11 75 70022 75, champ documenté dans le
schéma OpenAPI de l'API comme provenant du Ministère du Travail) et `est_qualiopi: true`, donnée
mise à jour le 16/08/2026. **Ce constat contredit l'hypothèse posée dans les deux fichiers
ci-dessus** : ce SIREN est bien un organisme de formation déclaré, certifié Qualiopi. Section
« 4. Statut réglementaire » ajoutée dans `kit-identite.md` avec le détail et les sources. Le NAF
85.59B n'a pas été utilisé comme preuve (générique, ne prouve rien seul). Conséquence actée pour
ce constat (consigne reçue) : rien à soumettre côté annuaires Qualiopi, les listes publiques
recopiant déjà le fichier du Ministère du Travail — ils restent donc écartés (onglet
⛔ Interdits). La catégorie des 6 fiches et l'éligibilité aux deux fédérations ne sont **pas**
modifiées ici : décision qui revient à Julien.

**Mesure :** non applicable — vérification documentaire, aucune fiche soumise.

**Suite :** Julien tranche si la catégorie des 6 fiches (`kit-identite.md` §3) et le bandeau
d'éligibilité de `NETLINKING-ACTIONS.md` (l.8-12) doivent être mis à jour (« organisme de
formation » en plus de ou à la place de « cabinet de conseil »).

---

## 2026-08-17 (7) — Description inédite rédigée pour la fiche Annuaire du Conseil

**Type :** netlinking (préparation, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/fiche-annuaireduconseil.md`

**Pourquoi :** l'entrée précédente signalait que ce site exige une description « unique, jamais
publiée ailleurs en ligne » — les trois descriptions de `kit-identite.md` ne convenaient pas.

**Fait :** description de 387 caractères rédigée pour cette seule fiche, mêmes faits que
`kit-identite.md` (cabinet parisien, organismes de formation francophones, automatisation des
obligations administratives, autonomie des équipes) mais entièrement reformulés — vérifié à la
relecture qu'aucune phrase des trois descriptions existantes ni du site n'est reprise. Aucune
limite de caractères trouvée sur `/info/useCondition` : ciblée par défaut sur 300-400. Longueur
recomptée mécaniquement (Node) après écriture dans le fichier, pas estimée. Section dédiée
ajoutée dans `fiche-annuaireduconseil.md`, tableau et marche à suivre mis à jour en conséquence.

**Mesure :** non mesuré — texte prêt, rien de soumis.

**Suite :** SOLOHERY colle cette description à l'étape 6 de la marche à suivre.

---

## 2026-08-17 (6) — Fiche Annuaire du Conseil préparée, formulaire réel derrière connexion

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-annuaireduconseil.md` ; cible
visée : https://annuaireduconseil.com/webmaster-submit-website.html

**Pourquoi :** item #4 de la Vague 1, condition remplie côté site (lien retour posé au footer,
entrée précédente). SOLOHERY doit pouvoir soumettre la fiche sans deviner les champs.

**Fait :** page d'accueil et page de règles (`/info/useCondition`) lues avec succès, mais le
formulaire de soumission du site vit derrière un compte (e-mail/mot de passe) — non créé, hors
périmètre de Claude Code. Liste de champs reconstituée à partir des règles publiées et de la
structure standard d'un annuaire. Trouvé et consigné : la description doit être **unique, jamais
publiée ailleurs en ligne** — les textes de `kit-identite.md` (dont le long, déjà sur LinkedIn) ne
conviennent donc pas ici, une description neuve reste à rédiger. `fiche-annuaireduconseil.md`
créé : tableau Champ/Valeur/Remarque, marche à suivre en 10 étapes qui s'arrête avant l'offre
Premium payante, ligne Preuve laissée vide.

**Mesure :** non mesuré — document de préparation, rien de soumis.

**Suite :** SOLOHERY vérifie que le lien retour est en ligne (déploiement Cloudflare), rédige la
description unique demandée, puis exécute les 10 étapes.

---

## 2026-08-17 (5) — Lien retour vers annuaireduconseil.com dans le footer

**Type :** netlinking (lien posé sur le site)

**URLs :** https://claudeagency.fr/ (footer, toutes les pages) → https://annuaireduconseil.com/

**Pourquoi :** condition d'inscription à Annuaire du Conseil (Vague 1 #4,
`NETLINKING-ACTIONS.md`) : lien retour depuis claudeagency.fr en échange de la fiche.

**Fait :** `app/src/components/Footer.astro` — un lien vers `https://annuaireduconseil.com/`
ajouté dans la barre de copyright, sur le même motif que le lien existant vers
`annuaireformation.fr` (aucun composant nouveau, aucun script de réécriture). `npm run build`
passe (158 pages), lien vérifié présent dans `dist/index.html`.

**Mesure :** non mesuré — lien posé, fiche pas encore soumise côté Annuaire du Conseil.

**Suite :** SOLOHERY soumet la fiche Annuaire du Conseil une fois le déploiement Cloudflare en
ligne et le lien visible sur le site en production (voir `docs/seo/fiche-annuaireduconseil.md`).

---

## 2026-08-17 (4) — Fiche PagesJaunes/Solocal préparée, page bloquée par anti-robot

**Type :** netlinking (préparation, aucune fiche soumise, aucun compte créé)

**URLs :** aucune publiée — document interne `docs/seo/fiche-pagesjaunes-solocal.md` ; cible
visée : https://www.solocal.com/landing/inscription-gratuite-pagesjaunes

**Pourquoi :** item #3 de la Vague 1 (`NETLINKING-ACTIONS.md`). SOLOHERY doit pouvoir coller les
valeurs sans deviner ni recopier de mémoire.

**Fait :** trois tentatives de lecture de la page (`WebFetch`, navigateur x2) ont échoué —
`WebFetch` renvoie 403, le navigateur affiche l'interstitiel Cloudflare « Just a moment… ».
Basculé sur la liste de champs standard d'une fiche Solocal, croisée avec `NETLINKING-ACTIONS.md`
l.35-37. `docs/seo/fiche-pagesjaunes-solocal.md` créé : tableau Champ/Valeur/Remarque rempli
depuis `kit-identite.md` (NAP verbatim), horaires et effectif marqués « à trancher », marche à
suivre en 12 étapes qui s'arrête avant toute demande de moyen de paiement, ligne « Preuve »
laissée vide pour SOLOHERY. Aucun compte créé, aucun mot de passe saisi, aucune fiche soumise.

**Mesure :** non mesuré — document de préparation, rien de publié.

**Suite :** SOLOHERY exécute les 12 étapes, colle l'URL de la fiche dans la ligne Preuve du
document une fois validée.

---

## 2026-08-17 (3) — Kit d'identité : logo tranché — symbole seul, pas de wordmark

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** point laissé ouvert par l'entrée précédente (absence de logotype avec le texte
« Claude Agency »). Julien tranche : le symbole seul suffit, cohérent avec le site
claudeagency.fr qui utilise lui-même du texte stylé en HTML plutôt qu'un logo graphique avec le
nom intégré.

**Fait :** `kit-identite.md` mis à jour — la note sur le logo acte la décision au lieu de la
lister comme ouverte, et une section « Reste » ajoutée en fin de document reprend les deux points
encore ouverts (logo à revoir si un annuaire l'exige explicitement, effectif non prouvé).

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1.

---

## 2026-08-17 (2) — Kit d'identité : description ~500 caractères ajoutée, logo SVG vérifié

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** relecture de Julien sur l'entrée précédente : la cible ~500 caractères du prompt
initial n'était pas couverte (seulement 169 et 1650), et l'hypothèse sur `favicon.svg` comme
« logo SVG » n'avait pas été vérifiée visuellement.

**Fait :** description moyenne de 481 caractères ajoutée dans `kit-identite.md`, condensée à
partir des mêmes phrases déjà sourcées (aucun fait nouveau) — les trois longueurs (169 / 481 /
1650) coexistent désormais, chacune avec sa longueur exacte et sa source. `logo.png` et
`favicon.svg` comparés (lecture du SVG + rendu visuel du PNG) : même étoile à 12 branches, même
couleur `#CC785C`, sans texte — ce n'est pas une favicon distincte d'un logo, les deux fichiers
sont bien le même symbole en deux formats. Noté cependant : aucun logotype avec le texte « Claude
Agency » n'existe dans le dépôt, seulement le symbole seul.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; trancher avec Julien si un
annuaire exige un logo avec le nom de l'entreprise inscrit dessus (absent du dépôt).

---

## 2026-08-17 — Kit d'identité : NAP source unique + descriptions + champs annuaires

**Type :** netlinking (préparation, aucun lien créé, aucune fiche soumise)

**URLs :** aucune — document interne `docs/seo/kit-identite.md`

**Pourquoi :** la Vague 1 de `NETLINKING-ACTIONS.md` (6 fiches à créer) demande un NAP identique
sur toutes les fiches sous peine de dédoublement d'entité côté Google. Le kit centralise le NAP,
les deux descriptions déjà rédigées et les champs récurrents des annuaires pour que SOLOHERY
copie sans reformuler.

**Fait :** `docs/seo/kit-identite.md` créé avec le NAP fourni le 13/08/2026 (nom, adresse,
téléphone) en bloc de code intouché, la description courte de `NETLINKING-ACTIONS.md` (169
caractères, calibrée 200) et la description longue de `linkedin-kit.md` (1650 caractères,
calibrée 1500-2000), et un tableau des champs annuaires (catégories, zone, langue, année de
création, e-mail public, logo PNG/SVG du dépôt). Effectif marqué « à trancher », non prouvé.
Aucun texte à ~500 caractères ne s'est trouvé dans les deux sources : signalé plutôt qu'inventé.

**Mesure :** non mesuré — document de préparation, aucune fiche encore soumise.

**Suite :** utiliser ce kit pour créer les 6 fiches de la Vague 1 ; rédiger le texte ~500
caractères si un annuaire l'exige.

---

## 2026-08-15 (3) — Plan SOLOHERY : B9 supprimée, retour à la ligne partout, onglet Mesures refondu

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** trois demandes de Julien — supprimer l'action B9, activer le retour automatique à la
ligne sur l'ensemble des onglets, et simplifier l'onglet `Mesures` pour qu'il réponde à ses deux
questions de manager : le travail a-t-il été mené jusqu'au bout, et qu'est-ce que ça a donné.

**Fait — B9 supprimée, le plan passe de 76 à 75 tâches** sur les chantiers A à E (81 avec les
6 étapes du chantier F, qui vivent hors des cinq chantiers). Les deux lignes qui en dépendaient
sont recalées : B6 ne dépend plus de rien et son repli — commenter depuis son propre profil, avec
Claude Agency dans le titre — devient le chemin principal ; A9 dépend de A1.

**Fait — retour automatique à la ligne** sur les dix onglets, vérifié au préalable sur une cellule
témoin : `GOOGLESHEETS_FORMAT_CELL` n'applique que les propriétés qu'on lui passe, un appel avec le
seul `wrap_strategy` conserve fond, gras, couleur et alignement. Seuls les titres de section de
l'onglet d'accueil restent en `OVERFLOW_CELL`, pour déborder sur leurs voisines vides plutôt que
de s'empiler dans une colonne de 209 px.

**Fait — onglet `Mesures` refondu en 5 blocs.** L'onglet était un relevé de 18 indicateurs à plat ;
il devient un tableau de bord qui se lit dans l'ordre des questions.
1. *Le travail a-t-il été fait ?* — six lignes calculées depuis les onglets de tâches (tâches,
   faites, bloquées, reste à faire) et une colonne d'alerte, `⚠ Faites sans preuve`
   (`COUNTIFS(statut="Fait" ; preuve="")`). C'est le vrai contrôle du manager : la règle du plan
   est que sans preuve une tâche reste « En cours ».
2. *Les objectifs sont-ils atteints ?* — les 6 objectifs chiffrés du sprint avec cible, avant,
   après et un verdict par ligne, plus un verdict global.
3. *Les autres chiffres* — les 9 indicateurs sans cible, avec le sens de lecture (`↑ mieux` /
   `↓ mieux`, qui manquait pour la position moyenne et le LCP) et l'écart calculé.
4. *L'argent dépensé* — les trois enveloppes, avec le reste calculé.
5. *Le 27/08* — le prompt de relevé, réécrit sur les nouvelles adresses de cellules.

La colonne « Skill équipe conseillée » disparaît de cet onglet : elle répétait la même
recommandation 18 fois. Une seule colonne se saisit désormais à la main, « Après (27/08) ».
Les renvois qui citaient l'ancienne mise en page sont corrigés : A12, E3 (prompt, livrable et
critère) et la note « ce qu'est une skill » de l'onglet d'accueil.

**Incident technique, à retenir pour toute réécriture de bloc.** Une cellule fusionnée héritée de
l'ancienne mise en page (`B22:F22`) avalait silencieusement les écritures : l'API répondait
`updatedCells: 4` et la relecture rendait des cellules vides. Aucun outil d'*unmerge* n'est exposé
côté Composio — la parade est de supprimer la ligne puis d'en réinsérer une au même index, ce qui
détruit la fusion et laisse la structure inchangée (formules et plages vérifiées après coup :
`COUNTIF(F18:F23; …)` est bien revenu à ses bornes). **À contrôler avant de réécrire un bloc :**
`GOOGLESHEETS_GET_SPREADSHEET_INFO` avec `fields=sheets(properties(sheetId,title),merges)`.

**Point à surveiller.** Les valeurs « Avant (12/08) » de l'ancien tableau ont été écrasées par le
premier jet du bloc 1, puis réécrites depuis le dépôt (`PLAN-SOLOHERY.md` §2 et `BACKLOG.md`) :
0 domaine référent, 0 backlink, autorité 1/100, 49 clics, 2 797 impressions, position 33,3, LCP
4,2 s. Une seule ne figurait nulle part — les abonnés LinkedIn : elle est à 0 parce que la page
entreprise n'existe pas encore (c'est la tâche B10 qui la crée), et cette raison est écrite dans
la cellule plutôt que laissée à deviner.

---

## 2026-08-15 (2) — Plan SOLOHERY : revue critique des 10 onglets, 76 tâches

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** seconde passe demandée par Julien — critiquer et améliorer chaque onglet, un
relecteur par onglet, avec trois objectifs : compréhensible par SOLOHERY, sans incohérence,
efficace pour Claude Code.

**Fait — 7 tâches ajoutées, le plan passe de 69 à 76.** A14 (saisir le code Google reçu par
courrier — personne ne vérifiait qu'il arrivait, alors que la validation de la fiche en dépend) ·
A15 (relire le NAP sur les 6 fiches en ligne, seul contrôle qui protège la valeur des six autres
tâches) · B9 (profil LinkedIn de Julien : c'était la tâche manquante derrière le trou B2, et son
contenu dormait déjà rédigé dans `docs/seo/linkedin-kit.md`) · B10 (réserver l'URL LinkedIn que
`app/src/layouts/BaseLayout.astro` déclare déjà dans le `sameAs` de toutes les pages, alors que la
page n'existe pas) · D24 (suivre les réponses positives jusqu'au rendez-vous — le plan s'arrêtait
à l'envoi) · E6 (compte des dépenses engagées : trois enveloppes couraient sans totalisation) ·
E7 (passage de relais pour les cinq échéances de septembre).

**Fait — corrections de fond.** Chaîne de dépendances de la prospection refaite : D12 dépendait de
la mauvaise tâche et n'apparaissait dans aucun verrou de D5, on pouvait donc lancer la vague du
25/08 avec une séquence vide. C6 visait un article supprimé le 14/08 et un autre qui avait déjà sa
couverture : ligne réécrite sur la dette réelle (28 des 54 articles partagent la même image
générique). C1 ne produisait aucun fichier, donc C2 n'avait rien à ouvrir quatre jours plus tard :
deux CSV à chemin explicite. C5 demandait de mettre en noindex un sous-domaine que ce dépôt ne
sert pas. Une trentaine de prompts « ouvre la page et remplis le formulaire » inversés : Claude
Code n'a pas de navigateur, il rend le texte champ par champ et dit où cliquer.

**Fait — onglet Mesures.** Le débat 28 jours / 88 jours tranché sur 88, la fenêtre que relève
déjà C1 : les cases « inconnu » retrouvent leurs 49 clics et 2 797 impressions. Ajout d'une ligne
de **verdict automatique** (objectif ≥ 5 domaines référents, atteint ou non), de trois lignes de
suivi budgétaire et d'une colonne Écart calculée. 15 → 18 indicateurs.

**Fait — onglet ⛔ Interdits, 17 → 23 lignes.** Les six ajouts vivaient ailleurs sans avoir jamais
été écrits là : seconde fiche Google, second compte Saleshandy, envoi avant le 25/08, toucher à
`contact@claudeagency.fr`, écrire un chiffre non vérifié, refaire une fusion d'articles avant le
relevé du 11/09. Les huit qui manquaient côté dépôt sont ajoutés à `PLAN-SOLOHERY.md` §7, avec la
règle qui a manqué : une décision écartée s'écrit aux deux endroits le même jour.

**Fait — dans le dépôt.** DMARC recalé au 25/09 (un mois après le premier envoi du 25/08, pas
12/09). `BACKLOG.md` ne renvoie plus à la skill `netlinking-ecole-naturo`, qui appartient à un
autre projet et se calibre sur un site santé YMYL, mais aux 7 critères de l'onglet F.

**Tranché par Julien le 15/08/2026 — trois arbitrages.**
1. **Les 20 liens s'achètent en `dofollow`, risque assumé.** `NETLINKING.md` §6.3 dit l'inverse et
   n'a pas été retiré : l'analyse reste exacte, et la décision se prend contre elle en connaissance
   de cause. Un encadré daté la consigne, avec ce qui reste non négociable — mention « article
   sponsorisé » visible (obligation légale française, distincte du risque Google), 0 % d'ancre
   exacte au démarrage, filtrage qualité sur chaque donneur. À rouvrir si une pénalité manuelle
   apparaît dans la Search Console.
2. **Les demandes d'adhésion partent de `equipe1@claudeagency.fr`**, plus de l'adresse Gmail
   personnelle. Corrigé à la source dans `NETLINKING-ACTIONS.md`, que lisent A7, A8, A9 et A10.
3. **B9** : Julien ouvre l'accès à son profil LinkedIn, SOLOHERY colle. La tâche n'attend donc
   personne, et garde son repli à 48 h.

**Point mesuré au passage.** Les 2 797 impressions de référence ne sont pas filtrées du bruit
robot (~140 affichages, 0 clic). Le point de départ du sprint est donc légèrement faux aux trois
endroits où il est écrit. C1 relève la même fenêtre avec le filtre : c'est sa sortie qui corrigera
les trois d'un coup. Les 49 clics ne bougent pas.

---

## 2026-08-15 — Plan SOLOHERY : skills d'équipe assignées, passe de cohérence, `PLAN-SOLOHERY.md` remis d'aplomb

**Type :** documentation de pilotage (aucune page, aucun contenu publié, aucun lien modifié)

**Pourquoi :** Julien voulait que SOLOHERY sache, tâche par tâche, quelle skill d'équipe
(`github.com/JRAYES000/marketplace-equipe`) déclencher — et que le plan cesse de se contredire.

**Fait — Google Sheet du sprint.** Trois colonnes ajoutées à chaque onglet de tâches, placées
**entre « À faire » et « Livrable attendu »** : skill conseillée, comment la déclencher, ce que ça
change. 75 lignes annotées : 34 `phrase-magique`, 22 `fonce`, 8 `parallelisation-et-routage`,
3 `ponytail`, 8 sans skill. `delegation-deepseek-openrouter` n'est conseillée nulle part —
les seules tâches assez volumineuses portent des coordonnées nominatives de prospects, que la skill
interdit d'envoyer à un modèle tiers. Deux sections ajoutées à l'onglet d'accueil : le catalogue
des skills, et les réflexes du guide « Bien utiliser Claude » (`/clear` par sujet, `/context` avant
un gros travail, `/compact` en dernier recours, passe de preuves en conversation neuve).

**Fait — incohérences corrigées dans la Sheet.** Sept factuelles : 69 → 54 articles (onglet C et
accueil) ; « 62 mots-clés devinés » → 53 lignes `deduite-du-slug-A-VALIDER` + 10 `deduite-A-VALIDER`
comptées dans `REQUETES.csv` ; D4 annonçait 3 e-mails pour une séquence qui en compte 5 ; A9 et B6
dépendaient d'une tâche `B2` qui n'existe pas ; D00a datée J1 · 14/08 alors que J1 = 13/08 partout
ailleurs ; D11 planifiée avant la tâche dont elle dépend ; D23 due avant D12 dont elle dépend ; F1
présentée comme « la seule étape à la main » alors que F5 (l'achat) l'est aussi ; seuil D+ qui
parlait de « deux autres boîtes » sur une rotation qui en compte quatre.

**Fait — quatre arbitrages tranchés par Julien le 15/08.**
1. **Premier envoi au mardi 25/08**, pas le 18/08. Le 18/08 était impossible : D3 ne rend les
   e-mails des décideurs que le 20/08. Chauffe portée à 12 jours (13 → 24/08), montée en charge de
   l'onglet D+ décalée d'une semaine, D6 au 26/08.
2. **Tâche B8 créée** : B3 fait écrire 10 posts LinkedIn, B4 et B5 n'en publiaient que 8.
   À un post tous les 2 jours, la série court jusqu'au 17/09 — écrit noir sur blanc plutôt que
   laissé implicite.
3. **Inscriptions du webinaire (D19) → Google Sheet dédié.** Le critère exigeait qu'une inscription
   de test « arrive dans la liste » sans jamais dire laquelle, et Brevo est interdit sur ce projet.
4. **Dates du week-end** : seules les tâches impliquant un tiers sont décalées (A9 quittait le
   samedi 15/08, férié). La fenêtre de B4 était arithmétiquement impossible — 4 posts « mardi ou
   jeudi » dans une fenêtre qui ne contenait qu'un mardi — et a été refaite sur des dates explicites.

**Fait — `docs/PLAN-SOLOHERY.md` corrigé sur cinq points** où il contredisait la Sheet :
articles 69 → 54 ; « un seul enregistrement DNS » → quatre CNAME `go`, un par domaine d'envoi ;
warm-up 14 jours → 12 jours avec départ au 25/08 ; « le premier envoi ne peut pas partir dans le
sprint » → il part le 25/08 ; section 8 « Points à trancher par Julien » marquée périmée par la
règle D00b du 14/08, et ligne netlinking alignée sur l'enveloppe déjà autorisée.

**Non fait volontairement.** Aucune tâche du plan n'a été exécutée — seul le plan a été corrigé.
Les chiffres « Avant » de l'onglet Mesures restent à `inconnu` sur les lignes GSC : ils sont
annoncés sur 28 jours alors que le relevé de référence porte sur 88 jours (14/05 → 09/08). Les
mesurer relève de la tâche C1, pas de cette passe — et écrire 49 clics dans une case « 28 jours »
aurait été un chiffre inventé.

---

## 2026-08-14 (soir) — Correctif G1 : les 4 conversions branchées sur GA4

**Type :** correctif technique (mesure)

**Pourquoi :** l'analyse du matin a montré que les événements de conversion appelaient
`window.plausible(...)` alors que Plausible n'est chargé nulle part. Aucune soumission de
formulaire n'était comptée depuis la mise en ligne du site.

**Fait — 5 appels remplacés** par `gtag('event', …)` vers GA4 (`G-6SG03DR5J9`), déjà chargé :

| Fichier | Ancien appel | Nouvel événement GA4 |
| :--- | :--- | :--- |
| `ContactForm.astro` | `Contact Form Submit` | `contact_submit` |
| `DiagnosticForm.astro` | `Diagnostic Submit` | `diagnostic_submit` |
| `LeadMagnet.astro` | `Lead Magnet Submit` | `lead_magnet_submit` |
| `TimeSavingsCalculator.astro` | `Calculator Used` | `calculateur_utilise` |
| `barometre…/questionnaire.astro` | `Barometre - reponse` | `barometre_reponse` |

Le 5ᵉ (baromètre) n'était pas dans le périmètre de G1 — même bug d'une ligne, corrigé au passage.

**Corrigé au passage :** le calculateur envoyait son événement à **chaque case cochée**. Un
drapeau le limite à un envoi par page, sinon la donnée est inexploitable.

**Non touché, volontairement :** le tag GA4 et les deux conversions Google Ads
(`AW-18240137840`, dont les Enhanced Conversions du lead magnet) sont inchangés.

**Vérifié :** `npm run build` en code 0, 158 pages. Dans `dist/` : les 5 événements présents,
`G-6SG03DR5J9` sur les 158 pages, la conversion Ads du lead magnet sur ses 55 pages. Plus aucun
`window.plausible` dans `app/src/`.

**Reste à faire — manuel, dans l'interface GA4 :** marquer les 5 événements comme
**événements clés** (Admin → Événements). Sans cela ils sont enregistrés mais ne comptent pas
comme conversions dans les rapports.

**Mesure :** premier relevé exploitable une semaine après la mise en production.

---

## 2026-08-14 — Analyse du site (conversion + notoriété) : chantier G et arbitrage Instagram/YouTube

**Type :** analyse, aucune modification du site

**Pourquoi :** Julien demande quelles tâches déléguer à SOLOHERY pour améliorer le site, sa
conversion ou la notoriété — et si un compte Instagram ou une chaîne YouTube sont pertinents.

**Trouvé — la mesure des conversions ne fonctionne pas.** Les 4 événements du site
(`Contact Form Submit`, `Diagnostic Submit`, `Lead Magnet Submit`, `Calculator Used`) appellent
`window.plausible(...)`, **et Plausible n'est chargé nulle part** (aucune occurrence de
`plausible.io` ni de `data-domain` dans le dépôt). GA4 est bien chargé mais ne reçoit aucun
événement personnalisé : le seul `gtag('event', …)` du site vise Google Ads. **Aucune soumission
de formulaire n'est donc enregistrée aujourd'hui.** Correctif = tâche G1, non appliqué à ce stade.

**Trouvé — zéro preuve client** sur l'ensemble du site (aucun témoignage, logo, avis ou cas
nommé), alors que `/semaine-offerte/` est précisément conçue pour en produire (témoignage vidéo +
avis Google en échange d'une semaine offerte) et n'est reliée à rien. → G7, G8, G9.

**Audit mécanique des 54 articles — rien à corriger :** 0 `title` > 70 car., 0 `description`
> 160 car., 0 article sans image, **2 orphelins** (`cas-usage-claude-organisme-formation`,
`meilleure-agence-ia-organisme-formation`) → à joindre au lot de C3.

**Relevé Ubersuggest du 14/08/2026 :** 0 backlink, 0 domaine référent, autorité **1/100**,
3 mots-clés positionnés. Inchangé depuis le 12/08 — normal, la vague 1 vient d'être lancée.
Seule requête sortante : « agence claude », position 19.

**Écrit :** [`docs/TACHES-SOLOHERY-SITE-CONVERSION.md`](../TACHES-SOLOHERY-SITE-CONVERSION.md) —
15 tâches (G1 à G15) au format des onglets du Sheet, plus l'arbitrage Instagram/YouTube :
**Instagram non** (cible B2B absente, aucun effet SEO, et la page LinkedIn entreprise n'existe pas
encore) ; **YouTube oui mais sans format « chaîne »** — bibliothèque de 5 à 8 vidéos utilitaires
servant d'abord à héberger les témoignages, à démarrer seulement après 4 semaines de LinkedIn.

**Mesure :** aucune — analyse seule, le site n'a pas été modifié.
**Suite :** G1 avant toute discussion chiffrée sur le taux de transformation ; sans lui, il n'y a
pas de donnée à lire.

---

## 2026-08-14 — Ménage : 15 articles fusionnés (cannibalisation) + 5 docs supprimés

**Type :** consolidation de contenu + nettoyage de la documentation

**Pourquoi :** audit de cannibalisation demandé par Julien. Similarité TF-IDF (bigrammes, cosinus)
calculée entre les 69 articles, croisée avec `REQUETES.csv` : **32 paires > 0,28 de similarité,
6 paires > 0,45**. Des articles traitant le même sujet se disputaient les mêmes requêtes. Rien
n'était « vieux » — tout le blog date de juin-juillet 2026 — le problème était la redondance.

**Fait — 15 fusions, blog de 69 à 54 articles.** Contenu utile reversé à la main dans l'article
gardé (jamais par script, cf. incident du 03/07), ancienne URL en 301.

| Supprimé | Sim. | Clics/Impr. | → Fusionné dans |
| :--- | ---: | ---: | :--- |
| `automatiser-gestion-qualiopi-ia` | 0,50 | 0 / 0 | `automatiser-qualiopi-ia` |
| `qualiopi-ia-gagner-5h-semaine` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `reduire-charge-administrative-organisme-formation` | — | 0 / 0 | `automatiser-qualiopi-ia` |
| `automatiser-bpf-organisme-formation` | 0,52 | 0 / 138 | `remplir-bpf-organisme-formation` |
| `seo-guide-complet-organisme-formation-2026` | 0,47 | 0 / 20 | `seo-organisme-formation` |
| `remplir-sessions-formation` | 0,40 | 0 / 1 | `seo-organisme-formation` |
| `rgpd-ia-organisme-formation` | 0,45 | 0 / 1 | `donnees-stagiaires-rgpd-ia` |
| `automatiser-emargement-suivi-stagiaires` | 0,40 | 0 / 9 | `feuille-emargement` |
| `audit-surveillance-qualiopi` | 0,39 | 0 / 9 | `qualiopi-guide-organisme-formation` |
| `financer-formation-opco-cpf-france-travail` | 0,34 | 0 / 5 | `plan-financement-formation` |
| `formation-claude-anthropic-organisme-formation` | — | 0 / 0 | `formation-claude` |
| `claude-agency-vs-concurrents` | 0,36 | 0 / 40 | `meilleure-agence-ia-organisme-formation` |
| `claude-code-organisme-formation` | 0,51 | 1 / 14 | `formation-claude-code` |
| `optimisation-site-organisme-formation` | — | 0 / 1 | `/services/optimisation-site/` |
| `creer-organisme-formation` | 0,47 | 0 / 2 | `numero-declaration-activite` |

**Le cas à surveiller — le BPF.** `automatiser-bpf` captait 138 impressions sur « logiciel bilan
pédagogique et financier », mais en position 34. `remplir-bpf` est deux fois plus long et en
position 14,6. La fusion a explicitement **repris le champ lexical « logiciel BPF »** dans
l'article gardé (nouvelle section « Quel logiciel pour préparer son BPF ? ») et son title est
devenu « BPF : comment le remplir, avec ou sans logiciel ». **À vérifier au relevé du 11/09** :
si les 138 impressions ne se reportent pas, le title est à revoir.

**Fait — 88 liens internes réécrits** à la main, dont 34 ancres reformulées (une ancre qui citait
le titre d'un article supprimé pointait vers un article au titre différent). Contrôle : 0 lien
interne cassé dans le HTML généré (vérifié sur `dist/`).

**Fait — 15 redirections 301** dans `app/public/_redirects`, posées dans le même commit.

**Fait — 5 documents supprimés (78 Ko).** `docs/reference-technique-astro.md` (guide de
construction d'un site déjà construit, 23 mentions de l'ancien domaine), `SEO-STRATEGY.md`
(14/06, bâti sur les données GSC de `sc-domain:claudepartners.fr` — remplacé par ce dossier),
`docs/seo/netlinking-cibles.md` (16/06, remplacé par `NETLINKING-ACTIONS.md` du 12/08),
`docs/seo/audit-technique-ubersuggest.md` (crawl de l'ancien domaine), `ONBOARDING.md` (gabarit
auto-généré vide). Les 8 références pointant vers ces fichiers ont été corrigées.

**Corrigé au passage :** `docs/lead-magnet-emails.md` envoyait les liens PDF et audit vers
`claudepartners.fr`. Bug en production sur le lead magnet, réparé.

**Non fait, volontairement.** Cinq articles à 0 impression **sans doublon** ont été conservés
(`ia-pedagogie-personnalisation`, `roi-ia-organisme-formation`, `formation-ia-equipe`,
`tarifer-formations-organisme-formation`, `sea-google-ads-organisme-formation`). Six semaines
d'existence sur un domaine d'autorité 1 : l'absence d'impression n'est pas une donnée. Décision
au relevé du **11/09**. Ne pas les resupprimer sans ce relevé.

**Mise en garde à retenir.** Ce ménage traite la cannibalisation, il ne débloquera pas le trafic.
Le point de blocage reste celui du backlog : **0 backlink, autorité 1/100**. Vague 1 du netlinking
(`NETLINKING-ACTIONS.md`) avant toute nouvelle action sur le contenu.

**Mesure :** aucune à ce stade — une consolidation se lit sous 3 à 6 semaines.
**Suite :** au relevé du **2026-09-11**, vérifier (1) le report des 138 impressions BPF,
(2) que les 15 URL redirigées ne génèrent pas de 404 dans GSC, (3) le sort des 5 articles gardés.

---

## 2026-08-12 — Réécriture des title/meta sur 9 pages + plan netlinking

**Type :** réécriture + netlinking (préparation)

**Pourquoi :** deux constats du relevé du matin. (1) Des pages ressortent en page 1 sans récolter
un seul clic — leur balise title ne correspond pas à ce que les gens tapent réellement.
(2) 0 backlink : aucun travail on-page ne débloquera le site sans autorité.

**Fait — 9 `title` + `description` réécrits**, alignés sur les requêtes **réellement constatées
dans GSC** pour chaque page, pas sur des requêtes supposées. Positions de départ (14/05→09/08/2026) :

| URL | Requête réelle principale | Pos. | Clics |
| :--- | :--- | ---: | ---: |
| `/services/seo/` | agence référencement naturel claude | **3,8** | **0** |
| `/blog/claude-ai-en-francais/` | claude francais | 4,7 | 1 |
| `/blog/convention-de-formation/` | convention de formation mentions obligatoires | 13,8 | 0 |
| `/blog/formation-autofinancee-france-travail/` | formation autofinancée **pole emploi** | 14,8 | 0 |
| `/blog/feuille-emargement/` | émargement conférence / signature | 16,0 | 1 |
| `/blog/seo-organisme-formation/` | référencement **gratuit** organisme de formation | 16,8 | 0 |
| `/blog/livret-accueil-stagiaire/` | livret d'accueil stagiaire **entreprise** | 21,0 | 4 |
| `/blog/questionnaire-satisfaction-formation/` | questionnaire **évaluation post formation** | 31,0 | 1 |
| `/blog/numero-declaration-activite/` | numéro de déclaration d'activité | 33,5 | 0 |

Les mots en gras sont ceux qui manquaient au title et que les gens tapent. Exemples :
l'article « France Travail » ne contenait pas « Pôle emploi », le guide SEO ne contenait pas
« gratuit », le livret d'accueil ne mentionnait pas « entreprise ».

**Le cas le plus coûteux — `/services/seo/`.** La page est en **position 3,8** sur
« agence référencement naturel claude » et n'a récolté **aucun clic**. Ses requêtes réelles sont
toutes de la forme *agence de référencement + Claude* : personne ne l'atteint via une requête
« organisme de formation ». Son ancien title, « Agence SEO Claude pour organismes de formation »,
disqualifiait le chercheur avant le clic. Nouveau title :
« Agence de référencement naturel & SEO avec Claude », le positionnement OF passe en description.
**Arbitrage assumé, à revérifier dans 30 jours** — si le CTR ne bouge pas, revenir en arrière.

**Fait — plan netlinking** : `docs/seo/NETLINKING-ACTIONS.md`. 13 cibles vérifiées une par une
(URL ouverte le 12/08), réparties en 4 vagues, avec 3 messages prêts à envoyer. Point bloquant
identifié : Claude Agency n'étant pas un OF déclaré, tous les annuaires Qualiopi lui sont fermés
— la bonne porte est la catégorie « cabinet de conseil » des fédérations.

**Deux corrections d'analyse de ce matin (j'avais conclu trop vite) :**
- **Le doublon www n'existe pas.** `www.claudeagency.fr` redirige bien en 301 vers l'apex
  (testé). Les URLs `www` dans GSC sont un reliquat d'indexation qui se purgera seul. Priorité
  retirée du backlog.
- **Les requêtes « …skills claude seo » ne sont pas des requêtes humaines.** Ce sont des
  concaténations mécaniques (`formation seo qualiopi` + `skills claude seo`) émises par un agent
  automatisé, qui touchent surtout `/services/seo/`. ~140 impressions de bruit, 0 clic. Rien à
  corriger sur le site — mais **il faut les exclure de toute analyse GSC** (filtre
  `query notContains "skills claude seo"`), sinon elles faussent le CTR et masquent les vraies
  requêtes.

**Mesure :** aucune à ce stade — les effets d'un title se voient sous 2 à 4 semaines.
**Suite :** relever à nouveau clics / CTR / position sur ces 9 URLs **le 2026-09-11**, et le
nombre de domaines référents. Si le CTR de `/services/seo/` reste à 0, annuler son nouveau title.

---

## 2026-08-12 — Mise en place de la mémoire SEO + relevé de référence GSC

**Type :** mesure + organisation
**URLs :** `docs/seo/README.md`, `docs/seo/JOURNAL.md`, `docs/seo/REQUETES.csv`,
`docs/seo/BACKLOG.md`, `docs/seo/PERFORMANCES.csv`
**Pourquoi :** chaque session SEO repartait de zéro — mêmes audits, mêmes recherches de mots-clés,
mêmes sujets réétudiés. Ce dossier devient la mémoire du projet.
**Fait :**
- Création des 4 fichiers de mémoire + du protocole de lecture/écriture (`README.md`).
- Amorçage de `REQUETES.csv` avec les **87 URLs** du site (69 articles, 8 services, 10 pages
  transverses), leur requête cible et leurs performances réelles.
- Relevé GSC complet sur 88 jours et enregistrement dans `PERFORMANCES.csv`.
- Constitution du `BACKLOG.md` à partir des données mesurées, pas d'hypothèses.

**Mesure — Search Console, propriété `sc-domain:claudeagency.fr`, période 14/05→09/08/2026,
`data_state=final` :**

| Métrique | Valeur |
| :--- | ---: |
| Clics | **49** |
| Impressions | **2 797** |
| CTR | **1,75 %** |
| Position moyenne | **33,3** |

**Mesure — Ubersuggest, France, relevé du 2026-08-12 :** autorité de domaine **1/100**,
**0 backlink**, **0 domaine référent**, 3 mots-clés organiques détectés.

**Ce que disent ces chiffres (constat, pas interprétation optimiste) :**
- Le site génère des impressions (2 797) mais quasiment pas de clics (49). Le problème n'est
  pas l'indexation : c'est la **position moyenne 33,3**, trop basse pour être cliquée.
- **0 backlink et une autorité de 1** expliquent l'essentiel. 69 articles publiés n'ont pas
  compensé l'absence totale d'autorité de domaine. Le levier n'est plus le volume de contenu.
- Trois pages concentrent 40 % des impressions et rapportent 1 clic à elles trois :
  `/services/seo/` (536 imp., 0 clic, pos. 19,9), `/blog/logiciel-organisme-formation/`
  (404 imp., 1 clic, pos. 72,7), `/blog/automatiser-bpf-organisme-formation/` (138 imp., 0 clic,
  pos. 34,0).
- **Doublon www / non-www** constaté dans GSC : 15 URLs ressortent sur les deux variantes
  (`www.claudeagency.fr/blog/seo-organisme-formation/` : 68 impressions à elle seule). Ce
  n'est pas normal et c'est inscrit au backlog.

**Suite :** voir `BACKLOG.md`, priorité 1 (netlinking) et priorité 2 (doublon www).

---

## Entrées reconstituées (avant la mise en place du journal)

> Reconstitution à partir de `SEO-STRATEGY.md` §2/§6, de `docs/CONTEXTE-COWORK.md` et de
> l'historique git. Fiable sur le **quoi** et le **quand** ; les mesures d'époque sont reprises
> telles qu'elles ont été consignées à l'époque et n'ont pas été revérifiées.

## 2026-08-04 — Ouverture de l'accès agent à la Search Console

**Type :** technique
**Pourquoi :** aucun agent ne pouvait lire les données GSC — tout audit reposait sur des captures
manuelles.
**Fait :** propriété domaine `sc-domain:claudeagency.fr` créée (TXT de vérification sur `@` dans
Cloudflare) ; accès agent via Composio (`GOOGLE_SEARCH_CONSOLE_*`), pas de MCP dédié.
**Mesure :** non mesuré. **Suite :** rien.

## 2026-07-15 — Audit GSC + vague 2 de quick wins

**Type :** audit + réécriture
**Fait :** correction des title/meta de `/services/seo/` et `/blog/feuille-emargement/`, maillage
footer et inter-articles, comparatif CRM, nouvel article « formation autofinancée France Travail ».
**Mesure (GSC, 23/06→13/07/2026) :** 17 clics, 408 impressions, CTR 4,2 %, position moyenne 19,3 ;
65 pages indexées / 39 non indexées (dont 21 tags en `noindex`, volontaire).
**Suite :** 6 pages business non indexées identifiées — statut à revérifier.

## 2026-07-13 — Landing « agence marketing claude »

**Type :** publication
**URLs :** https://claudeagency.fr/agence-marketing-claude/
**Pourquoi :** cible GEO/SEO sur la marque Claude, hors cluster organismes de formation.
**Mesure au 2026-08-12 :** 176 impressions, 3 clics, position 49,0 (GSC).

## 2026-07-03 — Incident : 62 articles vidés par un script de maillage

**Type :** technique (incident)
**Fait :** les commits « add internal links » du 30/06 avaient vidé le corps de 62 articles ;
restauration par le commit `fix(blog): restaure les 62 articles vidés`.
**Règle qui en découle :** ne jamais faire réécrire des fichiers de contenu en masse par un script.
Le maillage interne se pose à la main. Détail dans `docs/CONTEXTE-COWORK.md`.

## 2026-06-30 — Vague massive de publication (~40 articles)

**Type :** publication
**Fait :** ~40 articles publiés le même jour (RGPD, LMS, CRM, tunnel de vente, prospection,
AI Act, accessibilité, sous-traitance…), tous ~1 000 mots, plus le maillage interne automatisé
qui a causé l'incident du 03/07.
**Mesure au 2026-08-12 :** cette vague a produit des impressions mais **quasiment aucun clic** —
c'est elle qui tire la position moyenne à 33,3. À ne pas reproduire en l'état.

## 2026-06-19 — Passe citeabilité / GEO / E-E-A-T

**Type :** réécriture + technique
**Fait :** constat qu'aucun des 26 articles d'alors ne citait de source primaire → ajout de
citations officielles (Légifrance, travail-emploi, service-public, DARES, CNIL) sur les 2 piliers
et 4 articles réglementaires ; statistique sourcée DARES-Céreq ; tableaux comparatifs ;
citation attribuée du fondateur. `robots.txt` rendu explicite (bots IA de recherche et
d'entraînement autorisés). HSTS ajouté.
**Mesure d'époque (GSC, crawl du 18/06) :** sitemap *Valid*, 41 URLs indexées, ~13 impressions.

## 2026-06-15 — Audit technique Ubersuggest + sélection par volumes réels

**Type :** audit + publication
**Fait :** score d'audit 76/100. Correctifs : slugs de tags en minuscules, tags en `noindex` et
hors sitemap, titres ≤ 60 caractères, lien e-mail `/contact` réparé. Hero responsive :
FCP mobile 2,6 → 1,9 s, Speed Index 3,6 → 3,0 s (LCP encore 4,2 s). Sitemap resoumis.
6 articles choisis sur volumes mesurés : convention de formation (720), programme de formation
(590), logiciel OF (320), indicateurs Qualiopi (320), audit de surveillance (210), créer un OF (170).
**Constat consigné :** « qualiopi » = 22 000 de volume, SERP à faible autorité → niche gagnable.

## 2026-06-14 — Socle : stratégie, E-E-A-T, cluster initial

**Type :** publication + technique
**Fait :** rédaction de `SEO-STRATEGY.md` ; article pilier « Intégrer l'IA dans votre OF » étoffé ;
articles 1 à 4 du cluster publiés ; auteur réel Julien Rayes (`app/src/data/author.ts`) + schema
`Person` lié par `@id` + page auteur ; flux RSS ; `BlogPosting` enrichi (`keywords`, `wordCount`).
**Mesure d'époque :** 0 donnée GSC sur 90 jours — le site n'apparaissait sur aucune requête.
