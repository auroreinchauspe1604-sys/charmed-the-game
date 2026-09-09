"use strict";
const E=require('./engine');const scenario=require('./scenario');const enemyName=scenario.camps.find(c=>c.id==='commanditaire').name;
class Service{
 constructor(store,intelligence){this.store=store;this.ia=intelligence;}
 async execute(s,camp,a){
  E.requireRule(a&&typeof a.type==='string','Action invalide.');
  if(a.type==='propose'){
   E.requireRule(['key','lock','attack','subgoal','resource'].includes(a.kind),'Type de proposition invalide.');
   if(a.kind==='resource')E.requireRule(['player','ai'].includes(s.phase),'Radio Halliwell est en cours.');else {E.checkTurn(s,camp,true);E.targetCheck(s,camp,a.kind,a.target);}
   if(['key','lock'].includes(a.kind))E.requireRule(a.resource&&E.availability(s,E.resource(s,a.resource))==='free'&&E.resource(s,a.resource).owner===camp,'Choisissez une première ressource disponible.');
   const p=await this.ia.plan(s,camp,a);const n=E.propose(s,camp,a,p);return n;
  }
  if(a.type==='place'){
   E.checkTurn(s,camp,true);E.requireRule(typeof a.text==='string'&&a.text.trim().length>=8,'Justifiez le rôle de cette ressource dans la préparation.');
   // Check the physical move before spending an IA call, without changing the real state.
   E.validatePlace(s,camp,a.target,a.resource);
   const verdict=await this.ia.placement(s,camp,a);E.requireRule(verdict&&typeof verdict.accepted==='boolean'&&typeof verdict.reason==='string','Justification de pose invalide.');
   const target=E.node(s,a.target);if(!verdict.accepted){s.arbitration.push({day:s.day,text:target.discovery?'Cette contribution ne justifie pas la clé telle qu’elle est définie. Aucun coup consommé.':verdict.reason});return null;}if(!target.discovery)s.arbitration.push({day:s.day,text:verdict.reason});
   E.place(s,camp,a.target,a.resource,verdict);const n=E.node(s,a.target);(n.placements??=[]).push({resource:a.resource,text:a.text,day:s.day});s.arbitration.push({day:s.day,text:E.discoveryFeedback(n)});return n;
  }
  if(a.type==='question'){
   E.question(E.clone(s),camp,a.target,a.text);
   const verdict=await this.ia.question(s,camp,a);
   E.requireRule(verdict&&typeof verdict.accepted==='boolean'&&typeof verdict.reason==='string','Avis de recevabilité invalide.');
   if(!verdict.accepted){s.arbitration.push({day:s.day,text:'Question irrecevable : '+verdict.reason+' Aucun coup ni droit de question consommé.'});return;}
   return E.question(s,camp,a.target,a.text);
  }
  if(a.type==='answer'){E.checkTurn(s,camp);E.submitAnswer(s,camp,a.target,a.text);return;}
  if(a.type==='end'){E.endPassage(s,camp);return;}
  throw new E.RuleError('Action inconnue.');
 }
 async evening(s){
  const before=s.arbitration.length;
  for(const q of s.questions.filter(q=>!q.resolved&&q.answer!==null)){
   const camp=E.node(s,q.target).owner;
   E.adjudicateAnswer(s,q.id,await this.ia.answer(s,camp,{target:q.id,text:q.answer}));
  }
  await this.resolveNow(s);
  s.eveningMessages=s.arbitration.slice(before).map(a=>a.text);
 }
 async resolveNow(s){const list=E.immediateCandidates(s);if(!list.length)return;const messages=E.applyResolution(s,await this.ia.resolve(s,list,false),list);s.arbitration.push(...messages.map(text=>({day:s.day,text})));}
 async action(revision,id,a){return this.store.transact(revision,id,s=>this.execute(s,'phoebe',a));}
 async advance(revision,id){return this.store.transact(revision,id,async s=>{
  if(s.phase==='ai'){
   const decision=await this.ia.opponent(s);E.requireRule(Array.isArray(decision.moves)&&decision.moves.length<=8,'Passage IA invalide.');
   let messages=[];for(const move of decision.moves){if(s.phase!=='ai')break;const before=E.clone(s);try{const n=await this.execute(s,'commanditaire',move);if(n&&n.title)messages.push(n.type==='attack'?enemyName+' a engagé une tentative : '+n.description:n.title);else if(move.type==='place')messages.push(enemyName+' engage une pièce dans '+E.node(s,move.target).title);}catch(e){if(!(e instanceof E.RuleError))throw e;Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,before);s.arbitration.push({day:s.day,text:'Action adverse refusée : '+e.message});}}
   if(s.phase==='ai')await this.execute(s,'commanditaire',{type:'end'});
   // Narration generated only from committed moves: never publish private model prose.
   s.opponent.push({day:s.day,text:messages.join('\n')||enemyName+' termine son passage sans nouveau coup accepté.'});
  }else if(s.phase==='morning'){await this.evening(s);if(s.result)return;E.prepareMorning(s);E.finishMorning(s,await this.ia.resolve(s,E.immediateCandidates(s),true));}
  else throw new E.RuleError('Aucune phase automatique à poursuivre.');
 });}
}
module.exports={Service};
