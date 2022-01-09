import Rental from "./model"
import { nanoid } from 'nanoid'

class RentalDao {
    rentals: Array<Rental> = [];

    constructor() {
        console.log("New instance of rental created");
    }

    async addRental(rental: Rental) {
        rental.id = nanoid();
        this.rentals.push(rental);
        return rental.id;
    }

    async getRentals() {
        return this.rentals;
    }

    async getRentalById(rentalId: string) {
        return this.rentals.find((rental: { id: string }) => rental.id === rentalId);
    }

    async putRentalById(rentalId: string, rental: Rental) {
        const objIndex = this.rentals.findIndex(
            (obj: { id: string }) => obj.id === rentalId
        );
        this.rentals.splice(objIndex, 1, rental);
        return `${rental.id} updated via put`;
    }

    async patchRentalById(rentalId: string, rental: Rental) {
        const objIndex = this.rentals.findIndex(
            (obj: { id: string }) => obj.id === rentalId
        );
        let currentRental = this.rentals[objIndex];
        const allowedPatchFields = [
            'city',
            'postalcode',
            'price',
            'nb_beds',
            'nb_baths',
            'rating',
            'owner',
            'description'
        ];
        for (let field of allowedPatchFields) {
            if (field in rental) {
                // @ts-ignore
                currentUser[field] = rental[field];
            }
        }
        this.rentals.splice(objIndex, 1, currentRental);
        return `${rental.id} patched`;
    }
}

export default new RentalDao();