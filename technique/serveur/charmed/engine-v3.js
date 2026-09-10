"use strict";
const scenario=require('./scenario');
const clone=x=>JSON.parse(JSON.stringify(x));
class RuleError extends Error {}
function requireRule(ok,message){if(!ok)throw new RuleError(message);}
const terminal=n=>['failed','removed'].includes(n.status);
const campaigns=['phoebe','commanditaire'];
function initial(){return {version:3,ruleset:'charmed-soir-2026-09-08',revision:0,day:1,phase:'player',spent:{phoebe:false,commanditaire:false},nextId:1,title:scenario.title,subgoalSlots:clone(scenario.subgoalSlots),resources:clone(scenario.resources),nodes:scenario.goals.map(g=>({...g,type:'state',parent:null,goalMode:g.initialValue?'maintain':g.goalMode||'achieve',status:g.initialValue?'true':'open',description:g.title})),questions:[],facts:clone(scenario.initialFacts||['Élise est vivante. Phoebe a reçu la vision initiale.']),result:null,radio:[{day:1,text:scenario.opening}],arbitration:[],opponent:[],appliedEvents:[]};}
function node(s,id){const n=s.nodes.find(n=>n.id===id);requireRule(n,'Carte introuvable.');return n;}
function resource(s,id){const r=s.resources.find(r=>r.id===id);requireRule(r,'Ressource introuvable.');return r;}
const newId=s=>'c'+s.nextId++;
function resourceIdentity(r){const norm=x=>(x||'').toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[_-]/g,' ').trim();const title=norm(r.title);if(r.category==='personnage')for(const name of ['phoebe','piper','prue','paige'])if(title===name||title===name+' halliwell'||title===name+' matthews')return name;return norm(r.canonicalId)||title;}

function dependents(n){return [...(n.dependsOn||[]),...(n.supports||[])];}
function pendingQuestions(s,id,seen=new Set()){
 if(seen.has(id))return [];seen=new Set([...seen,id]);const n=node(s,id);
 return [...s.questions.filter(q=>q.target===id&&!q.resolved),...dependents(n).flatMap(x=>pendingQuestions(s,x,seen))];
}
const suspended=(s,id)=>pendingQuestions(s,id).length>0;
function blocks(s,id){return s.nodes.filter(n=>n.type==='lock'&&n.target===id&&n.status==='active'&&!suspended(s,n.id)&&!n.effectUnavailable);}
function availability(s,r){if(r.lost||r.consumed)return 'lost';if(r.heldBy)return suspended(s,r.heldBy)||blocks(s,r.id).length?'frozen':'engaged';if(r.recoveryUntil>s.day)return 'recovering';if(r.availableDay>s.day)return r.preparation?'preparing':'incoming';return 'free';}
function checkTurn(s,camp,paid=false){requireRule(campaigns.includes(camp),'Camp inconnu.');requireRule(!s.result,'La partie est terminée.');requireRule(s.phase===(camp==='phoebe'?'player':'ai'),'Ce n’est pas votre passage.');if(paid)requireRule(s.day<scenario.finalDay,'L’échéance est passée ; seules les réponses encore dues sont possibles.');if(paid)requireRule(!s.spent[camp],'Votre coup du jour est déjà joué.');}
function spend(s,camp){checkTurn(s,camp,true);s.spent[camp]=true;}
function scopeOf(s,target){const n=s.nodes.find(n=>n.id===target);if(n)return n.type==='state'?(n.parent?'subgoal':'main'):n.scope;const r=resource(s,target);requireRule(r.heldBy,'Une ressource libre ne peut pas être verrouillée.');return scopeOf(s,r.heldBy);}
function subgoalOf(s,n){if(n.scope!=='subgoal')return null;let t=node(s,n.target);const seen=new Set();while(t.type!=='state'){requireRule(!seen.has(t.id),'Lien circulaire.');seen.add(t.id);t=node(s,t.target);}return t.parent?t.id:null;}
function release(s,n,keep=[]){for(const id of [...(n.pieces||[]),...(n.defenders||[])]){const r=resource(s,id);if(r.heldBy===n.id&&!keep.includes(id)){r.heldBy=null;if(!r.lost&&!r.consumed)r.recoveryUntil=Math.max(r.recoveryUntil||0,s.day+(n.recovery?.[id]??0));}}}
function refresh(s){for(const n of s.nodes){
 if(terminal(n)){release(s,n);continue;}
 if(n.type==='lock'&&n.status==='active'){
  n.effectUnavailable=(n.maintainers||[]).some(id=>{const r=resource(s,id);return r.lost||r.consumed||r.owner!==n.owner||r.availableDay>s.day||r.recoveryUntil>s.day;});
  if(n.effectUnavailable){n.status='removed';release(s,n);}else release(s,n,n.maintainers||[]);
 }
 // Contre-clé formée avant l'activation du verrou : si le verrou n'est finalement
 // pas établi, elle est sans objet. Elle tombe et rend ses pièces, sans les user.
 // Une contre-clé DÉJÀ RÉALISÉE a fait son travail : c'est elle qui a fait
 // tomber le verrou. Elle ne devient jamais sans objet.
 if(n.type==='key'&&!terminal(n)&&n.status!=='acquired'){
  const vise=s.nodes.find(x=>x.id===n.target);
  if(vise&&vise.type==='lock'&&vise.owner!==n.owner&&terminal(vise)){
   n.status='removed';n.voidReason='Le verrou visé n’a pas été établi : cette contre-clé est sans objet.';release(s,n);continue;
  }
 }
 if(n.type==='key'&&n.status==='acquired'&&!suspended(s,n.id)){
  // Un effet continu retient les pièces dont il dépend (bouclier de cristaux laissés
  // en place) ; un effet devenu autonome les libère (portes déjà coincées).
  const maintien=n.maintainers||[];
  if(maintien.length){
   n.effectUnavailable=maintien.some(id=>{const r=resource(s,id);return r.lost||r.consumed||r.owner!==n.owner;});
   release(s,n,n.effectUnavailable?[]:maintien);
  }else{const sub=subgoalOf(s,n);if(!sub||node(s,sub).status==='true'||terminal(node(s,sub)))release(s,n);}
 }
}}
function targetCheck(s,camp,kind,target){
 if(kind==='attack'){requireRule(s.resources.some(r=>r.owner===camp&&availability(s,r)==='free'),'Pour déclarer une attaque, vous devez avoir au moins une ressource disponible dans votre main.');const r=resource(s,target);requireRule(r.owner!==camp&&!r.lost&&!r.consumed,'Choisissez une ressource adverse encore présente.');requireRule(!r.heldBy,'Une attaque vise une ressource libre dans la main adverse. Une ressource déjà engagée dans une contribution se bloque par un verrou.');requireRule(r.category!=='lieu','Un lieu ne peut être ni attaqué ni volé. Son accès, son occupation ou son contrôle se construisent par des clés.');return;}
 if(kind==='lock'){
  const targetNode=s.nodes.find(n=>n.id===target),targetResource=s.resources.find(r=>r.id===target);
  if(targetResource){requireRule(targetResource.owner!==camp&&!!targetResource.heldBy&&!targetResource.lost&&!targetResource.consumed,'Un verrou sur une ressource vise une ressource adverse actuellement engagée.');return;}
  requireRule(targetNode&&!terminal(targetNode)&&targetNode.owner!==camp&&['state','key','attack'].includes(targetNode.type),'Un verrou vise un état, une clé, une attaque ou une ressource engagée adverse, avec une portée précise.');return;
 }
 const t=node(s,target);requireRule(!terminal(t),'Cette carte n’est plus active.');
 if(kind==='subgoal'){requireRule(t.type==='state'&&!t.parent&&t.owner===camp,'Un sous-état dépend de votre état initial.');requireRule(s.nodes.filter(n=>n.type==='state'&&n.parent===t.id).length<s.subgoalSlots[camp],'Tous les emplacements de sous-états sont occupés.');}
 // Une contre-clé peut se former dès que le verrou est PRÊT, sans attendre son
// activation : le verrou est contestable pendant son délai de réaction, comme
// une attaque révélée se défend avant sa résolution. Elle ne produit son effet
// qu'une fois le verrou actif, et tombe sans objet s'il n'est jamais établi.
 if(kind==='key')requireRule((t.type==='state'&&t.owner===camp)||(t.type==='lock'&&t.owner!==camp&&['ready','active'].includes(t.status)),'Une clé sert votre état ou lève un verrou adverse prêt ou actif.');
}
function validateVerdict(p){requireRule(p&&typeof p.accepted==='boolean'&&typeof p.reason==='string','Réponse d’arbitrage invalide.');}
function validateMeans(p){requireRule(typeof p.sufficient==='boolean'&&Number.isInteger(p.missing)&&p.missing>=0&&p.missing<=20&&p.sufficient===(p.missing===0),'Nombre de moyens manquants incohérent.');requireRule(Number.isInteger(p.delay)&&p.delay>=0&&p.delay<=12,'Délai invalide.');}
function validateDependencies(s,n,ids){requireRule(Array.isArray(ids)&&new Set(ids).size===ids.length,'Dépendances invalides.');for(const id of ids){requireRule(id!==n.id,'Lien circulaire.');const d=node(s,id);requireRule(!terminal(d),'Contribution dépendante retirée.');const walk=(x,seen=new Set())=>{if(x.id===n.id)return true;if(seen.has(x.id))return false;seen.add(x.id);return dependents(x).some(y=>walk(node(s,y),seen));};requireRule(!walk(d),'Lien circulaire.');}n.dependsOn=[...new Set([...(n.dependsOn||[]),...ids])];}
function validatePlace(s,camp,id,rid){checkTurn(s,camp,true);const n=node(s,id),r=resource(s,rid);requireRule(n.owner===camp&&['key','lock','attack'].includes(n.type),'Cette contribution ne vous appartient pas.');requireRule(['preparing','declared'].includes(n.status)||(n.type!=='attack'&&n.status==='ready'),'La contribution n’attend plus de ressource.');requireRule(!suspended(s,id),'La contribution attend sa justification.');if(n.type==='attack'){requireRule(s.day>=n.revealDay,'Attendez Radio Halliwell demain matin.');requireRule(s.day<n.dueDay,'La date de préparation de l’attaque est passée.');}requireRule(r.owner===camp&&availability(s,r)==='free','Cette ressource n’est pas disponible.');return {n,r};}
function place(s,camp,id,rid,p){const {n,r}=validatePlace(s,camp,id,rid);validateVerdict(p);requireRule(p.accepted,p.reason);validateMeans(p);
 const total=n.pieces.length+1+p.missing;
 if(n.type==='attack'&&n.requiredCount!==undefined&&total!==n.requiredCount)requireRule(n.type!=='attack'&&p.situationChanged===true&&p.changeReason?.trim(),'Le nombre de moyens ne change pas sans changement pertinent de situation.');
 if(p.dependsOn)validateDependencies(s,n,p.dependsOn);
 spend(s,camp);n.pieces.push(rid);r.heldBy=id;n.requiredCount=total;n.missing=p.missing;n.delay=p.delay;
 if(p.situationChanged)s.arbitration.push({day:s.day,text:p.changeReason});
 if(p.sufficient){n.status='ready';n.readyDay=s.day;if(n.type!=='attack'){n.reactionThroughDay=s.day+1;n.dueDay=Math.max(n.dueDay||0,s.day+Math.max(1,p.delay));}}else if(n.type!=='attack'){n.status='preparing';n.dueDay=null;}
}
function defend(s,camp,attackId,rid,text,p){checkTurn(s,camp,true);const n=node(s,attackId),target=resource(s,n.target),r=resource(s,rid);requireRule(n.type==='attack'&&n.owner!==camp&&!terminal(n)&&n.status!=='resolved','Choisissez une attaque adverse en cours.');requireRule(target.owner===camp,'Seul le camp de la cible peut la renforcer.');requireRule(s.day>=n.revealDay&&s.day<n.dueDay,'La défense directe se prépare après la révélation et avant la résolution.');requireRule(r.owner===camp&&availability(s,r)==='free','Cette ressource de défense n’est pas disponible.');requireRule(text?.trim().length>=8,'Expliquez comment cette ressource renforce la cible.');validateVerdict(p);requireRule(p.accepted,p.reason);spend(s,camp);n.defenders??=[];n.defenders.push(rid);r.heldBy=n.id;n.defensePlacements??=[];n.defensePlacements.push({resource:rid,text,day:s.day});return n;}
function withdraw(s,camp,rid){checkTurn(s,camp,true);const r=resource(s,rid);requireRule(r.owner===camp&&r.heldBy,'Choisissez une ressource engagée dans une clé ou un verrou.');const n=node(s,r.heldBy);requireRule(['key','lock'].includes(n.type),'Les ressources d’une attaque ou de sa défense restent engagées jusqu’à la résolution.');spend(s,camp);r.heldBy=null;n.pieces=(n.pieces||[]).filter(id=>id!==rid);n.maintainers=(n.maintainers||[]).filter(id=>id!==rid);if(['acquired'].includes(n.status))return {resource:r,node:n};if(!n.pieces.length){n.status='removed';release(s,n);}else{n.status='preparing';n.missing=Math.max(1,n.requiredCount-n.pieces.length);n.dueDay=null;delete n.readyDay;delete n.reactionThroughDay;}refresh(s);return {resource:r,node:n};}
function propose(s,camp,a,p){validateVerdict(p);requireRule(typeof a.text==='string'&&a.text.trim().length>=8,'Décrivez votre action en une phrase.');if(a.kind!=='resource')checkTurn(s,camp,true);else requireRule(!s.result&&['player','ai'].includes(s.phase),'Aucune création pendant Radio Halliwell ou après la fin.');
 if(!p.accepted){s.arbitration.push({day:s.day,text:p.reason});return null;}
 if(a.kind==='resource'){
  requireRule(p.resource?.title&&p.resource.description,'Ressource invalide.');requireRule(Number.isInteger(p.delay)&&p.delay>=0,'Délai invalide.');const costs=p.costs||[];
  requireRule(new Set(costs).size===costs.length,'Ingrédient dupliqué.');for(const id of costs){const r=resource(s,id);requireRule(r.owner===camp&&availability(s,r)==='free'&&r.category!=='personnage','Ingrédient indisponible ou irremplaçable.');}
  const identity=resourceIdentity(p.resource);
  if(p.resource.category==='personnage'||p.resource.unique)requireRule(!s.resources.some(r=>resourceIdentity(r)===identity||r.title.toLocaleLowerCase('fr')===p.resource.title.toLocaleLowerCase('fr')),'Cette ressource unique existe déjà.');
  for(const id of costs)resource(s,id).consumed=true;
  const r={...p.resource,id:newId(s),owner:camp,availableDay:s.day+p.delay,preparation:p.delay>0,heldBy:null,lost:false,consumed:false};s.resources.push(r);s.arbitration.push({day:s.day,text:p.reason});return r;
 }
 targetCheck(s,camp,a.kind,a.target);requireRule(p.title?.trim()&&p.effect?.trim(),'Résultat précis nécessaire.');
 const locations=p.locations||[];requireRule(Array.isArray(locations)&&new Set(locations).size===locations.length,'Lieux déterminants invalides.');for(const id of locations)requireRule(resource(s,id).category==='lieu','Seules les cartes Lieu peuvent être désignées comme lieux déterminants.');
 if(a.kind==='subgoal'){
  requireRule(!/^(obtenir|trouver|parler|surveiller|protéger|empêcher|voler|identifier|faire|mettre|aller|interroger)\b/i.test(p.title),'Un état est constatable, jamais une action.');spend(s,camp);const n={id:newId(s),owner:camp,type:'state',parent:a.target,title:p.title,description:a.text,effect:p.effect,status:'open'};s.nodes.push(n);s.arbitration.push({day:s.day,text:p.reason});return n;
 }
 validateMeans(p);const n={id:newId(s),owner:camp,type:a.kind,title:p.title,description:a.text,effect:p.effect,target:a.target,scope:a.kind==='attack'?'attack':scopeOf(s,a.target),discovery:true,pieces:[],locations:[...locations],missing:p.missing,status:'preparing',createdDay:s.day,delay:p.delay,dependsOn:[],recovery:{},maintainers:[]};
 if(p.dependsOn)validateDependencies(s,n,p.dependsOn);
 if(a.kind==='attack'){
  requireRule(Number.isInteger(p.requiredCount)&&p.requiredCount>=1&&p.requiredCount<=12,'Nombre de ressources de l’attaque invalide.');
  n.requiredCount=p.requiredCount;n.missing=p.requiredCount;n.revealDay=s.day+1;n.dueDay=s.day+p.requiredCount+Math.max(1,p.delay);requireRule(n.dueDay<=scenario.finalDay,'Il ne reste pas assez de passages pour préparer cette attaque.');n.status='declared';n.title=a.text.slice(0,100);spend(s,camp);s.nodes.push(n);
 }else{requireRule(a.resource,'Une première ressource libre doit être posée.');s.nodes.push(n);place(s,camp,n.id,a.resource,p);}
 s.arbitration.push({day:s.day,text:n.type==='attack'?'Tentative acceptée et engagée. Nombre de pièces et date révélés demain matin.':discoveryFeedback(n)});return n;
}
function discoveryFeedback(n){return 'Proposition enregistrée : '+n.effect+'\nVous pouvez encore renforcer cette contribution. Le verdict final est rendu en fin de journée ; une question non répondue la suspend.';}
function question(s,camp,target,text){checkTurn(s,camp);const n=node(s,target);requireRule(n.owner!==camp&&['key','lock','state'].includes(n.type)&&!terminal(n),'Questionnez un état, un sous-état, une clé ou un verrou adverse.');requireRule(text?.trim().length>=5,'Précisez la question.');requireRule(!s.questions.some(q=>q.target===target),'Cette carte a déjà été questionnée, une seule fois par partie.');s.questions.push({id:newId(s),target,owner:camp,text,day:s.day,answer:null,resolved:false,answerDueDay:s.phase==='ai'?s.day+1:s.day});}
function submitAnswer(s,camp,id,text){checkTurn(s,camp);const q=s.questions.find(q=>q.id===id);requireRule(q&&!q.resolved&&q.answer===null&&node(s,q.target).owner===camp,'Une seule réponse peut être soumise.');requireRule(text?.trim().length>=5,'Précisez la réponse.');q.answer=text;q.submittedDay=s.day;s.arbitration.push({day:s.day,text:'Réponse enregistrée. La carte reste suspendue jusqu’à son examen en fin de journée.'});return q;}
function adjudicateAnswer(s,id,p){const q=s.questions.find(q=>q.id===id);requireRule(q&&!q.resolved&&q.answer!==null,'Aucune réponse à examiner.');validateVerdict(p);const n=node(s,q.target);if(p.accepted)validateMeans(p);q.resolved=true;q.reason=p.reason;q.reviewedDay=s.day;
 if(!p.accepted){if(n.type==='state'){if(n.status==='true'&&n.goalMode==='maintain')n.maintenanceBroken=true;n.status='open';n.supports=[];}else{n.status='removed';release(s,n);}}
 else {n.justification=q.answer;if(n.type!=='state'){if(p.missing>0){n.status='preparing';n.missing=p.missing;n.requiredCount=(n.pieces||[]).length+p.missing;n.dueDay=null;}else if(['preparing','ready'].includes(n.status)){n.status='ready';n.delay=p.delay;n.dueDay=Math.max(n.dueDay||s.day,s.day+p.delay);}}}
 s.arbitration.push({day:s.day,text:p.accepted?(p.missing?'Justification recevable ; la contribution reste à compléter suivant le chemin justifié.':p.reason):'Justification refusée : '+p.reason+(n.type==='state'?' L’état est faux ; son objectif reste sur le plateau.':' La contribution est retirée sans seconde réponse.')});refresh(s);
}
function answer(s,camp,id,text,p){submitAnswer(s,camp,id,text);adjudicateAnswer(s,id,p);}
function endPassage(s,camp){checkTurn(s,camp);for(const q of s.questions.filter(q=>!q.resolved&&node(s,q.target).owner===camp&&q.answerDueDay<=s.day))q.opportunityPassed=true;s.spent[camp]=true;s.phase=camp==='phoebe'?'ai':'morning';}

function usable(s,n,day){return n.pieces.every(id=>{const r=resource(s,id);return !r.lost&&!r.consumed&&r.owner===n.owner&&r.availableDay<=day&&!(r.recoveryUntil>day)&&!blocks(s,id).length;});}
function dependencyFailure(s,n,seen=new Set()){if(seen.has(n.id))return true;seen=new Set([...seen,n.id]);return dependents(n).some(id=>{const d=node(s,id);return terminal(d)||(d.type==='state'&&d.status!=='true')||(d.type==='key'&&d.status!=='acquired')||d.effectUnavailable||blocks(s,id).length||dependencyFailure(s,d,seen);});}

function candidates(s,day){return s.nodes.filter(n=>{
  if(n.type==='state'||terminal(n)||['acquired','active','resolved'].includes(n.status)||n.dueDay===null||n.dueDay===undefined||n.dueDay>day)return false;
  if(n.type==='attack')return !pendingQuestions(s,n.id).some(q=>!q.opportunityPassed&&q.answerDueDay>=day);
  if(n.reactionThroughDay!==undefined&&(day<n.reactionThroughDay||s.phase!=='morning'||s.morningMessages!==undefined))return false;
  return n.status==='ready'&&!suspended(s,n.id)&&!blocks(s,n.id).length;
 }).map(n=>({...clone(n),forcedFailure:n.type==='attack'&&(!n.deadlineReady&&n.deadlineReady!==undefined||n.status!=='ready'||!usable(s,n,day)||suspended(s,n.id)||blocks(s,n.id).length>0||dependencyFailure(s,n))||!usable(s,n,day)||dependencyFailure(s,n)}));}
const morningCandidates=s=>candidates(s,s.day+1);
const immediateCandidates=s=>candidates(s,s.day);
function prepareMorning(s){requireRule(s.phase==='morning','La journée n’est pas terminée.');s.day++;const messages=[];
 for(const e of scenario.calendar.filter(e=>e.morning===s.day&&!s.appliedEvents.includes(e.id))){if(e.grants){for(const camp of campaigns){for(const spec of e.grants){const id=e.id+'-'+camp+'-'+spec.id;if(!s.resources.some(r=>r.id===id))s.resources.push({...clone(spec),id,owner:camp,heldBy:null,availableDay:s.day,lost:false,consumed:false});}messages.push(e.title+' : un exemplaire est ajouté à la main de '+scenario.camps.find(c=>c.id===camp).name+'.');}s.appliedEvents.push(e.id);}}
 for(const n of s.nodes.filter(n=>n.type==='attack'&&!terminal(n)&&n.status!=='resolved')){
  if(n.revealDay===s.day)messages.push(`${n.title} : ${n.requiredCount} pièces nécessaires. Attaque au matin du jour ${n.dueDay}. Résultat visé : ${n.effect}.`);
  if(n.dueDay===s.day)n.deadlineReady=n.status==='ready'&&usable(s,n,s.day);
 }
 s.morningMessages=[...(s.eveningMessages||[]),...messages];delete s.eveningMessages;
}
function applyResolution(s,j,list){requireRule(j&&Array.isArray(j.outcomes)&&Array.isArray(j.states)&&Array.isArray(j.facts),'Résolution invalide.');const ids=new Set(list.map(n=>n.id));requireRule(j.outcomes.length===ids.size&&new Set(j.outcomes.map(o=>o.id)).size===ids.size&&j.outcomes.every(o=>ids.has(o.id)),'Chaque action à échéance doit être résolue une fois.');const messages=[];
 // Validate the complete batch against one snapshot before applying outcomes.
 for(const out of j.outcomes){const n=node(s,out.id),candidate=list.find(x=>x.id===n.id);requireRule(typeof out.success==='boolean'&&out.reason?.trim(),'Verdict incomplet.');requireRule(!candidate.forcedFailure||!out.success,'Une attaque incomplète ou un moyen indisponible ne peut réussir.');if(out.success)requireRule(out.established?.trim(),'Le fait réellement obtenu doit être formulé.');if(n.type==='attack'&&!out.success)requireRule(out.defenderBenefit?.trim(),'Un échec d’attaque exige une conséquence concrète favorable au défenseur.');
  for(const id of out.usedResources||[])requireRule(n.pieces.includes(id)||(n.type==='attack'&&(id===n.target||(n.defenders||[]).includes(id))),'Une ressource utilisée doit être réellement engagée.');
  for(const rid of [...(out.losses||[]),...(out.consume||[]),...(out.recovery||[]).map(r=>r.id)])requireRule(n.pieces.includes(rid)||(n.type==='attack'&&(rid===n.target||(n.defenders||[]).includes(rid))),'Conséquence hors de portée.');
  for(const rid of out.consume||[])requireRule(!['personnage','lieu'].includes(resource(s,rid).category),'Une personne ou un lieu ne peut pas être consommé.');
  for(const rid of out.losses||[])requireRule(resource(s,rid).category!=='lieu','Un lieu ne peut pas être détruit ou perdu comme une ressource.');
  for(const r of out.recovery||[])requireRule(Number.isInteger(r.days)&&r.days>=0&&r.days<=12,'Récupération invalide.');
  // Le maintien vaut pour un verrou comme pour une clé à effet continu.
  for(const rid of out.maintainers||[])requireRule(['lock','key'].includes(n.type)&&n.pieces.includes(rid),'Ressource de maintien hors de portée.');
  for(const tr of out.transfers||[])requireRule(out.success&&n.type==='attack'&&tr.id===n.target&&tr.owner===n.owner&&!['personnage','lieu'].includes(resource(s,tr.id).category),'Transfert hors de portée : seules les ressources transférables peuvent être prises, jamais une personne ni un lieu.');
  for(const tr of out.controlChanges||[]){const r=resource(s,tr.id);requireRule(out.success&&n.type==='key'&&(n.locations||[]).includes(tr.id)&&tr.owner===n.owner&&r.category==='lieu','Changement de contrôle du lieu hors de portée.');requireRule(out.established.toLocaleLowerCase('fr').includes(r.title.toLocaleLowerCase('fr'))&&/contrôl|occup/i.test(out.established),'Le fait acquis doit établir explicitement le contrôle ou l’occupation du lieu.');}
 }
 for(const out of j.outcomes){const n=node(s,out.id);
  for(const id of out.losses||[]){const r=resource(s,id);r.lost=true;r.heldBy=null;}
  for(const id of out.consume||[]){const r=resource(s,id);r.consumed=true;r.heldBy=null;}
  for(const x of out.recovery||[]){if(n.pieces.includes(x.id))n.recovery[x.id]=x.days;else resource(s,x.id).recoveryUntil=s.day+x.days;}
  for(const tr of out.transfers||[]){const r=resource(s,tr.id);r.owner=tr.owner;r.heldBy=null;}
  for(const tr of out.controlChanges||[]){const r=resource(s,tr.id);r.owner=tr.owner;r.heldBy=null;r.controlHistory=[...(r.controlHistory||[]),{day:s.day,owner:tr.owner,proof:n.id}];}
  if(!out.success){n.status='failed';release(s,n);if(n.type==='attack'){n.defenderBenefit=out.defenderBenefit;s.facts.push(out.defenderBenefit);messages.push('Conséquence favorable au défenseur : '+out.defenderBenefit);}}
  else {n.established=out.established;n.acquiredDay=s.day;n.status={key:'acquired',lock:'active',attack:'resolved'}[n.type];if(n.type==='key'&&node(s,n.target).type==='lock'){const lock=node(s,n.target);lock.status='removed';release(s,lock);}if(n.type==='lock')n.maintainers=out.maintainers||[];if(n.type==='attack')release(s,n);if(!s.facts.includes(out.established))s.facts.push(out.established);}
  messages.push(n.title+' — '+(out.success?'réalisé : '+out.established:'échec : '+out.reason));
 }
 for(const f of j.facts){requireRule(typeof f==='string','Fait invalide.');if(!s.facts.includes(f)){s.facts.push(f);messages.push(f);}}
 // Un id qui ne désigne pas un verrou actif ne peut pas tomber : c'est sans
 // effet, jamais une raison de refuser tout l'examen de la journée. Refuser
 // bloquait la partie à la phase du matin, sans issue et sans message utile.
 for(const id of j.fallenLocks||[]){
  const n=s.nodes.find(x=>x.id===id);
  if(!n||n.type!=='lock'||n.status!=='active')continue;
  n.status='removed';release(s,n);
 }
 refresh(s);
 for(const v of [...j.states].sort((a,b)=>Number(!!node(s,b.id).parent)-Number(!!node(s,a.id).parent))){const n=node(s,v.id);if(suspended(s,n.id))continue;requireRule(n.type==='state'&&typeof v.value==='boolean'&&v.reason?.trim(),'Constat invalide.');if(!v.value){if(n.status==='true'&&n.goalMode==='maintain')n.maintenanceBroken=true;n.status='open';n.supports=[];}else{
   requireRule(!blocks(s,n.id).length,'Un verrou actif empêche ce constat.');requireRule(Array.isArray(v.supports),'Preuves nécessaires.');if(n.status!=='true')requireRule(v.supports.length>0,'Un état faux exige des acquis constatés.');
   for(const id of v.supports){const proof=node(s,id);requireRule(proof.owner===n.owner&&((proof.type==='key'&&proof.status==='acquired'&&proof.target===n.id)||(proof.type==='state'&&proof.parent===n.id&&proof.status==='true')||(proof.type==='attack'&&proof.status==='resolved'))&&!suspended(s,id)&&!blocks(s,id).length&&!proof.effectUnavailable&&!dependencyFailure(s,proof),'Cette contribution ne prouve pas cet état.');}n.status='true';n.supports=clone(v.supports);
  }messages.push(n.title+' — '+(v.value?'vrai':'faux')+' : '+v.reason);
 }
 refresh(s);evaluateVictory(s,j.victory||[]);return messages;
}
function evaluateVictory(s,verdicts){const roots=s.nodes.filter(n=>n.type==='state'&&!n.parent);const candidates=roots.filter(n=>n.status==='true'&&!n.maintenanceBroken&&!suspended(s,n.id)&&!blocks(s,n.id).length&&!dependencyFailure(s,n)&&(n.goalMode!=='maintain'||s.day>=scenario.finalDay));const winners=[];
 for(const n of candidates){const v=verdicts.find(v=>v.root===n.id);if(v?.allConditions&&v.secure&&v.reason?.trim())winners.push(n);}
 requireRule(winners.length<=1,'Des objectifs incompatibles ne peuvent gagner ensemble.');if(winners.length)s.result={winner:winners[0].owner,reason:winners[0].title};
 else if(s.day>=scenario.finalDay&&!s.nodes.some(n=>n.type==='attack'&&!terminal(n)&&n.status!=='resolved'&&n.dueDay<=s.day&&pendingQuestions(s,n.id).length))s.result={winner:null,reason:'Échéance atteinte sans objectif complet et assuré.'};
 if(s.result)s.phase='finished';
}
function finishMorning(s,j){const list=immediateCandidates(s);const messages=[...(s.morningMessages||[]),...applyResolution(s,j,list)];delete s.morningMessages;s.radio.push({day:s.day,text:messages.join('\n')||'Aucun effet à échéance. La journée commence.'});s.spent={phoebe:false,commanditaire:false};s.phase=s.result?'finished':'player';}
function morning(s,j){prepareMorning(s);finishMorning(s,j);}
function publicView(s){const v=clone(s);v.camps=scenario.camps;v.finalDay=scenario.finalDay;v.calendar=clone(scenario.calendar).map(e=>({...e,timing:e.morning<s.day?'passé':e.morning===s.day?'aujourd’hui':'à venir'}));delete v.morningMessages;
 for(const n of v.nodes){if(n.type!=='attack'){delete n.requiredCount;delete n.missing;}delete n.recovery;delete n.maintainers;if(n.type==='attack'&&s.day<n.revealDay){for(const k of ['requiredCount','missing','delay','dueDay','effect','dependsOn','deadlineReady'])delete n[k];}n.suspended=suspended(s,n.id);n.blockedBy=blocks(s,n.id).map(x=>x.id);if(n.type==='state')n.value=n.status==='true';}
 for(const r of v.resources){r.availability=availability(s,r);r.frozenBy=[];}
 return v;
}
module.exports={initial,clone,RuleError,requireRule,node,resource,availability,refresh,publicView,checkTurn,spend,propose,place,validatePlace,defend,withdraw,question,answer,submitAnswer,adjudicateAnswer,endPassage,morning,morningCandidates,immediateCandidates,prepareMorning,finishMorning,applyResolution,targetCheck,discoveryFeedback};
