'use strict';
const fs=require('fs'),os=require('os'),path=require('path'),assert=require('node:assert/strict');
const {Store}=require('../serveur/charmed/store'),{Jeu}=require('../serveur/charmed/jeu');
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-live-jeu-'));
console.log('Partie de vérification : '+directory);
const store=new Store(directory),jeu=new Jeu(store);
(async()=>{
 const s=await jeu.turn(0,'live-end-0001',{camp:'phoebe',action:{type:'end'}});
 console.log(JSON.stringify({day:s.day,phase:s.phase,revision:s.revision,fil:s.arbitration.slice(-4),radio:s.radio.at(-1)}));
 assert.equal(s.phase,'player');assert.equal(s.day,2);assert.equal(store.load().revision,1);
})().catch(e=>{console.error(e);process.exitCode=1;});
