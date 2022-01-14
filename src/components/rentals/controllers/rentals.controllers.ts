import express from "express";
import { RentalFilter } from "../models/rentals.model";
import RentalsService from "../services/rentals.service";

class RentalsController {
  async listRentals(req: express.Request, res: express.Response) {
    const query: RentalFilter = {
      min_nb_beds: req.query.min_nb_beds
        ? parseInt(req.query.min_nb_beds as string)
        : undefined,
      postalcode: req.query.postalcode
        ? (req.query.postalcode as string)
        : undefined,
      min_price: req.query.min_price
        ? parseInt(req.query.min_price as string)
        : undefined,
      max_price: req.query.max_price
        ? parseInt(req.query.max_price as string)
        : undefined,
      // Default value for page and limit because not needed
      page: 0,
      limit: 100,
    };
    await RentalsService.list(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async getRentalById(req: express.Request, res: express.Response) {
    await RentalsService.readById(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async createRental(req: express.Request, res: express.Response) {
    await RentalsService.create(req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async patch(req: express.Request, res: express.Response) {
    await RentalsService.patchById(req.params.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async put(req: express.Request, res: express.Response) {
    await RentalsService.putById(req.params.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeRental(req: express.Request, res: express.Response) {
    await RentalsService.deleteById(req.params.id)
      .then((result) => {
        res.status(204).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default new RentalsController();
