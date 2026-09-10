"use strict";
// Private feasibility witnesses size the board; their names never become required moves.
function evaluate(preparation,resources,lastMorning=12){
 const capacities={};
 for(const camp of ['phoebe','commanditaire']){
  const routes=preparation.routes.filter(r=>r.camp===camp);
  if(routes.length<2)throw new Error('Deux chemins de conception sont nécessaires par camp.');
  for(const route of routes){
   if(!route.sufficiency||!route.branches.length)throw new Error('Chemin sans justification causale.');
   let day=1;
   for(const branch of route.branches){
    if(!branch.condition||!branch.contribution||!branch.resources.length||new Set(branch.resources).size!==branch.resources.length)throw new Error('Sous-objectif témoin incomplet.');
    for(const id of branch.resources)if(!resources.some(r=>r.id===id&&r.owner===camp))throw new Error('Ressource témoin inconnue : '+id);
    // One creation move, N poses on later days, resolution next morning.
    day+=branch.resources.length+1+(branch.attack?1:0);
   }
   if(day>lastMorning)throw new Error('Le chemin ne tient pas dans le calendrier : '+route.title);
   route.completionMorning=day;
  }
  capacities[camp]=Math.max(...routes.map(r=>r.branches.length));
 }
 return capacities;
}
module.exports={evaluate};
