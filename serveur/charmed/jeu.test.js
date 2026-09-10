'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),os=require('os'),path=require('path');
const {Jeu}=require('./jeu'),{Store}=require('./store');
const fixture=fn=>async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-jeu-'));try{await fn(new Store(dir));}finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}};
const resolution={outcomes:[],states:[],facts:[],fallenLocks:[],victory:[],canon:{status:'ordinary',facts:[],reason:''}};

test('un seul appel MJ ; opponent explicite ; opérations mécaniques sans autres appels IA',fixture(async store=>{
 const calls=[];
 const jeu=new Jeu(store,async(seed,event,board,docs,tools)=>{
  calls.push(seed);
  if(seed.endsWith(':commanditaire')){assert.equal(board().phase,'ai');assert(!docs.faits);assert.equal(tools.length,0);return {action:{type:'end'},message:''};}
  const run=(name,args={})=>tools.find(t=>t.name===name).run(args);
  assert.equal(event.action.type,'end');run('terminer_passage',{camp:'phoebe'});
  assert.equal(calls.length,1);
  const enemy=await run('opponent',{message:'Joue ton tour.'});assert.equal(enemy.action.type,'end');
  run('terminer_passage',{camp:'commanditaire'});run('resoudre',{resolution});run('preparer_matin');run('finir_matin',{resolution});
  return {message:'Le matin est ouvert.'};
 });
 const s=await jeu.turn(0,'test-turn-0001',{action:{type:'end'}});
 assert.equal(calls.length,2);assert.equal(s.phase,'player');assert.equal(s.day,2);assert.equal(s.revision,1);assert.equal(store.load().day,2);
}));

test('outil invalide isolé ; panne du MJ annule toute la transaction',fixture(async store=>{
 const before=JSON.stringify(store.load());
 const jeu=new Jeu(store,async(seed,event,board,docs,tools)=>{
  const run=(name,args={})=>tools.find(t=>t.name===name).run(args);
  run('terminer_passage',{camp:'phoebe'});
  const snapshot=JSON.stringify(board());assert.throws(()=>run('terminer_passage',{camp:'phoebe'}));assert.equal(JSON.stringify(board()),snapshot);
  throw Error('connexion perdue');
 });
 await assert.rejects(jeu.turn(0,'test-fail-0001',{}),/connexion perdue/);assert.equal(JSON.stringify(store.load()),before);
}));

test('aucune progression implicite quand le MJ publie uniquement un refus',fixture(async store=>{
 const jeu=new Jeu(store,async()=>({message:'Proposition refusée.'}));
 const s=await jeu.turn(0,'test-refus-001',{});assert.equal(s.phase,'player');assert.equal(s.day,1);assert.equal(s.spent.phoebe,false);
}));
