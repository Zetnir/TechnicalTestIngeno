import { CommonRoutesConfig } from "../../common/routes";
import express from "express";
import RentalsController from "./controllers/rentals.controllers";
import RentalsMiddleware from "./middleware/rentals.middleware";

export class RentalsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "Rentals");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/rentals")
      .get(
        RentalsMiddleware.validateQueryMaxPrice,
        RentalsMiddleware.validateQueryMinNbBeds,
        RentalsMiddleware.validateQueryMinPrice,
        RentalsMiddleware.validateQueryPostalcode,
        RentalsController.listRentals
      )
      .post(
        RentalsMiddleware.validateRequiredRentalProperties,
        RentalsMiddleware.validateNbBaths,
        RentalsMiddleware.validateNbBeds,
        RentalsMiddleware.validatePostalcode,
        RentalsMiddleware.validatePrice,
        RentalsMiddleware.validateRating,
        RentalsController.createRental
      );

    this.app
      .route("/rentals/:id")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          RentalsMiddleware.validateId(req, res);
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        RentalsController.getRentalById(req, res);
      })
      .put((req: express.Request, res: express.Response) => {
        RentalsMiddleware.validateRequiredRentalProperties(req, res);
        RentalsMiddleware.validateNbBaths(req, res);
        RentalsMiddleware.validateNbBeds(req, res);
        RentalsMiddleware.validatePostalcode(req, res);
        RentalsMiddleware.validatePrice(req, res);
        RentalsMiddleware.validateRating(req, res);

        RentalsController.put(req, res);
      })
      .patch((req: express.Request, res: express.Response) => {
        RentalsMiddleware.validateNbBaths(req, res);
        RentalsMiddleware.validateNbBeds(req, res);
        RentalsMiddleware.validatePostalcode(req, res);
        RentalsMiddleware.validatePrice(req, res);
        RentalsMiddleware.validateRating(req, res);

        RentalsController.patch(req, res);
      })
      .delete((req: express.Request, res: express.Response) => {
        RentalsController.removeRental(req, res);
      });

    return this.app;
  }
}
