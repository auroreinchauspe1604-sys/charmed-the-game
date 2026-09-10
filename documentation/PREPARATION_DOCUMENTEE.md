# Préparation documentée — décision du 8 septembre 2026

1. Proposer les thèmes ; attendre le choix.
2. Construire un brouillon privé : objectifs, moyens, calendrier, chemins possibles et période.
3. Dresser l’inventaire des éléments et interactions, y compris ceux des épisodes de référence. Le rapport `researchReview` du brouillon commence cet inventaire ; il ne prétend pas remplacer une revue humaine des mécanismes implicites.
4. L’assistant recherche effectivement les sources en ligne. Vérifier les variantes et contre-exemples, les scènes pertinentes et les incertitudes. Si une source est inaccessible, le noter et chercher une autre source ; ne pas certifier ce qui n’a pas été consulté.
5. Conserver le dossier de recherche par partie et enrichir les fiches de la bibliothèque. Les assertions revues utilisables par le contrôle canonique sont enregistrées dans `canon/bibliotheque-verifiee.json`, avec un identifiant stable, un épisode, des sources, une formulation précise et des limites. Les autres fiches restent consultables comme références avec leur niveau de preuve.
6. Revoir la couverture, corriger le gameplay si nécessaire, puis lancer seulement après traitement des lacunes connues pertinentes. Le rapport initial porte `readyToStart: false` : produire un brouillon ne vaut pas cette validation.

## Ce que le code fait et ce qu’il ne fait pas encore

L’arbitrage charge la bibliothèque persistante et les dossiers de recherche à chaque demande. Les faits revus sont aussi reliés au contrôle des identifiants canoniques et filtrés par période. Une incertitude déclarée par le modèle interrompt l’opération avant son enregistrement au lieu de faire perdre une carte ou la réponse unique.

La recherche web et la revue avant lancement sont effectuées par l’assistant qui prépare la partie. Le transport IA du jeu demeure sans navigation Internet. Le rapport de préparation est un contrôle de workflow, pas un moteur de recherche autonome ni un verrou universel sur tous les scripts historiques de lancement. Il n’existe pas de garantie automatique d’absence de toute lacune ni de détection parfaite d’une erreur affirmée avec assurance par le modèle.

En partie, le joueur saisit l’assistant pour un élément imprévu. Après recherche, celui-ci complète les connaissances et réexamine la même proposition. Toute réparation d’une opération déjà enregistrée doit être ciblée et préserver les autres coups du journal.

La sauvegarde du Manoir assiégé n’est pas modifiée par ces changements. Le serveur déjà lancé doit charger le nouveau code avant d’en bénéficier.
