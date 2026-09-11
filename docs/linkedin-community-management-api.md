# Dossier de demande — LinkedIn Community Management API

Préparé le 2026-09-11. Objectif : obtenir les autorisations `r_organization_admin` et
`w_organization_social` pour que la skill `page-claude` puisse publier sur
[linkedin.com/company/claude-agency-fr](https://www.linkedin.com/company/claude-agency-fr/)
(page vérifiée en ligne le 11/09, HTTP 200).

**On ne demande que le Development Tier.** Il plafonne à 500 requêtes par application et
100 par membre — sans commune mesure avec quelques publications par semaine. Le Standard Tier
exigerait une captation vidéo commentée de l'application ; il ne sert à rien ici.

Sources : [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review),
[Overview](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview),
[Restricted Uses](https://learn.microsoft.com/en-us/linkedin/marketing/restricted-use-cases).

## 1. Les pièces du dossier

| Pièce exigée | État | Valeur |
| :--- | :--- | :--- |
| Entité légale enregistrée | ✅ | BULGARIA EDUCATION EOOD, EIK 206507432 |
| Adresse enregistrée | ✅ | ul. Saedinenie 66, ent. 1, ap. 15, 9700 Choumen, Bulgarie |
| Site web de l'organisation | ✅ | https://claudeagency.fr |
| Politique de confidentialité en ligne | ✅ | https://claudeagency.fr/confidentialite/ |
| Adresse e-mail professionnelle | ✅ | contact@claudeagency.fr |
| Page LinkedIn de l'organisation | ✅ | linkedin.com/company/claude-agency-fr |
| Super admin de la Page | ⚠️ à confirmer | c'est lui qui valide l'association app ↔ Page |
| Application développeur **neuve** | ⬜ à créer | voir §2 |

Une seule inconnue : **es-tu super admin de la Page ?** Sans ce rôle, personne ne peut associer
l'application, et le dossier est rejeté d'office. Ça se vérifie en dix secondes sur la Page,
menu Admin tools.

## 2. Les quatre étapes, dans l'ordre

1. **Créer une application neuve** sur
   [developer.linkedin.com/developers/apps/new](https://www.linkedin.com/developers/apps/new).
   Nom proposé : **Claude Agency Page Manager**. L'associer à la Page Claude Agency.
   *Impératif* : une application **qui ne porte aucun autre produit API**. La documentation est
   explicite — si l'app a déjà « Share on LinkedIn » ou un autre produit, la demande
   Community Management apparaît grisée et devient impossible. Si une app existe déjà pour
   Composio, ne pas la réutiliser : en créer une seconde.
2. **Faire vérifier l'application par la Page** : l'onglet *Settings* de l'app produit un lien de
   vérification, qu'un super admin ouvre et valide. C'est immédiat.
3. **Vérifier l'adresse e-mail** : LinkedIn envoie un message à contact@claudeagency.fr.
   Regarder les onglets Promotions et Spam — c'est la cause de rejet la plus bête.
4. **Soumettre le formulaire** depuis l'onglet *Products* de l'app, produit
   *Community Management API*, tier *Development*. Les réponses sont au §3.

## 3. Réponses au formulaire (à copier telles quelles)

Le formulaire est en anglais.

**Legal organization name** — `BULGARIA EDUCATION EOOD`

**Registered address** — `ul. Saedinenie 66, ent. 1, ap. 15, 9700 Shumen, Bulgaria`

**Company website** — `https://claudeagency.fr`

**Privacy policy URL** — `https://claudeagency.fr/confidentialite/`

**Business email** — `contact@claudeagency.fr`

**Use case** — cocher **Page Management** uniquement. Ne rien cocher d'autre : chaque case
supplémentaire ouvre un axe de contrôle, et aucune n'est nécessaire ici. La publication depuis
les deux profils personnels passe déjà par `w_member_social`, hors Community Management.

**Description of your use case** :

> Claude Agency, operated by BULGARIA EDUCATION EOOD, uses this application to manage its own
> LinkedIn Page at linkedin.com/company/claude-agency-fr. Our two-person marketing team drafts a
> post in the application, reviews it, publishes it to the Page, and reads the comments and
> reactions it receives so that we can reply from the same interface.
>
> The application manages our own Page only. It is not resold, licensed or offered to third
> parties. We do not display LinkedIn content on our website or on any intranet, and we do not
> use member data for advertising, sales, recruiting, lead generation, audience building, ad
> targeting or CRM enrichment. Member data from comments and reactions is shown only to the
> administrators of that Page, is never combined with data from other sources, and is never
> retained beyond the limits set out in the Data Storage Requirements.

## 4. Les cinq pièges qui font rejeter

1. **Adresse e-mail personnelle.** Un gmail échoue systématiquement. Uniquement
   contact@claudeagency.fr — ce qui est de toute façon la règle sur tous les projets.
2. **Application réutilisée.** La demande n'est ouverte qu'à une app sans autre produit API.
   Un rejet est définitif pour cette app : il faut en recréer une et tout recommencer.
3. **Le mot « prospection ».** Les données de membres ne peuvent servir ni à la vente, ni au
   recrutement, ni à alimenter un CRM. Notre prospection SalesHandy est une activité entièrement
   séparée, qui ne touche à aucune donnée LinkedIn — mais il ne faut pas en souffler un mot dans
   ce formulaire, ni décrire l'application comme un outil d'acquisition.
4. **Le mot « flux ».** Afficher des publications LinkedIn sur claudeagency.fr est un cas
   d'usage explicitement interdit. Ne pas le mentionner, ne pas le faire.
5. **Nom d'application.** Aucun fragment de « LinkedIn » ni de « Microsoft ».
   *Claude Agency Page Manager* est propre de ce côté-là.

## 5. Le point faible du dossier

L'entité est bulgare, le site est en `.fr`, la Page s'appelle Claude Agency : LinkedIn contrôle
la cohérence entre l'organisation déclarée, son domaine et sa Page. C'est
[/mentions-legales/](https://claudeagency.fr/mentions-legales/) qui fait le lien — la page
nomme BULGARIA EDUCATION EOOD comme éditeur de claudeagency.fr, donne l'EIK, la TVA et le
siège. Si un examinateur pose la question, c'est l'URL à lui donner.

*Hors périmètre LinkedIn* : « Claude » est une marque d'Anthropic. Ça ne concerne pas cette
demande, mais un nom d'application qui la reprend est une surface de plus.

## 6. Après approbation

L'application donnera un `client_id` et un `client_secret`. Ils vont dans une **auth config
personnalisée Composio** — cocher « Use your own developer authentication », coller les deux
valeurs, puis ajouter `r_organization_admin` et `w_organization_social` aux scopes. Reconnecter
ensuite le compte LinkedIn côté Agency : c'est ce nouveau consentement qui portera les
autorisations d'organisation.

**Vérifié le 11/09 : l'espace Connect n'accepte aucune auth config personnalisée.** Trois
contrôles concordants — la route `/~/connect/auth-configs` rend un **404**, le flux
« Connect New » n'offre aucune case « use your own developer authentication », et les réglages
de Connect se limitent à Sessions & API Key, CLI Sessions et MCP Session Management. Les auth
configs sont une notion de **projet** : la route `/<projet>/auth-configs` existe, elle, et
porte déjà celle de Google Ads.

Conséquence : `page-claude` ne pourra pas publier depuis le partage MCP mis en place le 11/09.
Sa connexion devra vivre dans le projet SDK, seul endroit où l'on peut poser ses propres
`client_id`/`client_secret` et choisir les scopes.

Deux architectures possibles, à trancher :

- **Tout dans le projet SDK** — une auth config LinkedIn personnalisée, les deux profils et la
  page connectés au même endroit, Nomena sur une clé API neuve portant les bons scopes. Un seul
  montage à maintenir. C'est la recommandation.
- **Hybride** — les deux profils restent sur le partage MCP (qui fonctionne déjà), seule
  `page-claude` passe par le projet SDK. Deux montages, deux modes d'accès pour Nomena.

Rien ne presse : la bascule ne se fait qu'**après** l'approbation LinkedIn, et le partage MCP
débloque les deux skills de profil dès maintenant.

Une fois les scopes en place, le contrôle qui tranche est `LINKEDIN_GET_COMPANY_INFO` : il
répond aujourd'hui 403 sur les deux comptes, il devra rendre l'`urn:li:organization:<id>` de
Claude Agency.
