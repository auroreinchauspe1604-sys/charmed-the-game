'use strict';
// Génère uniquement les documents de recherche de ce dossier. Aucun import moteur.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const sources = {};
function source(id, url, niveau, repere) { sources[id] = {url, niveau, repere, consulteLe:'2026-09-08'}; }
const wiki = (id, slug, repere) => source(id, 'https://charmed.fandom.com/wiki/'+slug, 'extrait_indexe_secondaire', repere);
const script = (id, ep, repere) => source(id, 'https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode='+ep+'&tv-show=charmed', 'transcription_non_officielle_dialogues', repere);
script('woogy','s01e15','Ouverture : cave ; échange avec Beth Whittlesey sur le site du manoir.');
script('scry','s07e17','Ouverture : rangement du grenier ; Piper explique les cristaux installés pour Leo.');
script('belthazor','s03e08','Préparation au début ; invocation et arrivée de Krell ; explication de son interception.');
script('verite','s01e08','Prue explique la portée et les 24 heures ; dernière conversation avec Andy.');
script('appel','s04e01','Deuil de Prue, impossibilité de la ramener ; présence de Paige aux funérailles. La page regroupe des scènes des deux parties : ne pas en déduire un minutage.');
script('ecole','s06e14','Protection de l’école et danger du Cavalier pour les personnes à l’extérieur.');
wiki('attic','Attic','Grenier et emplacement habituel du Livre.');
wiki('buckland','From_Fear_to_Eternity/Script','Extrait indexé d’une transcription : bureau de Prue chez Buckland.');
sources.buckland.niveau='extrait_indexe_transcription';
wiki('quake','The_Wendigo/Script','Extrait indexé d’une transcription : Piper, restaurant et inspection sanitaire.');
sources.quake.niveau='extrait_indexe_transcription';
wiki('enfers','The_Underworld','Retenir le royaume démoniaque ; écarter Neena et les développements comics.');
wiki('cieux','The_Upper_Regions','Exemples TV : The Honeymoon’s Over et Oh My Goddess ; pas de conversion temporelle universelle.');
wiki('decharge','The_Demonic_Wasteland','Parcours TV de Cole ; exclure Heremus, culte de Belthazor et autres développements comics.');
wiki('livre','Book_of_Shadows','Livre familial convoité et défenses ; ne pas transformer ces défenses en inviolabilité sans exception.');
wiki('grimoire','The_Grimoire','Contrepartie maléfique du Livre ; ne pas fusionner avec tous les grimoires.');
wiki('cage','Crystal_Cage','Cinq cristaux ; indication d’orientation dans Charmed and Dangerous.');
wiki('cristaux-trois','Charmed_Noir/Script','Extrait de transcription : trois cristaux placés autour de Miss Donovan créent un bouclier ; contre-exemple à une obligation universelle de cinq cristaux.');
sources['cristaux-trois'].niveau='extrait_indexe_transcription';
wiki('cristaux-manoir','Prince_Charmed','Cristaux utilisés par Paige et Phoebe pour protéger le manoir ; répartition exacte à compléter.');
wiki('cupidon','Cupid_Ring','Le premier Cupidon utilise sa bague pour reconnaître les liens amoureux.');
wiki('boite','Hollow_Box','Boîte contenant le Hollow et ouverture par la Source.');
wiki('muses','Ring_of_Inspiration','Fonction d’inspiration et détournement dans Muse to My Ears.');
wiki('arbalete','Blinded_by_the_Whitelighter/Script','Eames vole l’arbalète pour tuer un Être de lumière.');
sources.arbalete.niveau='extrait_indexe_transcription';
wiki('transport','The_Torn_Identity','Billie et Christy se transportent auprès de Pator avec une potion.');
wiki('depouillement','Power_Stripping','Exemples TV Cole et Richard uniquement ; écarter les développements de Prue et Neena en comics.');
wiki('woogy-formule','The_Woogyman','Formule retenue par Phoebe puis ajoutée au Livre.');
wiki('nexus-fin','Something_Wicca_This_Way_Goes...%3F/Plot','Destruction du Nexus et de Zankou ; refuge des sœurs à l’école.');
wiki('ecole-reserve','Magic_School','Notes secondaires sur les méthodes d’accès et exceptions à la protection : à confirmer scène par scène.');
const fiches=[];
function fiche(id,categorie,titre,canon,sourcesIds,episodes,conditions,limites,application,verification) {
  fiches.push({id,categorie,titre,canon,sources:sourcesIds,episodesReperes:episodes,conditionsPourLeJeu:conditions,limitesEtIncertitudes:limites,applicationProposee:application,verification,activation:'non_active_recherche'});
}
fiche('lieu-manoir','lieux','Manoir Halliwell',
 'La maison familiale est située sur un site présenté comme un Nexus spirituel dans S01E15.', ['woogy'],['S01E15'],
 'Distinguer accès à la maison, contrôle d’une pièce et accès aux biens qui s’y trouvent.',
 'Posséder la carte du manoir ne prouve ni invulnérabilité ni maîtrise de toute sa magie. Les occupants et protections dépendent de la période.',
 'Un scénario peut être inédit tout en conservant ces espaces et leurs contraintes ; une entrée forcée ne réalise pas à elle seule une conquête complète.', 'dialogues_consultes');
fiche('lieu-grenier','lieux','Grenier du manoir',
 'Le Livre des Ombres est habituellement conservé au grenier. S07E17 évoque son rangement et les accessoires des fioles de potion.', ['attic','scry'],['S07E17'],
 'Il faut pouvoir atteindre la pièce et disposer des personnes et du matériel nécessaires.',
 'La localisation habituelle du Livre ne garantit pas sa présence à cet instant. Aucun stock illimité d’ingrédients n’est établi ici.',
 'Le grenier peut servir de ressource de préparation ; le Livre, les ingrédients et la sorcière restent des moyens distincts.', 'mixte_dialogues_et_extrait');
fiche('lieu-cave','lieux','Cave et accès au Nexus',
 'Dans S01E15, le Woogyman se manifeste depuis la cave. Le Nexus est détruit lors du dénouement de S07E22.', ['woogy','nexus-fin'],['S01E15','S07E22'],
 'Fixer la période et la situation physique de la cave avant de proposer une action sur le Nexus.',
 'L’accès matériel, l’invocation et le contrôle magique sont des questions différentes. Ne pas rétablir le Nexus après S07E22 sans divergence narrative explicitement définie.',
 'Un sous-état « La cave est accessible » peut soutenir une opération suivante ; il ne signifie pas « Le Nexus est maîtrisé ».', 'mixte_dialogues_et_extrait');
fiche('lieu-buckland','lieux','Buckland — maison de ventes',
 'Prue travaille chez Buckland dans la période de From Fear to Eternity ; l’épisode montre son bureau.', ['buckland'],['S01E13'],
 'Identifier le lot, l’archive ou la personne utile et justifier l’accès professionnel ou une autre voie.',
 'Cette fiche n’établit pas que tous les objets vendus sont magiques, ni que Prue y travaille durant toutes les saisons.',
 'Lieu possible d’expertise, de provenance d’un objet ou de rendez-vous ; l’information recherchée doit être précise.', 'extrait_seulement');
fiche('lieu-quake','lieux','Quake — restaurant',
 'Dans The Wendigo, Piper est liée au restaurant Quake et à une inspection sanitaire.', ['quake'],['S01E12'],
 'Distinguer espaces publics, cuisine, horaires et disponibilité du personnel selon le scénario.',
 'Ne pas confondre Quake et P3 ; aucun pouvoir magique propre au restaurant n’est établi par cette fiche.',
 'Un lieu civil peut permettre une rencontre ou imposer des témoins ; sa fonction ne dispense pas de réunir les interlocuteurs.', 'extrait_seulement');
fiche('lieu-ecole','lieux','École de magie',
 'Dans S06E14, Gideon dirige l’école. Ses protections sont invoquées pour expliquer pourquoi le Cavalier est plus dangereux pour les personnes à l’extérieur.', ['ecole'],['S06E14'],
 'Justifier l’accès, la période, l’interlocuteur et l’accès effectif aux connaissances recherchées.',
 'Ne pas convertir cette protection située en garantie absolue contre toute mort ou tout mal. La méthode d’accès de chaque scène reste à documenter.',
 'L’école peut soutenir une recherche ou un apprentissage ; elle ne livre pas instantanément toutes les réponses au joueur.', 'dialogues_consultes');
fiche('lieu-enfers','lieux','Monde souterrain — Underworld',
 'Le monde démoniaque comprend des cavernes et des repaires liés aux forces du mal.', ['enfers'],[],
 'Le scénario doit identifier le repaire précis, son occupant et le moyen d’y parvenir.',
 'Aucune carte exhaustive ni accès universel n’a été vérifié. Les éléments des comics sont exclus.',
 'Une ressource « repaire » donne un lieu défini ; elle ne représente pas le contrôle du monde démoniaque entier.', 'extrait_seulement');
fiche('lieu-regions-superieures','lieux','Régions supérieures — Fondateurs',
 'Les régions des Fondateurs sont accessibles dans des circonstances particulières. The Honeymoon’s Over présente un décalage de temps vécu par Piper et Leo.', ['cieux'],['S03E01','S05E22','S05E23'],
 'Établir qui peut s’y rendre à la date de la partie et par quel moyen effectivement attesté.',
 'Ne pas appliquer un ratio fixe entre temps céleste et jours du plateau à partir de ce seul épisode.',
 'Une audience ou un déplacement peut nécessiter un intermédiaire ; le bulletin des Fondateurs reste la convention de jeu déjà validée.', 'extrait_seulement');
fiche('lieu-decharge','lieux','Décharge démoniaque — Demonic Wasteland',
 'Des restes de démons vaincus y sont dévorés. Le parcours exceptionnel de Cole lui permet d’y récupérer des pouvoirs puis de revenir.', ['decharge'],['S04E22'],
 'Traiter le cas de Cole comme un contexte précis, pas comme une ressource disponible à tout personnage.',
 'Le détail des premières apparitions et des modalités du retour doit encore être contrôlé dans les épisodes. Les récits comics sont exclus.',
 'Ne pas proposer un accès gratuit à une réserve de pouvoirs ou une résurrection automatique après une attaque perdue.', 'extrait_seulement');
fiche('objet-livre','objets','Livre des Ombres',
 'Le Livre conserve le savoir familial et possède des défenses contre le mal ; il reste convoité par des adversaires.', ['livre'],[],
 'Vérifier sa présence, l’accès à la page utile et les capacités de la personne qui interprète ou exécute son contenu.',
 'Les défenses ont une histoire et des exceptions. La fiche ne certifie ni une encyclopédie complète de tous les démons ni un accès automatique à toute solution.',
 'La consultation peut produire une clé d’information. Sa représentation dans le jeu ne doit pas détruire physiquement cet artefact canonique.', 'extrait_seulement');
fiche('objet-grimoire','objets','Grimoire maléfique',
 'The Grimoire est présenté comme une contrepartie maléfique au Livre des Ombres.', ['grimoire'],[],
 'Nommer le livre exact et son détenteur ; une autre sorcière ou un démon peut avoir un ouvrage différent.',
 'Le contenu précis, les protections et la disponibilité nécessitent une vérification par épisode avant utilisation comme solution.',
 'Ne pas donner à toute carte « grimoire » les propriétés du Grimoire de la Source.', 'extrait_seulement');
fiche('objet-cristaux','objets','Cristaux de protection',
 'Piper protège Leo avec des cristaux dans S07E17. Prince Charmed montre un usage pour protéger le manoir ; Charmed Noir décrit un bouclier formé par trois cristaux autour de Miss Donovan.', ['scry','cristaux-manoir','cristaux-trois'],['S07E17','S06E12','S07E08'],
 'Distinguer les cristaux disponibles de leur disposition effective autour d’une cible ou d’un espace.',
 'Cet exemple ne prouve pas que n’importe quel cristal protège contre n’importe quel adversaire.',
 'Les cristaux constituent les ressources ; l’effet de protection installé constitue une clé ou un verrou selon la cible et les règles. Adapter la configuration à l’usage attesté, sans imposer un pentagramme universel.', 'mixte_dialogues_et_extrait');
fiche('objet-bague-cupidon','objets','Bague de Cupidon',
 'Le premier Cupidon rencontré utilise sa bague pour reconnaître des liens amoureux.', ['cupidon'],[],
 'Identifier le Cupidon et la fonction de la bague montrée dans l’épisode choisi.',
 'Les capacités des différents Cupidons et des bagues ne doivent pas être fusionnées. Les propriétés de voyage temporel ne sont pas validées par cette fiche.',
 'Reconnaître un lien ne signifie ni imposer un sentiment ni obliger un personnage à accepter une relation.', 'extrait_seulement');
fiche('objet-boite-hollow','objets','Boîte du Hollow',
 'La boîte contient le Hollow ; la Source le libère dans Charmed and Dangerous.', ['boite'],['S04E13'],
 'Vérifier l’emplacement, les gardiens, l’accès et l’état d’ouverture dans le scénario.',
 'Le contenant, l’entité et une méthode de confinement sont distincts. Ne pas assimiler le Hollow au Nexus.',
 'Obtenir le contenant ne prouve pas que son contenu est sous contrôle ; le scénario doit anticiper les effets sur les deux camps.', 'extrait_seulement');
fiche('objet-bague-inspiration','objets','Anneau d’inspiration',
 'Dans Muse to My Ears, cet objet destiné à l’inspiration est détourné pour capturer des Muses ; elles sont finalement libérées.', ['muses'],['S04E09'],
 'Établir qui détient l’anneau et quelles Muses y sont effectivement enfermées.',
 'L’inspiration ne doit pas être traduite automatiquement en savoir exact, omniscience ou réussite certaine.',
 'La libération d’une Muse ou la récupération de l’anneau peut constituer un fait vérifiable soutenant un objectif plus large.', 'extrait_seulement');
fiche('objet-arbalete','objets','Arbalète d’Être des ténèbres',
 'Dans Blinded by the Whitelighter, Eames recherche l’arbalète d’un Être des ténèbres pour tuer un Être de lumière.', ['arbalete'],['S03E11'],
 'Vérifier possession, projectile disponible, portée, identité et nature actuelle de la cible.',
 'Ne pas traiter toute arbalète ordinaire comme cet objet ni appliquer la même vulnérabilité à tous les personnages.',
 'Une attaque doit engager des moyens concrets ; annoncer cette arme ne garantit pas que le tir touche.', 'extrait_seulement');
fiche('magie-cage','formules-et-potions','Installation d’une cage de cristaux',
 'La cage à cinq cristaux en pentagramme est une configuration décrite, pas une obligation pour toute protection de cristaux : Charmed Noir présente un bouclier avec trois cristaux, et Prince Charmed une protection du manoir.', ['cage','cristaux-trois','cristaux-manoir'],['S04E13','S07E08','S06E12'],
 'Identifier la fonction recherchée et sa configuration attestée : confinement local, bouclier local ou protection du manoir. Une configuration observée ne devient pas une recette obligatoire pour toutes les autres.',
 'Les propriétés précises de chaque configuration doivent être détaillées séparément. Le schéma proposé par la joueuse avec des cristaux aux extrémités, au grenier et au sous-sol reste à vérifier ; ne pas le rejeter ni le certifier par défaut. Aucun nombre universel ni durée universelle ne sont établis.',
 'Une proposition peut rester en préparation tant que le dispositif est incomplet ; aucune durée de plateau n’est déduite arbitrairement du canon.', 'extrait_seulement');
fiche('magie-potion-belthazor','formules-et-potions','Potion contre Belthazor',
 'S03E08 montre une préparation dont l’achèvement nécessite de la chair de Belthazor. Les sœurs disent ne pas avoir besoin du Pouvoir des Trois pour cette opération.', ['belthazor'],['S03E08'],
 'Connaissance de la préparation, accès aux composants attestés, échantillon pertinent et fabrication effective.',
 'Recette partielle seulement : ni quantités ni liste complète certifiées. Aucun usage universel contre tous les démons ou toutes les versions de Cole.',
 'L’échantillon peut être un enjeu stratégique. Ne pas dévoiler au joueur le composant manquant si les règles n’autorisent que son nombre.', 'dialogues_consultes');
fiche('magie-verite','formules-et-potions','Sort de vérité',
 'S01E08 établit une durée de 24 heures, un effet réciproque touchant les sœurs présentes, puis un oubli chez Andy ; les sœurs conservent leur souvenir.', ['verite'],['S01E08'],
 'Préciser personnes affectées et moment d’incantation avant d’évaluer ce qu’une conversation révèle.',
 'Ne pas confondre parole sincère et connaissance complète. Pas de traduction automatique des 24 heures en coût supplémentaire.',
 'Une clé peut établir qu’un témoin dit ce qu’il croit ; la fiabilité de ses informations doit être examinée séparément.', 'dialogues_consultes');
fiche('magie-appel','formules-et-potions','Appeler une sorcière perdue',
 'Au début de Charmed Again, les tentatives magiques de Piper ne ramènent pas Prue à la vie. Paige entre dans l’histoire autour des funérailles.', ['appel'],['S04E01'],
 'Identifier l’appel, la personne recherchée et le contexte avant de déduire un résultat.',
 'La transcription consultée ne suffit pas à certifier tous les accessoires du rituel ni toutes ses variantes. Aucun pouvoir de résurrection garanti.',
 'L’intention déclarée et le résultat constaté restent distincts : une clé ne garantit pas l’effet espéré par sa seule formulation.', 'dialogues_consultes');
fiche('magie-teleportation','formules-et-potions','Potion de téléportation',
 'Dans The Torn Identity, Billie et Christy utilisent une potion pour rejoindre Pator.', ['transport'],['S08E18'],
 'Établir accès à une préparation connue, destination, personnes transportées et date de disponibilité.',
 'La recette, les quantités et la portée maximale restent non vérifiées. Ne pas importer le mécanisme différent du reboot.',
 'Transporter un personnage ne lui donne ni permission d’entrée, ni connaissance du lieu, ni protection à l’arrivée.', 'extrait_seulement');
fiche('magie-retrait-pouvoirs','formules-et-potions','Potion de retrait des pouvoirs',
 'Le corpus secondaire décrit le retrait des pouvoirs démoniaques de Cole et une tentative de Paige concernant Richard, qui la repousse.', ['depouillement'],['S04E08'],
 'Vérifier la préparation adaptée à la cible, sa nature et ses pouvoirs à la période retenue.',
 'Recette et modalités exactes à confirmer par épisode. Ne pas universaliser « retire toute magie pour toujours » ni intégrer les événements comics.',
 'Posséder une potion de cette famille ne prouve pas son efficacité sur une autre cible ; le retrait peut laisser subsister une personne.', 'extrait_seulement');
fiche('magie-woogy','formules-et-potions','Bannissement du Woogyman',
 'Phoebe se souvient de la formule transmise par sa grand-mère et l’ajoute au Livre après la confrontation.', ['woogy-formule'],['S01E15'],
 'Vérifier la cible et la version de la formule ; distinguer mémorisation et lecture effective du Livre.',
 'Ce bannissement n’est pas assimilable sans preuve à la destruction du Nexus en saison 7.',
 'Une information peut être détenue par un personnage sans provenir d’un objet actuellement dans sa main ; ses pouvoirs restent liés à sa carte.', 'extrait_seulement');
fiche('magie-invocation-belthazor','formules-et-potions','Invocation visant Belthazor',
 'Dans S03E08, l’invocation préparée pour Belthazor fait arriver Krell, qui explique l’avoir interceptée ; Belthazor est blessé et privé de son déplacement démoniaque.', ['belthazor'],['S03E08'],
 'Préciser destinataire, état actuel, moyen magique et éventuelles interférences.',
 'Nommer une cible ne garantit pas qu’elle arrive. Ne pas généraliser cette interception à tout adversaire sans moyen pertinent.',
 'Exemple de référence pour une conséquence imprévue liée à la situation réelle entre déclaration et résolution de l’action.', 'dialogues_consultes');

const dossier={version:1,date:'2026-09-08',universe:'charmed-tv-1998',status:'recherche_separee_non_active',
  portee:'Premier lot de 24 fiches ; enrichissements et précisions, pas 24 éléments tous absents du corpus précédent. Série originale saisons 1–8 ; ni reboot, ni comics, ni romans, ni fanfiction.',
  preuve:'Les transcriptions sont des reproductions non officielles, pas des scripts authentifiés ni un visionnage. Un extrait indexé reste une vérification partielle. Les références d’épisodes servent aussi de repères à contrôler.',
  regles:'Les conditionsPourLeJeu et applicationProposee sont des propositions d’exploitation, pas des faits canoniques ni de nouvelles règles validées. Le moteur et les règles actées continuent de primer.',
  activation:'Aucun import runtime. Ne pas copier automatiquement dans base.json ou dans les connaissances de la partie active.',
  sources,fiches};
const knownEpisodes=new Set(require(path.join(root,'Charmed/canon/episodes-index.json')).episodes.map(e=>e.id));
const ids=new Set();
for(const f of fiches) {
  if(ids.has(f.id)) throw new Error('ID dupliqué '+f.id); ids.add(f.id);
  if(!f.sources.length||f.sources.some(s=>!sources[s])) throw new Error('Source manquante '+f.id);
  if(f.episodesReperes.some(e=>!knownEpisodes.has(e))) throw new Error('Épisode inconnu '+f.id);
  for(const k of ['canon','conditionsPourLeJeu','limitesEtIncertitudes','applicationProposee','verification']) if(!f[k]) throw new Error('Champ manquant '+k);
}
fs.writeFileSync(path.join(__dirname,'fiches.json'),JSON.stringify(dossier,null,2)+'\n');
let md='# Charmed — lieux, objets, formules et potions\n\n'+dossier.portee+'\n\n**Statut : recherche séparée, non activée dans la partie en cours.**\n\n'+dossier.preuve+'\n\n'+dossier.regles+'\n\n';
for(const cat of ['lieux','objets','formules-et-potions']) {
  md+='## '+({'lieux':'Lieux','objets':'Objets','formules-et-potions':'Formules, potions et dispositifs magiques'}[cat])+'\n\n';
  for(const f of fiches.filter(f=>f.categorie===cat)) {
    md+='### '+f.titre+'\n\n**Ce que les sources établissent :** '+f.canon+'\n\n';
    md+='**Conditions à examiner dans le jeu :** '+f.conditionsPourLeJeu+'\n\n**Limites :** '+f.limitesEtIncertitudes+'\n\n**Application proposée :** '+f.applicationProposee+'\n\n';
    md+='Repères : '+(f.episodesReperes.join(', ')||'épisode précis à compléter')+'. Vérification : `'+f.verification+'`.\n\n';
    md+='Sources : '+f.sources.map(s=>'['+s+']('+sources[s].url+')').join(' · ')+'.\n\n';
  }
}
md+='## Registre des sources\n\n';
for(const [id,s] of Object.entries(sources)) md+='- **'+id+'** — ['+s.niveau+']('+s.url+'). '+s.repere+'\n';
fs.writeFileSync(path.join(__dirname,'FICHES.md'),md);
const watched=['serveur/charmed/expertise-runtime.js','Charmed/canon/base.json','Charmed/canon/construction.json','Charmed/canon/magie-demons.json','Charmed/canon/personnages.json'];
const hashes=Object.fromEntries(watched.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')]));
const audit={date:'2026-09-08',checks:{jsonParse:true,uniqueIds:ids.size===fiches.length,sourcesResolvable:true,episodeIdsExist:true},counts:Object.fromEntries(['lieux','objets','formules-et-potions'].map(c=>[c,fiches.filter(f=>f.categorie===c).length])),verificationCounts:Object.fromEntries([...new Set(fiches.map(f=>f.verification))].map(v=>[v,fiches.filter(f=>f.verification===v).length])),runtimeReferenceHashes:hashes,limits:'Contrôle structurel, pas une validation exhaustive du canon. Aucune session IA ni partie modifiée. Empreintes de référence prises lors de la génération.'};
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(audit,null,2)+'\n');
console.log(JSON.stringify({dossier:__dirname,...audit},null,2));
