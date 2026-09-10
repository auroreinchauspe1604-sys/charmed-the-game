'use strict';
const catalog={'nexus-sous-tension':'../../scenarios/nexus-sous-tension/scenario','la-chasse-aux-guides':'../../scenarios/la-chasse-aux-guides/scenario','manoir-assiege-souple':'./scenario-manoir-souple','manoir-assiege':'./scenario-manoir','avant-la-vision':'./scenario-avant-vision'};
const key=process.env.CHARMED_SCENARIO||'avant-la-vision';
if(!catalog[key])throw new Error('Scénario inconnu : '+key);
module.exports=require(catalog[key]);
