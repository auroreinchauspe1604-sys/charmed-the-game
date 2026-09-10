'use strict';
function createContext(E=require('./engine'),scenario=E.scenario){
function modelView(s){return E.publicView(s);}
function opponentView(s){const v=modelView(s);for(const n of v.nodes){delete n.justification;delete n.placements;if(n.owner!=='commanditaire')n.description=n.effect||n.title;}for(const q of v.questions){if(E.node(s,q.target).owner!=='commanditaire'){delete q.answer;delete q.reason;}}return v;}
function documents(s,spec=scenario){const period=()=>s?E.period(s):spec.canonPeriod;return {
 scenario:()=>({id:spec.id,title:spec.title,period:period(),goals:spec.goals,calendar:spec.calendar,...(s?.infinite?{infinite:{vague:s.infinite.wave,vaincues:s.infinite.cleared,total:s.infinite.total}}:{})}),
 faits:()=>spec.privateFacts||{},
 canon:()=>require('./canon').context(period()),
 bibliotheque:()=>require('./bibliotheque').read(),
 personnages:()=>require('../../Charmed/canon/personnages.json'),
 magie:()=>require('../../Charmed/canon/magie-demons.json'),
 construction:()=>require('../../Charmed/canon/construction.json')
};}
function campDocuments(camp,s){return {connaissances:()=>[...(scenario.campKnowledge?.[camp]||[]),...(camp==='commanditaire'&&s?.infinite?.knowledge||[])]};}
return {modelView,opponentView,documents,campDocuments};
}
module.exports={...createContext(),createContext};
