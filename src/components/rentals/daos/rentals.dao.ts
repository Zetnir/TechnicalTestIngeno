import Rental from "../models/rentals.model";
import { nanoid } from "nanoid";
import DatabaseService from "../../../db";

class RentalDao {
  rentals: Array<Rental> = [];

  constructor() {
    console.log("New instance of rental created");
  }

  async addRental(rental: Rental) {
    rental.id = nanoid();
    this.rentals.push(rental);
    return rental.id;
  }

  async getRentals(limit: number, page: number) {
    const { connection, database } = DatabaseService;
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${database}.rentals`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async getRentalById(rentalId: string) {
    return this.rentals.find(
      (rental: { id: string }) => rental.id === rentalId
    );
  }

  async putRentalById(rentalId: string, rental: Rental) {
    const objIndex = this.rentals.findIndex(
      (obj: { id: string }) => obj.id === rentalId
    );
    this.rentals.splice(objIndex, 1, rental);
    return `${rental.id} updated via put`;
  }

  async patchRentalById(rentalId: string, rental: Rental) {
    const objIndex = this.rentals.findIndex(
      (obj: { id: string }) => obj.id === rentalId
    );
    let currentRental = this.rentals[objIndex];
    const allowedPatchFields = [
      "city",
      "postalcode",
      "price",
      "nb_beds",
      "nb_baths",
      "rating",
      "owner",
      "description",
    ];
    for (let field of allowedPatchFields) {
      if (field in rental) {
        // @ts-ignore
        currentUser[field] = rental[field];
      }
    }
    this.rentals.splice(objIndex, 1, currentRental);
    return `${rental.id} patched`;
  }

  async removeRentalById(rentalId: string) {
    const index = this.rentals.findIndex(
      (rental: { id: string }) => rental.id === rentalId
    );
    this.rentals.splice(index, 1);
    return `${rentalId} removed`;
  }
}

export default new RentalDao();
