'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {Intelligence}=require('../serveur/charmed/intelligence-v3');
const E=require('../serveur/charmed/engine');
const ia=new Intelligence();
(async()=>{
 const cases=[
  ['moyen-ordinaire',()=>ia.plan(E.initial(),'phoebe',{type:'propose',kind:'resource',text:'Nina propose sa lampe torche ordinaire déjà rangée chez elle. Elle peut la prêter maintenant, sans magie, pour éclairer un endroit sombre.'}),r=>assert.equal(r.accepted,true)],
  ['levitation-saison-1',()=>ia.plan(E.initial(),'phoebe',{type:'propose',kind:'key',resource:'phoebe',target:'root-phoebe',text:'Phoebe utilise son pouvoir personnel de lévitation pour porter Élise hors de portée. Elle possède déjà ce pouvoir en saison 1.'}),r=>assert.equal(r.accepted,false)],
  ['resolution-sans-acte',()=>ia.resolve(E.initial(),[],false),r=>{assert.deepEqual(r.outcomes,[]);assert(r.canon);assert(!r.states.some(s=>s.value));}],
  ['resolution-accord-nina',async()=>{
    const s=E.initial();
    const action={kind:'key',target:'root-phoebe',resource:'nina',text:'Nina donne à Phoebe son accord pour accueillir Élise chez elle si Élise souhaite venir. Cette contribution prouve seulement le consentement de Nina, pas le déplacement ou la sécurité d’Élise.'};
    E.propose(s,'phoebe',action,{accepted:true,reason:'Fixture de préparation locale.',title:'Accord de Nina',effect:'Nina accepte d’accueillir Élise si celle-ci souhaite venir.',sufficient:true,missing:0,delay:0,dependsOn:[]});
    const candidates=E.immediateCandidates(s);const result=await ia.resolve(s,candidates,false);
    E.applyResolution(s,result,candidates);return {result,state:s};
   },r=>{assert.equal(r.result.outcomes.length,1);assert.equal(r.result.outcomes[0].success,true);assert.equal(r.state.result,null);}]
 ];
 const results=[];
 for(const [name,run,check] of cases.filter(c=>!process.argv[2]||c[0]===process.argv[2])){
  const start=Date.now();try{const result=await run();check(result);results.push({name,passed:true,durationMs:Date.now()-start,result});}
  catch(e){results.push({name,passed:false,durationMs:Date.now()-start,error:e.message});}
  console.log(name+': '+(results.at(-1).passed?'OK':'ÉCHEC'));
 }
 const output=path.resolve(__dirname,'../Charmed/canon/validation-ia-expertise.json');
 const previous=fs.existsSync(output)?JSON.parse(fs.readFileSync(output,'utf8')).results:[];
 const merged=process.argv[2]?[...previous.filter(p=>!results.some(r=>r.name===p.name)),...results]:results;
 fs.writeFileSync(output,JSON.stringify({date:new Date().toISOString(),scope:'Essais IA sur E.initial() en mémoire, sans Store ni journal de partie.',results:merged},null,2));
 console.log(output);if(results.some(r=>!r.passed))process.exitCode=1;
})();
