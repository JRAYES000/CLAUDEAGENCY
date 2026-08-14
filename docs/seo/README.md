# Mémoire SEO — mode d'emploi

Ce dossier est la **mémoire du projet SEO**. Il existe pour une seule raison : qu'une nouvelle
session ne reparte jamais de zéro, ne refasse pas une recherche déjà faite, ne republie pas un
sujet déjà couvert et ne repropose pas une idée déjà écartée.

Ce dossier est la **seule** source SEO du dépôt depuis le 2026-08-14 : `SEO-STRATEGY.md` (racine),
bâti sur les données de l'ancien domaine, a été supprimé. On y enregistre ce qui a été **fait**,
ce qui est **couvert** et ce qui **reste à faire**. Il bouge à chaque action.

## Les quatre fichiers

| Fichier | Contient | Quand le lire | Quand l'écrire |
| :--- | :--- | :--- | :--- |
| `JOURNAL.md` | Une entrée datée par action SEO : ce qui a été fait, sur quelles URLs, pourquoi | **Toujours, en premier** : les 3 dernières entrées suffisent à savoir où on en est | Après chaque action SEO, dans le même commit |
| `REQUETES.csv` | 1 ligne = 1 URL et sa requête cible, avec ses clics / impressions / position | Avant de proposer un sujet d'article ou de cibler un mot-clé | À chaque publication, et à chaque relevé GSC |
| `BACKLOG.md` | Les prochaines actions priorisées **et** les idées écartées avec leur raison | Quand Julien demande « quelles sont les prochaines actions SEO ? » | Quand une action est faite, ajoutée ou écartée |
| `PERFORMANCES.csv` | Les relevés chiffrés datés (clics, impressions, position moyenne, indexation) | Pour comparer une période à la précédente | À chaque relevé GSC ou Ubersuggest |

## Protocole de démarrage d'une session SEO

1. Lire `JOURNAL.md` — les 3 dernières entrées.
2. Lire `BACKLOG.md` — section « À faire », et **surtout** la section « Écarté ».
3. Ouvrir `REQUETES.csv` seulement si la tâche touche à un mot-clé ou à un sujet d'article.
4. Ne relancer un audit complet que si la dernière entrée du journal a **plus de 30 jours**.

## Protocole de fin d'action

Toute action SEO — publication, réécriture, correctif technique, achat de lien, audit — écrit
son entrée de journal **dans le même commit** que l'action. Un commit SEO sans ligne de journal
est un commit incomplet.

Format d'une entrée (voir `JOURNAL.md`) :

```md
## AAAA-MM-JJ — Titre court de l'action
**Type :** publication | reecriture | technique | netlinking | audit | mesure
**URLs :** liste des URLs complètes touchées
**Pourquoi :** la raison, en une phrase
**Fait :** ce qui a réellement changé
**Mesure :** le chiffre constaté s'il y en a un, avec sa source et sa date — sinon « non mesuré »
**Suite :** l'action suivante, ou « rien »
```

## Règles d'écriture

- **Antéchronologique** dans `JOURNAL.md` : l'entrée la plus récente en haut.
- **Jamais de réécriture du passé.** On ajoute, on ne corrige pas une entrée ancienne. Si une
  conclusion se révèle fausse, on écrit une nouvelle entrée qui le dit.
- **Chaque chiffre porte sa source et sa date.** `49 clics (GSC, 14/05→09/08/2026)`, pas `49 clics`.
- Un chiffre sans source mesurée s'écrit `inconnu`, jamais une estimation présentée comme un fait.

## Où viennent les chiffres

- **Google Search Console** — source de référence pour les clics, impressions, positions et
  l'indexation. Pas de MCP dédié : passer par **Composio** (`COMPOSIO_SEARCH_TOOLS` puis
  `COMPOSIO_MULTI_EXECUTE_TOOL`, outils `GOOGLE_SEARCH_CONSOLE_*`). Propriété à utiliser :
  `sc-domain:claudeagency.fr`. Détail des accès dans `docs/CONTEXTE-COWORK.md`.
- **Ubersuggest** — MCP disponible, utile pour les **volumes de recherche** et la difficulté d'un
  mot-clé avant de choisir un sujet. Ses positions sont estimées : en cas d'écart, GSC fait foi.
