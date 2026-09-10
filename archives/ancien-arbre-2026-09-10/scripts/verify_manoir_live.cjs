process.env.CHARMED_SCENARIO='manoir-assiege';
const fs=require('fs'),assert=require('assert/strict');
const E=require('../serveur/charmed/engine'),{Intelligence}=require('../serveur/charmed/intelligence'),{Service}=require('../serveur/charmed/service');
(async()=>{const s=E.initial(),ia=new Intelligence();
const action={kind:'subgoal',target:'root-phoebe',text:'Les accès du sous-sol sont connus des trois sœurs. Cet état doit permettre de coordonner leur défense sans prétendre que les accès sont déjà protégés.'};
const result=await ia.plan(s,'phoebe',action);assert.equal(result.accepted,true);const n=E.propose(s,'phoebe',action,result);assert.equal(n.status,'open');assert.equal(s.spent.phoebe,true);
const copy=E.initial();copy.phase='ai';const service=new Service({transact:async(revision,id,fn)=>{await fn(copy);return copy;}},ia);await service.advance(0,'probe-manoir');assert.equal(copy.phase,'morning');const adversary=copy.opponent;
fs.mkdirSync('Charmed/parties/manoir-assiege',{recursive:true});fs.writeFileSync('Charmed/parties/manoir-assiege/verification-ia.json',JSON.stringify({scope:'Copies en mémoire uniquement, aucun coup joué dans le journal utilisateur.',proposal:result,opponent:adversary},null,2));console.log('IA réelle : sous-état accepté, coût contrôlé, passage adverse joué avec les outils.');
})().catch(e=>{console.error(e);process.exitCode=1});
