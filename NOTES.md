# Web front

## Menu :
Une barre ‘pipe’ s’ajoute automatiquement dans la deuxième partie de la navigation si l’on rajoute un lien.

**Version mobile :** La couleur s’adapte à la couleur du background actuel pour que ce soit plus cohérent. Le menu burger vient remplacer le menu ordinaire.

## Slider en-tête :
Défile verticalement et assez rapidement (dynamisme). Reste 7 secondes sur un produit pour laisser le temps à l’utilisateur de lire les informations et de voir les autres produits proposés. Fonctionne aussi avec l’ajout de nouveaux produits en json.

Pour les couleurs du background, j’ai repris le vert et le rouge de la maquette. Pour les autres couleurs, j’aurais aimé avoir un script qui récupère la couleur dominante de l’image mais je n’y suis pas parvenue, alors j’ai sélectionné des couleurs arbitraires en me basant sur les noms du json. J’ai utilisé un attribut data-color pour récupérer la couleur.

J’ai redimensionné les images pour les placer plus facilement sur ma page.

**Version mobile :** on voit la roue avant du vélo, qui est plus engageante que la roue arrière.

## Slider best-seller :
Je me suis aidée de tutos sur internet mais je l’ai arrangé pour qu’il convienne à ce projet. C’est une classe js où il est possible d’ajouter autant d’options que l’on souhaite. J’ai décidé de passer 1 article par 1 par souci de simplicité du code mais également pour la lecture (c’est un point de vue personnel). C’est un slider infini, où l’on voit le slider revenir au début.

**Version mobile :** j’aurais aimé gérer le touch sur mobile mais je n’ai pas eu le temps. 

## Slider auto nouveautés :
J’ai utilisé la même classe que les deux premiers. Il est possible de mettre le slider en pause si on laisse la souris sur une slide.

Je n’ai pas eu le temps de faire le slider des bulles de formations, j’ai préféré me concentrer sur les autres éléments qui me semblaient plus difficiles et importants.

## Historique des commandes :
J’ai créé une classe Collapse pour le déroulement des commandes passées. 

**Version mobile :** J’ai légèrement modifié la disposition du bouton pour que ce soit plus facile de cliquer dessus et également plus lisible.

## Tous les modèles :
J’ai réutilisé ici ma classe collapse pour voir tous les modèles disponibles. 

Je calcule en js la hauteur et la largeur des éléments du conteneur, ce qui fait que je peux facilement choisir d’en rendre visible 1, 2, ou 5 (utile pour le mobile).

Pour la recherche, j’ai décelé un bug de dernière minute. En effet, si je fais une recherche qui ne trouve aucun produit puis que j’annule ma recherche, je suis obligée de réactualiser ma page pour visualiser les produits.

La longueur des titres et des descriptions ne change pas le visuel et tout s’adapte.

**Version mobile :** la largeur des cartes s’adapte pour une meilleure lisibilité. Le collapse fonctionne toujours de la même manière.

## Footer :
**Version mobile :** Je n’ai pas voulu faire quelque chose de trop extravagant. J’ai simplement écarté les différents liens pour une plus grande facilité lors de la sélection.

## Résumé :
Je n’ai utilisé aucune librairie, pour les slider et les animations. 

J’ai rencontré des difficultés avec les diagonales, car le rendu pour la section des nouveautés est flou et je n’ai pas réussi à le corriger.


Amélie Mouillac