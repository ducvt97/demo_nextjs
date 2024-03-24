import React from "react";
import { IProperty } from "@/models/property";
import CardProperty from "./CardProperty";
import Button from "../buttons/Button";
import Link from "next/link";

interface Props {
  properties: IProperty[];
  isSeeMore?: boolean;
  isPaging?: boolean;
}

const ListCardProperty: React.FC<Props> = ({
  properties,
  isSeeMore,
  isPaging,
}) => {
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
      {isSeeMore && (
        <div className="px-4 text-center">
          <Button className="text center w-full sm:w-1/3">
            <Link href="/properties">See more</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default ListCardProperty;
