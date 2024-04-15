"use client";
import React, { FormEvent, useState } from "react";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");

  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`properties?location=${location}&type=${type}`);
  };

  return (
    <section className="bg-gray-800 py-20 mb-4 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <form
          className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
          onSubmit={handleSearch}
        >
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              id="location"
              placeholder="Enter Keywords or Location"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">
              Property Type
            </label>
            <select
              id="property-type"
              className="select-input w-full"
              value={type}
              onChange={(e) => setType(e.currentTarget.value)}
            >
              <option value="All">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Cabin Or Cottage">Cabin or Cottage</option>
              <option value="Loft">Loft</option>
              <option value="Room">Room</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
