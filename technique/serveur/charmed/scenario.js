'use strict';
const path=require('path');
const {CHEMINS}=require('../contexte');
const catalog={
 'sanctuaire-de-wyatt':path.join(CHEMINS.scenarios,'sanctuaire-de-wyatt','scenario.js'),
 'sentence-des-fondateurs':path.join(CHEMINS.scenarios,'sentence-des-fondateurs','scenario.js'),
 'la-chasse-aux-guides':path.join(CHEMINS.scenarios,'la-chasse-aux-guides','scenario.js'),
 'nexus-sous-tension':path.join(CHEMINS.scenarios,'nexus-sous-tension','scenario.js'),
 'manoir-assiege-souple':path.join(CHEMINS.scenarios,'manoir-assiege-souple','scenario.js'),
 'manoir-assiege':path.join(CHEMINS.scenarios,'manoir-assiege','scenario.js'),
 'avant-la-vision':path.join(CHEMINS.scenarios,'avant-la-vision','scenario.js'),
 'ce-que-rodriguez-cherche':path.join(CHEMINS.scenarios,'ce-que-rodriguez-cherche','scenario.js'),
 'le-credit-de-cole-turner':path.join(CHEMINS.scenarios,'le-credit-de-cole-turner','scenario.js'),
 'ce-que-gideon-prepare':path.join(CHEMINS.scenarios,'ce-que-gideon-prepare','scenario.js'),
 'ce-que-beta-propose':path.join(CHEMINS.scenarios,'ce-que-beta-propose','scenario.js'),
 'ce-que-christy-rapporte':path.join(CHEMINS.scenarios,'ce-que-christy-rapporte','scenario.js'),
 'la-dette-des-halliwell':path.join(CHEMINS.scenarios,'la-dette-des-halliwell','scenario.js'),
 'le-livre-qui-refuse':path.join(CHEMINS.scenarios,'le-livre-qui-refuse','scenario.js'),
 'le-livre-qui-se-defait':path.join(CHEMINS.scenarios,'le-livre-qui-se-defait','scenario.js'),
 'ce-qui-sest-noue':path.join(CHEMINS.scenarios,'ce-qui-sest-noue','scenario.js'),
 'le-proces-de-rebecca-warren':path.join(CHEMINS.scenarios,'le-proces-de-rebecca-warren','scenario.js')
};
const key=process.env.CHARMED_SCENARIO||'avant-la-vision';
if(!catalog[key])throw new Error('Scénario inconnu : '+key);
module.exports=require(catalog[key]);
