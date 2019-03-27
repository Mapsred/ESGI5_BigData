# ESGI5 Big Data :

## Projet :

* Pour chaque groupe (4 personnes), créez un compte développeur sur twitter afin d'obtenir une clé token pour utiliser l'API Rest.
* Utiliser votre token avec python-tweepy ou R (ou autre : Java,Curl, PHP...) pour récupérer des données sur un mot clé choisi par votre groupe.
* Une fois ces données à peu près structurées, importez les sur ES.
* Extraire des indicateurs de ces données.
* Elaborez une stratégie d'analyse pour les extractions d'indicateurs plus
complexes.
* Préparez une présentation powerpoint (se mettre dans la peau d'une direction
Marketing pour conduire votre analyse).

## Details :

* L’idée est de faire une étude sur un phénomène donné (une analyse des sentiments), ce que vous communiquer comme étude devrait convaincre les décideurs de faire confiance à votre analyse/prediction...
Un exemple :
* Faire une analyse des sentiments sur la corrélation des tweets générés par les lycéens au USA concernant les armes/menace et les fusillades serait très intéressant pour le gouvernement pour prédire des futurs incidents
* Pour cela, on doit choisir très minutieusement les mots clés, hashtag, etc. généré par les utilisateur de twitter et la population visée.
Une fois les données récupérées, on peut faire nettoyage de données (texte mining) via le nuage de mot (stowords, stemming,etc.) afin connaitre les termes qui reviennent le plus, mais aussi les mots clefs, ensuite utiliser ma base elastic pour préparer ma données (via search, agrégats) et enfin créer une visualisation avec Kibana + D3js (ou équivalent) pour faire comprendre l’utilité de ma solution aux opérationnelles.