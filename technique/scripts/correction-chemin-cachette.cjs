// Correction ciblée — Partie 6 §3. 10 septembre 2026, validée par Aurore.
//
// ERREUR : le verrou c6 « La cuisine vidée de ses ingrédients » est tombé. Un
// verrou qui tombe n'a pas eu lieu (Partie 3 §4) : la cuisine n'a jamais été
// vidée, les ingrédients n'ont jamais bougé, il n'y a jamais eu de cachette.
// Tout le chemin né de ce verrou est donc invalidé.
//
// CONSÉQUENCES RECALCULÉES :
//  - c6 reste au plateau comme retiré ; son fait quitte le plateau ;
//  - c10 « La prémonition de Phoebe révèle la cachette » était valable, mais
//    n'a plus d'objet : elle quitte le plateau avec le verrou, sans être un
//    échec, et son fait disparaît ;
//  - c12 « Les ingrédients repris à la cachette » n'aurait jamais été créé :
//    il est supprimé, son emplacement de sous-état est rendu, et la question
//    posée dessus disparaît avec lui ;
//  - c13 « Zankou garde la cachette en personne » n'a plus d'objet : sa cible
//    a disparu et son énoncé désigne une cachette qui n'a jamais existé ;
//  - c2 reprend son cours : les ingrédients manquants sont dans la cuisine,
//    comme l'établissait la réponse acceptée le jour 3.
//
// INCHANGÉ : c1, c4 acquise, c8 acquise, la lettre du jour 7, les autres faits.
'use strict';
const path=require('path');
process.env.CHARMED_SCENARIO='nexus-sous-tension';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
const {Store}=require('../serveur/charmed/store');
const E=require('../serveur/charmed/engine');

(async()=>{
 const store=new Store(process.env.CHARMED_STATE_DIR);
 const avant=store.load();
 console.log('Révision avant : '+avant.revision+' — jour '+avant.day);
 const apres=await store.transact(avant.revision,'correction-cachette-0001',s=>{
  // Les cartes nées du verrou disparaissent entièrement : elles n'ont jamais eu
  // lieu d'être. Leurs ressources sont rendues intactes.
  for(const id of ['c13','c12']){
   const n=s.nodes.find(x=>x.id===id);
   if(!n)continue;
   // release() n'est pas exporté : on rend les pièces à la main, intactes.
   for(const rid of [...(n.pieces||[]),...(n.defenders||[])]){
    const r=s.resources.find(x=>x.id===rid);
    if(r&&r.heldBy===n.id){r.heldBy=null;r.recoveryUntil=0;}
   }
   if(n.established)s.facts=s.facts.filter(f=>f!==n.established);
   s.nodes=s.nodes.filter(x=>x.id!==id);
   s.questions=s.questions.filter(q=>q.target!==id);
   console.log('  supprimé : '+id+' ('+n.type+') « '+String(n.title).slice(0,60)+' »');
  }
  // Le reste est appliqué par la règle du moteur : c10 part avec c6, les faits
  // des deux cartes quittent le plateau.
  E.refresh(s);
  s.arbitration.push({day:s.day,text:
   'CORRECTION CIBLÉE (Partie 6 §3), validée par Aurore le 10 septembre 2026. '+
   'Le verrou « La cuisine vidée de ses ingrédients » est tombé : il n’a donc pas eu lieu. La cuisine n’a jamais été vidée, '+
   'les herbes et ingrédients n’ont jamais bougé et il n’y a jamais eu de cachette. Tout le chemin né de ce verrou est invalidé : '+
   'la prémonition qui révélait la cachette était valable mais n’a plus d’objet et quitte le plateau avec le verrou, sans être un échec ; '+
   'le sous-état « Les ingrédients repris à la cachette » n’aurait jamais eu lieu d’être et son emplacement est rendu ; '+
   'le verrou « Zankou garde la cachette en personne » désigne une cachette qui n’a jamais existé et disparaît. '+
   'Les ingrédients manquants sont dans la cuisine, où la réponse acceptée du jour 3 les situait. Aucun autre coup n’est modifié.'});
 });
 console.log('Révision après : '+apres.revision);
 for(const n of apres.nodes)console.log('  '+n.id.padEnd(6)+n.type.padEnd(7)+n.owner.padEnd(14)+n.status+(n.voidReason?' — '+n.voidReason.slice(0,70):''));
 console.log('\nFaits au plateau :');
 for(const f of apres.facts)console.log('  · '+String(f).slice(0,150));
})().catch(e=>{console.error('ÉCHEC — rien écrit : '+e.message);process.exit(1);});
