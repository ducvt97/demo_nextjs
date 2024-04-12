"use client";
import React, { useEffect, useState } from "react";

import ListCardProperty from "@/components/property/ListCardProperty";
import { getAll, searchProperty } from "@/services/property.service";
import { useSearchParams } from "next/navigation";

const PropertiesPage = async () => {
  const searchParams = useSearchParams();
  const { location, type } = Object.fromEntries(searchParams);
  const [properties, setProperties] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let res;
        if (location || type) {
          console.log(location);
          res = await searchProperty(location, type);
          setIsSearch(true);
        } else {
          res = await getAll();
        }
        setProperties(res.properties);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, []);

  return !properties || !properties.length ? (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1>No property found.</h1>
      </div>
    </section>
  ) : (
    <div>
      <ListCardProperty properties={properties} isSearch={isSearch} />
    </div>
  );
};

export default PropertiesPage;
