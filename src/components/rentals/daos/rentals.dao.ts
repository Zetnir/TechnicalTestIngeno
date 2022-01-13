import Rental from "../models/rentals.model";
import { v1 as uuid } from "uuid";
import DatabaseService from "../../../db";

class RentalDao {
  rentals: Array<Rental> = [];
  pageStep: number = 50;

  constructor() {
    console.log("New instance of rental   created");
  }

  async addRental(rental: Rental): Promise<string> {
    const id = uuid();
    const item = [
      id,
      rental.city,
      rental.postalcode,
      rental.price,
      rental.nb_beds,
      rental.nb_baths,
      rental.rating,
      rental.owner,
      rental.description,
    ];
    const { connection, database } = DatabaseService;
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${database}.rentals VALUES(?,?,?,?,?,?,?,?,?)`,
        item,
        (err, result) => {
          if (err) reject(err);
          else resolve(id);
        }
      );
    });
  }

  async getRentals(limit: number, page: number): Promise<Rental[]> {
    const { connection, database } = DatabaseService;
    const limit_min = page * this.pageStep;
    const limit_max = limit_min + limit;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${database}.rentals LIMIT ${limit_min}, ${limit_max}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result as Rental[]);
        }
      );
    });
  }

  async getRentalById(rentalId: string): Promise<Rental> {
    const { connection, database } = DatabaseService;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${database}.rentals WHERE ID = "${rentalId}"`,
        (err, result) => {
          if (err) reject(err);
          else resolve((result as Rental[])[0]);
        }
      );
    });
  }

  async putRentalById(rentalId: string, rental: Rental): Promise<string> {
    const item = [
      rentalId,
      rental.city,
      rental.postalcode,
      rental.price,
      rental.nb_beds,
      rental.nb_baths,
      rental.rating,
      rental.owner,
      rental.description,
    ];
    const { connection, database } = DatabaseService;
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${database}.rentals SET id = ?, city = ?, postalcode = ?, price = ?, nb_beds = ?, nb_baths = ?, rating = ?, owner = ?, description = ? WHERE id = "${rentalId}"`;
      connection.query(sql, item, (err, result) => {
        if (err) reject(err);
        else resolve(rentalId);
      });
    });
  }

  async patchRentalById(rentalId: string, rental: Rental): Promise<string> {
    const { connection, database } = DatabaseService;

    let item: (string | number)[] = [];
    let sql = `UPDATE ${database}.rentals SET `;

    // Go through all the properties and use them as string for the SQL request
    for (const property in rental) {
      sql += `${property} = ?, `;
      // We need to convert it as an any object because typescript doesn't allow us to access property by index with type 'Rental'
      item.push((rental as any)[property]);
    }
    sql = sql.slice(0, sql.length - 2);
    sql += `WHERE id = "${rentalId}"`;
    console.log(sql);

    return new Promise((resolve, reject) => {
      connection.query(sql, item, (err, result) => {
        if (err) reject(err);
        else resolve(rentalId);
      });
    });
  }

  async removeRentalById(rentalId: string): Promise<string> {
    const { connection, database } = DatabaseService;
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM ${database}.rentals WHERE ID = "${rentalId}"`,
        (err, result) => {
          if (err) reject(err);
          else resolve(rentalId);
        }
      );
    });
  }
}

export default new RentalDao();
