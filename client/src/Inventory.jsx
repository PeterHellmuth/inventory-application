/* eslint-disable no-underscore-dangle */
import { React } from "react";
import LocationLink from "./LocationLink";

const SERVER_URL = "http://localhost:3000";

function Inventory({
  setTab,
  allLocations,
  viewLocation,
  setErrors,
  deleteLocation,
  setEditLocation,
}) {
  return (
    <div className="catalog">
      <button
        type="button"
        onClick={() => {
          setErrors([]);
          setTab("add_location");
          setEditLocation(null);
        }}
        className="item-button"
      >
        Add location to catalog
      </button>

      {allLocations != null
        ? allLocations.map((location) => (
            <div className="item" key={location._id}>
              <LocationLink location={location} viewLocation={viewLocation} />
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setErrors([]);
                    setTab("add_location");
                    setEditLocation(location);
                  }}
                  className="item-button"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteLocation(location)}
                  className="item-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        : "There are no inventory locations."}
    </div>
  );
}

export default Inventory;
