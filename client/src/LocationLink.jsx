import React from "react";

function LocationLink({ location, viewLocation }) {
  return (
    <a href="#" className="item-link" onClick={() => viewLocation(location._id)}>
      <h3>{location.name}</h3>
    </a>
  );
}

export default LocationLink;
