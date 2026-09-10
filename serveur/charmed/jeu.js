'use strict';
const {spawn}=require('child_process'),path=require('path');
const E=require('./engine'),S=require('./operations'),scenario=require('./scenario'),canon=require('./canon');
const {serve}=require('./agent-mcp'),{createTools,rules}=require('./agent-tools');
const {opponentView,documents,campDocuments}=require('./agent-context');
const text={type:'string'},camp={type:'string',enum:['phoebe','commanditaire']};
const action={type:'object',properties:{type:{type:'string',enum:['propose','place','question','answer','end']},kind:{type:'string',enum:['key','lock','attack','subgoal','resource']},target:text,resource:text,text},required:['type'],additionalProperties:false};
const verdict=p=>{const checked=canon.verify(p,scenario.canonPeriod);E.requireRule(!p.accepted||checked.accepted,checked.reason);return checked;};

async function invoke(seed,event,board,docs,operations=[],schema=S.obj({message:text})){
 const access=createTools({board,documents:docs}),tools=[...access.tools,...operations],bridge=await serve(tools);
 try{
  const request={seed,schema,mcp:{type:'http',url:bridge.url,headers:{Authorization:'Bearer '+bridge.token}},
   prompt:{instruction:'Joue ce tour selon les règles. Utilise les appels disponibles.',tour:event,regles:rules(),plateau:board(),pointeurs:access.pointers,appels:tools.map(({run,...tool})=>tool)}};
  return await new Promise((resolve,reject)=>{
   const child=spawn(process.env.CHARMED_PYTHON||'python',[path.join(__dirname,'../../jeu.py'),'--appel'],{windowsHide:true,stdio:['pipe','pipe','pipe']});
   let output='',error='';child.stdout.on('data',c=>output+=c);child.stderr.on('data',c=>error+=c);
   child.on('error',reject);child.stdin.on('error',()=>{});
   child.on('close',code=>{if(code!==0)return reject(Error(error||'Appel interrompu.'));try{resolve(JSON.parse(output));}catch(e){reject(e);}});
   child.stdin.end(JSON.stringify(request));
  });
 }finally{await bridge.close();}
}

class Jeu{
 constructor(store,call=invoke){this.store=store;this.call=call;}
 turn(revision,id,event){return this.store.transact(revision,id,async s=>{
  let failure;
  const board=()=>({...E.clone(s),candidats:E.immediateCandidates(s)});
  const operation=(name,description,properties,apply)=>({name,description,inputSchema:S.obj(properties),run:args=>{
   const copy=E.clone(s),before=copy.arbitration.length;apply(copy,args);E.refresh(copy);
   Object.keys(s).forEach(key=>delete s[key]);Object.assign(s,copy);
   return {plateau:require('./agent-tools').position(board()),messages:s.arbitration.slice(before)};
  }});
  const operations=[
   operation('proposer','Enregistrer une proposition avec son jugement.',{camp,action,verdict:S.planSchema},(s,a)=>E.propose(s,a.camp,a.action,verdict(a.verdict))),
   operation('poser','Poser une ressource avec sa justification et son jugement.',{camp,target:text,resource:text,text,verdict:S.placementSchema},(s,a)=>{
    E.requireRule(a.text.trim().length>=8,'Justification requise.');const p=verdict(a.verdict);
    if(!p.accepted){s.arbitration.push({day:s.day,text:p.reason});return;}
    E.place(s,a.camp,a.target,a.resource,p);(E.node(s,a.target).placements??=[]).push({resource:a.resource,text:a.text,day:s.day});
   }),
   operation('questionner','Enregistrer une question recevable.',{camp,target:text,text},(s,a)=>E.question(s,a.camp,a.target,a.text)),
   operation('repondre','Enregistrer une réponse.',{camp,target:text,text},(s,a)=>{E.checkTurn(s,a.camp);E.submitAnswer(s,a.camp,a.target,a.text);}),
   operation('juger_reponse','Appliquer le jugement d’une réponse en fin de journée.',{id:text,verdict:S.answerSchema},(s,a)=>{E.requireRule(s.phase==='morning','La journée doit être terminée.');E.adjudicateAnswer(s,a.id,verdict(a.verdict));}),
   operation('terminer_passage','Terminer le passage du camp.',{camp},(s,a)=>E.endPassage(s,a.camp)),
   operation('resoudre','Résoudre tous les candidats actuels et constater les états et victoires.',{resolution:S.resolutionSchema},(s,a)=>{
    verdict({accepted:true,canon:a.resolution.canon});s.arbitration.push(...E.applyResolution(s,a.resolution,E.immediateCandidates(s)).map(text=>({day:s.day,text})));
   }),
   operation('preparer_matin','Ouvrir le matin suivant et son calendrier.',{},s=>{E.requireRule(!s.result&&!s.morningMessages,'Matin déjà ouvert ou partie terminée.');E.prepareMorning(s);}),
   operation('finir_matin','Résoudre les candidats du matin, publier la radio et ouvrir le passage joueur.',{resolution:S.resolutionSchema},(s,a)=>{
    E.requireRule(s.phase==='morning'&&Array.isArray(s.morningMessages),'Préparer le matin avant de le terminer.');verdict({accepted:true,canon:a.resolution.canon});E.finishMorning(s,a.resolution);
   }),
   operation('publier','Ajouter un message au fil public.',{text},(s,a)=>s.arbitration.push({day:s.day,text:a.text})),
   {name:'opponent',description:'Demander au camp adverse son prochain coup sur le plateau actuel.',inputSchema:S.obj({message:text}),run:a=>{
    E.requireRule(s.phase==='ai','Le camp adverse ne joue pas actuellement.');
    return this.call(this.store.seed+':commanditaire',{camp:'commanditaire',message:a.message},()=>opponentView(s),campDocuments('commanditaire'),[],S.obj({action,message:text})).catch(error=>{failure=error;throw error;});
   }}
  ];
  const result=await this.call(this.store.seed+':arbitrage',event,board,documents(),operations);
  if(failure)throw failure;
  if(result.message)s.arbitration.push({day:s.day,text:result.message});
 });}
}
module.exports={Jeu,invoke};
