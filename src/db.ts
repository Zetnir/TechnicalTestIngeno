import mysql from "mysql2";
import csvtojson from "csvtojson";
import Rental from "./components/rentals/models/rentals.model";

class DatabaseService {
  host = "localhost";
  user = "test";
  password = "123456";
  database = "IngenoDatabase";

  connection = mysql.createConnection({
    host: this.host,
    user: this.user,
    password: this.password,
    database: this.database,
  });

  constructor() {
    this.connectDatabase();
    console.log("Connected to MySQL Instance");
  }

  // Connect to IngenoDatabase if available else connect to MySQL server without any database
  // If IngenoDatabase doesn't exist you must call createDatabase to start using the API
  connectDatabase() {
    this.connection.connect((err) => {
      if (err) {
        this.connection = mysql.createConnection({
          host: this.host,
          user: this.user,
          password: this.password,
          database: "",
        });
        this.connection.connect((err) => {
          if (err) throw err;
        });
      }
    });
  }

  createDatabase(name: string) {
    this.connection.query(`DROP DATABASE ${name}`, (err, result) => {
      this.connection.query(`CREATE DATABASE ${name}`, (err, result) => {
        if (err) throw err;
        console.log("DATABASE created");
        this.database = name;
      });

      this.connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
      });

      this.connection.query(`DROP TABLE ${name}.rentals`, (err, result) => {
        const sql = `CREATE TABLE ${name}.rentals(id VARCHAR(255), city VARCHAR(255), postalcode VARCHAR(255), price INT, nb_beds INT, nb_baths INT, rating INT, owner VARCHAR(255), description VARCHAR(255), PRIMARY KEY(id))`;
        this.connection.query(sql, (err, result) => {
          if (err) throw err;
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

                var insertStatement = `INSERT INTO  ${name}.rentals VALUES(?,?,?,?,?,?,?,?,?)`;

                // Inserting data of current row
                // into database
                this.connection.query(
                  insertStatement,
                  item,
                  (err, results, fields) => {
                    if (err) throw err;
                  }
                );
              }
              console.log("All items stored into database successfully");
            });
          console.log("TABLE created");
        });
      });
    });
  }

  createConnection(credentials: any) {
    this.connection = mysql.createConnection(credentials);
    return this.connection;
  }
}

export default new DatabaseService();
