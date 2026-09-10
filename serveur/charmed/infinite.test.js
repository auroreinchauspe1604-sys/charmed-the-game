process.env.CHARMED_SCENARIO='infinite';
const test=require('node:test'),assert=require('node:assert/strict');
const E=require('./engine'),scenario=require('./scenario'),{Store}=require('./store'),{documents,campDocuments}=require('./agent-context');
const resolution={outcomes:[],states:[],facts:[],fallenLocks:[],victory:[],canon:{status:'ordinary',facts:[],reason:''}};
const enemyOf=s=>s.resources.find(r=>r.id===s.infinite.wave.id);
function morning(s){s.phase='morning';E.prepareMorning(s);E.finishMorning(s,resolution);}
const means={accepted:true,reason:'ok',sufficient:true,missing:0,delay:0,situationChanged:false,changeReason:'',dependsOn:[]};

test('départ au début : saison 1, trois sœurs, première menace documentée, sans échéance',()=>{
 const s=E.initial(),v=E.publicView(s);
 assert.equal(s.infinite.index,0);assert.equal(s.infinite.wave.season,1);assert.equal(scenario.infinite.waves[0].id,'javna');
 assert.deepEqual(s.resources.filter(r=>r.owner==='phoebe'&&r.category==='personnage').map(r=>r.id),['prue','piper','phoebe']);
 assert.equal(enemyOf(s).owner,'commanditaire');assert.equal(v.finalDay,null);assert.equal(v.camps[1].name,'Javna');assert.equal(v.infinite.knowledge,undefined);
 assert.equal(s.nodes[0].goalMode,'maintain');assert.equal(s.nodes[1].id,'root-commanditaire-1');
 assert.match(new Store('test').file,/infinite\.v3\.jsonl$/);
 assert.deepEqual(E.period(s),{season:1,episode:2,moment:'after'});
 const waves=scenario.infinite.waves;for(let i=1;i<waves.length;i++)assert(waves[i-1].season<waves[i].season||waves[i-1].season===waves[i].season&&waves[i-1].episode<=waves[i].episode);
 assert(waves.length>=30);assert.equal(new Set(waves.map(w=>w.id)).size,waves.length);
});
test('tant qu’un ennemi vit, aucune vague nouvelle ; tous perdus, la suivante apparaît au matin',()=>{
 const s=E.initial();morning(s);assert.equal(s.infinite.index,0);assert.equal(s.day,2);
 enemyOf(s).lost=true;
 s.phase='ai';const lock=E.propose(s,'commanditaire',{kind:'lock',target:'root-phoebe',resource:'javna-repaire',text:'Une obstruction précise contre les sœurs.'},{...means,title:'Obstruction',effect:'Les sœurs sont gênées.'});
 morning(s);
 assert.equal(s.infinite.index,1);assert.equal(s.infinite.wave.id,'barbas');assert.deepEqual(s.infinite.cleared,['javna']);
 assert.equal(E.node(s,'root-commanditaire-1').status,'failed');assert.equal(E.node(s,'root-commanditaire-2').status,'open');assert.equal(E.node(s,lock.id).status,'removed');
 assert(s.resources.find(r=>r.id==='javna-repaire').retired);assert.equal(E.availability(s,enemyOf(s)),'free');assert.equal(E.publicView(s).camps[1].name,'Barbas');
 assert.match(s.radio.at(-1).text,/Vague 1 vaincue[\s\S]*Nouvelle menace : Barbas/);assert.equal(s.result,null);assert.equal(s.phase,'player');
 assert.deepEqual(E.period(s),{season:1,episode:13,moment:'after'});
 assert(campDocuments('commanditaire',s).connaissances().some(k=>k.startsWith('Je suis Barbas')));
 assert.equal(documents(s).scenario().period.episode,13);assert.equal(documents(s).scenario().infinite.vague.id,'barbas');
});
test('transitions : Leo en saison 2, Paige remplace Prue en saison 4 ; bestiaire épuisé = victoire',()=>{
 const s=E.initial();const waves=scenario.infinite.waves;
 const clear=()=>{enemyOf(s).lost=true;morning(s);};
 while(s.infinite.season<2)clear();
 assert(s.resources.some(r=>r.id==='leo'&&r.owner==='phoebe'));assert(!s.resources.some(r=>r.id==='paige'));assert(!E.resource(s,'prue').lost);
 while(s.infinite.season<4)clear();
 assert(E.resource(s,'prue').lost);assert(s.resources.some(r=>r.id==='paige'&&r.owner==='phoebe'));assert.equal(s.resources.filter(r=>r.id==='leo').length,1);
 while(s.infinite.index<waves.length-1)clear();
 assert.equal(s.result,null);clear();
 assert.equal(s.result.winner,'phoebe');assert.equal(s.phase,'finished');assert.equal(s.infinite.cleared.length,waves.length);
 assert.equal(new Set(s.resources.map(r=>r.id)).size,s.resources.length);
});
