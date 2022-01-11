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
    const rental = await RentalService.readById(req.params.id);
    res.status(200).send(rental);
  }

  async createRental(req: express.Request, res: express.Response) {
    const rentalId = await RentalService.create(req.body);
    res.status(201).send({ id: rentalId });
  }

  async patch(req: express.Request, res: express.Response) {
    console.log(await RentalService.patchById(req.params.id, req.body));
    res.status(200).send("Item modified");
  }

  async put(req: express.Request, res: express.Response) {
    console.log(await RentalService.putById(req.params.id, req.body));
    res.status(200).send("Item replaced");
  }

  async removeRental(req: express.Request, res: express.Response) {
    console.log(await RentalService.deleteById(req.params.id));
    res.status(204).send();
  }
}

export default new RentalsController();
