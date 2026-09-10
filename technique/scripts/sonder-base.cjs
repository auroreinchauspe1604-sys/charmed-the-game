'use strict';
const b=require('../../scenarios/manoir-assiege-souple/scenario');
console.log('clés : '+Object.keys(b).join(', '));
console.log('\ncamps : '+JSON.stringify(b.camps));
console.log('canonPeriod : '+JSON.stringify(b.canonPeriod));
console.log('finalDay : '+b.finalDay+' | opponentRole : '+b.opponentRole);
console.log('subgoalSlots : '+JSON.stringify(b.subgoalSlots));
console.log('privateFacts clés : '+Object.keys(b.privateFacts||{}).join(', '));
console.log('\ndoctrine :\n'+String(b.doctrine).slice(0,1600));
