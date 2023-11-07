/* eslint-disable no-underscore-dangle */
import React from "react";
import LocationLink from "./LocationLink";

function Item({
  item,
  deleteItem,
  setErrors,
  setTab,
  setEditItem,
  viewLocation,
}) {
  return (
    <div className="item-detail">
      <div className="item-header">
        <div className="item-details">
          <h3>Name: {item.name}</h3>
          <span>Price: ${item.price}</span>
          <p>Description: {item.description}</p>
        </div>
        <div className="item-buttons">
          <button
            type="button"
            onClick={() => {
              setErrors([]);
              setTab("add_item");
              setEditItem(item);
            }}
            className="item-button"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteItem(item)}
            className="item-button"
          >
            Delete
          </button>
        </div>
      </div>

      {item.locations.length > 0 ? (
        <h3>In inventory at: </h3>
      ) : (
        <p>Not in any inventory</p>
      )}
      {item.locations
        ? item.locations.map((location) => (
            <div key={location._id} className="item-inventory-location">
              <p>
                <strong>Location:</strong>{" "}
                <LocationLink location={location} viewLocation={viewLocation} />
              </p>
              <p>
                <strong>Description:</strong> {location.description}
              </p>
              <p>
                <strong>Quantity:</strong>{" "}
                {location.items.reduce(
                  (quantity, currentItem) =>
                    quantity +
                    (currentItem.item === item._id ? currentItem.quantity : 0),
                  0,
                )}
              </p>
            </div>
          ))
        : ""}
    </div>
  );
}

export default Item;
