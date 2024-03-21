import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  const boxInfo = [
    {
      title: "For Renters",
      text: "Find your dream rental property. Bookmark properties and contact owners.",
      button: { link: "/properties", text: "Browse Properties" },
    },
    {
      title: "For Property Owners",
      text: "List your properties and reach potential tenants. Rent short or long term.",
      button: { link: "/properties/add", text: "Add Property" },
    },
  ];
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {boxInfo.map((item) => (
            <InfoBox title={item.title} button={item.button} key={item.title}>
              {item.text}
            </InfoBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
