"use strict";
const {spawn}=require('child_process');
const fs=require('fs'),path=require('path');
const {serve}=require('./agent-mcp'),sessions=require('./agent-session');

async function call(prompt,schema,{tools=[],timeoutMs=180000,onEvent,seed}={}){
 if(!seed)throw new Error('Seed de partie requise pour la session Claude.');
 const session=sessions.location(seed);fs.mkdirSync(session.dir,{recursive:true});
 const lock=path.join(session.dir,'session.lock');let fd;
 try{fd=fs.openSync(lock,'wx');}catch(e){if(e.code==='EEXIST')throw Error('Cette session Claude est déjà en cours.');throw e;}
 let bridge;
 const configFile=path.join(session.dir,'mcp.json');
 try{
  const previous=sessions.read(session.file),input=sessions.prepare(prompt,previous);
  bridge=await serve(tools);
  fs.writeFileSync(configFile,JSON.stringify({mcpServers:{charmed:{type:'http',url:bridge.url,headers:{Authorization:'Bearer '+bridge.token}}}}));
  const args=['-p',...(previous.started?['--continue']:['--session-id',session.id]),
   '--output-format','stream-json','--verbose','--json-schema',JSON.stringify(schema),
   '--mcp-config',configFile,'--strict-mcp-config','--setting-sources','',
   '--permission-mode','dontAsk','--allowedTools','mcp__charmed__*','Read','Glob','Grep','WebFetch','WebSearch'];
  return await new Promise((resolve,reject)=>{
   const child=spawn(process.env.CHARMED_CLAUDE||'claude',args,{cwd:session.dir,windowsHide:true,shell:false,stdio:['pipe','pipe','pipe']});
   let timedOut=false,events='',result,error,stderr='';
   const timer=setTimeout(()=>{timedOut=true;child.kill();},timeoutMs);
   child.stdout.on('data',chunk=>{events+=chunk;let index;while((index=events.indexOf('\n'))>=0){const line=events.slice(0,index);events=events.slice(index+1);let event;try{event=JSON.parse(line);}catch{continue;}
    try{
     onEvent?.(event);
     if(event.session_id&&event.session_id!==session.id){error=Error('Claude a repris une autre session. Opération non enregistrée.');child.kill();continue;}
     if(event.type==='system'&&event.subtype==='init')fs.writeFileSync(session.file,JSON.stringify({...previous,id:session.id,started:true}));
     if(event.type==='result')result=event;
    }catch(e){error=e;child.kill();}
   }});
   child.stderr.on('data',chunk=>{stderr=(stderr+chunk).slice(-2000);});
   child.on('error',e=>{clearTimeout(timer);reject(new Error(e.code==='ENOENT'?'Client Claude introuvable. Définir CHARMED_CLAUDE.':e.message));});
   child.on('close',code=>{
    clearTimeout(timer);
    if(error)return reject(error);
    if(timedOut)return reject(new Error('Délai Claude dépassé. Opération non enregistrée.'));
    if(code!==0||!result||result.is_error)return reject(new Error('Appel Claude échoué : '+(result?.errors?.join('; ')||result?.result||stderr||'aucun résultat')+' Opération non enregistrée.'));
    try{
     const value=result.structured_output??JSON.parse(result.result);
     fs.writeFileSync(session.file,JSON.stringify({id:session.id,started:true,cursors:input.cursors}));
     resolve(value);
    }catch{reject(new Error('Réponse Claude invalide. Opération non enregistrée.'));}
   });
   child.stdin.on('error',()=>{});child.stdin.end(input.prompt);
  });
 }finally{
  if(bridge)await bridge.close();
  try{fs.unlinkSync(configFile);}catch{}
  fs.closeSync(fd);fs.unlinkSync(lock);
 }
}
module.exports={call};
