from pathlib import Path
import json, re, hashlib

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
data = json.loads((HERE/'objets.proposition.json').read_text(encoding='utf-8'))
sources = data['sources']
fiches = data['fiches']
index = json.loads((ROOT/'Charmed/canon/episodes-index.json').read_text(encoding='utf-8'))
episodes = {e['id']: e['title'] for e in index['episodes']}
catalogue = json.loads((ROOT/'Charmed/contributions/objets-magiques/objets.proposition.json').read_text(encoding='utf-8'))
existing = {f['id'] for f in catalogue['fiches']}
fields = [('canon','Identité et fonction'), ('fonctionnement','Pouvoirs et fonctionnement'), ('conditionsActivationEtPortee','Activation, moyens et portée'), ('contreMoyensEtVariantes','Contre-moyens, variantes et chronologie'), ('limitesEtIncertitudes','Limites et incertitudes')]
assert len(fiches)==18 and len({f['id'] for f in fiches})==18
for f in fiches:
    assert f['activation']=='non_active_recherche'
    assert f['exactRecipe'] is None
    assert f['descriptionCarteProposee']
    assert f['ficheExistante']['contribution'].split('#')[1] in existing
    assert all(ep in episodes for ep in f['episodesReperes'])
    assert all(s in sources for s in f['sources'])
    for field,_ in fields:
        for block in re.findall(r'\[([^\]]+)\]', f[field]):
            assert all(s in sources and s in f['sources'] for s in block.split(', ')), (f['id'],block)

def links(text):
    return re.sub(r'\[([^\]]+)\]',lambda m:'('+', '.join('['+s+']('+sources[s]['url']+')' for s in m.group(1).split(', '))+')',text)

intro='''# Objets magiques de Charmed — approfondissements proposés

Date : 8 septembre 2026. **À examiner ; non intégré, non activé.**

## 1. Périmètre traité

La demande porte sur les objets magiques de la série originale, saisons 1 à 8. Le fragment du modèle concernant une « moitié démoniaque réprimée » n'est pas interprété comme une règle générale des objets. Il trouve un écho précis dans l'examen des amulettes de S03E20 et du cas Cole, dont les états sont distingués sans inventer de condition nouvelle.

Le nom court retenu est `objets-magiques-s1-s8`. Toutes les écritures de cette contribution sont limitées à `Charmed/contributions/objets-magiques-s1-s8/`. Aucun fichier actif, autre contribution, règle, sauvegarde ou bibliothèque principale n'a été modifié par cette tâche. Aucun serveur n'a été redémarré ; aucune partie n'a été créée ou jouée.

**18 fiches approfondies et 18 descriptions de carte** sont proposées. Il s'agit de compléments et de vérifications de précédents déjà recensés : le projet possède huit familles intégrées et un catalogue séparé de 80 fiches proposées. Cette livraison ne revendique donc pas 18 objets nouveaux, ni une couverture exhaustive de tous les accessoires de la série. Les objets sont retenus pour leur importance ou leurs propriétés utiles à l'action, la protection, le confinement, l'information et le transfert de pouvoirs, sans les enfermer dans une solution de combat.

Le JSON reprend les champs du catalogue local (`fiches`, `sources`, `canon`, `episodesReperes`, `descriptionCarteProposee`, etc.) et ajoute des rubriques d'approfondissement. Le champ `canon` est une convention de format, pas une certification. Ce fichier n'est pas un remplacement directement chargeable du fichier intégré : une adaptation et une revue restent nécessaires.

## 2. Instructions et fichiers existants consultés

- Instructions AGENTS.md fournies dans la conversation et source globale complète : `C:\\Users\\auror\\Documents\\Codex\\2026-08-29\\dis-moi-est-ce-que-tu\\outputs\\01_REGLES_GLOBALES_ACTEES.md`.
- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : références décisionnelles relues.
- `Charmed/canon/contributions-integrees/objets.json` : huit familles déjà revues, leurs variantes, sources et limites ; consultation des fiches pertinentes.
- `Charmed/canon/contributions-integrees/REVUE.md` : état documentaire de l'intégration et limites de la revue précédente.
- `Charmed/contributions/objets-magiques/objets.proposition.json` : structure, inventaire de 80 fiches et lecture des entrées correspondant aux objets approfondis ; leurs références ont servi de pistes puis ont été recherchées en ligne.
- `Charmed/canon/construction.json` : structure et références de base consultées de façon ciblée ; ne pas rétablir les anciennes formulations trop restrictives corrigées lors de l'intégration.
- `Charmed/canon/episodes-index.json` : contrôle des titres et numéros TVmaze, pas preuve des actions.
- `serveur/charmed/bibliotheque.js` : repérage du chargement par manifeste des contributions intégrées. Aucun audit exhaustif du moteur ni consultation de la sauvegarde active.

Le passage mémoire retrouvé concernait les anciennes maquettes d'interface ; il ne fournit aucun fait sur les objets. Les fichiers du projet relus font foi pour l'état actuel. Aucun AGENTS.md supplémentaire n'a été trouvé par la recherche dans le dépôt ; les instructions fournies restent applicables.

## 3. Statuts, constats et problèmes

### Décisions actées conservées

Une connaissance ne rend pas une ressource disponible. Exemplaire, détenteur, période, accès, concours des personnes, contenu et état matériel comptent. L'objet peut avoir plusieurs usages cohérents ; sa description ne doit pas fournir une recette de victoire. Aucun jet, coût, délai de recharge, taux de réussite, compteur de corruption ou règle d'invulnérabilité n'est créé ici. Un manque d'information ne devient pas une impossibilité.

### État documentaire plus récent

`BIBLIOTHEQUE.md` et `REVUE.md` indiquent une intégration de huit familles d'objets et un chargement vérifié à une étape récente. Leurs anciens paragraphes sur un redémarrage encore nécessaire sont historiques. Cette tâche ne les utilise pas pour demander ou effectuer un nouveau redémarrage, et ne certifie pas l'état actuel d'un serveur ouvert. La contribution de 80 fiches garde, elle, son statut de proposition : sa présence n'est pas une décision d'intégration.

### Points importants pour l'examen

1. **Objet, pouvoir et contenu.** L'athamé de Witch Wars absorbe et transmet des pouvoirs, contrairement à une lame ordinaire dont cette capacité n'est pas établie. La boîte du Hollow n'est pas l'entité ; l'urne ne produit pas une réserve infinie ; la maison de poupées ne miniaturise pas nécessairement seule.
2. **Interférences avec l'information.** Le pendule de S06E21 est influencé par Gideon dans une didascalie. Une localisation ou une projection n'authentifie ni sa cause ni la véracité de l'explication donnée par un personnage.
3. **Lame du Dragon : divergence précise.** La rubrique de pouvoirs de la page d'épisode simplifie le retour de l'âme de Piper vers « son corps ». La transcription décrit d'abord un retour dans le corps du Maître, toujours concerné par l'échange d'âmes. Cette divergence est signalée, pas résolue comme une certitude audiovisuelle.
4. **Amulettes de S03E20.** La restriction envers le Mal et la formule après réunion doivent figurer dans la connaissance. Le soupçon sur les intentions de Cole n'est pas un fait établi par l'accusation des sœurs.
5. **Urne divine.** La reprise des pouvoirs n'est pas décrite de manière identique pour les trois sœurs : le cas Piper ne doit pas être lissé dans une procédure commune.
6. **Corruption et psychologie.** Excalibur, l'athamé de Witch Wars et la ceinture ont des effets particuliers sur leurs utilisateurs. Ils ne justifient pas une loi selon laquelle tout objet démoniaque corrompt instantanément tout porteur.
7. **Rite du Hollow.** S4 exige un concours Bien/Mal ; le final S8 donne un autre précédent. L'articulation de ces cas demande une revue avant toute règle universelle.
8. **État matériel et état magique.** Baguette brisée, bague désenchantée, réserve transférée et cristal retiré ne signifient pas la même chose. Ne pas annoncer destruction, consommation ou réutilisation sans établir l'effet réellement intervenu.

## 4. Tableau de correspondance et apports

Toutes les lignes sont des propositions de complément ; les textes complets suivent.

| Fiche | Objet | Catalogue de 80 | Entrée intégrée | Apport proposé |
|---|---|---|---|---|
'''
out=[intro]
for f in fiches:
    old=f['ficheExistante']['contribution'].split('#')[1]
    out.append('| '+f['id']+' | '+f['titre']+' | '+old+' | '+str(f['ficheExistante']['integre'] or 'Pas de fiche parmi les huit familles')+' | '+f['provenanceAjustements']+' |')
out.append('''\n## 5. Textes complets proposés

Les cinq rubriques de chaque fiche sont destinées à l'Ange du destin. Le bloc « Carte » est la description courte proposée. Les références du bloc documentaire soutiennent sa synthèse de carte ; les incertitudes s'appliquent aux deux. Les périodes citées désignent les précédents étudiés, pas une disponibilité automatique à toutes les dates intermédiaires.
''')
for f in fiches:
    out.extend(['\n### '+f['id']+' — '+f['titre']+'\n','**Épisodes :** '+' ; '.join(ep+' — '+episodes[ep] for ep in f['episodesReperes'])+'.\n','**Fiche pour l’Ange du destin**\n'])
    for field,title in fields:
        out.append('- **'+title+' :** '+links(f[field]))
    out.append('\n**Carte proposée**\n\n> '+f['descriptionCarteProposee']+'\n')
    out.append('**Apport par rapport à l’existant :** '+f['provenanceAjustements']+'\n')
    out.append('**Niveau des sources :** '+', '.join(sorted({sources[s]['niveau'] for s in f['sources']}))+'. Aucun visionnage.\n')
out.append('''\n## 6. Sources et niveau réel de vérification

Recherches web effectuées le 8 septembre 2026. Aucun épisode visionné. Les pages Springfield sont des transcriptions non officielles ; elles omettent souvent les noms des locuteurs et certains gestes. La page de Witch Wars sur Fandom a été ouverte et ses passages/didascalies consultés. Les autres résultats Fandom ci-dessous restent des extraits indexés, même lorsqu'ils sont longs. Leur ouverture complète n'est pas revendiquée.

Les essais d'ouverture infructueux incluent Springfield S04E04, S04E19, S06E21, S07E07, S06E17, S08E13 et S08E22, ainsi que des pages Fandom Enter the Demon, Repo Manor et Forever Charmed. Les recherches ciblées ont fourni des extraits de remplacement. Sarpedon et le bâton de Bouddha ne sont pas ajoutés à ce lot après ces recherches incomplètes ; les fiches du catalogue existant restent disponibles pour une revue future. Aucun échec d'accès n'est décrit comme une preuve d'absence d'une propriété.

La page S05E22 combine les deux parties d'Oh My Goddess! ; le repère S05E22–E23 est donc conservé. Les mots exacts des formules, dosages et recettes ne sont pas reproduits. Aucun script de production officiel, aucune vidéo et aucun minutage audiovisuel vérifié ne sont revendiqués. Comics, reboot, romans et fanfictions rencontrés dans les résultats ont été exclus ; en particulier l'Ancient Athame et l'Empyreal Sword ne sont pas ajoutés à la série S1–S8.
''')
for sid,s in sources.items():
    out.append('- **'+sid+'** — ['+s['titre']+']('+s['url']+'). Niveau : `'+s['niveau']+'`. Repère : '+s['repere']+' '+s['verification'])
out.append('''\n## 7. Intégration éventuelle : fichiers concernés et arbitrages

| Fichier actif | Intervention envisageable après revue |
|---|---|
| `Charmed/canon/contributions-integrees/objets.json` | Enrichir les cinq familles déjà correspondantes ; préparer les autres fiches après dédoublonnage. Conserver les versions et les sources existantes. |
| `Charmed/canon/contributions-integrees/manifest.json` | Enregistrer uniquement la version effectivement retenue et ses empreintes, selon le mécanisme existant. Cette contribution n'y est pas inscrite. |
| `Charmed/canon/contributions-integrees/REVUE.md` | Documenter les assertions revues, celles corrigées et celles toujours incertaines. |
| `Charmed/canon/bibliotheque-verifiee.json` | Éventuelles observations atomiques avec épisode, source et limites après examen. Pas de promotion automatique du mot `canon` ou d'un extrait au statut de fait vérifié. |
| `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` | Ajuster les propriétés de ressources retenues, sans importer des recettes ou conditions non démontrées. |
| `Charmed/BIBLIOTHEQUE.md` | Mettre à jour l'index après intégration effective, en séparant contenu intégré et proposition restante. |

Le catalogue `Charmed/contributions/objets-magiques/objets.proposition.json` est un point de comparaison, pas une cible de modification de cette tâche. La conversation principale devra décider où consolider les textes retenus, sans charger deux fiches identiques comme deux objets distincts.

Arbitrages explicites : confirmer les corps/âmes dans Enter the Demon sur vidéo ; déterminer la formulation de portée des rites du Hollow ; conserver ou préciser les variantes de nom Gaïa/Hippolyte ; choisir les versions temporelles des ressources. Ne pas inventer de disponibilité après destruction ou désenchantement. Aucun arbitrage de règle n'a été appliqué silencieusement.

## 8. Vérifications et travail restant

Contrôles exécutés : 18 fiches uniques, 18 cartes, références résolues, 18 correspondances avec le catalogue existant, épisodes présents dans l'index local, statut non actif et recettes exactes nulles. Le rapport `VERIFICATIONS.json` conserve les résultats et les empreintes de cette livraison. Ces contrôles ne vérifient pas la vérité des scènes et ne testent pas le moteur du jeu.

Relecture documentaire : cartes séparées des contre-moyens ; distinction des niveaux de source ; maintien des contradictions et des états temporels ; absence de propriétés des comics. Le générateur `preparer_documents.py` ne produit que le document principal et le rapport dans son propre dossier.

Travail restant : visionnage ciblé des scènes déterminantes, surtout Lame du Dragon et deux rites du Hollow ; vérification des gestes absents des transcriptions ; appréciation des limites de chaque protection ; consolidation avec les huit familles et les 80 propositions ; adaptation au schéma intégré et contrôle de consommation par l'Ange dans un contexte autorisé. Aucun lancement de partie ne découle de ce dossier.

### Cas de relecture proposés — non exécutés dans le jeu

- Un joueur propose de toucher un démon avec n'importe quel athamé pour obtenir tous ses pouvoirs : demander l'identité et les propriétés établies de la lame.
- Piper retire Excalibur du rocher : ne pas confondre ce geste avec la maîtrise durable de l'épée.
- Un camp pose les deux amulettes sans formule : distinguer réunion et activation ; examiner aussi le bénéficiaire.
- La Lame du Dragon contient l'âme de Piper : déterminer le corps qu'elle occupait et le corps de destination avant de conclure à son sauvetage.
- Un cristal pointe une adresse : ne pas convertir ce seul signal en preuve d'authenticité ou de sécurité.
- Un camp détient la boîte vide du Hollow : ne pas lui attribuer le pouvoir d'absorption de l'entité.
- Une action vise à tuer Katya : ne pas en conclure automatiquement que les maux sont rentrés dans la boîte.
- Une baguette a perdu sa magie mais existe encore : ne pas la traiter comme son exemplaire intact.
- L'urne rend Phoebe et Paige humaines : ne pas présumer que le même geste suffit à résoudre l'état de Piper.
''')
main='\n'.join(out)
assert '\ufffd' not in main
(HERE/'PROPOSITION_A_INTEGRER.md').write_text(main,encoding='utf-8')
report={'date':'2026-09-08','statut':'controle_documentaire_non_integration','fiches':len(fiches),'cartes':sum(bool(f['descriptionCarteProposee']) for f in fiches),'sources':len(sources),'correspondances_catalogue':len(fiches),'familles_integrees_concernees':len({f['ficheExistante']['integre'] for f in fiches if f['ficheExistante']['integre']}),'references_resolues':True,'episodes_dans_index':True,'recettes_exactes_nulles':True,'activation':'aucune','tests_runtime':'non_effectues_hors_perimetre','visionnage':'aucun','sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [HERE/'objets.proposition.json',HERE/'PROPOSITION_A_INTEGRER.md']}}
(HERE/'VERIFICATIONS.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
