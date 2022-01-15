import { expect } from "chai";
import supertest from "supertest";
import Rental from "../../components/rentals/models/rentals.model";

const request = supertest("http://localhost:8080/");

describe("Rental routes", async () => {
  beforeEach(async () => {
    request.get("initializeDB");
  });

  it("GET /rentals", async () => {
    request
      .get("rentals")
      .expect(200)
      .end((err, res) => {
        expect(res.body).not.to.be.empty;
      });
  });

  it("GET /rentals?max_price", async () => {
    request
      .get("rentals?max_price=-1")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?max_price=/2")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?max_price=abcd")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?max_price=3.15")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?max_price=0")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.deep.equal([]);
      });

    request
      .get("rentals?max_price=100")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?max_price=100000")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });
  });

  it("GET /rentals?min_price", async () => {
    request
      .get("rentals?min_price=-1")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_price=/2")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_price=abcd")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_price=3.15")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_price=0")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?min_price=100")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?min_price=100000")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.deep.equal([]);
      });
  });

  it("GET /rentals?min_nb_beds", async () => {
    request
      .get("rentals?min_nb_beds=-1")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_nb_beds=/2")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_nb_beds=abcd")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_nb_beds=3.15")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?min_nb_beds=0")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?min_nb_beds=4")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?min_nb_beds=1000")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.deep.equal([]);
      });
  });

  it("GET /rentals?postalcode", async () => {
    request
      .get("rentals?postalcode=12")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?postalcode=%1_$GB")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?postalcode=avge")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    request
      .get("rentals?postalcode=H_____")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?postalcode=H_S___")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });

    request
      .get("rentals?postalcode=H5A2S9")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.deep.equal([]);
      });
  });

  it("GET /rentals?max_price&min_price&min_nb_beds&postalcode", async () => {
    request
      .get("rentals?max_price=10&min_price=100")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.deep.equal([]);
      });

    request
      .get("rentals?postalcode=%1_$GB&min_nb_beds=abcd")
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
        expect(res.body.errors.length).to.equal(1);
      });

    request
      .get("rentals?max_price=100&min_price=60")
      .expect(200)
      .end((err, res) => {
        expect(res.body.errors).to.be.undefined;
        expect(res.body as Rental[]).to.not.be.null;
      });
  });

  it("POST /rentals", async () => {
    const rental1 = {
      city: "Montreal",
      postalcode: "H3W5J7",
      price: 120,
      nb_beds: 2,
      nb_baths: 3,
      rating: 4,
      owner: "Ludovic",
      description: "spacieux et conviviale",
    };
    request
      .post("rentals")
      .send(rental1)
      .expect(201)
      .end((err, res) => {
        expect(res.text).not.be.empty;
        expect(res.body).to.deep.equal({});
      });

    const rental2 = undefined;
    request
      .post("rentals")
      .send(rental2)
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    const rental3 = { city: "Montreal", owner: "Ludovic", price: 200 };
    request
      .post("rentals")
      .send(rental3)
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });

    const rental4 = {
      city: "Montreal",
      postalcode: "H5J7",
      price: "abc",
      nb_beds: 2,
      nb_baths: "pwf",
      rating: 4,
      owner: "Ludovic",
      description: "spacieux et conviviale",
    };
    request
      .post("rentals")
      .send(rental4)
      .expect(400)
      .end((err, res) => {
        expect(res.body.errors).to.not.be.empty;
      });
  });

  it("GET /rentals/:id", async () => {
    const rental = {
      city: "Montreal",
      postalcode: "W1V5J2",
      price: 120,
      nb_beds: 3,
      nb_baths: 1,
      rating: 3,
      owner: "Ludovic",
      description: "Ouaip",
    };

    request
      .post("rentals/")
      .send(rental)
      .expect(201)
      .end((err, res) => {
        request
          .get(`rentals/${res.text}`)
          .expect(200)
          .end((err, res) => {
            const expectedRental = { id: res.body.id, ...rental };
            expect(res.body as Rental).to.deep.equal(expectedRental);
          });

        request
          .get(`rentals/1241524f2`)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });

        request
          .get(`rentals/@3!.`)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });
      });
  });

  it("PUT /rentals/:id", async () => {
    const rental = {
      city: "Montreal",
      postalcode: "W1V5J2",
      price: 120,
      nb_beds: 3,
      nb_baths: 1,
      rating: 3,
      owner: "Ludovic",
      description: "Ouaip",
    };

    request
      .post("rentals/")
      .send(rental)
      .expect(201)
      .end((err, res) => {
        const newRental = {
          city: "Montreal",
          postalcode: "W1R5J2",
          price: 130,
          nb_beds: 4,
          nb_baths: 2,
          rating: 1,
          owner: "Shana",
          description: "Et Ouai",
        };
        const id = res.text;
        request
          .put(`rentals/${res.text}`)
          .send(newRental)
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.not.be.empty;
            expect(res.text).to.be.equal(id);
            expect(res.body).to.deep.equal({});
          });

        const newRental2 = {
          city: "Montreal",
          postalcode: "W1R5J2",
          price: 130,
          nb_beds: 4,
          description: "Et Ouai",
        };
        request
          .put(`rentals/${res.text}`)
          .send(newRental2)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });

        const newRental3 = {
          city: "Montreal",
          postalcode: "W5J2",
          price: 130,
          nb_beds: "asdc",
          nb_baths: 2,
          rating: "1223",
          owner: "Shana",
          description: "Et Ouai",
        };
        request
          .put(`rentals/${res.text}`)
          .send(newRental3)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });

        const newRental4 = {
          city: "Montreal",
          postalcode: "W1R5J2",
          price: 130,
          nb_beds: 4,
          nb_baths: 2,
          rating: 1,
          owner: "Shana",
          description: "Et Ouai",
        };
        request
          .put(`rentals/sviwi2o32f43`)
          .send(newRental4)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });
      });
  });

  it("PATCH /rentals/:id", async () => {
    const rental = {
      city: "Montreal",
      postalcode: "W1V5J2",
      price: 120,
      nb_beds: 3,
      nb_baths: 1,
      rating: 3,
      owner: "Ludovic",
      description: "Ouaip",
    };

    request
      .post("rentals/")
      .send(rental)
      .expect(201)
      .end((err, res) => {
        const newRental = {
          price: 130,
          nb_beds: 4,
          description: "Et Ouai",
        };
        const id = res.text;
        request
          .patch(`rentals/${res.text}`)
          .send(newRental)
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.not.be.empty;
            expect(res.text).to.be.equal(id);
            expect(res.body).to.deep.equal({});
          });

        const newRental2 = {
          city: "Montreal",
          postalcode: "R5J2",
          price: "adc",
          nb_beds: 4,
          description: "Et Ouai",
        };
        request
          .patch(`rentals/${res.text}`)
          .send(newRental2)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });

        const newRental3 = {
          price: 135,
          nb_beds: 2,
          description: "Et Ouai",
        };
        request
          .patch(`rentals/sviwi2o32f43`)
          .send(newRental3)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });
      });
  });

  it("DELETE /rentals/:id", async () => {
    const rental = {
      city: "Montreal",
      postalcode: "W1V5J2",
      price: 120,
      nb_beds: 3,
      nb_baths: 1,
      rating: 3,
      owner: "Ludovic",
      description: "Ouaip",
    };

    request
      .post("rentals/")
      .send(rental)
      .expect(201)
      .end((err, res) => {
        const id = res.text;
        request
          .delete(`rentals/${id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.text).to.be.equal(id);
            expect(res.body).to.deep.equal({});
          });

        request
          .delete(`rentals/1241524f2`)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });

        request
          .delete(`rentals/@3!.`)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors).to.not.be.empty;
          });
      });
  });
});
