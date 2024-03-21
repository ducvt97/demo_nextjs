import React from "react";
import { IProperty } from "@/models/property";
import CardProperty from "./CardProperty";

interface Props {
  properties: IProperty[];
}

const ListCardProperty: React.FC<Props> = ({ properties }) => {
  
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length <= 0
            ? "No properties found."
            : properties.map((item) => (
                <CardProperty propertyInfo={item} key={item._id} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ListCardProperty;
