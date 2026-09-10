'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..');
const rows=[
 ['org-nettoyeurs','organisations','Les Nettoyeurs','Forget_Me...Not','S06E03',
  'Dans Forget Me...Not, les Nettoyeurs effacent les traces de l’existence de Wyatt après une exposition de la magie.',
  'Identifier l’exposition, les témoins et la période. Leur intervention ne découle pas automatiquement de toute utilisation de magie.',
  'Leur apparition en saison 6 ne fournit pas une explication certaine de leur absence lors de crises antérieures. Ne pas inventer une règle rétroactive.',
  'Une intrigue inédite peut porter sur la conservation d’une preuve ou la réparation d’une exposition, sans permettre au joueur d’effacer gratuitement ses erreurs.'],
 ['org-tribunal','organisations','Le Tribunal','The_Tribunal','S06E19',
  'Le Tribunal réunit des Fondateurs et des démons pour préserver le secret de la magie ; Barbas intervient contre les sœurs dans Crimes and Witch-Demeanors.',
  'Préciser le litige et les preuves accessibles aux intervenants, plutôt que supposer une connaissance complète des faits.',
  'Exclure le nouveau Tribunal, les Old Ones et les événements ultérieurs des comics. Ne pas confondre ce conseil avec l’Ange du destin qui arbitre notre interface.',
  'Préparer une défense, retrouver un témoin ou réfuter une accusation peut fournir plusieurs sous-états utiles.'],
 ['org-confrerie','organisations','Confrérie de l’Épine — Brotherhood of the Thorn','The_Demon_Who_Came_in_from_the_Cold/Plot','S03E19',
  'Cole a appartenu à cette société de démons de haut niveau. Lors de son infiltration, Vornac fait contrôler son récit par Klea.',
  'Distinguer ancien membre, infiltré accepté et membre actuellement digne de confiance aux yeux du groupe.',
  'Le titre français est un intitulé de travail ; le doublage reste à contrôler. L’appartenance passée ne garantit pas l’accès présent.',
  'Une couverture peut être testée par l’adversaire. Une clé d’accès ne valide pas automatiquement un sous-état de confiance durable.'],
 ['org-avatars','organisations','Les Avatars et leur projet','Avatars','S07E13',
  'Les Avatars proposent un monde sans conflit et modifient la manière de penser pour faire accepter Utopia.',
  'Fixer la période, l’adhésion réelle des personnes et ce qu’elles savent du prix de ce projet.',
  'Ne pas assimiler absence de conflit, libre consentement et bien-être démontré. Aucun pouvoir d’Avatar n’est donné à un personnage par sa simple sympathie pour le projet.',
  'Une partie peut opposer stabilité apparente et préservation du libre arbitre, avec des affirmations finales distinctes.'],
 ['phen-magie-dormante','phenomenes','Disparition temporaire de la magie','https://www.imdb.com/title/tt0539444/','S05E15',
  'The Day the Magic Died relie l’interruption de la magie à la prophétie entourant la naissance de l’enfant doublement béni.',
  'Utiliser le contexte de l’épisode ou établir explicitement une autre cause compatible ; examiner les moyens non magiques disponibles.',
  'Ne pas transformer toute naissance, panne électrique ou date du calendrier en arrêt de la magie. Les exceptions éventuelles exigent un contrôle de l’épisode.',
  'Événement pouvant affecter les deux camps ; les plans dépendant de la magie doivent être réévalués, sans supprimer arbitrairement les faits déjà établis.'],
 ['phen-lune-bleue','phenomenes','Lune bleue','Blue_Moon','S07E06',
  'Once in a Blue Moon associe un événement lunaire particulier à une transformation des sœurs en créatures bestiales.',
  'Vérifier la configuration lunaire et les personnages concernés avant de l’utiliser dans le calendrier.',
  'Ne pas appliquer cette transformation à chaque pleine lune ni à toutes les sorcières. Le calcul exact du cycle reste à vérifier dans les dialogues.',
  'Le calendrier peut annoncer le phénomène ; ses effets précis nécessitent un mécanisme préparé, pas une improvisation au moment de résoudre une attaque.'],
 ['phen-halloween','phenomenes','Halloween et pratiques anciennes','All_Halliwell%27s_Eve/Script','S03E04',
  'Dans All Halliwell’s Eve, Eva explique que les démons circulent cette nuit-là et que le masque permet de dissimuler son identité ; les pratiques exigent connaissance et respect.',
  'Distinguer les pratiques montrées dans le contexte ancien de l’épisode des capacités ordinaires des sœurs à une autre période.',
  'Pas de multiplicateur universel de puissance ni d’invisibilité absolue obtenue en portant un masque.',
  'Une fête peut modifier les possibilités de rencontre et de dissimulation ; elle ne rend pas tout projet magique automatiquement faisable.'],
 ['phen-faille-temporelle','phenomenes','Perturbation et passage temporel','Time_Ripple','S05E08',
  'Une perturbation temporelle peut créer un passage permettant de voyager dans le temps, comme dans A Witch in Time.',
  'Définir une cause, un emplacement et une période de destination compatibles avec le phénomène choisi.',
  'La fiche ne valide ni un voyage libre à n’importe quelle époque ni un mécanisme universel de réparation du passé.',
  'Une faille peut être un enjeu de scénario. Elle ne permet pas au joueur d’annuler un coup du plateau sans règle spécifique validée.'],
 ['alter-terra','alterations','Possession : le cas de Terra','Terra','S03E09',
  'Terra utilise successivement des corps humains et possède Piper dans Coyote Piper.',
  'Distinguer corps, conscience qui agit, pouvoirs effectivement accessibles et moyen de possession attesté.',
  'Ce cas ne démontre pas que tous les esprits disposent du même accès aux capacités de leur hôte. Le remède exact doit être vérifié avant d’être proposé.',
  'Le personnage apparent peut rester identique alors que l’auteur de ses actes change. Une rencontre avec son corps ne prouve pas l’accord de sa conscience.'],
 ['alter-furie','alterations','Transformation en Furie','Fury','S04E03',
  'La fumée d’une Furie transforme Piper ; l’épisode relie cette vulnérabilité à une colère refoulée.',
  'Examiner exposition, état émotionnel et contexte propre au personnage.',
  'Une émotion seule ne constitue pas une transformation automatique. Ne pas imposer cette vulnérabilité à n’importe quel personnage sans fondement.',
  'Distinguer neutraliser une menace, libérer une sœur et traiter la cause de la transformation : les moyens et les faits attendus peuvent différer.'],
 ['alter-banshee','alterations','Banshee et douleur émotionnelle','Look_Who%27s_Barking/Script','S03E21',
  'Piper explique que la Banshee recherche les personnes en grande souffrance.',
  'Identifier la souffrance pertinente et le contact avec la créature ; ne pas réduire la scène à une simple baisse de points de vie.',
  'L’extrait vérifie le ciblage par la souffrance, pas toute la procédure de transformation ou de guérison. Ces étapes restent à confirmer.',
  'Un personnage sincère peut être vulnérable sans être maléfique. Le but peut être sa protection plutôt que sa destruction.'],
 ['alter-mariage-sombre','alterations','Corruption par un mariage maléfique','Warlock','S03E13',
  'Dans Bride and Gloom, le mariage imposé à Prue par Dantalian avec Zile entraîne une transformation de Prue et de ses sœurs en warlocks.',
  'Vérifier le rituel, son lien magique et les personnes affectées, plutôt que généraliser aux relations amoureuses.',
  'Aimer un démon ou épouser un humain n’entraîne pas cet effet par défaut. Les propriétés du lien et sa rupture exigent le contexte de cet épisode.',
  'Un verrou peut dépendre d’un lien précis. Le lever nécessite une solution qui traite ce lien, pas seulement un changement de lieu.'],
 ['info-localisation','enquete-communication','Localisation au cristal','Scrying','',
  'La localisation peut s’effectuer à l’aide d’un cristal et d’une carte pour rechercher une personne ou un objet.',
  'Définir la cible, les moyens disponibles et les indices effectivement détenus. Vérifier la variante utilisée avant d’imposer un composant particulier.',
  'Localiser n’est ni observer toutes les activités ni lire les pensées. L’extrait ne garantit pas une réussite contre toute protection.',
  'La clé produite peut établir un emplacement ; atteindre la cible et obtenir sa coopération demeurent d’autres questions.'],
 ['info-vision-faussee','enquete-communication','Vision et manipulation','Premonition','S01E10',
  'Rex provoque une fausse prémonition chez Phoebe pour l’attirer vers une scène destinée à incriminer Prue.',
  'Séparer contenu perçu, interprétation et éventuel mécanisme de manipulation attesté.',
  'Ne pas rendre toutes les visions arbitrairement fausses. Une manipulation exige un auteur et un moyen compatibles, préparés dans le scénario.',
  'Le fait « Phoebe a vu cette scène » peut être vrai sans que l’accusation qu’elle semble suggérer soit prouvée.'],
 ['info-appel-lumiere','enquete-communication','Appel d’un Être de lumière','Whitelighter','',
  'Les Êtres de lumière entretiennent un lien avec leurs protégés et peuvent généralement répondre à leur appel.',
  'Vérifier le lien réel, les capacités actuelles et la disponibilité de l’Être de lumière.',
  '« Généralement » n’est pas une garantie d’arrivée instantanée. Ne pas étendre ce lien à la localisation de n’importe quel ennemi.',
  'L’appel peut ouvrir une communication ou permettre un secours ; il ne donne pas automatiquement au joueur une réponse complète des Fondateurs.'],
 ['info-projection','enquete-communication','Projection astrale : variantes et observation','Astral_Projection','S03E06',
  'L’empathie temporaire de Prue augmente sa projection astrale et lui permet de rester éveillée dans son corps et dans sa forme astrale.',
  'Identifier la variante et les pouvoirs réellement possédés à la date de la partie.',
  'Cette exception ne définit pas sa capacité ordinaire et ne prouve ni invisibilité ni accès universel. Ne pas importer les évolutions des comics.',
  'Une reconnaissance doit préciser ce qui observe, ce qui reste sur place et ce que cette forme peut réellement percevoir ou accomplir.']
];
const runtime=['serveur/charmed/expertise-runtime.js','Charmed/canon/base.json','Charmed/canon/construction.json','Charmed/canon/magie-demons.json','Charmed/canon/personnages.json'];
const hashes=()=>Object.fromEntries(runtime.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));
const avant=hashes();
const old=JSON.parse(fs.readFileSync(path.join(root,'Charmed/recherche/2026-09-08-lieux-objets-magie/fiches.json')));
const episodes=new Set(require(path.join(root,'Charmed/canon/episodes-index.json')).episodes.map(e=>e.id));
const existing=new Set(old.fiches.map(f=>f.id));
const fiches=rows.map(([id,categorie,titre,slug,ep,canon,conditions,limites,application])=>{
 if(existing.has(id))throw Error('Collision '+id);existing.add(id);
 if(ep&&!episodes.has(ep))throw Error('Épisode inconnu '+ep);
 return {id,categorie,titre,canon,episodesReperes:ep?[ep]:[],conditionsPourLeJeu:conditions,limitesEtIncertitudes:limites,applicationProposee:application,
 source:{url:slug.startsWith('https:')?slug:'https://charmed.fandom.com/wiki/'+slug,niveau:slug.endsWith('/Script')?'extrait_indexe_transcription_non_officielle':'extrait_indexe_secondaire',consulteLe:'2026-09-08'},activation:'non_active_recherche'};
});
const data={version:1,universe:'charmed-tv-1998',status:'recherche_separee_non_active',date:'2026-09-08',
 portee:'16 fiches dans quatre catégories supplémentaires. Certaines précisent des notions déjà présentes : elles ne sont pas toutes entièrement nouvelles.',
 preuve:'Les 16 fiches reposent sur des extraits indexés. Les ouvertures de plusieurs pages et transcriptions ont échoué. Aucun épisode visionné, aucune transcription intégrale certifiée. Les repères d’épisodes ne prouvent pas à eux seuls les mécanismes.',
 exclusions:['reboot 2018','comics','romans','fanfiction','théories de fans non attestées'],fiches};
fs.writeFileSync(path.join(__dirname,'fiches.json'),JSON.stringify(data,null,2)+'\n');
const names={organisations:'Organisations et alliances',phenomenes:'Phénomènes et temporalité',alterations:'Transformations et possessions','enquete-communication':'Enquête et communication'};
let md='# Charmed — autres catégories\n\n**Lot séparé, non actif dans la partie en cours.**\n\n'+data.portee+'\n\n'+data.preuve+'\n\nLes applications proposées ci-dessous sont des pistes de construction, pas de nouvelles règles actées. Les événements peuvent inspirer des histoires inédites ; leur mécanique exige une vérification avant activation.\n\n';
for(const [c,name] of Object.entries(names)){
 md+='## '+name+'\n\n';
 for(const f of fiches.filter(f=>f.categorie===c))md+='### '+f.titre+'\n\n**Constat sourcé :** '+f.canon+'\n\n**Conditions à examiner :** '+f.conditionsPourLeJeu+'\n\n**Limites :** '+f.limitesEtIncertitudes+'\n\n**Application proposée :** '+f.applicationProposee+'\n\nRepère : '+(f.episodesReperes.join(', ')||'épisode précis à compléter')+'. [Source — '+f.source.niveau+']('+f.source.url+').\n\n';
}
fs.writeFileSync(path.join(__dirname,'FICHES.md'),md);
const counts=Object.fromEntries(Object.keys(names).map(c=>[c,fiches.filter(f=>f.categorie===c).length]));
if(JSON.stringify(avant)!==JSON.stringify(hashes()))throw Error('Corpus actif modifié durant génération');
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify({counts,total:fiches.length,sourceCoverage:'16 extraits indexés, dont 2 de transcriptions',checks:{idsUniquesEtSansCollision:true,episodesExistants:true,corpusActifInchangePendantGeneration:true},empreintesCorpusActif:avant,scope:'Contrôle structurel et empreintes ; pas validation exhaustive du canon.'},null,2)+'\n');
console.log(JSON.stringify({total:fiches.length,counts,corpusActifInchange:true}));
