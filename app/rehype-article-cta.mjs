// Encart « diagnostic gratuit » inséré au milieu des articles de blog :
// avant le 3e H2, uniquement si l'article compte au moins 4 H2 (les articles
// courts et les pages services ne sont pas touchés). Le lecteur SEO croise
// ainsi un point de conversion avant le pied de page, entre deux sections —
// jamais au milieu d'un paragraphe.

const cta = () => ({
  type: 'element',
  tagName: 'aside',
  properties: {
    className: ['not-prose', 'my-10', 'rounded-2xl', 'border', 'border-sand', 'bg-cream-100', 'p-6', 'sm:p-7'],
    ariaLabel: 'Diagnostic gratuit',
  },
  children: [
    el('p', ['text-xs', 'font-semibold', 'uppercase', 'tracking-[0.18em]', 'text-brand-600'], 'Diagnostic gratuit · 2 minutes'),
    el('p', ['mt-2', 'font-display', 'text-xl', 'font-bold', 'text-ink'], 'Où en est votre organisme avec l’IA ?'),
    el('p', ['mt-2', 'leading-relaxed', 'text-muted'], 'Trois questions, vos coordonnées, c’est tout : on revient vers vous avec des pistes concrètes et un audit offert — sans engagement, sans relance insistante.'),
    {
      type: 'element',
      tagName: 'a',
      properties: {
        href: '/diagnostic/',
        className: ['mt-4', 'inline-block', 'rounded-lg', 'bg-brand-500', 'px-5', 'py-2.5', 'font-semibold', 'text-white', 'transition-colors', 'hover:bg-brand-600'],
      },
      children: [{ type: 'text', value: 'Faire le diagnostic' }],
    },
  ],
});

function el(tagName, className, text) {
  return { type: 'element', tagName, properties: { className }, children: [{ type: 'text', value: text }] };
}

export function rehypeArticleCta() {
  return (tree, file) => {
    const path = String(file?.path ?? file?.history?.[0] ?? '');
    if (!path.includes('/content/blog/')) return;

    const h2Indexes = tree.children
      .map((node, i) => (node.type === 'element' && node.tagName === 'h2' ? i : -1))
      .filter((i) => i !== -1);
    if (h2Indexes.length < 4) return;

    tree.children.splice(h2Indexes[2], 0, cta());
  };
}
