import express from "express";
import Rental from "../models/rentals.model";

const postalcodeLength: number = 6;
const isNumerical = (value: string) => {
  return /^-?\d+$/.test(value);
};

const isAlphanumerical = (value: string) => {
  return /^[0-9a-zA-Z\-\_]+$/.test(value);
};
class RentalsMiddleware {
  validateQueryMinNbBeds(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.query.min_nb_beds as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (query) {
      if (!isNumerical(query))
        message.errors.push(
          "The minimum number of beds filter is not a number"
        );
      if (parseInt(query) < 0)
        message.errors.push("The minimum number of beds filter is negative");

      if (message.errors.length > 0) return res.status(400).send(message);
    }
    next();
  }

  validateQueryPostalcode(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.query.postalcode as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (query) {
      if (!isAlphanumerical(query))
        message.errors.push(
          "The postalcode mask filter is not in the right format (Alphanumerical with _ character allowed)"
        );
      if (query.length !== postalcodeLength)
        message.errors.push(
          `The postalcode mask length should be ${postalcodeLength} characters`
        );

      if (message.errors.length > 0) return res.status(400).send(message);
    }
    next();
  }

  validateQueryMinPrice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.query.min_price as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (query) {
      if (!isNumerical(query))
        message.errors.push("The minimum price filter is not a number");
      if (parseInt(query) < 0)
        message.errors.push("The minimum price filter is negative");

      if (message.errors.length > 0) return res.status(400).send(message);
    }
    next();
  }

  validateQueryMaxPrice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = req.query.max_price as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (query) {
      if (!isNumerical(query))
        message.errors.push("The maximum price filter is not a number");
      if (parseInt(query) < 0)
        message.errors.push("The maximum price filter is negative");

      if (message.errors.length > 0) return res.status(400).send(message);
    }
    next();
  }

  validateRequiredRentalProperties(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const rental: Rental = req.body;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (rental) {
      if (rental.city == undefined) message.errors.push("city value required");
      if (rental.nb_baths == undefined)
        message.errors.push("nb_baths value required");
      if (rental.nb_beds == undefined)
        message.errors.push("nb_beds value required");
      if (rental.owner == undefined)
        message.errors.push("owner value required");
      if (rental.postalcode == undefined)
        message.errors.push("postalcode value required");
      if (rental.price == undefined)
        message.errors.push("price value required");
    } else message.errors.push("Missing request body");

    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validateId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.id;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };
    if (id) {
      if (!isAlphanumerical(id) || id.length != 36)
        message.errors.push("Id parameter doesn't match format");
    } else message.errors.push("Missing request parameter");

    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validateRating(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const rating = req.body.rating as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };

    if (rating) {
      if (parseInt(rating) < 0)
        message.errors.push("The rating value is negative");
      if (!isNumerical(rating as string))
        message.errors.push("The rating value is not a number");
    }
    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validatePrice(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const price = req.body.price as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };

    if (price) {
      if (parseInt(price) < 0)
        message.errors.push("The price value is negative");
      if (!isNumerical(price))
        message.errors.push("The price value is not a number");
    }
    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validatePostalcode(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const postalcode = req.body.postalcode as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };

    if (postalcode) {
      if (!isAlphanumerical(postalcode))
        message.errors.push("The postalcode value is not alphanumerical");
      if (postalcode.length !== postalcodeLength)
        message.errors.push(
          `The postalcode length should be ${postalcodeLength} characters`
        );
    }
    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validateNbBaths(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const nbBaths = req.body.nb_baths as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };

    if (nbBaths) {
      if (parseInt(nbBaths) < 0)
        message.errors.push("The nb_baths value is negative");
      if (!isNumerical(nbBaths))
        message.errors.push("The nb_baths value is not a number");
    }
    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }

  validateNbBeds(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const nbBeds = req.body.nb_beds as string;
    let emptyErrors: string[] = [];
    const message = { errors: emptyErrors };

    if (nbBeds) {
      if (parseInt(nbBeds) < 0)
        message.errors.push("The nb_beds value is negative");
      if (!isNumerical(nbBeds))
        message.errors.push("The nb_beds value is not a number");
    }
    if (message.errors.length > 0) return res.status(400).send(message);
    next();
  }
}

export default new RentalsMiddleware();
