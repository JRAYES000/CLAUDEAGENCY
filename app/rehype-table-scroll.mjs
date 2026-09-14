// Tout tableau issu du Markdown est enveloppé dans une zone de défilement horizontale.
// Sans elle, un tableau plus large que la colonne de lecture pousse la PAGE ENTIÈRE de
// côté sur mobile : constaté le 14/09/2026 sur dix articles, jusqu'à 627 px de large pour
// un écran de 390 px, dernières colonnes illisibles. Le correctif est posé par le pipeline
// Markdown, jamais article par article : un futur article à tableau est protégé sans que
// personne n'y pense. L'enveloppe est un <div>, pas un display:block sur la table — le
// tableau garde ses semantiques (lecture d'écran) et sa mise en page desktop intacte.
// Mise en forme : `.table-scroll` dans src/styles/global.css.

export function rehypeTableScroll() {
  return (tree) => envelopper(tree);
}

function envelopper(node) {
  if (!Array.isArray(node.children)) return;
  for (const enfant of node.children) envelopper(enfant);
  node.children = node.children.map((enfant) =>
    enfant.type === 'element' && enfant.tagName === 'table'
      ? {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-scroll'],
            role: 'region',
            ariaLabel: 'Tableau, défilement horizontal',
            tabIndex: 0,
          },
          children: [enfant],
        }
      : enfant,
  );
}
