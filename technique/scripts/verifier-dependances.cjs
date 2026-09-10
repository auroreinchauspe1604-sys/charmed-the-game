// Vérifie qu'aucun fichier actif ne dépend des dossiers de l'ancien arbre
// avant de les déplacer dans archives/.
'use strict';
const fs = require('fs'), path = require('path');
const racine = path.resolve(__dirname, '../..');
const ACTIFS = ['technique', 'scenarios', 'regles', 'bibliotheque', 'visuels'];
const ANCIENS = ['serveur', 'scripts', 'ecrans', 'Charmed', 'docs'];

function fichiers(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/^(node_modules|\.git)$/.test(e.name)) fichiers(p, acc); }
    else if (/\.(js|cjs|mjs|json|html|css|py)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const liens = [];
for (const actif of ACTIFS) {
  const dir = path.join(racine, actif);
  if (!fs.existsSync(dir)) continue;
  for (const f of fichiers(dir)) {
    const texte = fs.readFileSync(f, 'utf8');
    for (const m of texte.matchAll(/(?:require\(|from\s+|["'`])([^"'`\n]*?(?:\.\.\/)+[^"'`\n]*?)["'`)]/g)) {
      const brut = m[1];
      if (!brut.includes('..')) continue;
      const cible = path.resolve(path.dirname(f), brut);
      const relatif = path.relative(racine, cible).split(path.sep)[0];
      if (ANCIENS.includes(relatif)) liens.push({ depuis: path.relative(racine, f), vers: path.relative(racine, cible) });
    }
  }
}

console.log('Fichiers actifs examinés dans : ' + ACTIFS.join(', '));
console.log('Dossiers à déplacer : ' + ANCIENS.join(', '));
console.log('');
if (!liens.length) {
  console.log('AUCUNE dépendance. Les dossiers anciens peuvent être déplacés sans effet.');
} else {
  console.log('DEPENDANCES TROUVEES — ne pas déplacer avant correction :');
  for (const l of liens) console.log('  ' + l.depuis + '  ->  ' + l.vers);
}
