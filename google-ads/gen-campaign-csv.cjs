// Génère un CSV importable dans Google Ads Editor (interface FR) : campagne OF + 2 groupes + mots-clés + RSA + négatifs.
// En-têtes en anglais (reconnus par Editor) + VALEURS en français (requis par Editor FR).
const fs = require('fs');

const CAMPAIGN = 'Claude Partners - OF | Search';
const FINAL_HOME = 'https://claudepartners.fr/';
const FINAL_SEO = 'https://claudepartners.fr/services/seo/';

const headers = [
  'Campaign','Campaign Type','Campaign Daily Budget','Bid Strategy Type','Networks','Languages','Location','Campaign Status',
  'Ad Group','Default Max. CPC','Ad Group Status',
  'Criterion Type','Keyword','Match Type',
  'Ad Type',
  'Headline 1','Headline 2','Headline 3','Headline 4','Headline 5','Headline 6','Headline 7','Headline 8','Headline 9','Headline 10','Headline 11','Headline 12',
  'Description 1','Description 2','Description 3','Description 4',
  'Final URL','Path 1','Path 2','Status'
];

const rows = [];
const push = (o) => rows.push(o);

// --- Campagne (réglages) — valeurs FR ---
push({
  'Campaign': CAMPAIGN, 'Campaign Type': 'Réseau de Recherche', 'Campaign Daily Budget': '30.00',
  'Bid Strategy Type': 'Maximiser les clics', 'Networks': 'Recherche Google', 'Languages': 'Français',
  'Location': 'France', 'Campaign Status': 'Activé'
});

// --- Groupe 1 : Créer un OF ---
const AG1 = 'Creer un OF';
push({ 'Campaign': CAMPAIGN, 'Ad Group': AG1, 'Default Max. CPC': '6.00', 'Ad Group Status': 'Activé' });
['creer organisme de formation','creer son organisme de formation','ouvrir un organisme de formation','lancer son organisme de formation','monter un organisme de formation']
  .forEach(k => push({ 'Campaign': CAMPAIGN, 'Ad Group': AG1, 'Criterion Type': 'Mot clé', 'Keyword': k, 'Match Type': 'Expression', 'Status': 'Activé' }));
push({
  'Campaign': CAMPAIGN, 'Ad Group': AG1, 'Ad Type': 'Annonce responsive sur le Réseau de Recherche',
  'Headline 1': 'Lancez votre OF avec nous', 'Headline 2': 'Spécialistes des OF', 'Headline 3': 'Marketing & admin de votre OF',
  'Headline 4': "3-4x moins cher qu'une agence", 'Headline 5': 'Audit offert, sans engagement', 'Headline 6': 'Une équipe IA pour votre OF',
  'Headline 7': '4 experts, un prix imbattable', 'Headline 8': 'On exécute, vous validez', 'Headline 9': 'Gagnez des heures/semaine',
  'Headline 10': 'Expert organismes de formation', 'Headline 11': 'Votre OF, lancé plus vite', 'Headline 12': 'SEO, pub, site & admin OF',
  'Description 1': "Une équipe de 4 experts prend en charge le marketing et l'admin de votre organisme.",
  'Description 2': "SEO, pub, site, admin Qualiopi : on s'occupe de tout, 3 à 4x moins cher qu'une agence.",
  'Description 3': 'Audit offert et sans engagement : repartez avec une feuille de route chiffrée.',
  'Description 4': 'Spécialistes des organismes de formation. On connaît Qualiopi, financement, pédagogie.',
  'Final URL': FINAL_HOME, 'Path 1': 'organisme', 'Path 2': 'formation', 'Status': 'Activé'
});

// --- Groupe 2 : Marketing & SEO OF ---
const AG2 = 'Marketing & SEO OF';
push({ 'Campaign': CAMPAIGN, 'Ad Group': AG2, 'Default Max. CPC': '6.00', 'Ad Group Status': 'Activé' });
['referencement organisme de formation','seo organisme de formation','marketing organisme de formation','communication organisme de formation','agence seo formation']
  .forEach(k => push({ 'Campaign': CAMPAIGN, 'Ad Group': AG2, 'Criterion Type': 'Mot clé', 'Keyword': k, 'Match Type': 'Expression', 'Status': 'Activé' }));
push({
  'Campaign': CAMPAIGN, 'Ad Group': AG2, 'Ad Type': 'Annonce responsive sur le Réseau de Recherche',
  'Headline 1': 'Le SEO de votre OF, délégué', 'Headline 2': 'Plus de stagiaires via Google', 'Headline 3': 'Référencez votre organisme',
  'Headline 4': 'Marketing & SEO pour OF', 'Headline 5': 'Remplissez vos sessions', 'Headline 6': 'Spécialistes des OF',
  'Headline 7': "3-4x moins cher qu'une agence", 'Headline 8': 'Audit offert, sans engagement', 'Headline 9': 'Une équipe IA pour votre OF',
  'Headline 10': 'Pub Google pour votre OF', 'Headline 11': '4 experts, un prix imbattable', 'Headline 12': 'Attirez des candidats',
  'Description 1': 'On fait remonter votre organisme sur Google et on attire des candidats qualifiés.',
  'Description 2': 'Campagnes Google Ads pilotées pour remplir vos sessions, sans gaspiller le budget.',
  'Description 3': "SEO, SEA, site : le marketing de votre OF délégué, 3 à 4x moins cher qu'une agence.",
  'Description 4': 'Audit offert et sans engagement : repartez avec une feuille de route chiffrée.',
  'Final URL': FINAL_SEO, 'Path 1': 'SEO', 'Path 2': 'formation', 'Status': 'Activé'
});

// --- Négatifs (niveau campagne) — Type de critère FR ---
['gratuit','gratuitement','salaire','emploi','metier','definition',"c'est quoi",'exemple','modele','pdf','excel','cpf','pole emploi','mon compte formation','devenir formateur','cours gratuit','open source','tuto','tutoriel','wikipedia']
  .forEach(k => push({ 'Campaign': CAMPAIGN, 'Criterion Type': 'Mot clé à exclure', 'Keyword': k, 'Match Type': 'Requête large' }));

const esc = (v) => {
  v = (v === undefined || v === null) ? '' : String(v);
  return '"' + v.replace(/"/g, '""') + '"';
};
const lines = [headers.map(esc).join(',')];
for (const r of rows) lines.push(headers.map(h => esc(r[h])).join(','));
fs.writeFileSync('C:/Users/julien/CLAUDEPARTNERS/google-ads/claude-partners-OF-campagne.csv', '﻿' + lines.join('\r\n'), 'utf8');
console.log('OK rows=' + rows.length);
