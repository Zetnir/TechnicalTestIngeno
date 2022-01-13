import express from "express";

class RentalsMiddleware {
  validateQueryMinNbBeds(req: express.Request, res: express.Response) {
    const query = req.query.min_nb_beds;
    if (query) {
      if (!this.isNumerical(query as string))
        res
          .status(400)
          .send({ error: "The minimum number of beds filter is not a number" });
      else if (parseInt(query as string) < 0)
        res
          .status(400)
          .send({ error: "The minimum number of beds filter is negative" });
    }
  }

  validateQueryPostalcode(req: express.Request, res: express.Response) {}

  validateQueryMinPrice(req: express.Request, res: express.Response) {}

  validateQueryMaxPrice(req: express.Request, res: express.Response) {}

  validateRequiredRental(req: express.Request, res: express.Response) {}

  validateId(req: express.Request, res: express.Response) {
    const id = req.params.id;
    if (req.params) {
      if (id == undefined)
        res.status(400).send({ error: "Missing value id parameter" });
      else if (!this.isAlphanumerical(id))
        res.status(400).send({ error: "Id parameter doesn't match format" });
    } else res.status(400).send({ error: "Missing request parameter" });
  }

  validateRating(req: express.Request, res: express.Response) {
    const rating = req.body.rating;
    if (req.body) {
      if (rating == undefined)
        res.status(400).send({ error: "Missing value property rating" });
      else if (rating < 0)
        res.status(400).send({ error: "The rating value is negative" });
      else if (!this.isNumerical(rating as string))
        res.status(400).send({ error: "The rating value is not a number" });
    } else res.status(400).send({ error: "Missing json data" });
  }

  validatePrice(req: express.Request, res: express.Response) {
    const price = req.body.price;
    if (req.body) {
      if (price == undefined)
        res.status(400).send({ error: "Missing value property price" });
      else if (price < 0)
        res.status(400).send({ error: "The price value is negative" });
      else if (!this.isNumerical(price as string))
        res.status(400).send({ error: "The price value is not a number" });
    } else res.status(400).send({ error: "Missing json data" });
  }

  validatePostalcode(req: express.Request, res: express.Response) {}

  validateNbBaths(req: express.Request, res: express.Response) {
    const nbBaths = req.body.nb_baths;
    if (req.body) {
      if (nbBaths == undefined)
        res.status(400).send({ error: "Missing value property nb_baths" });
      else if (nbBaths < 0)
        res.status(400).send({ error: "The nb_baths value is negative" });
      else if (!this.isNumerical(nbBaths as string))
        res.status(400).send({ error: "The nb_baths value is not a number" });
    } else res.status(400).send({ error: "Missing json data" });
  }

  validateNbBeds(req: express.Request, res: express.Response) {
    const nbBeds = req.body.nb_beds;
    if (req.body) {
      if (nbBeds == undefined)
        res.status(400).send({ error: "Missing value property nb_beds" });
      else if (nbBeds < 0)
        res.status(400).send({ error: "The nb_beds value is negative" });
      else if (!this.isNumerical(nbBeds as string))
        res.status(400).send({ error: "The nb_beds value is not a number" });
    } else res.status(400).send({ error: "Missing json data" });
  }

  private isNumerical(value: string): boolean {
    return /^-?\d+$/.test(value);
  }

  private isAlphanumerical(value: string): boolean {
    return /^[0-9a-zA-Z\-]+$/.test(value);
  }
}

export default new RentalsMiddleware();
