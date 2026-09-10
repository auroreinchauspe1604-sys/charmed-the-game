'use strict';
// Catalogue des scénarios. Chaque scénario est un module autonome ; le serveur peut en servir plusieurs à la fois.
const catalog={'nexus-sous-tension':'../../scenarios/nexus-sous-tension/scenario','la-chasse-aux-guides':'../../scenarios/la-chasse-aux-guides/scenario','manoir-assiege-souple':'./scenario-manoir-souple','manoir-assiege':'./scenario-manoir','avant-la-vision':'./scenario-avant-vision','infinite':'../../scenarios/infinite/scenario','grand-dessein':'../../scenarios/grand-dessein/scenario'};
const ids=Object.keys(catalog);
const defaultId=process.env.CHARMED_SCENARIO||'avant-la-vision';
function load(id){if(!catalog[id])throw new Error('Scénario inconnu : '+id);return require(catalog[id]);}
module.exports={ids,defaultId,load};
