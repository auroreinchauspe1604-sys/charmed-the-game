'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const R=require('./expertise-runtime'),C=require('./canon'),E=require('./engine');
const scenario=require('./scenario');
const has=(p,id)=>C.context(p).facts.some(f=>f.id===id);
test('les 25 fiches de construction ont des sources et des conditions résolubles',()=>assert.deepEqual(R.validateConstruction(),[]));
test('Piper : combustion avant et après acquisition, sans anticipation en saison large',()=>{
 assert(!has({season:3,episode:19,moment:'after'},'character:piper-combustion'));
 assert(!has({season:3,episode:null},'character:piper-combustion'));
 assert(has({season:3,episode:20,moment:'after'},'character:piper-combustion'));
});
test('Phoebe : la privation reste bloquante et seule la prémonition est rétablie',()=>{
 const p={season:7,episode:6,moment:'after'};
 assert(!has(p,'character:phoebe-visions'));assert(!has(p,'character:phoebe-levitation'));
 assert(has(p,'character:phoebe-vision-return'));
 assert(!has(p,'initial-powers'));
});
test('une référence biographique ne permet plus Prue vivante après la transition',()=>{
 assert(!has({season:4,episode:2,moment:'after'},'character:prue-tk'));
});
