# Modifications des règles — 10 septembre 2026

Refonte de l'arbitrage, du joueur adverse et des conditions de proposition.
Validée par Aurore le 10 septembre 2026. Sauvegarde des fichiers d'origine dans `archives/avant-refonte-arbitrage-20260910-055441/`.

**Principe directeur retenu :** la précision est exigée au moment de la contradiction, pas au moment de la proposition. Le joueur dicte une phrase, l'Ange du destin valide si c'est possible sur le plateau, et c'est le camp adverse qui exploite les manques par la question.

---

## 1. Forme attendue d'une proposition

**Ajout** — Partie 3, nouvelle section 0.

| | |
|---|---|
| **Avant** | Aucune règle sur la forme d'une proposition. Le moteur demandait « Décrivez quoi, comment et dans quel but » et « Justifiez le rôle de cette ressource dans la préparation ». |
| **Après** | Une proposition se formule en une phrase naturelle. L'Ange du destin complète les détails ordinaires implicites, ne demande jamais de compléter le plan, de nommer un intervenant ou de justifier davantage. Ces manques sont l'affaire du camp adverse. Seule une ambiguïté de sens justifie un refus gratuit suivi d'une reformulation. |
| **Motif** | Le niveau de détail exigé rendait le jeu impraticable en dictée vocale. L'Ange faisait le travail de contradiction qui revient à l'adversaire. |

## 2. Fondement du refus

**Ajout** — Partie 3, section 1.3.

| | |
|---|---|
| **Avant** | Le refus devait indiquer « la contradiction ou la condition que l'action ne permet pas d'établir », sans exiger d'ancrage vérifiable. |
| **Après** | Tout refus se fonde sur un fait du plateau : une carte, une ressource, un engagement, un état identifiable dans la position — ou l'ambiguïté de sens. Une omission dans la proposition n'est jamais un motif de refus. Une lacune de bibliothèque non plus. |
| **Motif** | Des refus étaient prononcés sur ce que la proposition ne disait pas, jamais sur ce que le plateau établissait. |

## 3. Lacune documentaire

**Réécriture** — Partie 4, sections 2 et 6.

| | |
|---|---|
| **Avant** | Le joueur devait « demander une vérification à l'assistant chargé du projet » avant réexamen. Le moteur levait une erreur bloquante `CHARMED_MANUAL_REVIEW` et annulait le coup. |
| **Après** | La connaissance de *Charmed* sert uniquement à établir ce qui est possible ; la décision se prend sur la réalité du plateau. L'absence d'une fiche n'est pas une impossibilité et ne suspend jamais le jeu : l'élément est admis à sa portée ordinaire, l'incertitude est signalée en une phrase, le verdict est rendu. Seule une contradiction établie par une source rend une action impossible pour motif canonique. |
| **Motif** | Trois coups perdus dans la partie Nexus le 10 septembre, dont un verdict indiquant lui-même « aucune incompatibilité canonique n'est constatée » avant de bloquer. Une lacune de documentation devenait un obstacle de jeu. |

## 4. Attaque et verrou

**Ajout** — Partie 2, section 8.

| | |
|---|---|
| **Avant** | L'attaque visait « une personne, une ressource matérielle destructible ou un objet transférable », sans condition sur l'engagement de la cible. Le moteur ne vérifiait que propriétaire, présence et catégorie. |
| **Après** | Une attaque vise uniquement une ressource **libre dans la main adverse**. Une ressource déjà engagée se traite par un **verrou**, qui bloque l'usage qu'elle fait de son engagement sans la retirer à son camp. Le canal est déterminé par l'état de la cible sur le plateau, jamais par le vocabulaire employé : « neutraliser », « bloquer », « empêcher », « arrêter » ne déterminent rien. |
| **Motif** | Une proposition de verrou contre l'Éclaireur, alors engagé dans une clé adverse, avait été requalifiée en attaque au seul motif du verbe « neutralise ». Le calendrier long d'une attaque avait remplacé le blocage immédiat demandé. La règle du verrou exigeait déjà une cible engagée ; la restriction symétrique manquait du côté de l'attaque. |

## 5. Voie principale et voie des sous-états

**Réécriture** — Partie 3, section 3.1.

| | |
|---|---|
| **Avant** | « Une seule ressource peut suffire si elle permet réellement d'obtenir l'effet formulé. L'Ange du destin n'impose jamais un minimum artificiel de deux ressources. » Sans distinction entre voie principale et sous-états. |
| **Après** | **Voie principale** : une ressource ne peut être posée sur l'état initial que si la clé qui en découlera répond clairement à l'une des conditions définies dans cet état initial, et l'Ange nomme cette condition. La suffisance s'apprécie à la mesure de la condition : un moyen unique ne l'établit qu'exceptionnellement. **Voie des sous-états** : le système en détermine le nombre au début de la partie ; une seule ressource y suffit dès lors que la clé répond réellement, même en partie, au sous-état visé, plusieurs clés étant souvent nécessaires. **Aucun minimum n'est imposé nulle part.** |
| **Motif** | Une condition d'objectif initial était acquise avec une carte au premier jour. La difficulté doit venir du poids de la condition et de la pertinence des combinaisons, jamais d'un seuil. |

## 6. Personnes déterminantes

**Ajout** — Partie 2, section 4.1, symétrique de la règle sur les lieux.

| | |
|---|---|
| **Avant** | Rien. Seuls les lieux avaient un critère de nécessité. |
| **Après** | Une carte Personnage n'est nécessaire que si l'effet annoncé est un acte qui ne peut pas se produire sans quelqu'un pour l'accomplir, et si l'identité ou les capacités de cette personne déterminent ce que l'acte produit. Un effet matériel, automatique ou déjà en place n'en demande aucun. |
| **Motif** | Une clé validée avec des outils seuls, sans opérateur, dans un cas où l'acte en exigeait un ; et une clé validée avec des cristaux seuls, sans personne pour les disposer. Cette règle sert à juger la suffisance et à situer où l'adversaire peut questionner — elle n'autorise pas l'Ange à demander « par qui ». |

## 7. Exclusivité de l'engagement au moment du jugement

**Ajout** — Partie 3, section 3.4.

| | |
|---|---|
| **Avant** | Le moteur vérifiait qu'une ressource *posée* était libre. Rien ne portait sur les ressources dont l'acte a implicitement besoin. |
| **Après** | Une ressource engagée ne peut servir à rien d'autre tant qu'elle n'est pas libérée. Un acte dont la réalisation exige une personne, un objet ou un lieu actuellement engagé ailleurs est impossible et la proposition est refusée pour ce motif de plateau, que la ressource soit ou non désignée. |
| **Motif** | Cohérence de plateau : une clé ne peut pas s'appuyer sur une ressource retenue ailleurs. |

## 8. Une clé doit produire un changement

**Ajout** — Partie 3, section 3.3.

| | |
|---|---|
| **Avant** | La règle du non-doublon n'existait que pour les sous-états. |
| **Après** | Une clé doit établir un changement identifiable par rapport aux faits déjà acquis. L'Ange nomme ce changement ; s'il ne peut pas le nommer, la clé est refusée gratuitement. Occuper un passage déjà tenu, surveiller un accès déjà contrôlé ou décrire ce que fait habituellement une ressource ne produit aucun fait nouveau. |
| **Motif** | Trois clés adverses acquises dans la partie Nexus se contentaient de redécrire une situation existante et la carte engagée. |

## 9. Ressource = moyen, jamais solution

**Ajout** — Partie 4, section 7.

| | |
|---|---|
| **Avant** | Les cartes devaient éviter de « donner à l'avance la solution d'une clé », sans contrainte sur les chemins préparés. |
| **Après** | Une ressource distribuée est un moyen, jamais une solution. Aucun chemin préparé en privé ne peut être satisfait par l'emploi d'une seule ressource conforme à sa propre description : un guetteur qui guette, un éclaireur qui éclaire ou un gardien qui garde ne constituent pas des contributions. |
| **Motif** | Les trois chemins adverses du scénario Nexus associaient chacun une ressource à une contribution qui était la description de cette ressource. L'adversaire les a exécutés dans l'ordre, sans aucune réflexion à produire. |

## 10. Création de ressource

**Ajout** — Partie 3, nouvelle section 2 bis.

| | |
|---|---|
| **Avant** | Aucun critère écrit. Le moteur contrôlait concours, accès, ingrédients, unicité et documentation canonique. |
| **Après** | Examen en deux temps : possibilité dans l'univers à la période choisie, puis — critère principal — pertinence dans la situation actuelle du plateau : ce que la ressource apporte qui manque, par quel concours concret elle s'obtient, à quel délai et à quel coût. Une ressource sans apport est refusée pour ce motif ; une ressource qui résoudrait directement une condition de l'objectif l'est aussi. L'Ange fixe le délai et les conditions réelles d'obtention. |
| **Motif** | Trois demandes de création refusées pour lacune documentaire, sans que la question de leur utilité dans la partie ait jamais été posée. |

## 11. Table des malentendus

Sept lignes ajoutées, reprenant les points 1 à 8 ci-dessus.

## 12. L'acte composé n'est pas une ambiguïté

**Ajout** — Partie 3, section 0.

| | |
|---|---|
| **Avant** | La règle écrite ne connaissait que l'ambiguïté de sens : « deux lectures qui produiraient deux cartes différentes ». La précision figurait dans les consignes d'arbitrage, donc nulle part dans les règles. |
| **Après** | Une proposition qui enchaîne plusieurs effets liés, vise plusieurs objets de même nature ou se déroule en plusieurs temps donne **une seule carte** couvrant l'ensemble annoncé ; les moyens s'apprécient à la mesure de cet ensemble et une réalisation partielle s'établit comme fait partiel. Une conséquence énoncée après l'acte n'ouvre aucune seconde lecture. |
| **Motif** | Trois refus consécutifs pour « ambiguïté » sur des propositions parfaitement claires. La formulation de la règle invitait à cette lecture ; une consigne d'arbitrage ne pouvait pas la corriger, puisque les règles doivent primer. |

## 13. Ce qui est visible sur le plateau est connu des deux camps

**Ajout** — Partie 4, section 5.

| | |
|---|---|
| **Avant** | Les connaissances d'un camp comprenaient « les informations publiques du plateau », sans dire que la description publique d'une carte adverse en fait partie ni que cette connaissance est opposable à l'arbitre. |
| **Après** | Les cartes adverses posées, leur nature et leur description publique sont une connaissance commune, au même titre qu'un fait acquis. L'Ange du destin ne peut pas refuser une proposition au motif qu'un camp ignorerait ce que la description publique d'une ressource adverse énonce. Restent privés : justifications, recettes, plans non joués et exigences d'une attaque avant révélation. |
| **Motif** | Contestation du verdict sur la clé c4. L'Ange avait écrit qu'aucun fait du plateau n'établissait la nature des démons du camp adverse, alors que les deux cartes portent « Démon de bas grade » dans leur description publique. |

## 14. La contre-clé se forme sur un verrou prêt

**Ajout** — Partie 3, section 4.

| | |
|---|---|
| **Avant** | Une clé ne pouvait lever qu'un verrou **actif**. Le moteur et l'interface refusaient la pose tant que le verrou n'avait pas été examiné, sans dire pourquoi. |
| **Après** | La contre-clé se forme dès que le verrou est **prêt**. Elle ne produit aucun effet tant que le verrou n'est pas actif, et si le verrou n'est finalement pas établi, elle tombe sans objet et rend ses ressources — sans usure ni récupération. |
| **Motif** | Un verrou prêt est contestable pendant son délai de réaction, comme une attaque révélée se défend avant sa résolution. L'attaque avait sa fenêtre de défense, le verrou n'en avait aucune : le camp visé devait attendre l'activation, puis subir le délai de sa propre clé. Le verrou en sortait disproportionné. |

---

## Où vivent désormais les règles

Décision technique du 10 septembre 2026, sans effet sur le contenu des règles.

Jusqu'ici, les consignes envoyées à l'Ange du destin reparaphrasaient les règles. Il existait donc deux sources de vérité, et c'est ce qui a produit les refus contestés : l'Ange suivait la paraphrase, pas le document. Les paraphrases ont été supprimées.

- **Ce fichier de règles est la seule source.** L'Ange du destin et le camp adverse y accèdent par un pointeur `regles`, découpé en 74 sections. Ils lisent la table des sections, en ouvrent une par son titre — un titre approximatif suffit — ou cherchent où un point est traité.
- **Le message ne contient plus que le contrat de sortie**, c'est-à-dire la définition des champs que le moteur attend en retour : ce que compte `missing`, ce que désigne `maintainers`, quand `locations` est rempli, ce que signifient les quatre valeurs de `canon`. Ce ne sont pas des règles du jeu et elles n'ont pas leur place dans ce document.
- **La consigne dit explicitement qu'en cas de divergence, les règles l'emportent**, et impose de relire la section concernée avant tout verdict.

Conséquence pratique : **modifier une règle ici suffit désormais à changer le comportement de l'Ange du destin.** Il n'y a plus de texte à corriger ailleurs.

Effet mesuré sur le volume transmis : un message d'arbitrage pèse environ 16 Ko, contre 767 Ko au début de la journée. La consigne elle-même passe d'environ 15 Ko de règles empilées à 3 à 5 Ko de contrat.

---

## Ce qui n'a pas été modifié, après examen

- **Les deux modes d'objectif.** Un état peut commencer vrai ou faux ; ce sont deux façons de jouer et les deux camps jouent de la même manière — un état vrai se renforce par des clés comme un état faux se construit.
- **Les conditions de victoire.** Déjà conformes : toutes les conditions réelles établies, et aucun chemin adverse concret encore réalisable avant l'échéance. Un objectif en maintien ne peut jamais gagner avant le dernier jour.
- **Le quota de questions.** Une question par carte pour toute la partie, une seule réponse. Comme on ne questionne que les cartes adverses, aucun camp ne consomme le droit de l'autre.
- **Le mécanisme question / gel / réponse unique / trois issues.** Correct et correctement codé. Il n'avait simplement jamais servi.
