from pathlib import Path
import json, re, hashlib

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
data = json.loads((HERE / 'demons.proposition.json').read_text(encoding='utf-8'))
sources = {s['id']: s for s in data['sources']}
episodes = {e['id']: e for e in json.loads((ROOT / 'Charmed/canon/episodes-index.json').read_text(encoding='utf-8'))['episodes']}
entries = data['demons']
assert len(entries) == 40
assert len({e['id'] for e in entries}) == len(entries)
assert len(sources) == len(data['sources'])
fields = [('role', 'Identité et fonction'), ('powers', 'Pouvoirs et fonctionnement'), ('conditions', 'Conditions, portée et variantes'), ('counter', 'Contre-moyens et limites'), ('psychology', 'Psychologie et comportement')]
for e in entries:
    assert e['status'] == 'proposal_not_integrated'
    assert e['authority'] == 'background_proposal_only'
    assert not e['integration']['automaticActivation']
    assert e['exactRecipe'] is None
    assert e['card'] and e['uncertainties']
    assert all(ep in episodes for ep in e['episodeRefs']), e['id']
    assert all(s in sources for s in e['sourceIds']), e['id']
    for key, _ in fields:
        for block in re.findall(r'\[([^\]]+)\]', e[key]):
            for ref in block.split(', '):
                assert ref in sources and ref in e['sourceIds'], (e['id'], ref)

def linked(text):
    def replace(m):
        return '(' + ', '.join('[' + r + '](' + sources[r]['url'] + ')' for r in m.group(1).split(', ')) + ')'
    return re.sub(r'\[([^\]]+)\]', replace, text)

intro = '''# Démons de Charmed — proposition à examiner

Date : 8 septembre 2026. **Contribution documentaire proposée, non intégrée et non activée.**

## 1. Périmètre et livrables

La demande initiale sur Cole/Balthazar a été élargie par l'utilisateur : documenter le plus de démons possible, en commençant par les plus importants ou récurrents. Cette livraison rassemble **40 fiches**, incluant personnages individuels, incarnations, collectifs et espèces. Elle ne prétend ni compter 40 antagonistes récurrents distincts, ni couvrir tous les démons des 178 épisodes. L'ordre est une priorité éditoriale proposée, pas un classement acté de puissance.

Le dossier initial `balthazar-cole-allie` est conservé pour respecter le périmètre d'écriture autorisé. Aucun fichier actif, aucune sauvegarde et aucun autre dossier de contribution n'ont été modifiés par ce travail. Aucun serveur n'a été redémarré et aucune partie n'a été lancée.

- `PROPOSITION_A_INTEGRER.md` : présente synthèse, textes complets de 40 fiches et cartes, sources, arbitrages et modalités d'intégration.
- `demons.proposition.json` : même contenu sous forme structurée, avec identifiants, sources et épisodes ; format de contribution, **pas un remplacement directement chargeable** d'un fichier canonique.
- `FICHE_COLE_BALTHAZAR.md` : copie conservée du dossier initial complet, avec ses variantes de carte et ses recherches plus détaillées sur les états de Cole. Son périmètre initial reste historique ; la présente proposition décrit l'élargissement.
- `VERIFICATIONS.md` : contrôles documentaires, limites et cas de relecture.
- `preparer_documents.py` : génération locale des deux documents à partir du JSON ; ses écritures sont limitées à ce dossier. Aucun branchement au jeu.

### Fichiers existants et instructions consultés

Instructions AGENTS.md fournies et règles globales : `C:\\Users\\auror\\Documents\\Codex\\2026-08-29\\dis-moi-est-ce-que-tu\\outputs\\01_REGLES_GLOBALES_ACTEES.md`.

Lectures du projet :

- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : règles et décisions de référence.
- `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` et `magie-demons.json` : 15 fiches démoniaques existantes, propriétés et limites ; base à enrichir, pas à effacer.
- `Charmed/canon/personnages.json` : personnages et identifiants, en particulier `cole`.
- `Charmed/canon/bibliotheque-verifiee.json`, `construction.json`, passages pertinents de `CONSTRUCTION_DES_PARTIES.md` : formats, preuves et distinction des moyens ; recettes incomplètes non inventées.
- `Charmed/canon/episodes-index.json` : titres et numérotation TVmaze ; uniquement navigation, jamais preuve des événements.
- `Charmed/canon/EXPERTISE_DOSSIER.md` : historique et lacunes ; certaines indications techniques anciennes sont dépassées par les fichiers plus récents.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json`, ainsi que les fichiers correspondants de `2026-09-08-organisations-phenomenes-enquetes` : recherches ciblées sur les moyens et la Confrérie.
- `Charmed/contributions/personnages-expertise-s1-s8/PROPOSITION_A_INTEGRER.md`, `personnages.proposition.json`, `JOURNAL_RECHERCHE.md` : consultation ciblée des démons, des variantes et du statut de la contribution parallèle. Ces propositions ne deviennent pas des décisions actées du seul fait de leur présence.
- `serveur/charmed/bibliotheque.js` et passages/importations pertinents d'`expertise-runtime.js` : identification des consommateurs des données. Inspection ciblée, pas audit exhaustif du code ni observation d'une partie en cours.

## 2. Constats, propositions et contradictions

### Ce qui est acté et conservé

Les connaissances doivent informer l'Ange sans garantir une victoire. Disponibilité, période, cible, accès et concours effectif d'un allié doivent rester évaluables. Aucun coût, dé, compteur de corruption, durée de récupération, quota de jeu ou impossibilité nouvelle n'est instauré ici. Un manque de documentation reste une incertitude. Les cartes décrivent les propriétés propres de la ressource et ne donnent pas une solution stratégique.

### Enrichissements proposés

Les 15 entrées déjà présentes sont conservées sous leurs identifiants et reçoivent des précisions datées. Les 25 autres fiches sont candidates à l'ajout après dédoublonnage. Cole/Balthazar correspond au personnage `cole` et à la fiche démoniaque `belthazor` : ce lien ne doit pas créer deux alliés indépendants. Le JSON indique les rapprochements déjà identifiés, pas une autorisation de fusion automatique.

Séparer particulièrement : pouvoirs innés et pouvoirs acquis ; démon original et personne transformée ; corps et âme ; destruction corporelle et retour spirituel ; titre de Source et détenteur ; groupe et arsenal de chacun de ses membres.

### Contradictions ou décisions à arbitrer avant intégration

1. **Période des ressources.** Les 40 cartes ne peuvent pas être simultanément disponibles par défaut. Fixer leur version selon la partie, sans ressusciter silencieusement un personnage disparu. Le choix d'un scénario hors chronologie serait une décision de scénario, pas un fait de la série.
2. **Cole « moitié démoniaque réprimée ».** Maîtrise morale, influence magique levée et pouvoirs retirés sont distincts. Choisir la variante explicite ; voir l'annexe initiale. Le texte court ici vise sa phase alliée avec pouvoirs.
3. **Barbas.** La fenêtre de S1 n'est pas une loi de tous ses retours ; les capacités acquises en S5 ne sont pas toutes natives.
4. **Zankou.** Déguisement acquis, vols par potion et destruction avec le Nexus ont des conditions précises. La page Fandom mélange aussi des développements des comics : ils sont exclus.
5. **Triade.** Les résumés de S08E16 divergent sur l'attribution d'un projectile à un membre ; l'attribution nominative est suspendue. Le final gagne contre son retour, sans justifier ici une impossibilité absolue de toute résurrection.
6. **Nature démoniaque et émotions.** Des répliques liées à Vinceres simplifient cette relation ; Cole, Kyra et Drake empêchent de décréter que tout démon est dénué d'émotions, incapable de coopération ou automatiquement loyal au Mal.
7. **Taxonomie.** Les sorcières Billie et Christy, les warlocks comme Nicholas ou Eames, les Avatars et les Fondateurs ne sont pas ajoutés comme démons. Une catégorie générale de menaces serait un choix de bibliothèque distinct. Woogyman n'est pas le Nexus lui-même.
8. **Noms.** Balthazar/Belthazor, Seer/Prophétesse et les traductions proposées pour les espèces doivent être rapprochés des noms déjà retenus par le jeu ; ne pas créer des doublons à cause d'une traduction.
9. **Numérotation.** `Charmed Again` est regroupé sur la transcription S04E01 ; des scènes concernent les deux parties. Jeric est S05E10 dans l'index local mais S5E9 dans le synopsis Paramount trouvé. Le titre d'épisode prévaut pour retrouver la scène. Lazarus : S04E15 ; Gith : S06E06 ; Seekers : S03E16.
10. **Historique technique.** Certaines notes d'`EXPERTISE_DOSSIER.md` décrivent un état non raccordé plus ancien ; `BIBLIOTHEQUE.md`, la préparation et les importations actuelles décrivent un état ultérieur. Cette contribution ne rétablit pas l'ancien état ni ne certifie l'état d'un serveur ouvert.
11. **Contribution parallèle.** Les textes concernant les personnages déjà traités doivent être comparés assertion par assertion avec `personnages-expertise-s1-s8`. Aucun arbitrage de formulation ou de statut de preuve n'a été appliqué silencieusement au corpus actif.

## 3. Niveau réel des recherches

Recherches web effectuées sur la série originale S1–S8. **Aucun épisode n'a été visionné dans ce travail.** Les pages Springfield sont des transcriptions non officielles consultées, avec des attributions parfois absentes ; elles ne valent pas script de production. Les résultats Fandom retenus sont marqués comme extraits de recherche : même lorsqu'un résultat est long, il n'est pas promu en lecture intégrale de la page. Plusieurs pages Springfield ont été inaccessibles, notamment S02E08, S02E10, S02E18, S04E07, S04E12, S04E21, S05E04, S08E16 et S08E22 ; les extraits de remplacement restent d'un niveau inférieur.

Le synopsis Paramount sur Jeric est une source officielle pour son identité et son intention, pas pour ses mécanismes détaillés. L'étude sur le Démon de l'Illusion n'a été accessible que par extrait. Les wikis dérivés, fanfictions, comics, romans et reboot rencontrés dans les résultats ont été écartés comme preuves de la série. Les rubriques mixtes des pages Zankou et Tyler ont été filtrées pour exclure leurs prolongements en comics.

Chaque paragraphe important porte ses références. Les cartes sont des synthèses proposées des paragraphes sourcés de la même fiche ; elles n'ajoutent pas un statut « vérifié ». Les limites d'une fiche valent aussi pour sa carte. Les détails qui restent insuffisamment étayés sont explicitement laissés ouverts plutôt que complétés de mémoire.

## 4. Index des 40 fiches

| Ordre | Ressource | Type | Priorité proposée |
|---|---|---|---|
'''
lines = [intro]
for i, e in enumerate(entries, 1):
    lines.append(f"| {i} | {e['name']} | {e['entityType']} | {'Majeur / récurrent' if e['priority'] == 1 else 'Complément spécialisé'} |")
lines.append('\n## 5. Textes complets proposés\n\nLes blocs « Ange du destin » sont documentaires. Le bloc « Carte » est le texte court proposé, sans procédure de victoire.\n')
for i, e in enumerate(entries, 1):
    lines += [f"\n### {i:02d}. {e['name']}\n", f"Identifiant proposé : `{e['id']}`. Type : `{e['entityType']}`. Statut : proposition.\n", '**Repères :** ' + ' ; '.join(ep + ' — ' + episodes[ep]['title'] for ep in e['episodeRefs']) + '.\n', '**Fiche destinée à l’Ange du destin**\n']
    for key, label in fields:
        lines.append(f"- **{label} :** {linked(e[key])}")
    lines.append(f"- **Incertitudes :** {e['uncertainties']}")
    lines.append('\n**Description courte proposée pour la carte**\n\n> ' + e['card'] + '\n')
    levels = sorted({sources[s]['level'] for s in e['sourceIds']})
    lines.append('Niveau des appuis : ' + ', '.join('`' + x + '`' for x in levels) + '. Aucun visionnage direct.\n')
lines.append('''\n## 6. Registre des sources

Consultation/recherche : 8 septembre 2026. Les codes T désignent une transcription non officielle consultée, pas une source audiovisuelle directement auditée. Les liens précis ci-dessous et les repères par fiche permettent de reprendre chaque recherche. Les sources du dossier Cole antérieur restent également détaillées dans l'annexe.
''')
for s in data['sources']:
    lines.append(f"- **{s['id']}** — [{s.get('episode', s['id'])}]({s['url']}) ; `{s['level']}`. {s['scope']}")
lines.append('''\n## 7. Fichiers actifs concernés si la contribution est retenue

| Fichier | Modification à préparer dans la conversation principale |
|---|---|
| `Charmed/canon/magie-demons.json` | Enrichir les 15 identifiants existants ; évaluer 25 ajouts ; conserver types, variantes, limites et provenance. Adapter le schéma, ne pas remplacer le fichier par le JSON de contribution. |
| `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` | Reporter les fiches retenues et leurs incertitudes, en cohérence avec le JSON. |
| `Charmed/canon/personnages.json` | Rapprocher les démons individuels déjà présents et leurs périodes, dont `cole` ; éviter les ressources dupliquées. |
| `Charmed/canon/bibliotheque-verifiee.json` | Ajouter seulement les assertions après examen selon son schéma. Ne pas donner automatiquement le statut vérifié à nos extraits ou transcriptions. |
| `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` | Uniquement si des moyens précis sont retenus ; conserver les recettes non auditées à null et les conditions. |
| `Charmed/recherche/.../fiches.json` et documentation associée | Éventuelle normalisation du corpus de recherche dans le format existant, à décider par l'intégrateur. Le chargeur ne lit pas directement ce dossier de contribution. |
| `Charmed/BIBLIOTHEQUE.md` | Mettre à jour l'index après intégration effective, pas sur la seule existence de cette proposition. |

Les règles, décisions et sauvegardes ne sont pas des cibles de modification par défaut. Une nouvelle règle de scénario exige un arbitrage explicite. Aucun patch de code n'est nécessaire pour examiner les textes ; aucun patch actif n'a été appliqué.

## 8. Vérifications et travail restant

Les contrôles de `VERIFICATIONS.md` portent sur la cohérence documentaire : 40 identifiants uniques, références résolues, épisodes présents dans l'index local, textes de carte présents, absence d'activation et de recette inventée. Ils ne démontrent pas la vérité audiovisuelle des affirmations ni un comportement du moteur.

Travail restant : reprendre prioritairement les passages de la Source, Barbas, Zankou et de la Triade sur vidéo ; préciser les inventaires datés et les contre-moyens encore ouverts ; rapprocher la contribution parallèle ; choisir les variantes et noms ; adapter les assertions au schéma canonique puis vérifier leur consommation par l'Ange dans un cadre autorisé, sans intervenir sur une partie en cours.

L'élargissement à d'autres démons reste possible, mais ce dossier n'annonce pas une couverture exhaustive de la série. Il fournit un ensemble relisible maintenant, avec ses lacunes visibles. La conversation principale reste responsable de la vérification et de l'intégration.
''')
(HERE / 'PROPOSITION_A_INTEGRER.md').write_text('\n'.join(lines), encoding='utf-8')

checks = '''# Vérifications documentaires — 8 septembre 2026

Statut : proposition non intégrée. Contrôles de structure exécutés par `preparer_documents.py` ; aucun test du jeu, visionnage d'épisode ou audit de partie en cours.

- 40 fiches ; identifiants uniques.
- Toutes les références citées dans les paragraphes existent dans le registre et dans la liste de sources de la fiche.
- Tous les repères d'épisodes existent dans l'index local TVmaze. Ce contrôle ne prouve pas les événements.
- Texte court, cinq rubriques documentaires et incertitudes présents dans chaque fiche.
- Tous les statuts restent `proposal_not_integrated` et `background_proposal_only` ; activation automatique false.
- Toutes les recettes exactes restent null : pas de dosage ou d'incantation complétés sans preuve.
- L'ancien document Cole a été conservé dans `FICHE_COLE_BALTHAZAR.md` avant le remplacement du document principal.
- Écritures limitées à ce dossier ; les chemins de sortie du générateur sont fixes et relatifs à son propre emplacement.

## Cas de relecture proposés à l'intégrateur — résultats attendus, non tests exécutés

| Situation | Interprétation attendue |
|---|---|
| Cole vient de perdre ses pouvoirs en S04E08 | La carte de Balthazar avec pouvoirs n'est pas sa version actuelle. |
| Cole maîtrise ses pulsions mais conserve sa nature démoniaque | Ne pas effacer toute sa magie. |
| Barbas revient en S5 | Ne pas appliquer automatiquement la fenêtre de S1 ; vérifier les pouvoirs acquis. |
| Zankou avant absorption du métamorphe | Ne pas lui attribuer encore ce déguisement. |
| La Source utilise le Néant | Identifier le moyen externe ; ne pas l'inscrire comme capacité native permanente. |
| Un corps de la Triade disparaît | Vérifier l'état spirituel et les conditions de reconstitution. |
| Un Lazarus explose | Examiner ses restes et leur ensevelissement avant de dire le retour empêché. |
| Un Grimlock possède une vue volée | Examiner le délai et la survie des enfants ; pas de vision d'auras illimitée. |
| Imara occupe le corps de Phoebe | Suivre corps, âme et cible réelle d'une action séparément. |
| Klea observe une scène truquée | Ne pas lui donner une télépathie ou une connaissance infaillible du vrai. |
| Dumain traverse le temps avec la bague de Coop | La bague est un prérequis externe, pas un pouvoir personnel. |
| Drake devient humain par contrat | Ne pas conclure automatiquement qu'il perd ses pouvoirs. |
| Une fiche secondaire de Zankou mentionne Tyler et des portails | Rejeter ces éléments des comics pour le périmètre S1–S8. |
| Un personnage est une sorcière antagoniste | Ne pas le reclasser démon pour remplir la bibliothèque. |

## Limites de vérification

Relecture textuelle et contrôles structurels uniquement. Sources principalement non officielles, avec plusieurs affirmations soutenues par de seuls extraits. Les cartes Oracle, Klea et plusieurs démons ponctuels nécessitent particulièrement une reprise des scènes avant promotion en connaissances vérifiées. L'inventaire des capacités n'est pas exhaustif. Aucune comparaison de l'état global du dépôt n'est utilisée pour attribuer les modifications des autres conversations à cette contribution.
'''
checks += '\nStatistiques calculées : ' + str(len(entries)) + ' fiches, ' + str(len(sources)) + ' sources recensées, ' + str(sum(e['integration']['activeDemonId'] is not None for e in entries)) + ' correspondances avec les entrées démoniaques existantes.\n'
checks += '\nSHA-256 du dossier Cole conservé : `' + hashlib.sha256((HERE / 'FICHE_COLE_BALTHAZAR.md').read_bytes()).hexdigest() + '`.\n'
(HERE / 'VERIFICATIONS.md').write_text(checks, encoding='utf-8')
print(json.dumps({'fiches':len(entries),'sources':len(sources),'episodes_valides':True,'references_valides':True,'sorties':['PROPOSITION_A_INTEGRER.md','VERIFICATIONS.md']}, ensure_ascii=False))
