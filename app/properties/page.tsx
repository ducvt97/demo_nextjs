import React from "react";

import propertiesJSON from "@/properties.json";
import { IProperty } from "@/models/property";

import ListCardProperty from "@/components/property/ListCardProperty";

const properties = propertiesJSON as IProperty[];

const PropertiesPage = () => {
  return <ListCardProperty properties={properties} />;
};

export default PropertiesPage;
