interface Location {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface Rates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IProperty {
  _id: "1";
  owner: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: false;
  createdAt: string;
  updatedAt: string;
}
