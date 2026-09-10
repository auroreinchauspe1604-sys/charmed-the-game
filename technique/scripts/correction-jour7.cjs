// Correction ciblée — Partie 6, section 3. 10 septembre 2026.
//
// CARTE CONCERNÉE : l'examen du soir du jour 7, cartes c7 (attaque de Zankou sur
// Phoebe) et c4 (bouclier de cristaux autour du Livre et des sœurs).
//
// ERREUR CONSTATÉE : c4 et c7 avaient la même échéance, jour 7. L'Ange les a
// départagées en faisant landing l'attaque d'abord, puis en se servant de la
// blessure de Phoebe pour faire échouer le bouclier qui l'enfermait — alors que
// la réponse acceptée de Phoebe à la question de Zankou sur c4 établissait au
// plateau que « Phoebe se trouve à l'intérieur du bouclier ».
//
// RÈGLE CORRECTE : Partie 3, section 11. Deux effets incompatibles résolus dans
// la même fenêtre se départagent sur les moyens, la portée et l'ordre causal
// ÉTABLI, jamais sur l'ordre technique de lecture. Sans fait qui départage, la
// situation antérieure demeure sur le point contesté.
//
// CONSÉQUENCES RECALCULÉES : c7 échoue et doit un avantage concret au défenseur ;
// c4 revient à l'examen sans le motif de la blessure ; les faits tirés de la
// blessure sont retirés.
//
// INCHANGÉ : c2 et ses trois pièces, le verrou c6 et son effet, la clé c8 en
// préparation, la lettre du jour 7, tous les autres faits et l'intégralité du
// journal, qui conserve la trace de l'état antérieur.
'use strict';
const path=require('path');
process.env.CHARMED_SCENARIO='nexus-sous-tension';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
const {Store}=require('../serveur/charmed/store');
const E=require('../serveur/charmed/engine');

const RETIRER=[
 'Sous le couvert de l’orage, Zankou surgit au grenier et frappe Phoebe',
 "Sous le couvert de l'orage, Zankou surgit au grenier et frappe Phoebe",
 'Zankou a surgi au grenier et blessé Phoebe',
 'aucun bouclier de cristaux ne protège le Livre des Ombres'
];
const contient=(f,motif)=>String(typeof f==='string'?f:(f&&(f.text||f.statement))||'').includes(motif);

(async()=>{
 const store=new Store(process.env.CHARMED_STATE_DIR);
 const avant=store.load();
 console.log('Révision avant correction : '+avant.revision+' — jour '+avant.day);

 const apres=await store.transact(avant.revision,'correction-jour7-0001',s=>{
  const c7=E.node(s,'c7'),c4=E.node(s,'c4');

  // 1. L'attaque n'établit pas la blessure : la cible était à l'intérieur du dispositif.
  c7.status='failed';
  delete c7.established;
  c7.correction='Examen du jour 7 corrigé le 10 septembre 2026 (Partie 3 §11 ; Partie 6 §3).';
  for(const id of c7.pieces||[]){const r=E.resource(s,id);if(r.heldBy===c7.id)r.heldBy=null;}

  // 2. Le bouclier revient à l'examen, sans le motif de la blessure. Ses pièces
  //    sont de nouveau engagées, comme elles l'étaient avant cet examen.
  c4.status='ready';
  delete c4.established;
  c4.dueDay=s.day;
  c4.correction=c7.correction;
  for(const id of c4.pieces||[]){const r=E.resource(s,id);r.heldBy=c4.id;r.recoveryUntil=0;}

  // 3. Les faits tirés de la blessure disparaissent.
  const avantFaits=s.facts.length;
  s.facts=s.facts.filter(f=>!RETIRER.some(m=>contient(f,m)));
  console.log('Faits retirés : '+(avantFaits-s.facts.length));

  // 4. Ce que l'échec établit, et l'avantage dû au défenseur.
  s.facts.push('Au matin du jour 7, Zankou est venu en personne au grenier et a frappé de ses boules d’énergie. Phoebe se trouvait à l’intérieur de l’alignement de cristaux : elle n’a pas été atteinte et n’est pas blessée. La tentative de Zankou est dépensée et a échoué.');
  s.facts.push('Avantage acquis aux sœurs par l’échec de cette attaque : il est désormais établi au plateau que l’alignement de cristaux arrête les boules d’énergie de Zankou lui-même.');

  // 5. Trace de la correction dans le fil d'arbitrage.
  s.arbitration.push({day:s.day,text:
   'CORRECTION CIBLÉE (Partie 6 §3), validée par Aurore le 10 septembre 2026. '+
   'Examen du soir du jour 7 : c4 et c7 avaient la même échéance et ont été départagées sans fait établissant l’ordre causal, contrairement à la Partie 3 §11. '+
   'La réponse acceptée sur c4 établissait au plateau que Phoebe se trouvait à l’intérieur du bouclier ; l’attaque ne pouvait donc pas l’atteindre, et sa blessure ne pouvait pas servir à faire échouer le bouclier qui l’enfermait. '+
   'c7 échoue et doit son avantage au défenseur. c4 revient à l’examen de ce soir, sans le motif de la blessure. '+
   'Aucune autre carte, aucun autre fait et aucun autre coup ne sont modifiés ; le journal conserve l’état antérieur.'});
 });

 console.log('Révision après correction : '+apres.revision);
 for(const id of ['c4','c7']){const n=apres.nodes.find(x=>x.id===id);console.log('  '+id+' → '+n.status+(n.dueDay?' | examen J'+n.dueDay:''));}
 console.log('  Phoebe engagée dans : '+(apres.resources.find(r=>r.id==='phoebe').heldBy||'-'));
 console.log('  Cristaux engagés dans : '+(apres.resources.find(r=>r.id==='cristaux').heldBy||'-'));
})().catch(e=>{console.error('ÉCHEC — rien n’a été écrit : '+e.message);process.exit(1);});
