# Sprint notoriété — référence de travail pour SOLOHERY

> Du **13/08/2026 au 27/08/2026**. Établi le 13/08/2026.
>
> **Le suivi des tâches n'est PAS dans ce fichier.** Il vit dans le Google Sheet
> « Plan d'action SOLOHERY — sprint 15 jours ». Une seule source de vérité pour l'avancement.
>
> **Lien direct vers le Sheet :** https://docs.google.com/spreadsheets/d/1BZmaiFA10tY9aKVUQkHnZRt_1RjXz2AJ26cke2gfevg/edit
> Un onglet par chantier, plus l'onglet **« D+ · Séquences et routage »** qui porte le texte intégral
> des 5 e-mails de prospection, le routage des 4 boîtes d'envoi et les seuils d'alerte.
>
> Ce document-ci porte ce qui ne change pas tous les jours : le contexte, les règles, la procédure
> technique d'envoi et la liste des idées déjà écartées. C'est lui que Claude Code doit lire.

---

## 1. L'objectif, en une phrase

Faire passer claudeagency.fr de **0 à au moins 5 domaines référents** et installer une présence de
marque, **sans publier de volume de contenu**.

---

## 2. Point de départ — chiffres mesurés, pas estimés

| Indicateur | Valeur au 12/08/2026 | Source |
| :--- | ---: | :--- |
| Domaines référents | **0** | Ubersuggest |
| Autorité de domaine | **1 / 100** | Ubersuggest |
| Clics organiques (14/05 → 09/08) | 49 | GSC, `data_state=final` |
| Impressions | 2 797 | GSC, `data_state=final` |
| Position moyenne | 33,3 | GSC, pondérée par impressions |
| Articles publiés | 54 | `app/src/content/blog/`, compté le 15/08/2026 |
| Pages services | 8 | `app/src/content/services/` |

> **Le blog est passé de 69 à 54 articles le 14/08/2026** (commit `f2cef7b`) : 15 articles qui se
> cannibalisaient ont été fusionnés, leurs URL partent en 301. Le chiffre 69 relevé au 12/08 reste
> exact à sa date ; c'est 54 qui vaut aujourd'hui.

**Ce que ces chiffres disent.** Le site a du contenu et Google le connaît. Ce qui manque, c'est la
confiance. Une publication en masse d'environ 40 articles a déjà eu lieu le 30/06/2026 : mesure à
six semaines, impressions en hausse, quasiment aucun clic, position moyenne dégradée à 33,3.
Écrire un article de plus ne débloquera rien. D'où l'ordre des chantiers : **l'autorité d'abord**.

---

## 3. Les cinq règles non négociables

1. **Lire avant d'agir.** Avant toute action SEO : les 3 dernières entrées de
   [`docs/seo/JOURNAL.md`](./seo/JOURNAL.md). Ce qui a déjà été tranché est dans
   [`docs/seo/BACKLOG.md`](./seo/BACKLOG.md), section « Écarté ».
2. **Écrire après avoir agi.** Une entrée de journal part **dans le même commit** que l'action.
   Une action non journalisée n'existe pas pour la session suivante — elle sera refaite.
3. **Aucun chiffre inventé.** Tout chiffre porte sa source et sa date. En cas de doute : vérifier,
   ou écrire « inconnu ».
4. **Pas de maillage par script.** Le maillage interne se pose à la main. Un script l'a fait le
   03/07/2026 et a **vidé 62 articles** de leur contenu (incident dans `docs/CONTEXTE-COWORK.md`).
5. **Publier = mettre en ligne.** Un commit sur `main` déclenche le déploiement en production.
   Rien n'est un brouillon. `cd app && npm run build` obligatoire avant tout push.

---

## 4. Mise en route (Git Bash / MINGW64, Node ≥ 22.12)

```sh
git clone https://github.com/JRAYES000/CLAUDEAGENCY.git
cd CLAUDEAGENCY/app && npm install
npm run dev        # aperçu local sur http://localhost:4321
cd .. && claude    # Claude Code à la racine : il lit CLAUDE.md tout seul
```

Le repo porte déjà tout le contexte : `CLAUDE.md` (règles), `PRODUCT.md` (offre et ton),
`DESIGN.md` (charte), `NETLINKING.md`, `docs/seo/` (mémoire SEO).
Ne pas recopier ces fichiers dans les prompts : Claude Code les ouvre quand il en a besoin.

---

## 5. Identité légale — à reprendre à l'identique partout

Claude Agency est une **marque**, pas une société. Elle est exploitée par :

- **Dénomination** : ECOLE DE NATUROPATHIE ET SOPHROLOGIE (SAS)
- **SIREN** 924 997 539 · **SIRET du siège** 924 997 539 00011 · RCS Paris
- **Siège** : 229 rue Saint-Honoré, 75001 Paris
- **Code NAF** 85.59B — Autres formes d'enseignement · créée le 11/03/2024 · active
- **Président** : Antoine RAYES · **fondateur, signature commerciale** : Julien RAYES

Source : `recherche-entreprises.api.gouv.fr`, consultée le 13/08/2026. Ces données sont déjà celles
des mentions légales du site.

> **Le NAP — nom, adresse, téléphone — doit être identique au mot près** sur le site et sur les six
> fiches d'annuaire. Une variation d'écriture annule le bénéfice d'entité recherché.

---

## 6. Boîte d'envoi et DNS — à faire AVANT le premier envoi

### 6.1 État réel du domaine, relevé le 13/08/2026

Interrogation directe des résolveurs `1.1.1.1` et `8.8.8.8`. Ce ne sont pas des suppositions.

| Enregistrement | Valeur constatée | Verdict |
| :--- | :--- | :--- |
| MX | `5 mx1.hostinger.com` · `10 mx2.hostinger.com` | La boîte est chez Hostinger |
| SPF | `v=spf1 include:_spf.mail.hostinger.com include:spf.mailjet.com ~all` | Un seul enregistrement, correct. **N'y rien ajouter** |
| DKIM | `hostingermail-a` → clé active (239 caractères) ; `b` et `c` vides | Fonctionnel. Les clés vides sont la rotation normale de Hostinger |
| DMARC | `v=DMARC1; p=none; rua=mailto:jrayes000@gmail.com` | Surveillance seule — correct pour démarrer |
| Vérification Google | `google-site-verification=EW4quu5PsO…` | **Ne jamais supprimer** : valide la propriété Search Console |

**SPF, DKIM et DMARC sont déjà en place et corrects.** Les seuls enregistrements DNS à créer sur
tout ce chantier sont les **CNAME de suivi de l'étape 3**.

> **Corrigé le 15/08/2026 : il y en a quatre, pas un.** Ce paragraphe a été écrit le 13/08 en
> supposant une seule boîte d'envoi sur `claudeagency.fr`. Le routage arrêté depuis (onglet
> « D+ · Séquences et routage ») fait tourner **quatre** boîtes sur quatre domaines —
> `claudeagency.fr`, `claudeagency.eu`, `claudepro.fr`, `claudepartners.fr` — et Saleshandy exige
> un domaine de suivi par domaine d'envoi. C'est la tâche D0b.

### 6.2 Les six étapes, dans l'ordre

**1 — Créer la boîte (Hostinger).**
Panneau Hostinger → créer ou confirmer `contact@claudeagency.fr`. Mot de passe long et unique généré
par un gestionnaire. Activer **IMAP** (Saleshandy en a besoin pour lire les réponses) et la double
authentification, puis générer un mot de passe d'application dédié à Saleshandy.
*Piège :* oublier IMAP — la connexion échoue sans message clair.

**2 — Connecter à Saleshandy.**
Settings → Email Accounts → Add → SMTP/IMAP. Vérifier que le test passe en vert **dans les deux
sens**, envoi et réception.
*Piège :* ne tester que l'envoi. Sans IMAP fonctionnel, Saleshandy ne voit pas les réponses et
continue d'envoyer des relances à des gens qui ont déjà répondu.

**3 — Custom tracking domain — quatre fois, une par domaine d'envoi.**
Dans **chacune** des quatre zones (`claudeagency.fr`, `claudeagency.eu`, `claudepro.fr`,
`claudepartners.fr`), selon l'hébergeur DNS de la zone → DNS → Add record :

| Champ | Valeur |
| :--- | :--- |
| Type | `CNAME` |
| Nom | `go` |
| Cible | `watch.saleshandy.com` |
| TTL | `3600` |
| Proxy | **DNS only — nuage GRIS** |

Puis Saleshandy → Settings → Custom Tracking Domain → Add → `go.` suivi du domaine de **cette**
boîte → Verify. Quatre fois.
Propagation de quelques minutes à 72 h, contrôlable sur whatsmydns.net.
*Piège :* laisser le nuage orange. Proxifié, le suivi ne fonctionne pas — c'est le point n°1
d'échec de cette étape.
*Note :* le jeton API Cloudflare du projet ne couvre **pas** la zone `claudeagency.fr`. Opération
manuelle dans le dashboard.

**4 — Ne pas toucher au SPF.**
Aucune action. Saleshandy n'a pas ses propres serveurs d'envoi : il se connecte à la boîte Hostinger
en SMTP et expédie **à travers elle**. L'IP d'envoi est donc celle de Hostinger, déjà couverte par
l'`include` existant.
*Piège :* ajouter `include:saleshandy` ou créer un second enregistrement SPF. **Deux SPF sur un
domaine invalident les deux**, et le protocole plafonne à 10 résolutions DNS.

**5 — Warm-up, du 13 au 24/08 — la vague 1 part le mardi 25/08.**
Activer TrulyInbox (inclus dans l'abonnement Saleshandy) et le laisser tourner **12 jours pleins**
avant le premier envoi réel.
*Piège :* envoyer avant la fin. Une boîte qui expédie 50 e-mails le premier jour est classée spam
par construction, et le domaine met des mois à s'en remettre.
*Gate supplémentaire :* dans TrulyInbox, la colonne « Outreach Readiness » doit être **verte**.
Tant qu'elle ne l'est pas, on n'envoie pas — même si la date prévue est passée.

> **Arbitré le 15/08/2026 : 12 jours, et départ le 25/08.** Ce paragraphe demandait 14 jours ; la
> Sheet en annonçait 5. Ni l'un ni l'autre ne tenait. Les 14 jours visaient une boîte neuve, or les
> quatre boîtes existaient déjà. Et les 5 jours étaient de toute façon impossibles : la tâche D3 ne
> rend les e-mails des décideurs que le 20/08, et D11 nettoie la liste après. Le 25/08 est la
> première date qui satisfait les trois contraintes — chauffe, dépendances, et fenêtre d'envoi
> mardi-jeudi.

**6 — Contrôle final et plafonds.**
Test vers `mail-tester.com` depuis Saleshandy : viser **9/10 minimum**. Vérifier aussi sur
`dmarcguide.globalcyberalliance.org`.
Plafonds à tenir en permanence : **50 e-mails par jour et par boîte au maximum**, **90 à 160
secondes** entre deux envois, montée en charge progressive.
*Piège :* prendre ces plafonds pour des indications. Ce sont eux qui déterminent si les e-mails
arrivent en boîte de réception — bien plus que le choix de l'outil.

### 6.3 Deux conséquences de calendrier

**Le premier envoi part le 25/08, deux jours avant le bilan.** Warm-up du 13 au 24/08, vague 1 le
mardi 25/08 (voir l'encadré de l'étape 5). Ce qui sera mesurable au 27/08 : la liste, le LinkedIn,
l'état de préparation technique et les tout premiers rebonds — **pas** les taux de réponse, qui
arriveront début septembre. Une grande partie des réponses tombe aux e-mails 3, 4 et 5, soit à
partir du 3/09 avec la cadence de l'onglet D+.

**Le domaine principal convient pour 100 contacts, pas pour 5 000.** À 100 prospects, envoyer depuis
`claudeagency.fr` est le bon choix : meilleure crédibilité, volume sans danger. À 5 000 contacts et
trois e-mails chacun, il faut des domaines secondaires dédiés et une dizaine de boîtes, pour ne
jamais exposer le domaine du site. Décision à prendre quand le volume augmentera, pas maintenant.

### 6.4 Après 30 jours

Passer DMARC de `p=none` à `p=quarantine`, **une fois les rapports lus et sans anomalie**. Durcir
avant d'avoir lu les rapports met en quarantaine vos propres envois légitimes : Mailjet, Hostinger,
les formulaires du site.

---

## 7. Interdits — idées déjà tranchées, ne pas les reproposer

Chaque ligne a coûté du temps à quelqu'un.

| Ce qu'il ne faut PAS faire | Écarté le | Pourquoi |
| :--- | :--- | :--- |
| Publier en masse (30 à 40 articles d'un coup) | 12/08/2026 | Fait le 30/06/2026. Mesure à 6 semaines : impressions en hausse, quasiment aucun clic, position dégradée à 33,3. Le volume ne compense pas l'absence d'autorité. |
| Poser le maillage interne par script | 03/07/2026 | A **vidé 62 articles** de leur contenu. Le maillage se pose à la main. |
| Schema `FAQPage` pour le SEO Google | 14/06/2026 | Rich result restreint aux sites gouvernementaux et santé depuis août 2023. Les `FAQPage` existants restent, mais pour les citations IA. |
| Schema `HowTo` | 14/06/2026 | Déprécié par Google en septembre 2023. |
| Pages variantes par ville ou région | 14/06/2026 | Offre nationale. Aucune justification, risque de contenu dupliqué. |
| Retirer le tag GA4 | — | La propriété Search Console à préfixe est validée par ce tag. |
| Annuaires Qualiopi (Pronéo, AnnuaireQualiopi.fr…) | 12/08/2026 | Alimentés automatiquement par la liste publique DGEFP, aucune soumission possible. **À réexaminer si la tâche A13 révèle un NDA.** |
| lifelong-learning.lu (Luxembourg) | 12/08/2026 | Réservé aux organismes ayant une autorisation ministérielle luxembourgeoise. |
| Annuaires SEO génériques, fermes de liens | 12/08/2026 | Aucun lien thématique avec la formation. Dévaluent le profil de liens. |
| Culture RH, ParlonsRH (tribunes) | 12/08/2026 | Payant uniquement : 700 € la tribune, packs 3 000 à 9 000 €. |
| Corriger le « doublon www » | 12/08/2026 | Fausse alerte vérifiée : `www` redirige bien en 301 vers l'apex. |
| Analyser GSC sans le filtre anti-bruit | 12/08/2026 | Les requêtes contenant « skills claude seo » sont émises par un agent automatisé. Sans `query notContains`, le CTR de `/services/seo/` est faussé. |
| Envoyer de la prospection depuis Brevo | 13/08/2026 | Sa politique anti-spam interdit l'envoi sans consentement explicite, avec suspension immédiate. Et le compte Brevo est celui d'École de Naturopathie & Sophrologie : la suspension frapperait l'école. |
| Envoyer depuis `@ecole-naturo.fr` | 13/08/2026 | Domaine sur Microsoft 365, autre activité. Sa réputation ne doit pas servir de caution à de la prospection à froid. |
| Acheter un lien sans l'avoir passé à la grille de qualification | 14/08/2026 | SOLOHERY décide seul dans l'enveloppe : 450 € HT maximum par lien, 3 000 € HT au total, et non est la réponse par défaut au-dessus du plafond. Ce qui reste interdit : acheter sans avoir passé les 7 critères du tableau 3 de l'onglet F. *(Rédaction corrigée le 15/08/2026 : la version précédente exigeait la validation de Julien et renvoyait à une skill d'un autre projet.)* |

---

## 8. Points tranchés — cette section est périmée depuis le 14/08/2026

> ⚠️ **À lire avant le tableau.** Cette section listait les décisions réservées à Julien. La règle
> **D00b, posée le 14/08/2026**, l'a rendue caduque : *SOLOHERY décide tout seul, aucune tâche
> n'attend une réponse de Julien, et si une phrase semble demander une validation, elle est
> périmée.* Les enveloppes sont autorisées jusqu'au 31/12/2026 — netlinking 3 000 € HT dont 450 €
> HT par lien, outils de prospection 120 € HT par mois, adhésions 500 € HT par an et par organisme
> et 1 000 € HT au total, le reste uniquement s'il est gratuit. **Au-dessus d'un plafond, on
> n'achète pas** : on écrit le prix, la raison et la date dans la colonne Preuve, et on passe à la
> suite.
>
> Le tableau ci-dessous est conservé pour le contexte de chaque question, pas pour son statut
> bloquant. Où chacune en est au 15/08/2026 : **Saleshandy payant** → tranché, c'est la tâche D0e,
> à faire avant le 20/08. **Cotisations fédérations** → SOLOHERY adhère seul sous 500 € HT par an
> (A7, A8). **`reporting.claudeagency.fr`** → SOLOHERY tranche seul (C5). Seul **l'accès de
> SOLOHERY** reste un vrai prérequis matériel.

| Question | Pourquoi c'est bloquant | Tâches |
| :--- | :--- | :--- |
| **Passer Saleshandy en Outreach Pro ?** | Vérifié le 13/08/2026 dans la doc Saleshandy : « on Trial and Starter plans, you cannot add team members ». La gestion d'équipe démarre à Outreach Pro (99 $/mois, 69 $ en annuel), qui inclut ensuite des membres illimités. Julien a choisi de **partager l'identifiant unique** — d'où l'obligation de changer le mot de passe et d'activer la 2FA. | D4, D5 |
| **Budget des cotisations fédérations** | Les Acteurs de la Compétence et Hub France IA sont les deux meilleurs liens du plan. Cotisations non publiées. SOLOHERY peut demander les montants, pas signer. | A7, A8 |
| **Accès de SOLOHERY** | Il lui faut : GitHub en écriture sur `JRAYES000/CLAUDEAGENCY`, Search Console, administration de la page LinkedIn, Saleshandy, dashboard Cloudflare et panneau Hostinger. Chaque accès manquant transforme une tâche en aller-retour. | tout le plan |
| **`reporting.claudeagency.fr` doit-il rester public ?** | Indexé (17 impressions, position 9,2) et compté dans les statistiques de la propriété domaine. S'il n'est pas destiné au public, il fausse les mesures. | C5 |

### Déjà tranché le 13/08/2026

- **Identité légale** : voir section 5.
- **Signature des e-mails de prospection** : Julien RAYES, fondateur.
- **Outil d'envoi** : Saleshandy, compte au nom de `contact@claudeagency.fr`.
- **Suivi de l'avancement** : Google Sheet, avec ce fichier comme référence de méthode.

---

## 9. Deux échéances hors sprint à ne pas rater

- **11/09/2026** — relevé de contrôle des 9 `title` / `description` réécrits le 12/08. Si le CTR de
  `/services/seo/` est toujours à 0, **revenir à l'ancien title**. Cette page est en position 3,8
  sur « agence référencement naturel claude » et ne récolte aucun clic.
- **12/09/2026** — durcir DMARC en `p=quarantine`, après lecture des rapports.

---

*Sources : `docs/seo/` du repo, documentation Saleshandy (setup technique et custom tracking
domain), politique anti-spam Brevo, API `recherche-entreprises.api.gouv.fr`, relevé DNS direct du
13/08/2026.*
