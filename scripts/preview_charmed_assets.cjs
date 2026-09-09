// Read-only design proposal: snapshot the current board, remove game scripts.
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'Charmed/visuels/proposition-manoir');
const uri=name=>'data:image/png;base64,'+fs.readFileSync(path.join(root,'Charmed/visuels/Assets',name)).toString('base64');
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1536,height:960}});
 await page.goto('http://localhost:3129/');
 await page.waitForSelector('#board .root-card');
 const snapshot=await page.evaluate(()=>({html:document.documentElement.outerHTML,scroll:[...document.querySelectorAll('.camp-play')].map(e=>e.scrollTop)}));
 let html=snapshot.html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link\b[^>]*rel="stylesheet"[^>]*>/gi,'');
 const css=fs.readFileSync(path.join(root,'ecrans/modules/charmed.css'),'utf8');
 const skin=`
 body{background:linear-gradient(#140e14bb,#14110ecc),url('${uri('grenier.png')}') center/cover fixed;color:#2c211d}
 .masthead{background:linear-gradient(90deg,#120d14e8,#302017d9,#120d14e8);border:0;border-bottom:1px solid #a78a57;box-shadow:0 4px 20px #0005}
 .brand{display:flex;align-items:center;gap:20px;font-size:0;letter-spacing:0;color:#edddb7}.brand img{width:116px;height:42px;object-fit:contain;filter:invert(1);opacity:.94}.brand span{font-size:13px;font-style:italic;margin:0;color:#edddb7}
 .clock,.masthead a{color:#edddb7}.layout{background:transparent}
 #board .territory{border:1px solid #a28862;border-radius:5px;box-shadow:0 4px 15px #0005;background:#eddfbf}
 #board .camp-play{background:radial-gradient(ellipse at 30% 35%,#fff7e6b0,transparent 75%),linear-gradient(100deg,#dcc59f,#f0e4c9 7%,#ecdbb9 95%,#d0b48e);box-shadow:inset 0 0 35px #78523020}
 #board .enemy .banner{background:linear-gradient(90deg,#291c29,#483239);color:#f4e6c9;border-bottom:1px solid #98784c}#board .enemy .banner h2,#board .enemy .banner small,#board .enemy .banner .dispatch-excerpt{color:#f4e6c9}
 #board .player .banner{background:linear-gradient(90deg,#1c392d,#334b35);color:#f4e6c9;border-top:1px solid #9c8354}#board .player .banner h2,#board .player .turn-label{color:#f4e6c9}
 #board .hand{background:linear-gradient(90deg,#d5bf99,#ead9b7,#d8c49f);border-color:#b5986b}
 .radio-section{background:linear-gradient(#102d25e8,#14261ef5),url('${uri('Manoir.png')}') center/cover;border:1px solid #9b8254;border-radius:5px;box-shadow:inset 0 0 0 4px #ffffff06,0 4px 15px #0005}.radio-section:before{content:'LE BULLETIN DU MATIN';color:#d8b96f}.radio-section h2{color:#ead4a0}
 .calendar-section,.judgement>section{background:radial-gradient(ellipse at top,#fff6de80,transparent),linear-gradient(110deg,#d9bf96,#f0e2c1 18%,#e7d1aa);border:1px solid #ab8b5a;border-radius:5px;box-shadow:inset 0 0 0 4px #fff5d325,0 4px 15px #0005}
 .calendar-section h2,.judgement h2{color:#443321;letter-spacing:.6px}.calendar-section{border-top:4px solid #967148}.judgement>section:last-child{border-top:4px solid #6f4432}
 .judgement>section:last-child:after{content:'';display:block;height:140px;margin-top:25px;background:linear-gradient(0deg,#ead5b04d,#ead5b000),url('${uri('Livre des ombre.png')}') center/cover;border:1px solid #b49868;box-shadow:0 2px 8px #49301c33;opacity:.8}
 .turn-panel .playbar>button,button.read-message,.rules{background:#2a4333;color:#fff0ce;border-color:#998050}.turn-panel #turn-copy strong{color:#24432f}
 #board .card .face{box-shadow:inset 0 0 0 2px #ffffff0d,inset 0 0 18px #0003}.attack-zone{background:#6d2b1910;border-color:#a47a59}.attack-zone h3{color:#743d2c}
 #notice{display:none}.masthead a{pointer-events:none}
 `;
 html=html.replace('</head>',`<style>${css}\n${skin}</style></head>`);
 html=html.replace('CHARMED<span id="game-title">',`<img src="${uri('Logo.png')}" alt="Charmed"><span id="game-title">`);
 html=html.replace('</body>',`<script>
 document.querySelectorAll('button,a,summary').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();document.querySelector('#preview-note').showModal()}));
 const scrolls=${JSON.stringify(snapshot.scroll)};document.querySelectorAll('.camp-play').forEach((e,i)=>e.scrollTop=scrolls[i]||0);
 </script><dialog id="preview-note"><h2>Aperçu du décor</h2><p>Cette proposition reprend le plateau au jour 6. Les actions de jeu sont désactivées et la sauvegarde reste intacte.</p><form method="dialog"><button>Fermer</button></form></dialog></body>`);
 fs.writeFileSync(path.join(out,'apercu.html'),html);
 await page.goto('file:///'+path.join(out,'apercu.html').replaceAll('\\','/'));
 await page.screenshot({path:path.join(out,'apercu-1536.png')});
 let checks=[];
 for(const [width,height] of [[1536,960],[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});
  checks.push(await page.evaluate(()=>({width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollHeight>innerHeight,camps:[...document.querySelectorAll('.territory')].map(e=>{let r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,visible:r.top>=0&&r.bottom<=innerHeight}}),cards:[...document.querySelectorAll('#board .root-card')].map(e=>({w:e.offsetWidth,h:e.offsetHeight}))})));
 }
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify(checks));await browser.close();
})();
