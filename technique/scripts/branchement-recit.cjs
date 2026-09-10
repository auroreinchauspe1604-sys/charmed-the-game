// Branchement du récit de partie et filtrage de la bibliothèque — 10 septembre 2026.
'use strict';
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../serveur/charmed/intelligence-v3.js');
let src = fs.readFileSync(file, 'utf8');
const avant = src;

// 1. Le récit devient la tête du contexte transmis, pour l'arbitre comme pour l'adversaire.
src = src.replace(
  "function modelView(s){const v=E.publicView(s);delete v.arbitration;return v;}",
  "const recit=require('./recit');\n" +
  "function modelView(s){const v=E.publicView(s);delete v.arbitration;return v;}\n" +
  "// Le récit est placé en premier : la décision se prend sur la réalité du plateau.\n" +
  "function vueArbitre(s){return {recit:recit.arbitre(s),...modelView(s)};}"
);
src = src.replace(
  "function opponentView(s){const v=modelView(s);",
  "function opponentView(s){const v={recit:recit.camp(s,'commanditaire'),...modelView(s)};"
);

// 2. Tous les rôles d'arbitrage reçoivent le récit.
const cible = 'position:modelView(s)';
const occurrences = src.split(cible).length - 1;
if (occurrences !== 6) { console.error('position:modelView(s) trouvé ' + occurrences + ' fois au lieu de 6. Rien modifié.'); process.exit(1); }
src = src.split(cible).join('position:vueArbitre(s)');

// 3. Filtrage de la bibliothèque.
// L'encyclopédie complète représentait 97 % du contexte et le plateau 1,7 %.
// On ne garde que les entrées qui concernent des entités réellement présentes
// dans la partie ou nommées dans la proposition examinée.
const FILTRE = `
// --- Filtrage du contexte d'expertise (10 septembre 2026) ---
// L'encyclopédie complète noyait le plateau. On conserve les règles, l'univers et
// les fiches de construction, et on restreint les notices nominatives aux entités
// présentes dans la partie ou citées dans la proposition. Une entrée écartée n'est
// jamais une impossibilité : elle n'est simplement pas pertinente ici.
function sansAccents(t){return String(t||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLocaleLowerCase('fr');}
function nomsDe(entree){
 const bruts=[entree&&entree.name,entree&&entree.title,entree&&entree.id,entree&&entree.character,entree&&entree.sujet];
 return bruts.filter(Boolean).map(sansAccents).filter(n=>n.length>=3);
}
function concerne(entree,paille){const noms=nomsDe(entree);return !noms.length||noms.some(n=>paille.includes(n));}
function filtrerExpertise(contexte,input){
 if(!contexte||!contexte.library)return contexte;
 const paille=sansAccents(JSON.stringify([input.position,input.action,input.question,input.answer,input.candidates,input.target,input.resource]));
 const filtre={...contexte};
 if(Array.isArray(contexte.characters))filtre.characters=contexte.characters.filter(c=>concerne(c,paille));
 if(Array.isArray(contexte.demons))filtre.demons=contexte.demons.filter(d=>concerne(d,paille));
 if(Array.isArray(contexte.beings))filtre.beings=contexte.beings.filter(b=>concerne(b,paille));
 if(Array.isArray(contexte.places))filtre.places=contexte.places.filter(p=>concerne(p,paille));
 filtre.library={...contexte.library,
  dossiers:(contexte.library.dossiers||[]).map(d=>({...d,fiches:(d.fiches||[]).filter(f=>concerne(f,paille))})).filter(d=>d.fiches.length)};
 filtre.coverage=(contexte.coverage||'')+' Notices restreintes aux entites presentes dans la partie ou citees dans la proposition : une absence ici n est pas une impossibilite.';
 delete filtre.sources;
 return filtre;
}
`;
src = src.replace("class Intelligence{", FILTRE + "class Intelligence{");
src = src.replace(
  "input.expertiseContext=input.role==='preparation'?expertise.preparationContext(input.spec):opponent?expertise.opponentContext(scenario,input.camp):expertise.directorContext(scenario);",
  "input.expertiseContext=input.role==='preparation'?expertise.preparationContext(input.spec):opponent?expertise.opponentContext(scenario,input.camp):filtrerExpertise(expertise.directorContext(scenario),input);"
);

if (src === avant) { console.error('Aucune modification appliquée.'); process.exit(1); }
fs.writeFileSync(file, src);
console.log('Récit branché et bibliothèque filtrée.');
