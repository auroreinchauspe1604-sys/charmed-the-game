'use strict';
const fs=require('fs'),path=require('path');
const rules=()=>fs.readFileSync(path.join(__dirname,'../../Charmed/REGLES_ACTEES.md'),'utf8');
const object=properties=>({type:'object',properties,additionalProperties:false});
const string={type:'string'};
function position(board){if(!board)return board;const {arbitration,radio,opponent,...state}=board;return state;}

// Each invocation receives an explicit set of pointers and calls. No prompt
// text or character name determines its access to game data.
function createTools({board,documents={},play}){
 const sources={regles:rules,plateau:()=>position(board()),arbitrage:()=>board()?.arbitration||[],...documents};
 const read=(pointer,fragment='')=>{
  if(!Object.hasOwn(sources,pointer))throw Error('Pointeur inconnu.');
  let value=sources[pointer]();
  for(const key of fragment.split('/').filter(Boolean).map(s=>s.replace(/~1/g,'/').replace(/~0/g,'~'))){
   if(value===null||typeof value!=='object'||!Object.hasOwn(value,key))throw Error('Chemin introuvable.');
   value=value[key];
  }
  return value;
 };
 const tools=[
  {name:'plateau',description:'Lire le plateau actuel.',inputSchema:object({}),run:()=>position(board())},
  {name:'lire',description:'Consulter un pointeur. chemin est un chemin JSON (/characters/0). Les listes sont paginées.',
   inputSchema:{...object({pointeur:string,chemin:string,debut:{type:'integer',minimum:0},limite:{type:'integer',minimum:1,maximum:100}}),required:['pointeur']},
   run:({pointeur,chemin='',debut=0,limite=20})=>{
    const value=read(pointeur,chemin);
    if(Array.isArray(value))return {total:value.length,debut,elements:value.slice(debut,debut+limite)};
    if(value&&typeof value==='object'){
     if(chemin&&JSON.stringify(value).length<=24000)return value;
     return {champs:Object.entries(value).map(([cle,v])=>({cle,type:Array.isArray(v)?'liste':typeof v,...(Array.isArray(v)?{total:v.length}:{})})),chemin};
    }
    return value;
   }},
  {name:'chercher',description:'Chercher du texte dans un pointeur ; renvoie les chemins JSON des valeurs correspondantes.',
   inputSchema:{...object({pointeur:string,texte:string,limite:{type:'integer',minimum:1,maximum:100}}),required:['pointeur','texte']},
   run:({pointeur,texte,limite=20})=>{
    if(!texte?.trim())throw Error('Texte de recherche requis.');
    const found=[],query=texte.toLocaleLowerCase('fr');
    function walk(v,p){if(found.length>=limite)return;if(v&&typeof v==='object'){for(const [k,x] of Object.entries(v))walk(x,p+'/'+k.replace(/~/g,'~0').replace(/\//g,'~1'));}else if(String(v).toLocaleLowerCase('fr').includes(query))found.push({chemin:p,valeur:v});}
    walk(read(pointeur),'');return found;
   }}
 ];
 if(play)tools.push({name:'jouer',description:'Jouer une action et lire son résultat avec le plateau actualisé. type=end termine le passage.',
  inputSchema:{...object({type:{type:'string',enum:['propose','place','question','answer','end']},kind:{type:'string',enum:['key','lock','attack','subgoal','resource']},target:string,resource:string,text:string}),required:['type']},run:play});
 return {pointers:Object.keys(sources),tools};
}
module.exports={createTools,rules,position};
