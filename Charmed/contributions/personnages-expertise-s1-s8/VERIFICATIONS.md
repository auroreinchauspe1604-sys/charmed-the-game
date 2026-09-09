# Vérifications de la contribution

Date : 8 septembre 2026.

## Contrôles effectués sur les fichiers écrits

Les deux JSON ont été relus depuis le disque avec PowerShell `ConvertFrom-Json`. Résultat : parsing réussi, aucune anomalie dans les contrôles ci-dessous.

| Contrôle | Résultat |
|---|---|
| Profils proposés | 40 |
| Identifiants du corpus actif couverts | 14 sur 14 |
| Observations / jalons | 150 |
| Sources mobilisées | 79 |
| Variantes de cartes | 64 |
| Cas privés de revue | 24 |
| Identifiants dupliqués dans profils, sources et jalons | Aucun |
| Références de sources manquantes | Aucune |
| Épisodes absents de l'index local | Aucun |
| Observation sans jalon correspondant | Aucune |
| Profil sans variante de carte ou rubrique de lacunes | Aucun |
| Profil inconnu dans les cas de contrôle | Aucun |
| Jalons automatiquement promus en faits actifs | Aucun : statut proposal_for_review, type documented_observation |

Le rapport et le JSON ont été construits à partir des mêmes fiches. Le nombre de sources du rapport concerne les références réellement mobilisées ; le registre de travail contenait aussi deux références non retenues. Les niveaux réels d'accès sont conservés.

Les champs et statuts supplémentaires constituent une proposition de format. Aucun test ne prétend que le moteur actif les interprète déjà. Le fichier ne doit pas remplacer directement le corpus existant.

## Comparaison ciblée des fichiers actifs

Les empreintes SHA-256 finales des dix fichiers ci-dessous sont identiques aux empreintes relevées pendant l'inspection précédant la rédaction. Cette comparaison couvre ces fichiers précis ; elle n'est pas un audit de toutes les modifications éventuellement effectuées par d'autres conversations dans le dépôt.

| Fichier | SHA-256 inchangé |
|---|---|
| Charmed/REGLES_ACTEES.md | E990CD5D2B0BFBB486F30821A60371AF6BC4683B11A83FC8B357913F1BE32DEA |
| Charmed/DECISIONS_ACTEES.md | AA2ADA48966595CED8ADECA9AE5638431E8A74B45B0A808293FBC6F6D7A76C93 |
| Charmed/BIBLIOTHEQUE.md | 29E678B4F7FDDC2F9BFF7F3215DE4F903E9CDF4914208EEE46ED61E939A8D89D |
| Charmed/PREPARATION_DOCUMENTEE.md | 09C9F207463146E8474121E8800CD718175090B6BE7DAA533CE4CC375E3A2499 |
| Charmed/canon/personnages.json | E1E78BE543DADD6E2A34909992750FE2D3C5CE620E50D05C47873AB8F5F86BA7 |
| Charmed/canon/magie-demons.json | 79B00B27DFCDDA5EE399A8549F3FA428AB628C60500C7EF5AE5366448A0A6558 |
| Charmed/canon/bibliotheque-verifiee.json | EB57BA84F572B382983B0BD358231D67BF5CEE649DDE64488A52585E4F034F94 |
| serveur/charmed/expertise.js | 8CA3373BCDE01B4CD1F9458D7C55DFE1E0AFE61ACECCB44012CA3DAAB6B3159C |
| serveur/charmed/canon.js | 76D8A05D29BF68BD4844720560C571AFE0F353CB01609D7825E47FB63085CEEA |
| serveur/charmed/expertise-runtime.js | 9FD00E46312BFD363926361C65D3E6B42413E6F570981C03CC6F6F93FFEAF651 |

Toutes les écritures de cette tâche se trouvent dans le dossier de contribution. Aucun serveur redémarré, aucune nouvelle partie, aucun journal de coups modifié.

## Limites des vérifications

- Aucun visionnage audiovisuel ; les transcriptions non officielles et extraits conservent leurs limites.
- Une référence valide et un épisode existant ne prouvent pas à eux seuls l'exactitude de l'affirmation.
- Aucun test de jeu ou du moteur exécuté. Les 24 cas sont des propositions pour la revue et la future intégration.
- Aucune vérification exhaustive de toutes les biographies, transformations, relations ou apparitions dans les huit saisons.
- Les événements d'un double épisode nécessitent encore une revue de scène avant une automatisation au moment exact.
- Les observations peu étayées ne doivent pas être converties automatiquement en règles ou en capacités permanentes.

