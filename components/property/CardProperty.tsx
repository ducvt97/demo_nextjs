import { IProperty } from "@/models/property";
import {
  faBath,
  faBed,
  faLocationDot,
  faMoneyBill,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface Props {
  propertyInfo: IProperty;
}

const CardProperty: React.FC<Props> = ({
  propertyInfo: {
    _id,
    name,
    type,
    location,
    beds,
    baths,
    square_feet,
    rates,
    images,
  },
}) => {
  const generateRateDisplay = () => {
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/month`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
    return "";
  };

  const generateRateTypes = () => {
    const rateTypes = [];
    for (const rate in rates) {
      rateTypes.push(
        <p className="capitalize" key={rate}>
          <FontAwesomeIcon icon={faMoneyBill} className="mr-1" />
          {rate}
        </p>
      );
    }
    return rateTypes;
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <img
        alt=""
        loading="lazy"
        width="0"
        height="0"
        decoding="async"
        data-nimg="1"
        className="w-full h-auto rounded-t-xl"
        sizes="100vw"
        srcSet=""
        style={{}}
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{type}</div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {generateRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FontAwesomeIcon icon={faBed} className="mr-1" />
            {beds} <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faBath} className="mr-1" />
            {baths} <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faRulerCombined} className="mr-1" />
            {square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {generateRateTypes()}
        </div>
        <div className="border border-gray-100 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
            <span className="text-orange-700">
              {`${location.city} ${location.state}`}
            </span>
          </div>
          <Link
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            href={`/properties/${_id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProperty;
