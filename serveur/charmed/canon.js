'use strict';
const base=require('../../Charmed/canon/base.json');
const people=require('../../Charmed/canon/personnages.json');
const index=require('../../Charmed/canon/episodes-index.json').episodes;
function normalize(period=1){
 const p=typeof period==='number'?{season:period,episode:null,moment:null}:period;
 if(!p||!Number.isInteger(p.season)||p.season<1||p.season>8)throw new Error('Saison canonique invalide.');
 if(p.episode!=null&&(!index.some(e=>e.season===p.season&&e.episode===p.episode)||!['before','during','after'].includes(p.moment)))throw new Error('Épisode ou moment canonique invalide.');
 return p;
}
function known(season,episode,p){
 if(season!==p.season)return season<p.season;
 if(p.episode==null)return season===1&&episode===1;
 return episode<p.episode||(episode===p.episode&&p.moment==='after');
}
function date(id){const e=index.find(e=>e.id===id);return {season:e.season,episode:e.episode};}
function futureCouldInclude(event,p){const d=date(event.episode);return d.season<p.season||(d.season===p.season&&(p.episode==null||d.episode<=p.episode));}
function factsFor(p){
 const facts=base.facts.filter(f=>f.status==='verified'&&known(f.season,f.episode,p));
 for(const m of people.milestones){
  if(!['acquisition','restoration'].includes(m.kind)||!['secondary_supported','corroborated'].includes(m.status))continue;
  const d=date(m.episode);if(!known(d.season,d.episode,p))continue;
  const ends=people.milestones.filter(e=>e.character===m.character&&(e.kind==='death_confirmed'||(e.kind==='loss'&&e.capabilities?.includes(m.capability)))&&e.episode>m.episode);
  if(ends.some(e=>futureCouldInclude(e,p)))continue;
  facts.push({id:'character:'+m.id,...d,entities:[m.character],claim:m.claim,sources:m.sources.map(s=>'character:'+s),status:'verified',evidenceLevel:m.status,limits:[...(m.limits||[]),'Capacité de référence seulement : vérifier interruptions temporaires, maîtrise, cible, présence et portée dans la situation.']});
 }
 facts.push(...require('./bibliotheque').read().facts.filter(f=>f.status==='verified'&&known(f.season,f.episode,p)));
 facts.push({id:'game:premonition-contextuelle',claim:'Convention : un contact pertinent permet de proposer une prémonition fictive cohérente sans prouver cette scène dans la série ni la qualifier de pouvoir commandé. Le personnage doit disposer du pouvoir à cette période.',sources:['game:regles'],limits:['Ne donne pas un pouvoir absent. Ne garantit pas le résultat final de l’attaque.']},{id:'game:potions',claim:'Convention : Potions génériques prêtes contre tout démon de bas grade ; potion nommée seulement contre ce démon.',sources:['game:regles'],limits:['La cible doit être atteignable. Ne s’applique pas au simple matériel ni aux démons puissants.']});
 return facts.filter(f=>f.id!=='initial-powers'||p.season===1);
}
function context(period=1){const p=normalize(period);return {
 universe:base.universe,period:p,coverage:'Faits admissibles filtrés par période ; interruptions ponctuelles et portée à contrôler. Corpus partiel.',
 facts:factsFor(p),sources:[{id:'game:regles',type:'convention_de_jeu_validee',path:'Charmed/REGLES_ACTEES.md'},...base.sources,...people.sources.map(s=>({...s,id:'character:'+s.id})),...require('./bibliotheque').read().sources],
 constraints:['Un fait pertinent ne démontre pas toute une action. Confronter son sens exact aux moyens et à la situation.','Les biographies et bestiaires sont des références de fond, pas des pouvoirs disponibles sans conditions.','Une période large impose une vérification si la disponibilité dépend de l’épisode.'],
 unverified:base.unverified};}
function verify(verdict,period=1){
 if(!verdict||typeof verdict.accepted!=='boolean')throw new Error('Avis canonique invalide.');
 if(!verdict.accepted)return verdict;
 const audit=verdict.canon;
 if(!audit||!['verified','ordinary'].includes(audit.status))return {...verdict,accepted:false,reason:'Point canonique à vérifier : '+(audit?.reason||'capacité non établie dans le corpus de cette partie.')};
 if(audit.status==='verified'){
  const ids=new Set(context(period).facts.map(f=>f.id));
  if(!Array.isArray(audit.facts)||!audit.facts.length||audit.facts.some(id=>!ids.has(id)))return {...verdict,accepted:false,reason:'La référence canonique fournie ne prouve pas cette capacité dans la période de la partie.'};
 }
 return verdict;
}
module.exports={context,verify};
