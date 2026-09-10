'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),os=require('os'),path=require('path');
const scenarios=require('./scenarios'),{createEngine}=require('./engine'),{Store}=require('./store'),{createContext}=require('./agent-context');

test('plusieurs scénarios dans un même processus : moteurs, journaux et contextes séparés',async()=>{
 assert(scenarios.ids.includes('infinite'));
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-scenarios-'));
 try{
  const a=createEngine(scenarios.load('infinite')),b=createEngine(scenarios.load('manoir-assiege'));
  assert.equal(a.initial().title,'Infinite');assert.equal(b.initial().title,'Le manoir assiégé');
  assert.equal(a.publicView(a.initial()).finalDay,null);assert.equal(b.publicView(b.initial()).finalDay,14);
  const sa=new Store(dir,a),sb=new Store(dir,b);assert.notEqual(sa.file,sb.file);
  await sa.transact(0,'multi-0001-aaaa',()=>{});
  assert.equal(sa.load().revision,1);assert.equal(sb.load().revision,0);assert.equal(sb.load().title,'Le manoir assiégé');
  assert.equal(createContext(a).documents(a.initial()).scenario().id,'infinite');
  assert.equal(createContext(b).documents(b.initial()).scenario().id,'manoir-assiege');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
