'use strict';
// Retire une question du journal d'une partie en cours, en respectant le
// protocole d'écriture de store.js : verrou .lock, révision strictement
// incrémentée, sha256 recalculé sur l'état exact, ligne ajoutée en fin de
// fichier. Aucune ligne existante n'est modifiée : l'historique reste intact,
// on ajoute une révision qui ne contient plus la question visée.
const fs = require('fs'), path = require('path'), crypto = require('crypto');

const fichier = process.argv[2];
const questionId = process.argv[3];
if (!fichier || !questionId) { console.error('usage: node retirer-question.cjs <fichier.jsonl> <idQuestion>'); process.exit(1); }

const verrou = fichier + '.lock';
let fd;
try { fd = fs.openSync(verrou, 'wx'); }
catch (e) { console.error(e.code === 'EEXIST' ? 'ALERTE : une opération est en cours sur la partie (verrou présent). Rien fait.' : e.message); process.exit(1); }

try {
  // Relecture intégrale avec les mêmes contrôles que store.load().
  const lines = fs.readFileSync(fichier, 'utf8').trim().split('\n');
  let expected = 1, state;
  for (const line of lines) {
    const row = JSON.parse(line);
    if (row.revision !== expected++ || row.state.revision !== row.revision) throw new Error('Ordre du journal invalide.');
    if (crypto.createHash('sha256').update(JSON.stringify(row.state)).digest('hex') !== row.sha256) throw new Error('Journal altéré.');
    state = row.state;
  }
  console.log('journal relu : ' + lines.length + ' révisions, état au jour ' + state.day + ', phase ' + state.phase);

  const cible = state.questions.find(q => q.id === questionId);
  if (!cible) throw new Error('Question ' + questionId + ' introuvable.');
  console.log('question visée : ' + cible.id + ' → cible ' + cible.target + ', posée par ' + cible.owner + ' au jour ' + cible.day + ', résolue : ' + !!cible.resolved);

  // Sauvegarde avant toute écriture.
  const sauvegarde = fichier + '.avant-retrait-' + questionId + '-' + Date.now() + '.bak';
  fs.copyFileSync(fichier, sauvegarde);
  console.log('sauvegarde : ' + path.basename(sauvegarde));

  const s = JSON.parse(JSON.stringify(state));
  s.questions = s.questions.filter(q => q.id !== questionId);
  s.revision++;
  s.lastRequest = 'retrait-question-' + questionId;
  const row = { revision: s.revision, at: new Date().toISOString(), sha256: crypto.createHash('sha256').update(JSON.stringify(s)).digest('hex'), state: s };
  const out = fs.openSync(fichier, 'a');
  try { fs.writeFileSync(out, JSON.stringify(row) + '\n'); fs.fsyncSync(out); } finally { fs.closeSync(out); }
  console.log('révision ' + s.revision + ' ajoutée, question retirée. Questions restantes : ' + s.questions.length);
} finally {
  fs.closeSync(fd); fs.unlinkSync(verrou);
}
