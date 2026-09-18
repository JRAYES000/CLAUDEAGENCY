// node app/functions/api/_notion.test.mjs
// Le seul vrai branchement de _notion.js : le type d'entreprise ecrit dans Notion.
// Une valeur hors des trois options fait rejeter l'ecriture ENTIERE par Notion, donc
// perdre le lead complet ; et un type suppose fausse le compteur du front PME.
import assert from 'node:assert/strict';
import { typeEntreprise } from './_notion.js';

const OPTIONS = ['PME', 'Organisme de formation', 'Inconnu'];
const cas = [
  [{ structure: 'PME' }, 'PME'],
  [{ structure: 'Organisme de formation' }, 'Organisme de formation'],
  [{ structure: 'PME', role: 'Responsable pedagogique' }, 'PME'], // le declare prime sur le deduit
  [{ role: "Dirigeant·e d'organisme de formation" }, 'Organisme de formation'],
  [{ role: 'Autre' }, 'Inconnu'],
  [{ structure: 'TPE' }, 'Inconnu'], // valeur hors liste : jamais recopiee telle quelle
  [{}, 'Inconnu'],
  [{ structure: null, role: undefined }, 'Inconnu'],
];
for (const [lead, attendu] of cas) {
  const eu = typeEntreprise(lead);
  assert.equal(eu, attendu, `${JSON.stringify(lead)} -> ${eu}, attendu ${attendu}`);
  assert.ok(OPTIONS.includes(eu), `${eu} n'est pas une option de la base Notion`);
}
console.log(cas.length, 'cas verifies — ok');
