import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NotFound = () => {
  return (
    <section className="bg-blue-50 flex justify-center items-center flex-grow">
      <div className="m-auto max-w-2xl py-10">
        <div className="bg-white px-16 py-20 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-8xl text-yellow-400"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
            <p className="text-gray-500 text-xl mb-10">
              The page you are looking for does not exist.
            </p>
            <a
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              href="/"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
      {/* <div className="flex-grow"></div> */}
    </section>
  );
};

export default NotFound;
