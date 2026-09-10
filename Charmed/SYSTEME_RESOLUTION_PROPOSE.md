# Système de résolution typé — proposition

**Statut : proposition de conception, non actée, non implémentée.** Rien ici ne remplace
`REGLES_ACTEES.md`. Ce document décrit comment rendre déterministe la grande majorité des
résolutions aujourd'hui déléguées au modèle, sans changer une seule règle de jeu.

## 1. Le principe

Aujourd'hui le modèle **juge** : il invente le nombre de moyens manquants, le délai, la
réussite et le fait obtenu. Le moteur ne fait que borner ces nombres.

La proposition inverse les rôles. Le modèle **traduit** une phrase libre en un triplet typé.
Le moteur **calcule** le reste.

```
                       AUJOURD'HUI                        PROPOSÉ
texte du joueur  →  modèle  →  {accepted, missing,   texte du joueur → modèle → {effet, cible,
                                delay, sufficient}                              affectations}
                    ↓                                                            ↓
                 moteur : borne 0..20                              moteur : calcule missing,
                                                                   delay, réussite, fait obtenu
```

Traduire est une tâche vérifiable : la sortie appartient à un vocabulaire fini, donc elle se
contrôle, se rejoue et se teste. Juger ne l'est pas.

Le gain mesurable est direct. `missing` et `delay` cessent d'être inventés. La réussite cesse
d'être une opinion. Deux parties identiques donnent le même résultat.

## 2. Les trois tables

Tout le système tient dans trois tables et une fonction. La troisième est instanciée par le
bestiaire.

### 2.1 Capacités — ce qu'une carte apporte

Dix-huit fentes. Une carte en fournit zéro ou plusieurs, chacune avec sa portée et sa période
de validité.

| Fente | Sens | Portée par défaut |
|---|---|---|
| `presence` | être physiquement au lieu | lieu |
| `perception` | voir ou entendre | vue |
| `premonition` | vision déclenchée par contact pertinent | aucune |
| `mobilite` | se déplacer, ou déplacer autrui par moyen ordinaire | trajet |
| `teleportation` | éclipse, transposition démoniaque | destination connue |
| `telekinesie` | agir à distance sur un objet | vue |
| `contrainte` | figer | vue |
| `detonation` | explosion moléculaire | vue |
| `force` | coercition physique ordinaire | contact |
| `savoir` | source de connaissance consultable | contact |
| `formule` | sort formulé, exige `savoir` et un locuteur | selon la formule |
| `consommable` | potion prête | contact ou jet |
| `confinement` | cristaux, dispositif de piégeage | lieu |
| `outil` | outil matériel d'ouverture ou d'ouvrage | contact |
| `acces` | moyen matériel d'entrer | lieu |
| `vecteur` | document ou message porteur d'information | — |
| `lien` | relation permettant d'obtenir un concours | contact |
| `autorite` | levier social ou institutionnel | contact |

Neuf fentes supplémentaires apparaissent presque uniquement du côté adverse. Elles ont été
tirées du bestiaire, pas inventées à l'avance.

| Fente adverse | Sens | Portée par défaut |
|---|---|---|
| `energie` | projection d'énergie offensive | vue |
| `deguisement` | prendre une autre apparence | contact |
| `invisibilite` | rester non perçu jusqu'à révélation | soi |
| `pistage` | suivre une trace jusqu'à sa source | trace |
| `terreur` | exploiter une peur ou une émotion existante | contact |
| `possession` | agir à travers un hôte | hôte |
| `regeneration` | se reconstituer après destruction | soi |
| `absorption` | prendre à autrui un moyen ou une force | contact |
| `temps` | agir sur la succession des jours | exceptionnelle |

`temps` n'est portée que par une seule carte du corpus. Elle reste hors du vocabulaire
général et ne peut être accordée qu'explicitement.

Une fente porte ses conditions. La `premonition` de Phoebe porte « contact avec un objet lié
à la cible ». Elle n'est pas commandable à volonté, ce que le système exprime en refusant de
la compter comme moyen d'un effet qu'elle serait seule à produire.

### 2.2 Effets — ce qu'une contribution prétend établir

Quatorze verbes. C'est le vocabulaire complet des clés, des verrous et des attaques.

| Effet | Fentes requises | Portée | Délai |
|---|---|---|---|
| `OBSERVER` | `perception` + `presence` | vue | 0 |
| `PRESSENTIR` | `premonition` + contact établi | aucune | 0 |
| `SONDER` | `savoir` + objet personnel de la cible | aucune | 1 |
| `TRANSMETTRE` | `vecteur` + `mobilite` ou `presence` | trajet | 1 |
| `DEDUIRE` | deux faits établis + `presence` | aucune | 0 |
| `PERSUADER` | `lien` + `presence` | contact | 1 |
| `DEPLACER` | `mobilite` + `acces` à la destination | trajet | 1 |
| `OUVRIR` | `outil` + `presence` | contact | 1 |
| `TENIR` | `presence` maintenue | lieu | 0 |
| `ENTRAVER` | un moyen couvrant l'effet visé + `presence` | portée de l'effet visé | 1 |
| `CONFINER` | `confinement` + `presence` + cible localisée | lieu | 0 |
| `PROTEGER` | `confinement`, `formule` ou `acces` + `presence` | lieu | 1 |
| `NEUTRALISER` | moyen de rang suffisant + atteinte | atteinte | 0 |
| `SAISIR` | `force` ou `telekinesie` + atteinte + cible transférable | atteinte | 0 |

Deux règles de composition s'ajoutent, tirées des règles actées.

**Consentement.** `DEPLACER` et `PERSUADER` sur une personne non contrainte exigent un fait
de consentement déjà établi, ou un `PERSUADER` réussi en amont. C'est la règle qui empêche
d'engager Élise comme un moyen sans son accord.

**Chaîne d'information.** `DEDUIRE` ne consomme pas ses faits sources et ne peut pas produire
un fait qu'aucune de ses sources ne contient. Connaître un horaire et un lieu ne donne pas une
identité.

### 2.3 Natures et rangs — ce qui rend une cible atteignable

Quatre rangs. C'est le cœur de la fidélité au canon, et la seule table qui décide d'un combat.

Le rang d'une créature est le **rang minimal du moyen requis pour la neutraliser durablement**.
Défini ainsi, il se compare directement au rang des pièces engagées, ce qui rend l'étape 3
calculable.

Les quarante-neuf créatures du corpus sont typées dans
[`BESTIAIRE_TYPE_PROPOSE.md`](BESTIAIRE_TYPE_PROPOSE.md) et sa version programmable
[`bestiaire-type.json`](bestiaire-type.json). Répartition obtenue :

| Rang | Moyen minimal requis | Créatures | Exemples |
|---|---|---|---|
| R0 | force ordinaire | 3 | le commanditaire, l'intermédiaire, le gardien |
| R1 | potion générique ou détonation | 9 | guetteur, éclaireur, Troxa, Krell |
| R2 | moyen nommé ou formule | 27 | Barbas, Balthazar, Lazarus, Furies |
| R3 | Pouvoir des Trois ou contexte exceptionnel | 7 | la Source, la Triade, Shax, Zankou |
| hors échelle | non neutralisables par ces moyens | 3 | l'Ange de la Mort, l'Ange du Destin, Cupidon |

Le rang d'un **moyen** de neutralisation se lit dans la même échelle.

| Moyen engagé | Rang atteint |
|---|---|
| `force` ou `outil` ordinaire | R0 |
| `telekinesie` seule | R0, déplace sans détruire |
| `detonation` | R1 |
| `consommable` générique | R1 |
| `consommable` nommé | rang de la cible nommée, et d'elle seule |
| `formule` avec `savoir` | R2 |
| trois sœurs engagées simultanément avec `formule` | R3 |
| `confinement` | tout rang, mais contient sans détruire |

Un `NEUTRALISER` réussit seulement si le rang du moyen atteint le rang de la cible. C'est la
convention actée sur les potions, rendue calculable. Une potion générique ne tue pas Zankou
parce qu'elle atteint R1 et qu'il est typé R3, pas parce qu'un arbitre l'a estimé.

Le cas de Zankou montre aussi la limite de l'échelle. Le corpus ne documente sa fin que dans un
contexte destructeur exceptionnel lié au Nexus. Sa fiche porte donc R3 **et** la mention
qu'aucune méthode jouable répétable n'est établie. Le système refuse alors le `NEUTRALISER`
au lieu d'inventer une recette.

**Immunités.** Vingt-sept créatures sur quarante-neuf portent une immunité tirée du corpus, pas
inventée. Elles se répartissent en trois familles, et chacune se calcule.

| Famille | Effet mécanique | Exemples documentés |
|---|---|---|
| une fente précise échoue | l'étape 5 rend un échec « parade » | le gel est inefficace contre le démon de l'eau ; les pouvoirs de Piper échouent contre les Furies ; Sykes résiste à une attaque énergétique ; Ludlow résiste au feu |
| la destruction ne tient pas | l'étape 7 produit « repoussé », pas « détruit » | Lazarus se reconstitue hors de la terre d'un cimetière ; les tentatives partielles repoussent Shax ; la Triade revient sous forme d'esprits |
| une précondition manque | l'étape 1 compte une fente manquante de plus | Troxa doit d'abord être rendu visible ; le contre-moyen de Masselin exige un accès interne ; la protection de Drazi tient à une bague à reprendre |

Une immunité doit être écrite dans la fiche de la créature, jamais improvisée. Une créature
absente du bestiaire doit être typée avant emploi.

## 3. La fonction de résolution

Elle est déterministe et sans hasard. Sept étapes, dans cet ordre.

```
resoudre(contribution, jour, plateau) :

  E ← EFFETS[contribution.effet]
  P ← pièces engagées, filtrées par disponibilité et par période canonique

  1. COUVERTURE
     fournies  ← union des fentes de P
     manquantes ← E.requiert \ fournies
     si manquantes ≠ ∅ → { pret: faux, missing: |manquantes| }

  2. PORTÉE
     si E.portee non satisfaite par P vers la cible → échec « portée »

  3. RANG            (effets de classe neutralisation seulement)
     si rang(P) < rang(cible) → échec « rang insuffisant »

  4. OPPOSITION
     pour chaque verrou actif dont la portée couvre cet effet
        si aucune clé réalisée contre lui → bloqué

  5. PARADE
     si la cible dispose d'une fente listée comme contre-moyen de E
        et que cette fente est libre à l'instant de la résolution → échec « parade »

  6. DÉLAI
     si jour < contribution.jourPret + E.delai → attente

  7. SUCCÈS
     fait ← E.produit(P, cible)
     retourner { succes: vrai, established: fait }
```

`missing` sort de l'étape 1. `delay` sort de la table des effets. Ni l'un ni l'autre n'est
plus une opinion.

### 3.1 Le combat, cas particulier de l'étape 3

Une attaque est un `NEUTRALISER` ou un `SAISIR` avec une échéance. Le moteur tient déjà la
déclaration, la révélation au lendemain et l'échéance. Ce qui change est le nombre requis.

`requiredCount` devient `|E.requiert|` calculé à la déclaration, au lieu d'être annoncé par le
modèle. Le nombre cesse d'être négociable, ce qui rend cohérente la garde d'immutabilité déjà
présente dans le moteur.

À l'échéance, la situation réelle décide selon les étapes 2 à 5. Un échec produit
mécaniquement l'avantage du défenseur, dont la nature est lue dans une table courte : moyen
révélé, moyen en récupération, ou fait d'observation acquis. Cela remplace un texte libre par
un choix parmi trois.

### 3.2 Les effets simultanés

La règle actée dit que les moyens et les conditions départagent, jamais le camp. Elle devient
un ordre de comparaison à trois niveaux, appliqué au seul point contesté.

1. Si un ordre causal est établi, l'un des effets étant précondition de l'autre, il s'applique.
2. Sinon, le rang des moyens départage.
3. Sinon, la situation antérieure tient sur le point contesté, et les autres effets se produisent.

## 4. Les treize règles magiques, encodées

Chaque règle du corpus devient une contrainte de table, pas une consigne de prompt.

| Règle | Encodage |
|---|---|
| Pouvoir des Trois | rang R3 seulement si trois cartes sœurs distinctes sont engagées simultanément et qu'une `formule` est fournie |
| Lien entre les sœurs | aucun effet automatique ; une rupture est un fait de plateau, jamais une conséquence de désaccord |
| Bénéfice personnel | marqueur sur l'effet, produisant une conséquence inscrite au scénario, jamais une sanction automatique |
| Livre des Ombres | fournit `savoir`, jamais `formule` seule ; accéder, lire et réaliser sont trois effets distincts |
| Potions spécifiques | une potion nommée porte le rang de sa cible nommée et de personne d'autre |
| Formules et effets | `formule` exige `savoir` et un locuteur présent ; l'effet visé est déclaré, pas déduit du texte |
| Guérison | fente absente avant sa date d'acquisition ; ne s'applique jamais à un mort ni à un démon |
| Localisation au cristal | `SONDER` exige un objet personnel de la cible ; produit une position, jamais une intention |
| Cage de cristaux | `CONFINER` exige pose, activation et cible localisée ; une carte en main ne confine rien |
| Temps et futurs | aucune fente temporelle par défaut ; elle doit être portée par une carte nommée |
| Possession et transfert | un hôte ne reçoit que les fentes explicitement listées sur la carte de possession |
| Vaincre, bannir, revenir | `NEUTRALISER` déclare son résultat parmi repoussé, emprisonné, banni, privé, détruit |
| Nature de l'adversaire | la vulnérabilité se lit sur la nature exacte, jamais sur la catégorie « hostile » |

## 5. Ce que ce système ne couvre pas

L'objectif de couverture est une cible de conception, pas une mesure. Le protocole ci-dessous
sert à l'établir honnêtement.

**Le repli.** Quand la traduction ne trouve aucun effet, aucune affectation complète, ou une
cible de nature inconnue, l'opération escalade vers le modèle comme aujourd'hui. Le système
reste donc total. Chaque escalade est journalisée avec la phrase qui l'a provoquée.

**Ce qui escaladera toujours.** Une proposition dont l'effet n'existe pas au vocabulaire. Un
litige canonique demandant une recherche. Un argument psychologique sur un personnage. Une
formulation ambiguë sur la cible réelle.

**Ce qui devient calculable et ne l'était pas.** Le caractère assuré d'une victoire. Si tous
les effets adverses sont typés, l'absence de menace réalisable devient une recherche bornée
sur les moyens libres de l'adversaire et les jours restants. C'est aujourd'hui un pur jugement
de modèle.

**Le protocole de mesure.** Rejouer les coups acceptés des cinq journaux à travers le
traducteur seul, sans arbitre. Compter la part qui obtient un effet et des affectations
complètes sans escalade. Ce chiffre est le taux de couverture réel. Il est mesurable
aujourd'hui, avant toute implémentation du moteur de résolution.

## 6. Première mesure sur les parties existantes

Classification manuelle de la **population entière** des contributions jamais créées dans les
cinq parties, soit quinze. Ce n'est pas un échantillon.

| # | Partie | Intitulé | Effet typé | Fentes des pièces engagées |
|---|---|---|---|---|
| 1 | A | Nina parle à Élise et l'accompagne | `PERSUADER` puis `DEPLACER` | `lien` + `mobilite` |
| 2 | A | Préparer la remise de la convocation | `TRANSMETTRE` | `vecteur` + `presence` |
| 3 | A | Regrouper les informations sur la réception | `DEDUIRE` | `vecteur` |
| 4 | A | Constater l'entrée d'Élise par l'accès surveillé | `OBSERVER` | `perception` + `presence` |
| 5 | A | Agression mortelle contre Élise | `NEUTRALISER` sur R0 | `force` |
| 6 | B | Invitation à parler à Phoebe | `TRANSMETTRE` | `lien` + `presence` |
| 7 | B | Réception de la convocation | `TRANSMETTRE` | `presence` |
| 8 | C | Cercle de protection autour du Livre | `PROTEGER` | `confinement` |
| 9 | D | Bouclier de cristaux autour du Livre | `PROTEGER` | `confinement` + `presence` + `savoir` |
| 10 | D | Reconnaître l'accès extérieur au sous-sol | `OBSERVER` | `perception` + `presence` |
| 11 | D | Observer la surveillance extérieure | `OBSERVER` | `perception` + `presence` |
| 12 | D | Intercepter le Guetteur | `ENTRAVER` | `presence` |
| 13 | D | Forcer la fermeture de l'accès au sous-sol | `OUVRIR`, déclaré à tort en attaque | `outil` + `presence` |
| 14 | E | Nina invite Élise à parler à Phoebe | `TRANSMETTRE` | `lien` |
| 15 | E | Surveillance de l'entrée principale | `OBSERVER` | `perception` + `presence` |

**Quinze sur quinze reçoivent un effet du vocabulaire.** Huit verbes suffisent à couvrir toute
la population réelle. `OBSERVER` et `TRANSMETTRE` en représentent à eux seuls plus de la
moitié.

Deux enseignements portent au-delà du comptage.

**Le système aurait tranché les deux verdicts contestés.** La réponse refusée sur le cercle de
cristaux revendiquait un blocage de toute téléportation démoniaque, capacité absente de la
fiche des cristaux : refus par table, sans arbitrage. La réponse refusée sur l'interception du
Guetteur ne traitait pas sa fuite, alors que `mobilite` est listée comme parade d'`ENTRAVER` :
échec par étape 5, sans arbitrage.

**Le système aurait empêché l'erreur de l'attaque sur un lieu.** La fermeture d'un accès n'est
pas une cible transférable, donc pas un `SAISIR`. La traduction aurait proposé `OUVRIR`, qui
est une clé. L'annulation rétroactive du journal n'aurait pas eu lieu.

### Ce que cette mesure ne prouve pas

La population est petite et tronquée. Aucune des cinq parties n'a dépassé le jour six. Ni
attaque exécutée, ni victoire, ni destruction d'un démon n'a jamais eu lieu. Les verbes de
combat, `NEUTRALISER`, `CONFINER` et `SAISIR`, n'ont donc presque aucune donnée réelle
derrière eux. La table des rangs est fidèle au corpus, mais elle n'a jamais été exercée en
partie.

Une couverture de quinze sur quinze sur des contributions d'ouverture ne se transpose pas
telle quelle à une fin de partie. Le chiffre à défendre reste à établir sur des parties menées
à leur terme.

## 7. Ordre de construction proposé

1. ~~Typer le bestiaire.~~ **Fait** : quarante-neuf créatures dans
   [`BESTIAIRE_TYPE_PROPOSE.md`](BESTIAIRE_TYPE_PROPOSE.md).
2. Valider le typage. Trente-sept entrées sont marquées `etablie`, onze `proposee`, une
   `a-verifier`. Ces douze demandent votre arbitrage avant emploi.
3. Typer les vingt-six cartes des trois scénarios existants, côté joueur.
4. Écrire le traducteur seul et mesurer la couverture sur les journaux existants.
5. N'implémenter la fonction de résolution que si la couverture mesurée est suffisante.
6. Étendre le typage aux quatre-vingts objets magiques du corpus.

Aucune de ces étapes ne touche au moteur ni ne modifie une sauvegarde.
