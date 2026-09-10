'use strict';
const crypto=require('crypto'),fs=require('fs'),os=require('os'),path=require('path');
function sessionId(seed){
 const bytes=crypto.createHash('sha256').update('charmed:'+seed).digest().subarray(0,16);
 bytes[6]=(bytes[6]&15)|0x50;bytes[8]=(bytes[8]&63)|0x80;
 const h=bytes.toString('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}
const digest=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
function prepare(prompt,previous={}){
 const message=JSON.parse(prompt),cursors={};message.fil={};
 for(const key of ['arbitration','radio','opponent']){
  const entries=message.plateau?.[key]||[],cursor=previous.cursors?.[key];
  const count=cursor&&cursor.count<=entries.length&&digest(entries.slice(0,cursor.count))===cursor.hash?cursor.count:0;
  message.fil[key]=entries.slice(count);cursors[key]={count:entries.length,hash:digest(entries)};
  if(message.plateau)delete message.plateau[key];
 }
 return {prompt:JSON.stringify(message),cursors};
}
function location(seed){const id=sessionId(seed);const dir=path.join(os.homedir(),'.charmed','sessions',id);return {id,dir,file:path.join(dir,'session.json')};}
function read(file){try{return JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){if(e.code==='ENOENT')return {};throw e;}}
module.exports={sessionId,prepare,location,read};
