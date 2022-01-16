# Evaluation Technique

## Introduction

Pour cette évaluation technique, je devais produire une API HTTP REST.
Pour se faire j'ai utilisé NodeJS et Express pour le serveur et MySQL pour
la base de donnée. On m'a fourni un fichier CSV avec des données déjà enregistrés
que j'ai copier afin de pouvoir les manipulés dans ma DB.

- Une description complète de l'énoncé se trouve au lien suivant :
  https://drive.google.com/file/d/12Tt6sf86Q1izr7zmVmjwwEdwGNKSzAUK/view?usp=sharing

- La liste des données utilisées se trouve au lient suivant :
  https://drive.google.com/file/d/1MwyWRiNTBWElvgGRy8XeR7JWUs3K_PGQ/view?usp=sharing

## Requirements

Pour lancer le projet il est préférable d'avoir les dépendances suivantes :

- NodeJS 16.13.0
- Npm 8.1.0
- MySQL \*.

Pour MySQL, afin que le projet fonctionne correctement il faut ajouter sur votre instance
de serveur MySQL un utilisateur avec les informations contenus dans src/db.ts

- host: "localhost"
- user: "test"
- password: "123456"
- database: _Il n'est pas necessaire de creer une base de donnée pour le moement (On vera par la suite)_

## Installation

- Installation des dépendances

`npm install`

- Commande pour generer le code javascript à partir du code typescript

`npx tsc`

- Commande pour démarer le serveur

`npm start`

_Il faut generer le code javascript avant de lancer le serveur, car le code est en typescript hors_
_nodemon compile uniquement du javascript_

- Commande pour démarer les tests ( pour que les tests fonctionne il faut que le serveur soit lancé)

`npm test`

- Afin de commencer à realiser des requêtes qui va modifier la base de donnée il faut d'abord
  l'initialiser avec la requête suivante :

`curl --request GET localhost:8080/initializeDB`

## FAQ

...

## Contribution

Ce code a été entièrement écrit par Ludovic Bonheur

## License

Pas de license
