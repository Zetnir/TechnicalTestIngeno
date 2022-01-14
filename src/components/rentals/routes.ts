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
      .all(RentalsMiddleware.validateId)
      .get(RentalsController.getRentalById)
      .put(
        RentalsMiddleware.validateRequiredRentalProperties,
        RentalsMiddleware.validateNbBaths,
        RentalsMiddleware.validateNbBeds,
        RentalsMiddleware.validatePostalcode,
        RentalsMiddleware.validatePrice,
        RentalsMiddleware.validateRating,
        RentalsController.put
      )
      .patch(
        RentalsMiddleware.validateNbBaths,
        RentalsMiddleware.validateNbBeds,
        RentalsMiddleware.validatePostalcode,
        RentalsMiddleware.validatePrice,
        RentalsMiddleware.validateRating,
        RentalsController.patch
      )
      .delete(RentalsController.removeRental);

    return this.app;
  }
}
