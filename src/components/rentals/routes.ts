import { CommonRoutesConfig } from "../../common/routes";
import express from "express";
import RentalsController from "./controllers/rentals.controllers";

export class RentalsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Rentals");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/rentals")
      .get((req: express.Request, res: express.Response) => {
        RentalsController.listRentals(req, res);
      })
      .post((req: express.Request, res: express.Response) => {
        RentalsController.createRental(req, res);
      });

    this.app
      .route("/rentals/:id")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        RentalsController.getRentalById(req, res);
      })
      .put((req: express.Request, res: express.Response) => {
        RentalsController.put(req, res);
      })
      .patch((req: express.Request, res: express.Response) => {
        RentalsController.patch(req, res);
      })
      .delete((req: express.Request, res: express.Response) => {
        RentalsController.removeRental(req, res);
      });

    return this.app;
  }
}
