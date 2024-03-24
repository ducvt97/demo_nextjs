import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBookmark, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PropertyRightSide = () => {
  return (
    <aside className="space-y-4">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faBookmark} />
        Bookmark Property
      </button>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <button className="react-share__ShareButton">
          <FontAwesomeIcon icon={faFacebook} />
        </button>
        <button className="react-share__ShareButton">
          <FontAwesomeIcon icon={faTwitter} />
        </button>
        <button className="react-share__ShareButton">
          <FontAwesomeIcon icon={faWhatsapp} />
        </button>
        <button className="react-share__ShareButton">
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <p>You must be logged in to send a message</p>
      </div>
    </aside>
  );
};

export default PropertyRightSide;
