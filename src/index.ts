import cors from "cors";
import mysql from "mysql2";
import express from "express";
import { nanoid } from "nanoid";
import csvtojson from "csvtojson";
import { CommonRoutesConfig } from "./common/routes";
import { RentalsRoutes } from "./components/rentals/routes";
import Rental from "./components/rentals/model";

// ----- Initialize Database -----
let db = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "123456",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server");

  db.query("DROP DATABASE mysqlTest", (err, result) => {
    db.query("CREATE DATABASE mysqlTest", (err, result) => {
      if (err) throw err;
      console.log("DATABASE created");
    });

    db = mysql.createConnection({
      host: "localhost",
      user: "test",
      password: "123456",
      database: "mysqlTest",
    });

    db.query("DROP TABLE rentals", (err, result) => {
      const sql =
        "CREATE TABLE rentals(id VARCHAR(255), city VARCHAR(255), postalcode VARCHAR(255), price INT, nb_beds INT, nb_baths INT, rating INT, owner VARCHAR(255), description VARCHAR(255), PRIMARY KEY(id))";
      db.query(sql, (err, result) => {
        if (err) throw err;
        // Todo set all rentals values in the dao rentals object
        const fileName = "./assets/rentals.csv";

        csvtojson()
          .fromFile(fileName)
          .then((source) => {
            // Fetching the data from each row
            // and inserting to the table "sample"
            for (let i = 0; i < source.length; i++) {
              const item = [
                source[i]["id"],
                source[i]["city"],
                source[i]["postalcode"],
                source[i]["price"],
                source[i]["nb_beds"],
                source[i]["nb_baths"],
                source[i]["rating"],
                source[i]["owner"],
                source[i]["description"],
              ];

              var insertStatement = `INSERT INTO rentals VALUES(?,?,?,?,?,?,?,?,?)`;

              // Inserting data of current row
              // into database
              db.query(insertStatement, item, (err, results, fields) => {
                if (err) throw err;
              });
            }
            console.log("All items stored into database successfully");
          });
        console.log("TABLE created");
      });
    });
  });
});

// ----- Create express server -----
const app = express();
const port = 8080;

const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`GET request to homepage \n Hello World its a new node app!!`);
});

// ----- Modular routes array -----
routes.push(new RentalsRoutes(app));

// ----- Start server -----
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
