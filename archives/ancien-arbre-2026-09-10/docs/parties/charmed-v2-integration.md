> Document historique v2. Depuis le 8 septembre 2026, la référence active est `Charmed/REGLES_ACTEES.md` et le moteur est v3. Les règles ci-dessous décrivent les anciennes étapes et ne doivent pas remplacer les décisions actées.

# Charmed v2 — intégration du 7 septembre 2026

## Ce qui est intégré

- Plateau dédié sur `/`, ancien plateau sur `/ancien` sans modification de ses journaux.
- Scénario préparé « Avant que la vision s'accomplisse » ; deux camps, Phoebe et le commanditaire. Élise est une cible présente et une ressource personnage ; son concours doit être établi pour l’engager.
- Coups contrôlés par le serveur, une pièce par pose, questions et réponses au propre passage. Propositions de ressources gratuites en dehors du passage également, hors Radio.
- Phases persistées : joueuse, adversaire, matin, fin. Les effets se produisent au matin suivant les journées de préparation. Le matin du jour 12 clôt la partie.
- Combinaisons progressives : pour les clés, suffisance réévaluée à chaque contribution sans recette révélée ; les exigences des attaques sont annoncées au matin prévu. Une ressource unique ne peut remplir deux rôles. Au moins deux moyens sur la voie principale.
- Sous-objectifs librement nommés dans une capacité calculée pour la partie, plusieurs clés possibles ; rétention de leurs pièces jusqu'au constat vrai, même si une clé est acquise.
- Verrou principal sur la dernière clé, verrou de branche sur le sous-objectif. Le verrou garde une portée précise examinée par l'arbitre. Les pièces d'anciennes clés libres deviennent indisponibles ; les pièces engagées ailleurs ne sont gelées qu'à leur retour.
- Levée via une nouvelle clé et des moyens disponibles, sans exception pour les moyens gelés. Création d'un nouvel exemplaire possible si moyens disponibles ; coûts consommables contrôlés, pas de clone humain.
- Déclaration d'attaque consommant le coup après accord, sans pose initiale ; exigences et date cachées dans les réponses HTTP jusqu'au lendemain. Révélation par Radio, puis préparation d'une pièce par coup. Pas d'abandon.
- Date d'attaque calculée par le moteur : déclaration D, N poses à partir de D+1, délai d'exécution L>=1, matin D+N+L. Les propositions ne tenant pas dans le calendrier restant sont refusées.
- Attaque incomplète à échéance : échec sans report. Les attaques complètes peuvent entraîner consommation, perte, vol/transfert d'objet, récupération temporaire ou libération selon verdict. Pas de mort automatique des personnages en cas d'échec.
- Un résultat narratif ne donne pas automatiquement la victoire. Constat distinct de l'objectif sur faits établis, au matin ; impossibilité de deux objectifs incompatibles vrais.
- Interface sombre, territoires haut/bas, Radio/arbitre/coups adverses séparés, racines et voies latérales, sous-états dessous, verrous près de leur cible même dans l'autre territoire. Couleurs fonctionnelles, médaillons de propriétaire, détail au survol et au clic, glisser-déposer et justification contextuelle.
- Journal versionné protégé contre les écritures concurrentes, requêtes périmées et répétition du dernier envoi. En cas de coupure IA, aucune transaction partiellement validée n'est enregistrée.

## Décisions non transformées silencieusement en règles définitives

Pour disposer d'une version testable, deux conventions restent explicitement provisoires dans le panneau de règles : une attaque suspendue ou bloquée à son échéance échoue sans report ; les actions d'un même matin sont jugées sur la même position de départ. Un constat de victoire est toujours examiné après leurs conséquences.

Pas de quota de sous-objectifs imposé, puisque le nombre n'a pas été validé. Pas de mécanisme d'abandon de branche ajouté. Pas de système de retournement de personnages inventé ; un vol d'objet ne transfère pas une personne. Ces points restent à affiner en partie.

Les bandeaux utilisent actuellement des emblèmes, pas de faux portraits officiels. Les ressources utilisent des pictogrammes comme le plateau d'origine. Le cuivre distingue provisoirement les attaques, dont la couleur n'avait pas été arrêtée.

## IA et canon

Le moteur n'utilise pas les chaînes libres pour modifier ses règles. L'arbitre reçoit les propositions et retourne une structure contrôlée. L'adversaire reçoit uniquement la position publique et les connaissances de son propre camp. Il ne rédige pas directement le journal. Les contextes sont éphémères et les règles sont réinjectées à chaque appel.

Le client Codex local est lancé en lecture seule, depuis un dossier de requête temporaire, sans configuration utilisateur, avec une consigne de ne pas appeler d'outil. Aucun accès d'écriture au dépôt n'est donné à ces échanges. Ce n'est pas une garantie de modèle omniscient : la base canonique reste le périmètre partiellement vérifié indiqué dans le dossier de scénario. Le système doit refuser une capacité non établie plutôt que l'inventer.

La génération automatique de trois nouveaux thèmes et une bibliothèque exhaustive de la série ne sont pas implémentées dans cette passe : le thème choisi est chargé. Le code sépare le scénario pour les ajouter ensuite sans réécrire les règles.

## Vérification

Tests mécaniques : `node --test serveur/charmed/engine.test.js`.
Non-régression de l'ancien moteur : `python -m unittest discover -s scripts/tests -q`.
Intégration réelle IA en état temporaire : `node scripts/verify_charmed_live.js`.
Vérification navigateur : ouverture au jour 1, lecture des cartes, dialogue de détail ; aucun coup de test joué dans le journal réel. La mise à jour des capacités est enregistrée séparément au jour 3 sans avancer la partie.

Les témoins de faisabilité du JSON de préparation restent des aides de conception, pas le moteur ni un arbre de solutions imposé. Le champ `runtime_compatible:false` de ce JSON désigne sa non-compatibilité avec le format de l'ancien moteur ; la nouvelle source exécutable est `serveur/charmed/scenario.js`.

## Corrections demandées pendant la partie

- Ordre vertical : nom adverse, main adverse, sous-objectifs adverses, objectif adverse, objectif de Phoebe, sous-objectifs de Phoebe, main de Phoebe, nom de Phoebe. Le récit du coup adverse est à droite de son plateau ; les voies restent à droite des états.
- Le joueur choisit/glisse une ressource sur une cible. La fenêtre recueille son rôle de clé ou verrou et la justification. Aucune commande autonome « construire une clé ». Une pose supplémentaire doit aussi être justifiée et acceptée avant d’engager la pièce.
- L’arbitre répond dans la fenêtre immédiatement après son examen : recevabilité et suffisance des contributions engagées, sans nombre ni liste des moyens manquants pour une clé. La condition obtenue n’est annoncée qu’après résolution effective au matin. Les exigences d’attaque restent cachées jusqu’au lendemain.
- Les ressources comprennent les personnes et tout moyen cohérent : corps, bête, troupe, lieu tenu, objet, bourse, canal. Le serveur ne bloque plus une personne à protéger par sa catégorie ; l’arbitre vérifie ses possibilités et son concours. Pas de clonage ni de consommation d’un personnage comme ingrédient.
- Une question se pose depuis la carte ciblée. Une suspension affiche « ? » et rend la carte translucide ; la réponse se fait depuis la même cible au passage de son propriétaire.
- Chaque camp a des emplacements pointillés, cliquables pour le joueur. La capacité provient des chemins de conception privés dans `avant-la-vision-gameplay.json`, produits par `scripts/prepare_charmed_gameplay.js`, puis contrôlés par `serveur/charmed/gameplay.js`. Deux alternatives par camp ; ressources réelles, un coup de création, un coup distinct de déclaration si attaque, une pose par jour, résolution avant J12. Maximum du nombre de branches des alternatives : **3 pour Phoebe, 2 pour le commanditaire**. Aucun intitulé ou chemin n’est imposé. Estimation de faisabilité narrative sans opposition, pas une preuve mathématique d’équilibrage. La génération de nouveaux thèmes reste un travail distinct.
- L’état affiche VRAI ou FAUX séparément de la victoire. Une définition de scénario peut fixer `initialValue:true` et `goalMode:maintain`. Le maintien n’est pas une victoire immédiate ; la racine peut être constatée fausse, et la victoire de maintien se contrôle à l’échéance. Le scénario actuel garde ses deux objectifs initialement faux.
- Radio : bulletin violet en points courts, texte complet dépliable. Arbitre : décisions sur fond parchemin clair. Calendrier : dates publiques, conditions et impact possible pour chacun des camps. Il reprend les événements déjà préparés, sans effet rétroactif. Les impacts sont des opportunités/contraintes causales, pas des bonus automatiques. Les faits des événements conditionnels sont examinés au matin ; une attaque n’apparaît au calendrier qu’une fois révélée.

Validation de cette correction : tests mécaniques incluant capacités, état maintenu, justification de pose et confidentialité du calendrier ; contrôles navigateur des dialogues ressource, sous-objectif, attaque et question. La question a été soumise et sa transparence vérifiée dans une copie temporaire du journal.

## Révision « états et preuves » — redémarrage demandé

Un état est une phrase déclarative constatable, jamais une action. L’objectif adverse est maintenant « Élise est morte au plus tard au matin du jour 12. » Les sous-états sont nommés par le joueur et reformulés en propositions factuelles par l’arbitre ; leur création ne produit aucun résultat. Le serveur refuse les formulations d’action les plus directes, et le jugement narratif complète ce contrôle linguistique.

La première ressource acceptée crée une clé à découvrir. Le joueur précise sa contribution. Le nombre et la nature des ressources manquantes ne sont pas annoncés, ni transmis au navigateur. À chaque nouvelle pose, l’arbitre évalue l’ensemble des moyens réellement engagés ; une ressource nouvellement créée peut être pertinente, sans appartenir à une recette prédéfinie. Les moyens peuvent devenir suffisants, ce qui rend la clé prête pour sa résolution matinale. Les exigences d’une attaque conservent leur révélation au lendemain.

Plusieurs clés indépendantes peuvent établir des parties différentes du même sous-état. L’effet d’une clé existante reste fixe ; une autre contribution se construit dans une autre clé. Le constat vrai doit citer des acquis réellement obtenus, et non la simple préparation. Le fait obtenu est enregistré séparément de l’intention. Une clé acquise reste une trace compacte de preuve ; ses ressources restent retenues tant que son sous-état est faux. À leur libération elles passent un jour de récupération, puis redeviennent utilisables si aucun autre blocage ne l’empêche.

Le dossier ambigu de réception est remplacé, dans le nouveau départ, par l’invitation matérielle d’Élise, présente dans son sac. Sa présence ne signifie pas que Phoebe en a lu le contenu. Les notes de vision sont un objet ; les pouvoirs restent attachés à Phoebe. La reprise repart au matin du jour 1 ; le journal précédent est archivé avant le nouveau départ.

La modification différée des répliques de l’adversaire n’est pas ajoutée dans cette révision.
