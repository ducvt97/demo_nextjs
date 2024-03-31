import React from "react";

import ListCardProperty from "@/components/property/ListCardProperty";
import { getAll } from "@/services/property.service";

const PropertiesPage = async () => {
  let { properties } = await getAll();
  return <ListCardProperty properties={properties} />;
};

export default PropertiesPage;
