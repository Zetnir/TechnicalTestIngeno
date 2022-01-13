export default interface Rental {
  id: string | undefined;
  city: string | undefined;
  postalcode: string | undefined;
  price: number | undefined;
  nb_beds: number | undefined;
  nb_baths: number | undefined;
  rating: number | undefined;
  owner: string | undefined;
  description: string | undefined;
}

export interface RentalFilter {
  min_nb_beds: number | undefined;
  postalcode: string | undefined;
  min_price: number | undefined;
  max_price: number | undefined;
}
