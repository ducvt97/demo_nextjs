interface AddPropertyRequest {
  owner: String;
  name: String;
  type: String;
  description: String;
  location: {
    street: String;
    city: String;
    state: String;
    zipcode: String;
  };
  beds: String;
  baths: String;
  square_feet: String;
  amenities: String[];
  rates: {
    nightly: String;
    weekly: String;
    monthly: String;
  };
  seller_info: {
    name: String;
    email: String;
    phone: String;
  };
}
