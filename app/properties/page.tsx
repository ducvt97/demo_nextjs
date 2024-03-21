import React from "react";

import propertiesJSON from "@/properties.json";
import { Property } from "@/models/property";

import ListCardProperty from "@/components/property/ListCardProperty";

const properties = propertiesJSON as Property[];

const PropertiesPage = () => {
  return <ListCardProperty properties={properties} />;
};

export default PropertiesPage;
