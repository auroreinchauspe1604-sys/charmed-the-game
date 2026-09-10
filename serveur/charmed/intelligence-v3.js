"use strict";
const E=require('./engine'),scenario=require('./scenario'),canon=require('./canon');
const schemas=require('./agent-schemas');
const {createTools,rules}=require('./agent-tools');
const {modelView,opponentView,documents,campDocuments}=require('./agent-context');
class Intelligence{
 constructor(transport){this.transport=transport||require('./intelligence-transport').call;this.seed=process.env.CHARMED_PARTY_SEED||require('crypto').randomUUID();}
 bindParty(seed){this.seed=seed;}
 run(tour,board,schema,pointers=documents(),play,thread='arbitrage'){
  const session=createTools({board,documents:pointers,play});
  const prompt={instruction:'Joue ce tour selon les règles. Utilise les appels disponibles.',
   tour,regles:rules(),plateau:board(),pointeurs:session.pointers,
   appels:session.tools.map(({run,...tool})=>tool)};
  return this.transport(JSON.stringify(prompt),schema,{tools:session.tools,timeoutMs:play?600000:180000,seed:this.seed+':'+thread});
 }
 async judge(request,schema,s=E.initial()){
  const verdict=await this.run(request,()=>modelView(s),schema);
  if(verdict?.canon?.status==='unverified'){
   const error=new Error('Connaissance Charmed non établie : '+verdict.canon.reason+' Vérification nécessaire. Opération non enregistrée.');
   error.code='CHARMED_MANUAL_REVIEW';throw error;
  }
  const checked=canon.verify(verdict,scenario.canonPeriod);
  if(verdict?.accepted&&!checked.accepted)throw new Error(checked.reason+' Opération non enregistrée.');
  return checked;
 }
 plan(s,camp,action){return this.judge({demande:'Examiner la proposition',camp,action},schemas.planSchema,s);}
 placement(s,camp,action){return this.judge({demande:'Examiner la pose',camp,action},schemas.placementSchema,s);}
 question(s,camp,action){return this.run({demande:'Examiner la recevabilité de la question',camp,action},()=>modelView(s),schemas.obj({accepted:schemas.bool,reason:schemas.str}));}
 answer(s,camp,action){return this.judge({demande:'Examiner la réponse',camp,question:s.questions.find(q=>q.id===action.target),answer:action.text},schemas.answerSchema,s);}
 async resolve(s,candidates,morning=false){
  const result=await this.run({demande:'Résoudre les contributions et constater les états et la victoire',day:s.day,morning,candidates,events:morning?scenario.calendar.filter(e=>e.morning===s.day):[]},()=>modelView(s),schemas.resolutionSchema);
  const checked=canon.verify({accepted:true,canon:result.canon},scenario.canonPeriod);
  if(!checked.accepted)throw new Error(checked.reason+' Opération non enregistrée.');
  return result;
 }
 morning(s){const copy=E.clone(s);E.prepareMorning(copy);return this.resolve(copy,E.immediateCandidates(copy),true);}
 opponent(s,play){return this.run({demande:'Jouer le passage',camp:'commanditaire'},()=>opponentView(s),schemas.obj({message:schemas.str}),campDocuments('commanditaire'),play,'commanditaire');}
 async prepareBrief(spec){
  require('./expertise-runtime').periodOf(spec);
  const draft=await this.run({demande:'Préparer une partie',spec},()=>null,schemas.preparationSchema,documents(spec));
  if(!Array.isArray(draft.goals)||draft.goals.length!==2||!['phoebe','commanditaire'].every(c=>draft.goals.some(g=>g.owner===c)))throw new Error('Deux objectifs de camps distincts sont requis.');
  if(!Number.isInteger(draft.finalDay)||draft.finalDay<2)throw new Error('Échéance invalide.');
  if(!Array.isArray(draft.resources)||new Set(draft.resources.map(r=>r.id)).size!==draft.resources.length)throw new Error('Ressources du brouillon invalides.');
  if(!Array.isArray(draft.calendar)||draft.calendar.some(e=>!Number.isInteger(e.morning)||e.morning<1||e.morning>draft.finalDay))throw new Error('Événement hors calendrier.');
  if(!Array.isArray(draft.documents)||draft.documents.some(d=>!draft.resources.some(r=>r.id===d.resource)))throw new Error('Document sans ressource correspondante.');
  const subgoalSlots=require('./gameplay').evaluate(draft,draft.resources,draft.finalDay);
  return {...draft,subgoalSlots,status:'draft_not_started',requiresReview:true,researchReview:require('./bibliotheque').preparationReview(draft,spec)};
 }
}
module.exports={Intelligence,...schemas,opponentView};
