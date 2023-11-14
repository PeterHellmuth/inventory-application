/* eslint-disable no-underscore-dangle */
import { React } from "react";
import LocationLink from "./LocationLink";
import EditIcon from "../media/edit.svg"
import DeleteIcon from "../media/delete.svg"


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
        Add New Location
      </button>

      {allLocations != null
        ? allLocations.map((location) => (
            <div className="item" key={location._id}>
              <LocationLink location={location} viewLocation={viewLocation} />
              <div className="container">
                <img
                src={EditIcon}
                  
                  onClick={() => {
                    viewLocation(location._id)
                  }}
                  className="icon-button"
                  title="Edit"
                  alt="Edit"
                />
                <img
                  src={DeleteIcon}
                  onClick={(e) => deleteLocation(e, location)}
                  className="icon-button"
                  title="Delete"
                  alt="Delete"
                />
              </div>
            </div>
          ))
        : "There are no inventory locations."}
    </div>
  );
}

export default Inventory;
