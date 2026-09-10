const fs=require('fs'),path=require('path'),{chromium}=require('playwright');
const dir=path.resolve(__dirname,'../../visuels/atelier/proposition-manoir');
const asset=n=>'data:image/png;base64,'+fs.readFileSync(path.resolve(dir,'../Assets',n)).toString('base64');
const base=fs.readFileSync(path.join(dir,'apercu.html'),'utf8');
const common=`
 .brand img{width:95px;height:46px;object-fit:contain;transform:scale(1.25)}
 .turn-panel .playbar{gap:6px;margin-top:8px}.turn-panel .playbar #hint{font-size:10px;margin-top:5px}.turn-panel .playbar>button{padding:6px 4px}
 .radio-section{display:flex;flex-direction:column;padding:12px!important}.radio-section:before{display:none!important}.radio-section h2{font-size:18px;line-height:1.15;margin:0 0 9px;padding:0 0 9px;text-align:center}.radio-section #radio{min-height:0}.radio-section .dispatch-excerpt{font-size:13px!important;line-height:1.4!important;-webkit-line-clamp:4!important}.radio-section .dispatch time{font-size:10px;margin:5px 0}.radio-section .panel-navigation{margin-top:9px!important}
 .source-image{height:95px;width:100%;object-fit:cover;flex-shrink:0;border:1px solid #9c805c;margin-bottom:8px;box-shadow:0 3px 8px #26170c40}.source-caption{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;text-align:center;margin:0 0 8px}
 .judgement>section:last-child:after{display:none}.judgement>section:last-child{background:linear-gradient(#f4e6cafa,#e5d1aafa)!important}
 #board .player .banner{background:#234333!important}#board .enemy .banner{background:#36232c!important}
 .radio-section .read-message{font-size:11px;padding:5px 8px}.radio-section .dispatch{margin-bottom:5px}
 @media(max-height:800px){.source-image{height:54px}.source-caption{display:none}.radio-section{padding:8px!important}.radio-section h2{font-size:16px;margin-bottom:6px;padding-bottom:6px}.radio-section .dispatch-excerpt{-webkit-line-clamp:3!important;font-size:11px!important}.radio-section .panel-navigation{margin-top:5px!important}}
 `;
const variants=[
 {id:'01-livre-des-ombres',title:'Le Livre des Ombres',image:'Livre des ombre.png',caption:'Les pages du matin',css:`
 body{background:linear-gradient(#21140e66,#100c0988),url('${asset('grenier.png')}') center/cover fixed!important}
 .masthead{background:linear-gradient(90deg,#201310ed,#442d1bd9,#170e0ded)!important}
 .radio-section{color:#372416!important;background:linear-gradient(90deg,#ac835bcc,#ead2a5ee 9%,#f3e2bdf5 93%,#a78257dd)!important;border:2px solid #6b5733!important;box-shadow:inset 5px 0 6px #50352244,0 5px 15px #0005!important}
 .radio-section h2,.radio-section time,.radio-section .dispatch,.radio-section .dispatch-excerpt,.radio-section .panel-navigation,.radio-section p{color:#372416!important;text-shadow:none!important}.radio-section h2{font-variant:small-caps;border-bottom:1px solid #99784c}
 .radio-section button{background:#485138;color:#fff1d2}.radio-section .source-image{object-position:center 45%}
 #board .camp-play{background:linear-gradient(90deg,#f2e4c6 0%,#f2e4c6f5 45%,#f2e4c6df 75%,#f2e4c6ad),url('${asset('Grenier 2.png')}') right center/cover!important}
 #board .territory{border:2px solid #796344!important;box-shadow:inset 0 0 0 2px #ddc999,0 4px 15px #0007!important}
 .calendar-section{background:linear-gradient(#e7d7b8f5,#d9c5a0f5)!important;border-top-color:#58462e!important}.judgement .turn-panel{background:linear-gradient(#304736ee,#1e342cee),url('${asset('Manoir.png')}') center/cover!important;color:#f3e3bf!important}.turn-panel h2,.turn-panel #turn-copy strong,.turn-panel #budget,.turn-panel #hint{color:#f3e3bf!important}
 `},
 {id:'02-les-fondateurs',title:'Les Fondateurs',image:'Veranda.png',caption:'Le message du matin',css:`
 body{background:linear-gradient(#162536aa,#15303dbb),url('${asset('Veranda.png')}') center/cover fixed!important}
 .masthead{background:linear-gradient(90deg,#162833ef,#45616bd9,#172b37ef)!important;border-bottom-color:#b5c8c8}
 .radio-section{background:radial-gradient(ellipse at 50% 0%,#fcf6db,#dae9e8 43%,#9abac2)!important;color:#203e4d!important;border:1px solid #e8efdd!important;box-shadow:inset 0 0 30px #ffffff99,0 0 18px #bddfe52b!important}
 .radio-section h2,.radio-section time,.radio-section .dispatch,.radio-section .dispatch-excerpt,.radio-section .panel-navigation,.radio-section p{color:#203e4d!important;text-shadow:none!important}.radio-section h2{border-bottom:1px solid #8da8af}.radio-section button{background:#36586a;color:#f5efda;border-color:#92a6ab}.radio-section .source-image{opacity:.78;border-color:#c1d3d1}
 #board .camp-play{background:linear-gradient(90deg,#f1eddf 0%,#f1eddfef 50%,#f1eddfd9 78%,#f1eddfbd),url('${asset('Veranda.png')}') right center/cover!important}
 #board .territory{border:1px solid #c7c7b6!important;box-shadow:0 4px 15px #05121c66!important}#board .hand{background:linear-gradient(90deg,#d7ddd2,#edf0e1,#c4d1cc)!important}.calendar-section,.judgement>section:last-child{background:linear-gradient(#eeeddf,#d9e0d6)!important;border-color:#adbeb9!important}.judgement .turn-panel{background:linear-gradient(#254957,#19333f)!important;color:#f5edcd!important;border-color:#97b6bf}.turn-panel h2,.turn-panel #turn-copy strong,.turn-panel #budget,.turn-panel #hint{color:#f5edcd!important}
 `}
];
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});const p=await b.newPage();const report=[];
 for(const v of variants){
  let html=base.replace('📻 Radio Halliwell',v.title).replace('Lire le bulletin','Lire le message');
  html=html.replace(/(<section class="radio-section"><h2>[\s\S]*?<\/h2>)/,`$1<img class="source-image" src="${asset(v.image)}" alt="${v.image==='Veranda.png'?'Véranda du manoir — décor fourni, pas une représentation des Fondateurs':'Le Livre des Ombres'}"><p class="source-caption">${v.caption}</p>`);
  if(v.id==='02-les-fondateurs') html=html.replace(/<img class="source-image"[^>]*>/,'<div class="source-image" aria-hidden="true" style="background:radial-gradient(ellipse at center,#fffef4 0%,#e6f4ee 15%,#a1c9cf 45%,#517484 100%);box-shadow:inset 0 0 22px #f6fcf2;border-color:#cadbd6"></div>');
  html=html.replace('</head>',`<style>${common}${v.css}</style></head>`);
  fs.writeFileSync(path.join(dir,v.id+'.html'),html);
  await p.setViewportSize({width:1536,height:960});await p.goto('file:///'+path.join(dir,v.id+'.html').replaceAll('\\','/'));await p.screenshot({path:path.join(dir,v.id+'.png')});
  for(const [width,height]of [[1536,960],[1366,768],[1920,1080]]){await p.setViewportSize({width,height});report.push({design:v.id,...await p.evaluate(()=>({viewport:[innerWidth,innerHeight],pageOverflow:document.documentElement.scrollHeight>innerHeight,panels:[...document.querySelectorAll('.radio-section,.calendar-section,.judgement>section')].map(e=>({name:e.querySelector('h2')?.textContent,overflow:e.scrollHeight>e.clientHeight+1})),camps:[...document.querySelectorAll('.territory')].map(e=>e.getBoundingClientRect().bottom<=innerHeight)}))});}
 }
 fs.writeFileSync(path.join(dir,'verification-deux-designs.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await b.close();
})();
