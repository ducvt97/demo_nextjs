import { IProperty } from "@/models/property";
import {
  faBath,
  faBed,
  faCheck,
  faLocationDot,
  faRulerCombined,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  info: IProperty;
}

const PropertyInfo: React.FC<Props> = ({ info }) => {
  return (
    <main className="col-span-7">
      <div className="card-common text-center md:text-left">
        <div className="text-gray-500 mb-4">{info.type}</div>
        <h1 className="text-3xl font-bold mb-4">{info.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
          <p className="text-orange-700">
            {info.location.street}, {info.location.city} {info.location.state}
          </p>
        </div>
        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates &amp; Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold text-blue-500">
              {info.rates.nightly ? (
                `$${info.rates.nightly}`
              ) : (
                <FontAwesomeIcon icon={faTimes} className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            <div className="text-2xl font-bold text-blue-500">
              {info.rates.weekly ? (
                `$${info.rates.weekly}`
              ) : (
                <FontAwesomeIcon icon={faTimes} className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            <div className="text-2xl font-bold text-blue-500">
              {info.rates.monthly ? (
                `$${info.rates.monthly}`
              ) : (
                <FontAwesomeIcon icon={faTimes} className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card-common mt-6">
        <h3 className="text-lg font-bold mb-6">Description &amp; Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FontAwesomeIcon icon={faBed} className="mr-1" />
            {info.beds} <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faBath} className="mr-1" />
            {info.baths} <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faRulerCombined} className="mr-1" />
            {info.square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{info.description}</p>
      </div>
      <div className="card-common mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {info.amenities.map((item, index) => (
            <li key={index}>
              <FontAwesomeIcon
                icon={faCheck}
                className="inline-block text-green-600 mr-2"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div
          className="mapboxgl-map"
          style="position: relative; width: 100%; height: 500px;"
        >
          <div className="mapboxgl-canary" style="visibility: hidden;"></div>
          <div className="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate">
            <canvas
              className="mapboxgl-canvas"
              tabindex="0"
              aria-label="Map"
              role="region"
              width="570"
              height="625"
              style="width: 456px; height: 500px;"
            ></canvas>
            <div
              aria-label="Map marker"
              role="img"
              className="mapboxgl-marker mapboxgl-marker-anchor-bottom"
              style="transform: translate(232px, 224px) translate(-50%, -100%) translate(0px, 0px);"
            >
              <img
                alt="location"
                loading="lazy"
                width="40"
                height="40"
                decoding="async"
                data-nimg="1"
                src="/_next/static/media/pin.26699fb2.svg"
                style="color: transparent;"
              />
            </div>
          </div>
          <div className="mapboxgl-control-container">
            <div className="mapboxgl-ctrl-top-left"></div>
            <div className="mapboxgl-ctrl-top-right"></div>
            <div className="mapboxgl-ctrl-bottom-left">
              <div class="mapboxgl-ctrl" style="display: block;">
                <a
                  className="mapboxgl-ctrl-logo"
                  target="_blank"
                  rel="noopener nofollow"
                  href="https://www.mapbox.com/"
                  aria-label="Mapbox logo"
                ></a>
              </div>
            </div>
            <div className="mapboxgl-ctrl-bottom-right">
              <div className="mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact">
                <button className="mapboxgl-ctrl-attrib-button" type="button">
                  <span
                    className="mapboxgl-ctrl-icon"
                    aria-hidden="true"
                    title="Toggle attribution"
                  ></span>
                </button>
                <div className="mapboxgl-ctrl-attrib-inner">
                  <a
                    href="https://www.mapbox.com/about/maps/"
                    target="_blank"
                    title="Mapbox"
                    aria-label="Mapbox"
                  >
                    © Mapbox
                  </a>{" "}
                  <a
                    href="https://www.openstreetmap.org/about/"
                    target="_blank"
                    title="OpenStreetMap"
                    aria-label="OpenStreetMap"
                  >
                    © OpenStreetMap
                  </a>{" "}
                  <a
                    className="mapbox-improve-map"
                    href="https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=streets-v9&amp;access_token=pk.eyJ1IjoiYnRyYXZlcnN5IiwiYSI6ImNsc3EwbDgyOTBiMHkycXMzaHRkbjBucmsifQ.a94QOuR27zjWHLVaSFddUA#/-71.0622/42.3528/11.76"
                    target="_blank"
                    aria-label="Improve this map"
                    rel="noopener nofollow"
                  >
                    Improve this map
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div mapboxgl-children="" style="height: 100%;"></div>
        </div>
      </div> */}
    </main>
  );
};

export default PropertyInfo;
