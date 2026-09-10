"""Reconstruit uniquement les livrables documentaires dans ce dossier de contribution."""
import csv
import hashlib
import json
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import unquote

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
assert HERE == ROOT / 'Charmed' / 'contributions' / 'objets-magiques'
DATE = '2026-09-08'
rows = list(csv.DictReader((HERE / 'catalogue-source.tsv').open(encoding='utf-8'), delimiter='\t'))
assert len(rows) == 80
index = json.loads((ROOT / 'Charmed/canon/episodes-index.json').read_text(encoding='utf-8-sig'))
episodes = {e['id']: e for e in index['episodes']}
sources = {}
fiches = []
source_files = [
    'Charmed/REGLES_ACTEES.md', 'Charmed/DECISIONS_ACTEES.md',
    'Charmed/BIBLIOTHEQUE.md', 'Charmed/PREPARATION_DOCUMENTEE.md',
    'Charmed/canon/CONSTRUCTION_DES_PARTIES.md', 'Charmed/canon/construction.json',
    'Charmed/canon/bibliotheque-verifiee.json', 'Charmed/canon/base.json',
    'Charmed/canon/magie-demons.json', 'Charmed/canon/episodes-index.json',
    'Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md',
    'Charmed/recherche/2026-09-08-lieux-objets-magie/fiches.json',
    'Charmed/contributions/objets/PROPOSITION_A_INTEGRER.md',
    'Charmed/canon/contributions-integrees/manifest.json',
    'Charmed/canon/contributions-integrees/objets.json',
    'serveur/charmed/bibliotheque.js',
]
current = json.loads((ROOT / 'Charmed/canon/contributions-integrees/objets.json').read_text(encoding='utf-8-sig'))
assert len(current['fiches']) == 8
local_research_ids = ['objet-livre', 'objet-grimoire', 'objet-cristaux', None,
                      'objet-bague-cupidon', 'objet-boite-hollow', 'objet-bague-inspiration', 'objet-arbalete']
construction_ids = ['book', None, 'crystals', 'scrying-crystal', 'cupid-ring', None, None, 'darklighter-crossbow']
adjustments = [
    "Ajout proposé : autres exceptions aux protections (S01E03, S03E13, S05E08), d'après Book of Shadows. Le cas Zankou et la séparation lecture/exécution sont déjà présents : les conserver, sans les revendiquer comme nouveaux.",
    "Ajout proposé : rite de transfert et devenir du livre après S04E21, d'après The Grimoire et Womb Raider/Script. La manipulation indirecte par sac enchanté et la résistance à la potion figurent déjà dans objets:2 : les conserver lors d'une fusion.",
    "Ajout proposé : préparation en sidérite, cristal témoin et réserve explicite sur les humains/Kit, tirés de Sight Unseen/Script. Les trois cristaux de Miss Donovan, la vision de S04E13 et l'infiltration S06E12 sont déjà documentés ; cette fiche ne les remplace pas. Les autres variantes de cristaux du catalogue sont des fiches séparées à rapprocher sans les fusionner magiquement.",
    "Ajout proposé : exemple précis de lien entre la bague familiale et l'amulette de Tali en S06E21, tiré de Witch Wars. Le précédent S04E19, la manipulation du pendule par Piper et les réserves sur la localisation sont déjà présents ; à conserver.",
    "Consolidation : garder les deux variantes S02/S08 et leurs sources d'épisodes existantes. Cupid Ring sert à élargir la navigation et à repérer les passages de comics à exclure ; il ne remplace pas les précédents documentaires sur Drazi et Dumain. Aucune nouvelle capacité universelle proposée.",
    "Ajout proposé : distinction entre appel du Hollow en S08E21 et transport de son contenant, d'après Hollow Box. Le rituel S04E13 est corroboré par les dialogues ouverts. Le dénouement S08E22 et la restitution des pouvoirs restent à approfondir ; aucun nouveau confinement universel acté.",
    "Consolidation et confirmation secondaire par Ring of Inspiration. La capture, la libération puis la reprise par Devlin sont déjà documentées : préserver les dialogues cités dans la fiche existante, de niveau plus direct que cet extrait. Pas de nouveau plafond ou de résistance inventée.",
    "Complément de navigation : précédent S01E21 associé à Darklighter Crossbow. Eames, la blessure directe de Natalie, le poison progressif et la vulnérabilité de Paige sont déjà documentés ; les transcriptions indexées les confortent sans être une nouvelle validation indépendante.",
]

def register(slug):
    if slug not in sources:
        sid = f'S{len(sources)+1:03d}'
        sources[slug] = dict(id=sid, url='https://charmed.fandom.com/wiki/' + slug,
            titre=unquote(slug).replace('_', ' '),
            niveau='extrait_indexe_transcription_non_officielle' if slug.endswith('/Script') else 'extrait_indexe_secondaire',
            consulteLe=DATE, acces='Extrait renvoyé par recherche web ; page intégrale non acquise.',
            repere='Voir les fiches liées : épisodes et scènes résumées. Aucun minutage de vidéo vérifié.', fiches=[])
    return sources[slug]

for i, row in enumerate(rows, 1):
    assert set(row) == {'nom','sources','episodes','connaissances','limites','carte'}
    assert all(row.values())
    eid = f'objets-magiques:{i:03d}'
    eps = row['episodes'].split()
    assert all(e in episodes for e in eps), (eid, eps)
    refs = []
    for slug in row['sources'].split(';'):
        # La référence Womb Raider n'est pas utilisée pour les exemples S03/S07 de cristaux.
        if i == 3 and slug == 'Womb_Raider/Script':
            continue
        s = register(slug)
        s['fiches'].append(eid)
        refs.append(s['id'])
    old = None
    if i <= 8:
        old = {'integre': f'Charmed/canon/contributions-integrees/objets.json#objets:{i}',
               'contributionPrecedente': f'Charmed/contributions/objets/PROPOSITION_A_INTEGRER.md#O{i:02d}',
               'recherche': local_research_ids[i-1], 'construction': construction_ids[i-1]}
    # Le statut d'identification dépend du nom, pas de la position dans le tableau.
    identification = row['nom'] in ['Baguette de Rathmere', 'Cristal de Kasimar']
    f = dict(id=eid, categorie='objets', titre=row['nom'],
        canon=row['connaissances'], sources=refs, episodesReperes=eps,
        conditionsPourLeJeu="Proposition d'application : établir l'exemplaire, son détenteur, son état à la période choisie et les moyens d'activation réellement présents. Les conditions et exceptions particulières sont dans la fiche ; aucune portée ou durée absente des sources n'est inventée.",
        limitesEtIncertitudes=row['limites'],
        applicationProposee="Texte de connaissance à examiner pour l'Ange du destin. Sa présence dans ce catalogue n'attribue pas la ressource à un camp et ne réalise aucune action.",
        descriptionCarteProposee=row['carte'],
        statutProposition='identification_proprietes_non_etablies' if identification else 'proprietes_documentees_partiellement',
        verification='extraits_indexes_non_validation_exhaustive', activation='non_active_recherche',
        ficheExistante=old,
        provenanceAjustements=adjustments[i-1] if old else "Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.")
    if i == 3:
        f['referencesLocalesComplementaires'] = ['Charmed/canon/bibliotheque-verifiee.json#library:crystals-three',
            'Charmed/canon/bibliotheque-verifiee.json#library:crystals-activation-electricity',
            'Charmed/canon/bibliotheque-verifiee.json#library:crystals-removal',
            'Charmed/canon/contributions-integrees/objets.json#objets:3']
    if i == 5:
        f['cartesVariantes'] = [
            {'titre':'Bague du Cupidon — S02','description':"Bague permettant de percevoir et d'influencer des liens amoureux, susceptible d'être détournée."},
            {'titre':'Bague de Coop — S08','description':"Bague permettant notamment de voyager dans le temps en suivant un lien d'amour, avec une destination parfois imprécise."}]
    fiches.append(f)

# Seule source web de ce nouveau lot dont la page de dialogues a été ouverte avec succès.
direct_id = f'S{len(sources)+1:03d}'
direct = dict(id=direct_id,
    url='https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed',
    titre='Charmed and Dangerous — dialogues', niveau='transcription_non_officielle_page_consultee',
    consulteLe=DATE, acces='Page ouverte ; dialogues consultés, sans authentification du script ni visionnage.',
    repere="S04E13 : explication du Hollow ; coopération Bien/Mal et inscription ; préparation des cinq cristaux. Les scènes initiales de vision ne sont pas la confrontation finale.",
    fiches=['objets-magiques:003','objets-magiques:006'])
source_map = {s['id']: s for s in sources.values()}
source_map[direct_id] = direct
fiches[2]['sources'].append(direct_id)
fiches[5]['sources'].append(direct_id)
fiches[2]['verification'] = fiches[5]['verification'] = 'mixte_extraits_indexes_et_dialogues_non_officiels_consultes'

meta = dict(version=1, date=DATE, universe='charmed-tv-1998', status='proposition_separee_non_active',
    portee="80 fiches d'objets ou familles : 78 avec propriétés partiellement documentées et 2 identifications sans effets établis. Couverture large des huit saisons, sans prétention d'inventaire exhaustif ni de pourcentage mesuré de tous les accessoires de la série.",
    preuve="Recherche réelle sur le wiki Charmed original, par extraits indexés ; une page de dialogues non officiels S04E13 ouverte. Les sources secondaires, transcriptions et propositions ne sont pas des faits automatiquement validés.",
    regles="Propositions uniquement ; règles actées du projet prioritaires. Les champs canon contiennent une synthèse documentaire à revoir, le nom du champ reproduit le schéma local et ne vaut pas certification.",
    activation="Aucun import runtime. Ne pas copier automatiquement ce lot dans la bibliothèque active ou une sauvegarde.",
    sources={sid:{k:v for k,v in s.items() if k != 'id'} for sid,s in source_map.items()}, fiches=fiches)

header = '''# Contribution objets magiques — inventaire élargi et provenance des informations

8 septembre 2026 — **Proposition à examiner. Ce nouveau catalogue n'est ni intégré ni activé.**

## 1. Demande et périmètre réellement traité

**Demande détaillée retenue :** rechercher sur le site Charmed Wiki les noms et les propriétés d'une large majorité d'objets magiques de la série originale, indiquer d'où provient chaque information et, lorsqu'une fiche existe déjà, d'où viennent les ajustements proposés.

Le présent document propose **80 fiches**, avec **81 descriptions de carte** (deux variantes pour Cupidon). **78 fiches** comportent des propriétés documentées au moins partiellement ; **deux** se limitent à l'identification d'un objet dont les pouvoirs ne sont pas établis (Rathmere, Kasimar). Les trois accessoires de Grams sont regroupés ; arbalète et projectiles restent une famille ; les configurations réellement différentes de cristaux sont distinguées. Le total n'est donc pas un décompte d'exemplaires physiques uniques.

Il s'agit d'un catalogue substantiellement élargi, couvrant les saisons 1 à 8. Aucun recensement scène par scène des 178 épisodes n'a été effectué : **un pourcentage de couverture de tous les objets de la série n'est pas mesuré**. La catégorie Artifacts inclut aussi des objets ordinaires et des médias dérivés ; ses 127 entrées annoncées ne constituent pas un dénominateur fiable pour cette demande. Reboot, comics et romans sont exclus des propriétés retenues. Les noms français non confirmés par un doublage sont des libellés descriptifs proposés ; le nom anglais de la page est conservé dans la source.

Les fiches détaillées ci-dessous sont destinées à l'Ange du destin. Les textes courts sont séparés et portent sur les propriétés des ressources. Ils ne constituent ni une recette de victoire ni une attribution automatique aux joueurs. Pour les huit familles déjà présentes, **le texte proposé est un complément à fusionner**, pas une suppression des faits et références déjà revus.

## 2. Instructions et fichiers consultés

Lecture des instructions AGENTS fournies et de la source globale canonique : `C:/Users/auror/Documents/Codex/2026-08-29/dis-moi-est-ce-que-tu/outputs/01_REGLES_GLOBALES_ACTEES.md`. Aucun AGENTS local supplémentaire trouvé lors de la recherche. Les quatre références demandées (`REGLES_ACTEES.md`, `DECISIONS_ACTEES.md`, `BIBLIOTHEQUE.md`, `PREPARATION_DOCUMENTEE.md`) ont été lues ; les sections pertinentes ont été rapprochées des données actuelles.

Fichiers consultés dans le projet (chemins relatifs à `C:/Users/auror/Videos/charmed/logic-match/`) :

- `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et `construction.json` : notices objets et conditions ; cinq objets de construction.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json` : sept fiches objets, sources et schéma de données.
- `Charmed/canon/bibliotheque-verifiee.json` : trois faits cristaux et niveaux de sources.
- `Charmed/canon/base.json` et `magie-demons.json` : passages pertinents trouvés sur les cristaux, la localisation et les bagues ; pas une relecture de toute l'expertise de chaque personnage.
- `Charmed/canon/episodes-index.json` : correspondance identifiant/titre, utilisée comme navigation, pas comme preuve des scènes.
- `Charmed/contributions/objets/PROPOSITION_A_INTEGRER.md` : premier lot de huit familles, neuf cartes ; lecture pour éviter de refaire passer ses apports pour des nouveautés.
- `Charmed/canon/contributions-integrees/manifest.json` et `objets.json` : état actif relu en fin de recherche ; huit notices déjà issues du premier lot, identifiants `objets:1` à `objets:8`.
- `serveur/charmed/bibliotheque.js` : lecture du chargeur actuel, qui utilise les recherches et le manifeste des contributions intégrées. Aucun appel du serveur.

L'état du projet a évolué pendant ce travail. La dernière lecture montre déjà `minSeason: 3` pour les cristaux, `minSeason: 4` pour la localisation et la prise en compte des usages détournés des bagues. Les anciennes observations du premier lot sur ces champs sont donc **déjà traitées dans cet état**, et ne sont pas proposées une seconde fois comme corrections à appliquer. Le manifeste existant concerne le premier lot `objets`, pas le nouveau dossier `objets-magiques`.

## 3. Constats et mode de lecture des preuves

Le principal manque du premier lot était sa couverture limitée à huit familles. Ce catalogue ajoute 72 fiches de familles, variantes ou objets non présents comme fiches autonomes dans ce lot. Cela n'exclut pas des mentions dispersées ailleurs dans le projet. Deux de ces ajouts sont des identifications sans pouvoirs établis. Les rapprochements et fusions d'identifiants restent à la conversation principale.

Les pages de wiki mélangent fréquemment une scène, une explication éditoriale et des développements des comics. Les fiches gardent les repères télévisuels et cherchent des contre-exemples. Les ouvertures directes Fandom n'ont pas fourni de pages intégrales exploitables ; les résultats effectivement utilisés sont des **extraits indexés**, parfois longs. Une transcription indexée reste non officielle, même si elle présente des dialogues et didascalies. Les ouvertures de certaines autres transcriptions ont échoué ; elles ne sont pas comptées comme lues.

Niveaux conservés dans le registre : **IS** = extrait indexé secondaire ; **IT** = extrait indexé de transcription non officielle ; **T** = page de dialogues non officiels ouverte (S04E13). Aucun épisode visionné, aucune transcription authentifiée par la production. Les sources consultées par un lot antérieur conservent leur niveau historique dans ce lot : elles ne sont pas transformées en nouvelles consultations ici.

Chaque fiche donne les épisodes de repérage, le texte de connaissance proposé, les limites, une description courte, les pages précises et la provenance d'un éventuel ajustement. Un épisode mentionné ne prouve pas une première apparition ni une disponibilité continue. Une durée, un rayon, un stock ou un mode d'activation non documenté reste inconnu. Les objets détruits, désenchantés, emportés ou confiés à un gardien ne réapparaissent pas par la simple présence de leur fiche dans la bibliothèque.

## 4. Index des fiches

| Fiche | Nom proposé | Nature de la contribution |
|---|---|---|
'''
doc = [header]
for i,f in enumerate(fiches, 1):
    nature = 'Complément / consolidation existant' if i <= 8 else ('Identification seulement' if f['statutProposition'].startswith('identification') else 'Ajout proposé')
    doc.append(f"| OM{i:03d} | {f['titre']} | {nature} |\n")
doc.append('\n## 5. Textes complets proposés pour l’Ange et les cartes\n\n')
for i,f in enumerate(fiches,1):
    doc.append(f"### OM{i:03d} — {f['titre']}\n\n")
    doc.append('**Repères :** ' + ' ; '.join(f"{e} — {episodes[e]['title']}" for e in f['episodesReperes']) + '.\n\n')
    doc.append('**Fiche détaillée pour l’Ange du destin — texte proposé.** ' + f['canon'] + '\n\n')
    doc.append('**Conditions, limites, contre-exemples et disponibilité.** ' + f['limitesEtIncertitudes'] + '\n\n')
    if f.get('cartesVariantes'):
        for c in f['cartesVariantes']:
            doc.append(f"**Carte proposée — {c['titre']}.** « {c['description']} »\n\n")
    else:
        doc.append('**Description courte proposée pour la carte.** « ' + f['descriptionCarteProposee'] + ' »\n\n')
    links=[]
    for sid in f['sources']:
        s=source_map[sid]
        level={'extrait_indexe_secondaire':'IS','extrait_indexe_transcription_non_officielle':'IT','transcription_non_officielle_page_consultee':'T'}[s['niveau']]
        links.append(f"[{sid} — {s['titre']}]({s['url']}) ({level})")
    doc.append('**D’où provient l’information :** ' + ' ; '.join(links) + '. Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.\n\n')
    if f.get('referencesLocalesComplementaires'):
        doc.append('**Références locales complémentaires :** ' + ', '.join('`'+s+'`' for s in f['referencesLocalesComplementaires']) + '. Leur vérification est celle enregistrée dans le corpus existant.\n\n')
    if f['ficheExistante']:
        old=f['ficheExistante']
        doc.append('**Fiche déjà présente :** `' + old['integre'] + '`')
        if old['recherche']: doc.append(' ; recherche `' + old['recherche'] + '`')
        if old['construction']: doc.append(' ; construction `' + old['construction'] + '`')
        doc.append('.\n\n**D’où viennent les ajustements :** ' + f['provenanceAjustements'] + '\n\n')
    else:
        doc.append('**Provenance de l’ajout :** ' + f['provenanceAjustements'] + '\n\n')

doc.append('''## 6. Registre des sources et exclusions

Recherches effectuées le 8 septembre 2026. Les liens ci-dessous identifient les pages dont les extraits ont été exploités ; ils ne promettent pas que leur ouverture intégrale sera possible. Les identifiants des fiches forment la correspondance source → affirmations. Les formulations sont des synthèses originales, pas des copies intégrales du wiki.

| ID | Page précise | Niveau | Fiches concernées |
|---|---|---|---|
''')
for sid,s in source_map.items():
    doc.append(f"| {sid} | [{s['titre']}]({s['url']}) | {s['niveau']} | {', '.join('OM'+x.split(':')[1] for x in s['fiches'])} |\n")
doc.append('''
Sources de repérage : [Artifacts](https://charmed.fandom.com/wiki/Category%3AArtifacts) et [Books](https://charmed.fandom.com/wiki/Category%3ABooks), extraits indexés. Elles servent à trouver des candidats, pas à établir leurs pouvoirs. L'[index TVmaze](https://api.tvmaze.com/shows/506/episodes), déjà conservé localement, sert uniquement à la numérotation et aux titres.

### Objets repérés mais sans fiche fonctionnelle retenue ici

| Nom ou famille repéré | Traitement et raison | Source de repérage, extrait indexé |
|---|---|---|
| Ruby Slippers, hache du bûcheron, rouet des contes | Accessoires repérés dans l'univers de S05E03 ; ne pas importer leurs pouvoirs depuis Le Magicien d'Oz ou un autre conte sans scène Charmed. À préciser par la séquence de la forteresse. | [Fairy Tales](https://charmed.fandom.com/wiki/Fairy_Tales) |
| Chaudron ordinaire et outils d'autel | Supports de préparation ; aucune magie intrinsèque générale établie. Ils peuvent rester des ressources matérielles cohérentes sans être des artefacts autonomes. | [Cauldron](https://charmed.fandom.com/wiki/Cauldron) |
| Miroir à main contre Javna | Interaction réfléchissante en S01E02, pas preuve que le miroir soit enchanté. Garder l'usage contextuel séparé d'un pouvoir intrinsèque. | [Mirror](https://charmed.fandom.com/wiki/Mirror) |
| Akashic Records, Alchemist's Tools, Auger Shell | Noms rencontrés lors du repérage ; qualification télévisuelle et propriétés non établies dans cette contribution. Pas de classement arbitraire comme impossibles ou comme romans. | [Artifacts](https://charmed.fandom.com/wiki/Category%3AArtifacts) |
| Phosphorus Cauldron | Développement identifié dans Unnatural Resources, comic ; exclu du canon télévisuel retenu. | [Phosphorus Cauldron](https://charmed.fandom.com/wiki/Phosphorus_Cauldron), [Unnatural Resources](https://charmed.fandom.com/wiki/Unnatural_Resources) |
| Sphaera of Light and Dark | Références de comics, notamment Last Witch Effort ; exclue des propriétés S01–S08. | [Sphaera](https://charmed.fandom.com/wiki/The_Sphaera_of_Light_and_Dark) |
| Jewel of Orthon | Développement associé à Rennek dans les comics ; non retenu comme objet établi par la série originale. | [Mind Manipulation](https://charmed.fandom.com/wiki/Mind_Manipulation) |
| Ancient Athame, Empyreal Sword | Développements des comics présents dans des pages générales qui parlent aussi d'objets télévisuels ; exclus de la fusion. | [Athame](https://charmed.fandom.com/wiki/Athame), [Excalibur](https://charmed.fandom.com/wiki/Excalibur) |
| Bloodstone Amulets, Black Amber, Unity Bowl des résultats reboot | Domaine et continuité du reboot exclus ; aucune propriété importée. | Résultats du domaine charmed-reboot.fandom.com écartés dès le tri. |

Cette liste de pistes ne prétend pas clore le recensement. Les potions en tant que recettes, pouvoirs immatériels et êtres surnaturels ne sont pas artificiellement comptés comme objets. Les poussières sont conservées comme matériaux magiques ; leurs recettes relèvent aussi du lot potions.

## 7. Contradictions, nuances et décisions à réserver

| Point | État de la preuve et traitement proposé |
|---|---|
| Anciennes valeurs `minSeason` et utilisateur « autorisé » | Déjà révisées dans le `construction.json` relu. Ne pas réappliquer une correction obsolète. Garder les identifiants existants. |
| Cristaux universellement au nombre de cinq | Le corpus actif reconnaît le cas de trois en S07E08. Conserver les configurations et ne pas créer une règle unique. |
| Formule Ronyx | La transcription montre le geste caché de Gideon et le résumé sa page forgée. La formule n'est pas validée comme activation autonome. Son histoire de l'objet n'est pas une autorité neutre. |
| Athamé absorbant : mort nécessaire | Certaines définitions résument l'arme par le meurtre ; Phoebe survit à l'extraction. Décrire l'absorption sans rendre la mort systématiquement nécessaire. |
| Cristal des rêves : maximum de trois | Deux pages divergent entre « plusieurs proches » et « au plus trois ». Le nombre observé ne suffit pas à acter le plafond. Revoir le dialogue avant toute limite de cible. |
| Appareil de Vaklav : libération des victimes | Le Plot et la transcription indexée placent la libération après l'appel affectif à Sam, avant la capture photographique de Vaklav. Ne pas attribuer cette libération à la photographie ni généraliser ce lien particulier à tout captif. |
| Cage de la Prophétesse indestructible | Déclaration/description à contextualiser avec la sortie après neutralisation. La cause exacte entre explosion et perte de l'enchantement reste à vérifier. |
| Livre ou Grimoire indestructible | Non-consommation du Livre à la consultation = règle/convention du jeu ; résistance à certains effets = précédent. Aucun de ces points n'établit une invulnérabilité absolue. |
| Protection universelle des talismans | Les exceptions de Cole et Jinny distinguent magie de sorcières et magie démoniaque. Ne pas homogénéiser toutes les amulettes. |
| Bague Cupidon toutes saisons | Garder les deux variantes et les usages prêtés/volés ; ne pas rétroprojeter Coop en S02. La représentation technique en une ou deux ressources reste à décider. |
| Hollow : contenant et restitution | Confinement, invocation de l'entité et restitution des pouvoirs ne sont pas une seule fonction. La fin S08 reste à étudier avant une règle universelle. |
| Objet de tournage réutilisé | Ressemblance entre deux grimoires ne prouve pas identité narrative. Maintenir Tuatha et Phoenix séparés. |
| Cristaux, poussières, maisons, véhicules, dispositif du Tribunal | Déterminer au moment de la préparation si l'on représente une pièce, un ensemble, un matériau, un lieu équipé ou un véhicule. Ne pas créer plusieurs exemplaires d'un même objet par multiplication de cartes. |
| Deux identifications sans pouvoirs | Rathmere/Kasimar peuvent entrer dans un inventaire de connaissances. Leur présence ne valide pas une carte dotée d'effets inventés. |

Les propositions ne changent aucun coût, délai, état initial ou règle de victoire. L'existence canonique d'une propriété ne préjuge pas du résultat d'une action particulière. Les arbitrages demandés concernent la fusion documentaire, la nomenclature et les assertions suffisamment vérifiées pour l'usage envisagé.

## 8. Fichiers qui seraient concernés par une intégration

| Destination active à examiner | Travail proposé à la conversation principale |
|---|---|
| `Charmed/canon/contributions-integrees/objets.json` | Fusionner les compléments OM001–OM008 avec `objets:1` à `objets:8`, en conservant leurs références et niveaux historiques. Ne pas remplacer les paragraphes existants par un résumé plus pauvre. |
| `Charmed/canon/contributions-integrees/manifest.json` et un éventuel nouveau lot dans ce même dossier actif | Enregistrer les ajouts retenus selon le mécanisme déjà présent, avec leurs niveaux réels. La création du lot actif appartient à l'intégration, pas à cette contribution. |
| `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et `construction.json` | Compléter les notices de construction si elles sont utiles ; préserver les identifiants et conditions actés. Les `minSeason` déjà corrigés restent en place ; aucune date de première apparition inventée. |
| `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json` | Mettre en cohérence les sept notices si l'intégration choisit cette destination. Éviter le double chargement d'une même nouvelle fiche dans recherches et contributions intégrées. |
| `Charmed/canon/bibliotheque-verifiee.json` | Ajouter uniquement les assertions effectivement revues au niveau requis. Ne pas convertir les 80 fiches en faits `verified` par simple import. Conserver les trois faits cristaux déjà présents. |
| `Charmed/BIBLIOTHEQUE.md` | Référencer le lot accepté, sa portée et les réserves ; ne pas annoncer une expertise exhaustive. |

Le JSON de contribution reprend les champs usuels du dossier de recherche (`version`, `sources`, `fiches`, `canon`, `episodesReperes`, `conditionsPourLeJeu`, `limitesEtIncertitudes`, `activation`) et ajoute la provenance et les cartes. Il est **structuré pour une revue**, sans promesse de compatibilité d'import aveugle. Aucun patch du moteur n'est nécessaire à cette proposition ; le chargeur actuel et le schéma final devront être contrôlés après une éventuelle fusion par la conversation principale.

## 9. Vérifications effectuées et travail restant

Vérifications documentaires : recherche web réelle, sources d'objets et d'épisodes rapprochées, distinction IS/IT/T, provenance des huit fiches existantes, lecture du lot intégré actuel, séparation des connaissances et des descriptions de carte, retrait des développements identifiés comme comics/reboot, nuances d'activation et de chronologie conservées.

Vérifications structurelles : 80 identifiants distincts, 80 fiches renseignées, 81 descriptions avec la variante de Cupidon, 78 fiches de propriétés et deux identifications, références de sources résolues, identifiants d'épisodes présents dans l'index local, JSON lisible et fichiers produits limités au dossier `objets-magiques`. Les titres d'épisodes proviennent de l'index local : ce contrôle ne vérifie pas visuellement les scènes. Détails dans `VERIFICATIONS.json`.

Les écritures de cette contribution ont été limitées à son dossier. Aucun serveur redémarré, aucune partie lancée, aucune sauvegarde ouverte ou modifiée. Les empreintes des fichiers lus servent à situer l'état documentaire, pas à affirmer qu'aucune autre conversation ne les a modifiés.

Travail restant pour une expertise exhaustive : terminer les candidats non qualifiés, parcourir les accessoires des épisodes non couverts, vérifier les traductions françaises dans les versions pertinentes, visionner/recouper les scènes décisives avant un usage de gameplay incertain. Priorités de revue : sortie des photographies, neutralisation de la cage, éventuel plafond du cristal des rêves, activation Ronyx, dénouement du Hollow S08. Les limites manquantes sur Rathmere et Kasimar restent explicitement inconnues.

Travail restant pour l'intégration : choisir les ajouts et textes retenus, fusionner sans perdre les références déjà revues, résoudre les variantes et doublons, valider le chargement dans l'environnement choisi par la conversation principale. Aucun test de jeu n'a été exécuté pour ce travail documentaire.

Livrables du dossier : `PROPOSITION_A_INTEGRER.md` (texte complet et sources), `objets.proposition.json` (données structurées), `catalogue-source.tsv` (table éditable), `construire_catalogue.py` (générateur local) et `VERIFICATIONS.json` (contrôles et empreintes documentaires).
''')

ids = [f['id'] for f in fiches]
assert len(ids) == len(set(ids))
assert all(sid in source_map for f in fiches for sid in f['sources'])
assert sum(f['statutProposition'].startswith('identification') for f in fiches) == 2
assert all(s['url'].startswith('https://') for s in source_map.values())
snapshots = {p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in source_files}
checks = dict(dateUTC=datetime.now(timezone.utc).isoformat(), nombreFiches=len(fiches),
    fichesProprietes=78, identificationsSansProprietes=2, descriptionsCarte=81,
    famillesExistantesRapprochees=8, nombreSourcesFiches=len(source_map),
    nombreEpisodesReperes=len({e for f in fiches for e in f['episodesReperes']}),
    idsUniques=True, referencesSourcesResolues=True, episodesPresentsDansIndex=True,
    jsonReparse=True, visionnage=False, scriptOfficielAuthentifie=False, importRuntime=False,
    testsMoteur='Non exécutés : contribution documentaire, aucun code actif modifié.',
    destinationEcriture=str(HERE), empreintesFichiersConsultes=snapshots)
for filename, obj in [('objets.proposition.json', meta), ('VERIFICATIONS.json', checks)]:
    value=json.dumps(obj, ensure_ascii=False, indent=2)+'\n'
    json.loads(value)
    (HERE/filename).write_text(value,encoding='utf-8')
(HERE/'PROPOSITION_A_INTEGRER.md').write_text(''.join(doc),encoding='utf-8')
print(json.dumps({k:v for k,v in checks.items() if k!='empreintesFichiersConsultes'},ensure_ascii=False,indent=2))
