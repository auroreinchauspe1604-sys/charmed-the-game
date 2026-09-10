// Vérifie que toutes les images référencées par l'interface active existent
// bien ailleurs que dans l'ancien dossier ecrans/ de la racine.
'use strict';
const fs = require('fs'), path = require('path');
const racine = path.resolve(__dirname, '../..');
const cssDir = path.join(racine, 'technique/ecrans/modules');

const refs = new Set();
for (const f of fs.readdirSync(cssDir).filter(n => n.endsWith('.css') || n.endsWith('.js') || n.endsWith('.html'))) {
  const texte = fs.readFileSync(path.join(cssDir, f), 'utf8');
  for (const m of texte.matchAll(/\/modules\/charmed-assets\/([A-Za-z0-9._-]+)/g)) refs.add(m[1]);
}
for (const f of fs.readdirSync(path.join(racine, 'technique/ecrans')).filter(n => n.endsWith('.html'))) {
  const texte = fs.readFileSync(path.join(racine, 'technique/ecrans', f), 'utf8');
  for (const m of texte.matchAll(/\/modules\/charmed-assets\/([A-Za-z0-9._-]+)/g)) refs.add(m[1]);
}

const candidats = ['visuels/jeu', 'technique/ecrans/modules/charmed-assets'];
const manquantes = [];
console.log('Images référencées par l’interface active : ' + refs.size);
for (const nom of [...refs].sort()) {
  const trouve = candidats.find(d => fs.existsSync(path.join(racine, d, nom)));
  if (trouve) console.log('  OK       ' + nom.padEnd(42) + ' -> ' + trouve);
  else { manquantes.push(nom); console.log('  MANQUE   ' + nom); }
}
console.log('');
console.log(manquantes.length === 0
  ? 'Aucune image ne dépend du dossier ecrans/ de la racine : sa suppression est sans effet sur l’interface.'
  : 'ATTENTION : ' + manquantes.length + ' image(s) introuvable(s) hors de ecrans/. Ne pas supprimer.');
