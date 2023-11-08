import React from "react";

function LocationLink({ location, viewLocation }) {
  return (
    <button type="button" onClick={() => viewLocation(location._id)}>
      <h3>{location.name}</h3>
    </button>
  );
}

export default LocationLink;
