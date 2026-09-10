const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('assert/strict');
(async()=>{
const b=await chromium.launch({channel:'msedge',headless:true}),p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
const output=path.resolve('visuels/atelier/assemblage-selection');const before=await fetch('http://localhost:3129/api/charmed').then(r=>r.json());const checks=[];
for(const [w,h] of [[1536,960],[1366,768],[1920,1080]]){
await p.setViewportSize({width:w,height:h});await p.goto('http://localhost:3129/');await p.waitForSelector('#board .root-card');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(100);
checks.push(await p.evaluate(()=>{const rect=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height,overflow:e.scrollHeight>e.clientHeight+1}};return {viewport:[innerWidth,innerHeight],pageOverflow:document.documentElement.scrollHeight>innerHeight,panels:['.calendar-section','.arbiter-page','#board .player','.radio-section','.turn-panel'].map(s=>({s,...rect(s)})),logo:rect('.charmed-logo'),symbol:rect('.triquetra'),message:rect('#arbitration'),cards:[...document.querySelectorAll('#board .root-card')].map(e=>({w:e.offsetWidth,h:e.offsetHeight,color:getComputedStyle(e.querySelector('.face')).backgroundImage})),oldLinks:[...document.querySelectorAll('a,button')].filter(e=>['Les règles','Anciennes parties'].includes(e.textContent)).length}}));
await p.screenshot({path:path.join(output,`jeu-B-${w}.png`)});
}
await p.setViewportSize({width:1536,height:960});await p.locator('#radio .read-message').click();assert(await p.locator('#detail').evaluate(e=>e.open));await p.locator('#close-detail').click();await p.locator('.question-badge').first().click();assert(await p.locator('#detail').evaluate(e=>e.open));await p.locator('#close-detail').click();await p.locator('#board .player .hand .card').first().click();assert(await p.locator('#detail').evaluate(e=>e.open));await p.locator('#close-detail').click();
const after=await fetch('http://localhost:3129/api/charmed').then(r=>r.json());assert.equal(before.revision,after.revision);assert.equal(before.day,after.day);
const result={checks,errors,revision:after.revision,day:after.day,readOnlyInteractions:true};fs.writeFileSync(path.join(output,'verification-interface-B.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await b.close();
})();
