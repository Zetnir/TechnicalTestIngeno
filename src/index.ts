import cors from "cors";
import express from "express";
import DatabaseService from "./db";
import { CommonRoutesConfig } from "./common/routes";
import { RentalsRoutes } from "./components/rentals/routes";

// ----- Create express server -----
const app = express();
const port = 8080;

const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`GET request to homepage \n Hello World its a new node app!!`);
});

// ----- Initialize Database -----
app.get("/initializeDB", (req, res) => {
  DatabaseService.createDatabase("IngenoDatabase");
  res.send("Database initialized");
});

// ----- Modular routes array -----
routes.push(new RentalsRoutes(app));

// ----- Start server -----
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
