'use strict';
const http=require('http'),crypto=require('crypto');

// Stateless Streamable HTTP MCP endpoint, private to one game invocation.
async function serve(tools){
 const token=crypto.randomBytes(32).toString('hex');let queue=Promise.resolve(),closed=false;
 const server=http.createServer(async(req,res)=>{
  const send=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(value===undefined?'':JSON.stringify(value));};
  if(req.headers.authorization!=='Bearer '+token)return send(401,{error:'Accès refusé.'});
  if(req.method!=='POST')return send(405);
  let message;
  try{let body='';for await(const chunk of req){body+=chunk;if(body.length>1024*1024)throw Error('Requête trop volumineuse.');}message=JSON.parse(body);}catch{return send(400,{error:'Requête illisible.'});}
  if(!message||typeof message!=='object'||Array.isArray(message)||typeof message.method!=='string'||(message.params!==undefined&&(!message.params||typeof message.params!=='object'||Array.isArray(message.params))))return send(400,{error:'Message MCP invalide.'});
  const {id,method,params={}}=message;
  if(id===undefined)return send(202);
  let result;
  if(method==='initialize')result={protocolVersion:'2024-11-05',capabilities:{tools:{listChanged:false}},serverInfo:{name:'charmed',version:'1.0.0'}};
  else if(method==='ping')result={};
  else if(method==='tools/list')result={tools:tools.map(({run,...tool})=>tool)};
  else if(method==='tools/call'){
   const execute=async()=>{
    try{if(closed)throw Error('Tour terminé.');const tool=tools.find(t=>t.name===params.name);if(!tool)throw Error('Appel inconnu.');const value=await tool.run(params.arguments||{});return {content:[{type:'text',text:JSON.stringify(value??null)}]};}
    catch(e){return {isError:true,content:[{type:'text',text:e.message}]};}
   };
   // Calls are sequential even when the model submits them in parallel.
   result=await (queue=queue.then(execute,execute));
  }else return send(200,{jsonrpc:'2.0',id,error:{code:-32601,message:'Méthode inconnue.'}});
  send(200,{jsonrpc:'2.0',id,result});
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 return {url:`http://127.0.0.1:${server.address().port}/mcp`,token,
  async close(){closed=true;await queue;await new Promise(resolve=>{server.close(resolve);server.closeAllConnections();});}};
}
module.exports={serve};
