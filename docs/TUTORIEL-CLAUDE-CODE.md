# Travailler sur claudeagency.fr avec Claude Code

Guide de démarrage pour Julien. Complète `CLAUDE.md` (règles que suit l'agent) et
`docs/CONTEXTE-COWORK.md` (contexte projet).

---

## 1. Ce qui est déjà installé

Rien à installer : tout est prêt sur le PC.

| Élément | État |
| :--- | :--- |
| Claude Code | v2.1.220 |
| Node.js | v24.15.0 (le projet demande ≥ 22.12) |
| Git / GitHub CLI | git 2.54 / gh 2.96, authentifié sur le compte JRAYES000 |
| Dépôt cloné | `C:\Users\julien\Claude\Projects\CLAUDEAGENCY` |
| Dépendances du site | installées (`app/node_modules`) |
| Build | vérifié — 175 pages générées |

---

## 2. Lancer une session

Ouvre **PowerShell** (touche Windows → tape « powershell » → Entrée), puis :

```powershell
cd "C:\Users\julien\Claude\Projects\CLAUDEAGENCY"
claude
```

C'est tout. Claude Code lit automatiquement le `CLAUDE.md` du dossier : il connaît le projet, le ton,
les règles de publication et les garde-fous dès la première question.

> **Le dossier compte.** Si tu lances `claude` depuis un autre dossier, il ne verra ni le code du site
> ni les règles du projet. Un script « qui n'est pas reconnu » ou un agent qui ne trouve rien, c'est
> presque toujours ça.

Pour reprendre la conversation précédente : `claude --continue`
Pour choisir parmi les sessions passées : `claude --resume`

---

## 3. Les commandes utiles une fois dedans

| Commande | À quoi ça sert |
| :--- | :--- |
| `/clear` | Vide le contexte et repart à zéro (à faire entre deux sujets sans rapport) |
| `/model` | Change de modèle (Opus pour la rédaction et les décisions, Sonnet pour le reste) |
| `/context` | Montre ce qui occupe la mémoire de la conversation |
| `/mcp` | Liste les connecteurs disponibles et leur état |
| `/agents` | Gère les sous-agents (dont `seo-researcher`) |
| `/cost` | Ce que la session a consommé |
| `Échap` | Interrompt Claude en cours de route |
| `Échap` deux fois | Revient en arrière dans la conversation |
| `Shift + Tab` | Bascule en mode plan (Claude réfléchit avant d'agir) ou en mode auto-acceptation |
| `#` en début de message | Enregistre une instruction durable dans `CLAUDE.md` |
| `/exit` | Quitte |

---

## 4. Le déroulé type d'une modification

1. **Tu demandes** : « ajoute une page /services/conformite-qualiopi/ dans le style des autres services ».
2. Claude lit les fichiers existants, écrit la page, lance `npm run build` pour vérifier.
3. Il commit et pousse sur `main`.
4. **Cloudflare Pages déploie tout seul** en une à deux minutes.
5. Il te donne l'URL complète en ligne.

Tu n'as pas à valider le déploiement : c'est la règle que tu as posée, elle est écrite dans `CLAUDE.md`.

**Pour prévisualiser avant de publier**, demande-lui de lancer le serveur local (`npm run dev`) et ouvre
http://localhost:4321.

---

## 5. Les connecteurs disponibles

Déjà branchés et actifs dans Claude Code : **Search Console** (`gscServer`), **DataForSEO**
(ajouté pour ce projet), **Notion**, **Supabase**, **Google Drive**, **Microsoft 365**, **Gamma**,
**Context7**, **Porter**, **Hostinger** (DNS, domaines, hébergement, facturation), **Playwright**
(navigateur automatisé), **Composio**.

Quelques-uns demandent une reconnexion (`/mcp` puis suivre le lien) : Ubersuggest, Canva, Calendly,
Make, Qonto, Apollo, Lovable, Hugging Face.

**Pour Cloudflare**, il n'y a pas de connecteur : le jeton API est dans
`C:\Users\julien\Claude\Projects\CLAUDE PARTNERS\.secrets\cloudflare.env` et Claude sait s'en servir
en ligne de commande (c'est écrit dans `docs/CONTEXTE-COWORK.md`).

---

## 6. Cowork ou Claude Code : lequel pour quoi

Les deux restent utiles, ils ne servent pas à la même chose.

**Claude Code** — quand il faut toucher au code du site :
créer ou modifier des pages, écrire et publier des articles, corriger le design, refondre un composant,
optimiser les performances, travailler le maillage interne, ajouter une fonctionnalité. Il voit tout le
dépôt d'un coup, lance les builds, teste, commit et déploie.

**Cowork** — quand le résultat n'est pas du code :
audits SEO et rapports, prospection, veille et recherche web longue, présentations et documents,
tâches planifiées récurrentes, pilotage du navigateur, automatisations Windows. Il garde aussi la
mémoire de projet entre les sessions et sait travailler pendant que ton ordinateur est fermé.

**En pratique** : Cowork décide *quoi* faire (l'audit dit « la page /services/seo/ ne convertit pas »),
Claude Code le *fait* (il réécrit le title, le H1 et le maillage, puis publie).

---

## 7. Ce qui a été transféré depuis Cowork

- **Les instructions du projet** (langue, ton, cible, charte, règles de réponse) → intégrées dans
  `CLAUDE.md`, que Claude Code lit à chaque session.
- **La mémoire projet** (25 notes : infra Cloudflare, DNS, e-mail, règles de publication, analytics,
  audit GSC, incidents, pièges Windows) → synthétisée dans `docs/CONTEXTE-COWORK.md`.
- **Le connecteur DataForSEO** → ajouté à la configuration Claude Code de ce projet.

Deux corrections faites au passage : la documentation disait que le site était déployé sur
Netlify/Vercel (c'est **Cloudflare Pages**), et un ancien `ONBOARDING.md` demandait une validation avant
chaque publication alors que tu as tranché l'inverse — ce fichier a été supprimé le 2026-08-14.

---

## 8. Ce qui n'a pas été transféré, et pourquoi

- **Les skills Cowork** (`/seo`, `/prospection`, `netlinking`…) : elles sont liées à ton compte et
  restent disponibles dans Cowork. Si une skill Cowork te manque vraiment en Claude Code, on peut la
  recopier dans `.claude/skills/` — dis-le et je le fais.
- **Les tâches planifiées** : elles restent dans Cowork, qui tourne même quand le PC est éteint.
  Claude Code ne s'exécute que quand tu ouvres un terminal.
- **Les secrets** : rien n'a été copié dans le dépôt. Les identifiants DataForSEO sont dans la config
  locale de Claude Code (`~/.claude.json`), hors du dépôt Git, et le jeton Cloudflare reste dans son
  fichier `.secrets`.

---

## 9. Trois conseils pour bien démarrer

1. **Un sujet = une session.** Fais `/clear` entre deux tâches sans rapport : Claude travaille mieux
   avec un contexte propre, et ça consomme moins.
2. **Demande un plan sur les gros chantiers.** `Shift + Tab` pour passer en mode plan, ou commence par
   « avant de coder, explique-moi comment tu comptes t'y prendre ».
3. **Utilise `#` pour les règles durables.** Si tu corriges Claude sur un point qui reviendra
   (« les titres d'articles ne dépassent jamais 60 caractères »), tape `# les titres d'articles ne
   dépassent jamais 60 caractères` : la règle s'ajoute au `CLAUDE.md` et vaut pour toutes les
   sessions suivantes.