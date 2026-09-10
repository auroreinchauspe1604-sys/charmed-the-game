// Suite de la correction ciblée. Les annonces du matin sont des faits de
// journée, reformulés par l'Ange, que le moteur ne peut pas rattacher à une
// carte précise : il ne les retire donc pas tout seul. On retire ici les deux
// qui décrivent la cachette, laquelle n'a jamais existé.
'use strict';
const path=require('path');
process.env.CHARMED_SCENARIO='nexus-sous-tension';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
const {Store}=require('../serveur/charmed/store');

const MOTIFS=[/cuisine du manoir est vidée/i,/les sœurs savent où l'Éclaireur a caché/i];

(async()=>{
 const store=new Store(process.env.CHARMED_STATE_DIR);
 const avant=store.load();
 const apres=await store.transact(avant.revision,'correction-faits-cachette-0001',s=>{
  const garde=[],retires=[];
  for(const f of s.facts)(MOTIFS.some(m=>m.test(String(f)))?retires:garde).push(f);
  s.facts=garde;
  for(const f of retires)console.log('  retiré : '+String(f).slice(0,120));
  s.facts.push('Les herbes et les ingrédients de potion sont dans la cuisine du manoir : ils n’ont jamais été déplacés. Ce qui manque aux sœurs y est accessible à Paige par orbes, comme leur réponse acceptée du jour 3 l’établissait.');
  s.arbitration.push({day:s.day,text:
   'Suite de la correction : les annonces du matin qui décrivaient la cuisine vidée et la cachette révélée quittent le plateau avec le chemin invalidé. '+
   'La situation rétablie est celle d’avant le verrou : les ingrédients sont dans la cuisine et n’ont jamais bougé.'});
 });
 console.log('\nRévision : '+apres.revision+'\nFaits restants : '+apres.facts.length);
})().catch(e=>{console.error('ÉCHEC — rien écrit : '+e.message);process.exit(1);});
