"use strict";
const str={type:'string'},bool={type:'boolean'},integer={type:'integer'},strings={type:'array',items:str};
const obj=properties=>({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
const audit=obj({status:{type:'string',enum:['ordinary','verified','unverified']},facts:strings,reason:str});
const means={accepted:bool,reason:str,sufficient:bool,missing:integer,delay:integer,situationChanged:bool,changeReason:str,dependsOn:strings,canon:audit};
const planSchema=obj({...means,title:str,effect:str,locations:strings,requiredCount:integer,resource:obj({title:str,description:str,category:str,icon:str,canonicalId:str,unique:bool}),costs:strings});
const placementSchema=obj(means),answerSchema=obj(means);
const outcomeSchema=obj({id:str,success:bool,reason:str,established:str,usedResources:strings,losses:strings,consume:strings,recovery:{type:'array',items:obj({id:str,days:integer})},maintainers:strings,transfers:{type:'array',items:obj({id:str,owner:str})},controlChanges:{type:'array',items:obj({id:str,owner:str})},defenderBenefit:str});
const resolutionSchema=obj({outcomes:{type:'array',items:outcomeSchema},states:{type:'array',items:obj({id:str,value:bool,reason:str,supports:strings})},facts:strings,fallenLocks:strings,victory:{type:'array',items:obj({root:str,allConditions:bool,secure:bool,reason:str})}});
resolutionSchema.properties.canon=audit;resolutionSchema.required.push('canon');
const preparationSchema=obj({title:str,mode:{type:'string',enum:['original','episode']},period:str,finalDay:integer,
 goals:{type:'array',items:obj({owner:str,title:str,initialValue:bool})},
 resources:{type:'array',items:obj({id:str,owner:str,title:str,description:str})},
 calendar:{type:'array',items:obj({morning:integer,publicText:str,privateConsequences:str})},
 documents:{type:'array',items:obj({resource:str,content:str,knownBy:strings})},
 campKnowledge:{type:'array',items:obj({camp:str,facts:strings})},
 routes:{type:'array',items:obj({camp:str,title:str,sufficiency:str,branches:{type:'array',items:obj({condition:str,contribution:str,resources:strings,attack:bool})}})},
 canonReferences:strings, inventions:strings, unresolved:strings});

module.exports={planSchema,placementSchema,answerSchema,resolutionSchema,preparationSchema,obj,bool,str};
