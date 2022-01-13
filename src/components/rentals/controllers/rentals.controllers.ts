import express from "express";
import RentalService from "../services/rentals.service";

class RentalsController {
  async listRentals(req: express.Request, res: express.Response) {
    await RentalService.list(100, 0)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async getRentalById(req: express.Request, res: express.Response) {
    await RentalService.readById(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async createRental(req: express.Request, res: express.Response) {
    await RentalService.create(req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async patch(req: express.Request, res: express.Response) {
    await RentalService.patchById(req.params.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async put(req: express.Request, res: express.Response) {
    await RentalService.putById(req.params.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeRental(req: express.Request, res: express.Response) {
    await RentalService.deleteById(req.params.id)
      .then((result) => {
        res.status(204).send(result);
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default new RentalsController();
