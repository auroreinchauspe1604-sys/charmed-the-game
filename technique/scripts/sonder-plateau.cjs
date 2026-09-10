'use strict';
process.env.CHARMED_SCENARIO='nexus-sous-tension';
const E=require('../serveur/charmed/engine');
const s=E.initial();
console.log('noeuds : '+s.nodes.map(n=>n.id+'['+n.type+':'+n.owner+']').join(', '));
console.log('ressources : '+s.resources.map(r=>r.id+'['+r.owner+']').join(', '));
