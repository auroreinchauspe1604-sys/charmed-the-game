'use strict';
const E=require('./engine'),scenario=require('./scenario');
function modelView(s){return E.publicView(s);}
function opponentView(s){const v=modelView(s);for(const n of v.nodes){delete n.justification;delete n.placements;if(n.owner!=='commanditaire')n.description=n.effect||n.title;}for(const q of v.questions){if(E.node(s,q.target).owner!=='commanditaire'){delete q.answer;delete q.reason;}}return v;}
function documents(spec=scenario){return {
 scenario:()=>({id:spec.id,title:spec.title,period:spec.canonPeriod,goals:spec.goals,calendar:spec.calendar}),
 faits:()=>spec.privateFacts||{},
 canon:()=>require('./canon').context(spec.canonPeriod),
 bibliotheque:()=>require('./bibliotheque').read(),
 personnages:()=>require('../../Charmed/canon/personnages.json'),
 magie:()=>require('../../Charmed/canon/magie-demons.json'),
 construction:()=>require('../../Charmed/canon/construction.json')
};}
function campDocuments(camp){return {connaissances:()=>scenario.campKnowledge?.[camp]||[]};}
module.exports={modelView,opponentView,documents,campDocuments};
