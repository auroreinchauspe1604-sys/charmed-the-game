// Étape 2 — branchement des outils et des sessions continues. 10 septembre 2026.
// L'arbitre et l'adversaire consultent la bibliothèque et le corpus canonique par
// appels, au lieu de les recevoir en bloc dans le prompt.
'use strict';
const fs = require('fs'), path = require('path');
const file = path.resolve(__dirname, '../serveur/charmed/intelligence-v3.js');
const brut = fs.readFileSync(file, 'utf8');
const FIN = brut.includes('\r\n') ? '\r\n' : '\n';
let lignes = brut.split(/\r?\n/);

const index = motif => {
  const i = lignes.findIndex(l => l.includes(motif));
  if (i < 0) { console.error('Introuvable : ' + motif); process.exit(1); }
  return i;
};
const remplaceDans = (motif, avant, apres) => {
  const i = index(motif);
  if (!lignes[i].includes(avant)) { console.error('Motif absent sur la ligne : ' + avant); process.exit(1); }
  lignes[i] = lignes[i].replace(avant, apres);
};

// 1. Graine de partie : deux fils de session distincts, arbitrage et adversaire.
const iClasse = index('class Intelligence{');
lignes.splice(iClasse, 0,
  '// Graine de partie : deux fils de session distincts, arbitrage et adversaire.',
  '// Dérivée du journal de la partie pour survivre au redémarrage du serveur.',
  'function graine(){',
  ' if(process.env.CHARMED_PARTY_SEED)return process.env.CHARMED_PARTY_SEED;',
  " const repere=(process.env.CHARMED_STATE_DIR||'')+'|'+(scenario.id||'');",
  " return require('crypto').createHash('sha256').update(repere).digest('hex');",
  '}');

// 2. Le transport reçoit les outils et le fil.
remplaceDans('this.call=(prompt,schema)=>{', 'this.call=(prompt,schema)=>{', "this.call=(prompt,schema,fil='arbitrage')=>{");

// 3. Plus d'injection : des pointeurs et des appels.
const iExp = index('input.expertiseContext=');
const bloc = [
  '   // Les références ne sont plus injectées : elles sont consultables par appels.',
  "   const outils=require('./agent-tools');",
  '   const pointeurs=opponent?outils.campDocuments(scenario,input.camp):outils.documents(scenario);',
  '   const acces=outils.createTools({board:()=>input.position,documents:pointeurs});',
  '   delete input.expertiseContext;delete input.canonReference;',
  '   if(opponent)delete input.reference;',
  '   input.pointeurs=acces.pointers;',
  '   input.appels=acces.tools.map(({run,...outil})=>outil);',
  "   input.instruction+=' CONSULTATION : tu ne reçois pas la bibliothèque ni le corpus canonique dans ce message. Ils sont accessibles par les appels listés dans appels, sur les pointeurs listés dans pointeurs : plateau() pour l état courant, lire({pointeur,chemin}) pour ouvrir un document, chercher({pointeur,texte}) pour y trouver une valeur. Consulte ce dont tu as besoin avant de te prononcer, et rien de plus. Une absence dans ces sources n est jamais une impossibilité.';"
];
// Les trois lignes d'injection (expertiseContext, canonReference, knowledge) disparaissent.
let fin = iExp;
while (fin < lignes.length && !lignes[fin].includes('input.knowledge=')) fin++;
lignes.splice(iExp, fin - iExp + 1, ...bloc);

// 4. Appel du transport avec les outils et le fil de session.
remplaceDans('Promise.resolve(raw(serialized,schema))', 'raw(serialized,schema)', "raw(serialized,schema,{tools:acces.tools,seed:graine()+':'+fil})");

// 5. Le passage adverse utilise son propre fil.
remplaceDans('}),aiSchema);}', '}),aiSchema);}', "}),aiSchema,'commanditaire');}");

// 6. Les filtres de contexte n'ont plus d'objet.
let texte = lignes.join(FIN);
texte = texte.replace(/[^\n]*\/\/ --- Filtrage du contexte d'expertise[\s\S]*?\r?\n(?=class Intelligence\{|\/\/ Graine de partie)/, '');

fs.writeFileSync(file, texte);
console.log('Outils et sessions continues branchés.');
console.log('Filtres retirés : ' + (texte.includes('filtrerExpertise') ? 'NON — traces restantes' : 'oui'));
