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

Installation des dépendances

`npm install`

`npm install typescript`

## FAQ

## Contribution

Ce code a été entièrement écrit par Ludovic Bonheur

## License

Pas de license

- Introduction
- Requirements
- Recommended modules
- Installation
- Configuration
- Troubleshooting
- FAQ
- Maintainers

## Why yarn?

- Less generated files
- More efficient on loading packages
- Better performance

## Why typescript ?

Better for type management, testing and architectural consistency with the database

## Nodemon

Helps with developpement : reload app on file change

## Concurrently

Enable the use of tsc -w to convert typescript to javascript on change and nodemon to reload app on change at the same time

## ~~Csv-Parse~~

~~Should not use because we use DB~~
~~https://npmcompare.com/compare/csv,csv-parse,csv-parser,fast-csv~~

## Bon exemple d'architecture:

- Services
- Middleware
- Controllers
- Models (Interfaces)

https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2

## ~~Nanoid~~

~~Give an id to element but shouldn't use because DB already give id~~

- ~~Small~~
- ~~Fast~~
- ~~Safe~~

https://github.com/ai/nanoid/

## MySQL for Database

Pros :

- Better performance than csv read/write
- Easier way to filter data

Cons :

- Need to install MySQL to run the test
- Need to create a user with login : "test" and password : "123456" for testing

## MySQL Fix privilege error

~~Execute this two lines into the query in MySQL Workbench :~~

~~`ALTER USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';`~~
~~`flush privileges;`~~

Not safe, better use mysql2 which doesn't have this issue
