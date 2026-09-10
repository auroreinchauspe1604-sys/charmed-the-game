# Graphe causal de la magie — saison 1

Mécanismes généraux de la magie dans la série originale, extraits des transcriptions de dialogue S01E01 à S01E22. Base pour un moteur de résolution. Les nœuds ne nomment ni personnage ni lieu précis.

- `graphe-s1.json` : graphe consolidé. 72 nœuds typés (ACTOR, SPACE, THING, NARRATIVE, MOMENT), 105 liens avec verbe, statut et épisodes, 48 actions par type d'acteur, contradictions résolues, questions ouvertes.
- `bestiaire-s1.json` : 23 créatures de la saison 1 avec rang, fentes et portées, immunités, loi (proie, fenêtre, cycle), clés de neutralisation et issue, actions, valeurs chiffrées tirées du dialogue. Vocabulaire aligné sur SYSTEME_RESOLUTION_PROPOSE.md.
- `camp-du-bien-s1.json` : pendant du bestiaire pour le bien. 13 acteurs (sœurs, Pouvoir des Trois, ancêtres, Être de lumière, alliés) avec pouvoirs, déclencheur, canal, portée, cibles sans effet, vulnérabilités, actions ; 8 règles communes ; 12 ressources (sorts, potions, talismans).
- `unites-generiques-s1.json` : gabarits sans nom à instancier librement. 8 unités du mal (warlock, métamorphe, suivant démoniaque, grimlock…) et 7 du bien (sorcière novice, innocent, mortel allié, Être de lumière…).
- `episodes/SxxEyy.json` : extraction brute par épisode, avec citations courtes servant de preuve.

## Statuts

- `E` : établi dans au moins un épisode.
- `C` : affirmé par un personnage, jamais confirmé.
- `?` : effet observé, cause non expliquée.
- `N` : vrai dans certains cas, contredit dans d'autres ; la note précise lesquels.

## Limites

Les transcriptions sont des relevés de fans, sans locuteur ni didascalie. Ce que montre l'image sans que personne le dise manque. Les extractions par épisode ont été produites par des agents, puis la consolidation a été faite à la main. Aucun épisode n'a été visionné. Ce graphe est une hypothèse de travail, pas une preuve canonique au sens de BIBLIOTHEQUE.md.
