'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {sessionId,prepare}=require('./agent-session');
test('session UUID stable par seed et fil, distincte entre parties et fils',()=>{
 const id=sessionId('partie-1:arbitrage');
 assert.match(id,/^[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/);
 assert.equal(id,sessionId('partie-1:arbitrage'));
 assert.notEqual(id,sessionId('partie-2:arbitrage'));assert.notEqual(id,sessionId('partie-1:commanditaire'));
});
test('reprise : seuls les nouveaux messages sont transmis, aucun historique dupliqué dans le plateau',()=>{
 const board={day:1,arbitration:[{text:'Premier avis'}],radio:[],opponent:[]};
 const first=prepare(JSON.stringify({plateau:board}));
 board.arbitration.push({text:'Nouvel avis'});
 const next=prepare(JSON.stringify({plateau:board}),{cursors:first.cursors}),prompt=JSON.parse(next.prompt);
 assert.deepEqual(prompt.fil.arbitration,[{text:'Nouvel avis'}]);assert.equal(prompt.plateau.arbitration,undefined);
 assert.equal(prepare(JSON.stringify({plateau:board}),{cursors:next.cursors}).cursors.arbitration.count,2);
 assert.deepEqual(JSON.parse(prepare(JSON.stringify({plateau:board}),{cursors:next.cursors}).prompt).fil.arbitration,[]);
 // A rolled-back branch may have the same number of messages with different content.
 board.arbitration=[{text:'Autre avis'}];
 assert.deepEqual(JSON.parse(prepare(JSON.stringify({plateau:board}),{cursors:next.cursors}).prompt).fil.arbitration,board.arbitration);
});
