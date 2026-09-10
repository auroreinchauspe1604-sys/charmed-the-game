// Correction ciblée — Partie 6 §3. Conséquence d'un défaut introduit le
// 10 septembre 2026 dans la règle de la contre-clé sans objet.
//
// ERREUR : c10 (« La prémonition de Phoebe révèle la cachette ») a été réalisée
// le soir du jour 12 et a fait tomber le verrou c6. La règle de la contre-clé
// sans objet, écrite le même jour, a alors vu son verrou cible devenu terminal
// et a marqué c10 « removed » avec le motif « le verrou visé n'a pas été
// établi » — ce qui est faux : le verrou est tombé PARCE QUE cette clé a réussi.
//
// RÈGLE CORRECTE : une contre-clé déjà réalisée n'est jamais sans objet
// (Partie 3 §4 : le verrou disparaît lorsque sa clé d'ouverture est réalisée).
// Le moteur est corrigé ; on rétablit ici le statut de c10.
//
// INCHANGÉ : le fait acquis de la prémonition, la chute de c6, la libération de
// l'Éclaireur, et tout le reste de la partie.
'use strict';
const path=require('path');
process.env.CHARMED_SCENARIO='nexus-sous-tension';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
const {Store}=require('../serveur/charmed/store');
const E=require('../serveur/charmed/engine');
(async()=>{
 const store=new Store(process.env.CHARMED_STATE_DIR);
 const avant=store.load();
 const c10=avant.nodes.find(n=>n.id==='c10');
 if(!c10){console.log('c10 introuvable.');return;}
 if(c10.status!=='removed'||!c10.voidReason){console.log('c10 est déjà correct : '+c10.status);return;}
 const apres=await store.transact(avant.revision,'correction-c10-0001',s=>{
  const n=E.node(s,'c10');
  n.status='acquired';
  delete n.voidReason;
  n.correction='Statut rétabli le 10 septembre 2026 : contre-clé réalisée, jamais sans objet (Partie 6 §3).';
  s.arbitration.push({day:s.day,text:
   'CORRECTION CIBLÉE (Partie 6 §3). « La prémonition de Phoebe révèle la cachette » avait été marquée sans objet '+
   'par une règle écrite le jour même, au motif que le verrou visé n’aurait pas été établi. C’est l’inverse : le verrou '+
   'est tombé parce que cette clé a réussi. Le statut acquis est rétabli et le moteur corrigé. Le fait acquis de la '+
   'prémonition, la chute du verrou et le reste de la partie sont inchangés.'});
 });
 const n=apres.nodes.find(x=>x.id==='c10');
 console.log('c10 → '+n.status+' | révision '+apres.revision);
})().catch(e=>{console.error('ÉCHEC — rien écrit : '+e.message);process.exit(1);});
