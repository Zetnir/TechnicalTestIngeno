import RentalsDao from "../daos/rentals.dao";
import Rental from "../models/rentals.model";
import { CRUD } from "../../../common/interfaces/crud.interface";

class UsersService implements CRUD {
  async create(rental: Rental): Promise<string> {
    return RentalsDao.addRental(rental);
  }

  async deleteById(id: string): Promise<string> {
    return RentalsDao.removeRentalById(id);
  }

  async list(limit: number, page: number): Promise<Rental[]> {
    return RentalsDao.getRentals(limit, page);
  }

  async patchById(id: string, resource: Rental): Promise<string> {
    return RentalsDao.patchRentalById(id, resource);
  }

  async putById(id: string, resource: Rental): Promise<string> {
    return RentalsDao.putRentalById(id, resource);
  }

  async readById(id: string): Promise<Rental> {
    return RentalsDao.getRentalById(id);
  }
}

export default new UsersService();
