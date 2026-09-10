'use strict';
const path=require('path');
const {CHEMINS}=require('../contexte');
const catalog={
 'la-chasse-aux-guides':path.join(CHEMINS.scenarios,'la-chasse-aux-guides','scenario.js'),
 'nexus-sous-tension':path.join(CHEMINS.scenarios,'nexus-sous-tension','scenario.js'),
 'manoir-assiege-souple':path.join(CHEMINS.scenarios,'manoir-assiege-souple','scenario.js'),
 'manoir-assiege':path.join(CHEMINS.scenarios,'manoir-assiege','scenario.js'),
 'avant-la-vision':path.join(CHEMINS.scenarios,'avant-la-vision','scenario.js'),
 'infinite':path.join(CHEMINS.scenarios,'infinite','scenario.js'),
 'grand-dessein':path.join(CHEMINS.scenarios,'grand-dessein','scenario.js')
};
const key=process.env.CHARMED_SCENARIO||'avant-la-vision';
if(!catalog[key])throw new Error('Scénario inconnu : '+key);
module.exports=require(catalog[key]);
