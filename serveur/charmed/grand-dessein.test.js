process.env.CHARMED_SCENARIO='grand-dessein';
const test=require('node:test'),assert=require('node:assert/strict');
const E=require('./engine'),scenario=require('./scenario'),{documents,campDocuments}=require('./agent-context');
const resolution={outcomes:[],states:[],facts:[],fallenLocks:[],victory:[],canon:{status:'ordinary',facts:[],reason:''}};
const enemies=s=>s.resources.filter(r=>r.owner==='commanditaire'&&r.category==='personnage'&&!r.lost&&!r.consumed);
function morning(s){s.phase='morning';E.prepareMorning(s);E.finishMorning(s,resolution);}
const clear=s=>{for(const r of enemies(s))r.lost=true;morning(s);};
const has=(s,id)=>s.resources.some(r=>r.id===id&&r.owner==='phoebe'&&!r.lost);

test('palier 1 : routine, maison pleine, Drazi, sans échéance',()=>{
 const s=E.initial(),v=E.publicView(s);
 assert.equal(s.infinite.index,0);assert.equal(s.infinite.wave.id,'drazi');assert.equal(v.finalDay,null);assert.equal(v.camps[1].name,'Drazi');
 for(const id of ['piper','phoebe','paige','leo','livre','sous-sol','ecole','kessler'])assert(has(s,id),id);
 assert(!has(s,'darryl'));assert.equal(s.nodes[0].goalMode,'maintain');assert.equal(s.nodes[1].id,'root-commanditaire-1');
 assert.deepEqual(E.period(s),{season:7,episode:16,moment:'after'});
 assert.equal(scenario.infinite.waves.length,6);assert.equal(new Set(scenario.infinite.waves.map(w=>w.id)).size,6);
 for(let i=1;i<6;i++)assert.equal(scenario.infinite.waves[i].season,i+1);
});
test('les six paliers se lèvent dans l’ordre et retirent une pièce chacun',()=>{
 const s=E.initial();morning(s);assert.equal(s.infinite.index,0);
 clear(s);assert.equal(s.infinite.wave.id,'woogyman');assert(has(s,'page-grise'));assert.match(scenario.privateFacts.documents['Page au sceau gris'],/VI. Le Vide/);assert(s.facts.some(f=>/Nexus.*tonalité/.test(f)));assert.match(s.radio.at(-1).text,/Vague 1 vaincue[\s\S]*Woogyman/);
 clear(s);assert.equal(s.infinite.wave.id,'barbas');assert(has(s,'darryl'));assert(s.facts.some(f=>/Nettoyeurs/.test(f)));
 assert(s.resources.some(r=>r.id==='liste-mort'&&r.owner==='commanditaire'));
 assert(campDocuments('commanditaire',s).connaissances().some(k=>k.startsWith('Je suis Barbas')));
 clear(s);assert.equal(s.infinite.wave.id,'zankou');assert(!has(s,'ecole'));assert(E.resource(s,'ecole').lost);
 assert.equal(enemies(s).length,2);
 clear(s);assert.equal(s.infinite.wave.id,'triad');assert(!has(s,'leo'));assert(E.resource(s,'leo').lost);assert.equal(enemies(s).length,2);
 clear(s);assert.equal(s.infinite.wave.id,'source');assert(s.facts.some(f=>/Livre des Ombres ne repousse plus/.test(f)));
 assert.equal(enemies(s).length,1);assert(s.resources.some(r=>r.id==='le-vide'));assert.equal(s.result,null);
 assert.equal(documents(s).scenario().infinite.vaincues.length,5);
 clear(s);assert.equal(s.result.winner,'phoebe');assert.equal(s.infinite.cleared.length,6);
 assert.equal(new Set(s.resources.map(r=>r.id)).size,s.resources.length);
});
