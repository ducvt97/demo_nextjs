"use client";
import React, { useState } from "react";

import Button from "@/components/buttons/Button";

interface IAmenities {
  wifi: boolean;
  kitchen: boolean;
  washer_dryer: boolean;
  free_parking: boolean;
  pool: boolean;
  hot_tub: boolean;
  security: boolean;
  wheelchair_accessible: boolean;
  elevator_access: boolean;
  dishwasher: boolean;
  gym_fitness_center: boolean;
  air_conditioning: boolean;
  balcony_patio: boolean;
  smart_tv: boolean;
  coffee_maker: boolean;
}

interface IFormAddProperty {
  type: string;
  name: string;
  description: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  beds: string;
  baths: string;
  square_feet: string;
  amenities: IAmenities;
  weekly_rate: string;
  monthly_rate: string;
  nightly_rate: string;
  seller_name: string;
  seller_email: string;
  seller_phone: string;
  images: File[];
}

const defaultModel: IFormAddProperty = {
  type: "",
  name: "",
  description: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  beds: "",
  baths: "",
  square_feet: "",
  amenities: {
    wifi: false,
    kitchen: false,
    washer_dryer: false,
    free_parking: false,
    pool: false,
    hot_tub: false,
    security: false,
    wheelchair_accessible: false,
    elevator_access: false,
    dishwasher: false,
    gym_fitness_center: false,
    air_conditioning: false,
    balcony_patio: false,
    smart_tv: false,
    coffee_maker: false,
  },
  weekly_rate: "",
  monthly_rate: "",
  nightly_rate: "",
  seller_name: "",
  seller_email: "",
  seller_phone: "",
  images: [],
};

const AddProperty: React.FC = () => {
  const [model, setModel] = useState<IFormAddProperty>({ ...defaultModel });

  const onChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.name === "amenities") {
      setModel({
        ...model,
        amenities: {
          ...model.amenities,
          [e.currentTarget.id]: (e.currentTarget as HTMLInputElement).checked,
        },
      });
      return;
    }
    setModel({ ...model, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    const selectedImages: File[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          selectedImages.push(file);
        }
      }
    }

    setModel({ ...model, images: selectedImages });
  };

  const generateAmenities = () => {
    const result: React.JSX.Element[] = [];
    let key: keyof IAmenities;
    for (key in model.amenities) {
      const label = key.replaceAll("_", " ");
      const isChecked = model.amenities[key];
      result.push(
        <div className="w-1/3" key={key}>
          <input
            id={key}
            className="mr-2"
            type="checkbox"
            value={key}
            name="amenities"
            checked={isChecked}
            onChange={onChange}
          />
          <label htmlFor={key} className="capitalize">
            {label}
          </label>
        </div>
      );
    }
    return result;
    //   const label = item.replaceAll("_", " ");
    //   const isChecked = model.amenities[item](item);
    //   return (
    //     <div className="w-1/3">
    //       <input
    //         id={`amenity_${item}`}
    //         className="mr-2"
    //         type="checkbox"
    //         value={item}
    //         name="amenities"
    //         checked={isChecked}
    //       />
    //       <label htmlFor={`amenity_${item}`} className="capitalize">
    //         {label}
    //       </label>
    //     </div>
    //   );
    // });
  };
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form
            action="/api/properties"
            method="POST"
            encType="multipart/form-data"
          >
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Property
            </h2>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Property Type
              </label>
              <select id="type" name="type" className="input" required>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Listing Name
              </label>
              <input
                id="name"
                className="input mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                type="text"
                value={model.name}
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="input"
                rows={4}
                placeholder="Add an optional description of your property"
                value={model.description}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                id="street"
                className="input mb-2"
                placeholder="Street"
                type="text"
                value={model.street}
                name="street"
                onChange={onChange}
              />
              <input
                id="city"
                className="input mb-2"
                placeholder="City"
                required
                type="text"
                value={model.city}
                name="city"
                onChange={onChange}
              />
              <input
                id="state"
                className="input mb-2"
                placeholder="State"
                required
                type="text"
                value={model.state}
                name="state"
                onChange={onChange}
              />
              <input
                id="zipcode"
                className="input mb-2"
                placeholder="Zipcode"
                type="text"
                value={model.zipcode}
                name="zipcode"
                onChange={onChange}
              />
            </div>
            <div className="mb-4 flex flex-wrap">
              <div className="w-full sm:w-1/3 pr-2">
                <label
                  htmlFor="beds"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Beds
                </label>
                <input
                  id="beds"
                  className="input"
                  required
                  type="number"
                  value={model.beds}
                  name="beds"
                  onChange={onChange}
                />
              </div>
              <div className="w-full sm:w-1/3 px-2">
                <label
                  htmlFor="baths"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Baths
                </label>
                <input
                  id="baths"
                  className="input"
                  required
                  type="number"
                  value={model.baths}
                  name="baths"
                  onChange={onChange}
                />
              </div>
              <div className="w-full sm:w-1/3 pl-2">
                <label
                  htmlFor="square_feet"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Square Feet
                </label>
                <input
                  id="square_feet"
                  className="input"
                  required
                  type="number"
                  value={model.square_feet}
                  name="square_feet"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Amenities
              </label>
              <div className="flex flex-wrap gap-y-2">
                {generateAmenities()}
              </div>
            </div>
            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2">
                Rates (Leave blank if not applicable)
              </label>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <label htmlFor="weekly_rate" className="mr-2">
                    Weekly
                  </label>
                  <input
                    id="weekly_rate"
                    className="input"
                    type="number"
                    value={model.weekly_rate}
                    name="weekly_rate"
                    onChange={onChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="monthly_rate" className="mr-2">
                    Monthly
                  </label>
                  <input
                    id="monthly_rate"
                    className="input"
                    type="number"
                    value={model.monthly_rate}
                    name="monthly_rate"
                    onChange={onChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="nightly_rate" className="mr-2">
                    Nightly
                  </label>
                  <input
                    id="nightly_rate"
                    className="input"
                    type="number"
                    value={model.nightly_rate}
                    name="nightly_rate"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Name
              </label>
              <input
                id="seller_name"
                className="input"
                placeholder="Name"
                type="text"
                value={model.seller_name}
                name="seller_name"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Email
              </label>
              <input
                id="seller_email"
                className="input"
                placeholder="Email address"
                required
                type="email"
                value={model.seller_email}
                name="seller_email"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Seller Phone
              </label>
              <input
                id="seller_phone"
                className="input"
                placeholder="Phone"
                type="tel"
                value={model.seller_phone}
                name="seller_phone"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Images (Select up to 4 images)
              </label>
              <input
                id="images"
                className="input"
                accept="image/*"
                multiple
                required
                type="file"
                name="images"
                onChange={onImageChange}
              />
            </div>
            <div>
              <Button type="submit">Add Property</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
