# Technical Test

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
