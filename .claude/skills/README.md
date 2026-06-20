# Skills du projet

Skills Claude Code versionnés dans le dépôt pour être disponibles partout, y
compris en Cloud coWork / Claude Code on the web (le conteneur ne clone que le
dépôt, donc un skill purement local n'y est pas présent).

## fabuleux
Skill maison — voir `CLAUDE.md`.

## grill-me / grill-with-docs (+ grilling, domain-modeling)
Skills de Matt Pocock, repris depuis https://github.com/mattpocock/skills
(`/grill-me`, `/grill-with-docs`, `/grilling`, `/domain-modeling`). Deux portes
d'entrée sur la même boucle `/grilling` :

- `grill-me` (invocation par l'utilisateur uniquement) → version légère :
  lance simplement une session `/grilling`, sans toucher aux docs.
- `grill-with-docs` (invocation par l'utilisateur uniquement) → version riche :
  lance `/grilling` en s'appuyant sur `/domain-modeling`.
- `grilling` → la boucle d'interview qui te cuisine, une question à la fois.
- `domain-modeling` → construit/affûte le glossaire (`CONTEXT.md`) et les ADR
  (`docs/adr/`) au fil de la session ; formats dans `CONTEXT-FORMAT.md` et
  `ADR-FORMAT.md`.

Source amont : skills de Matt Pocock (aihero.dev / mattpocock/skills).
