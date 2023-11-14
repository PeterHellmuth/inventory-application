/* eslint-disable no-underscore-dangle */
import React from "react";
import LocationLink from "./LocationLink";
import EditIcon from "../media/edit.svg";
import DeleteIcon from "../media/delete.svg";

function Item({
  item,
  deleteItem,
  setErrors,
  setTab,
  setEditItem,
  viewLocation,
  removeFromInventory,
}) {
  const findMatchingLocationItem = (item, location) => {
    let foundItem = null;
    location.items.forEach((currentItem) => {
      if (currentItem.item === item._id) {
        foundItem = item;
      }
    });
    return foundItem;
  };

  return (
    <div className="item-detail">
      <div className="item-header">
        <div className="item-details">
          <h3>Name: {item.name}</h3>
          <span>Price: ${item.price}</span>
          <p>Description: {item.description}</p>
        </div>
        <div className="item-buttons">
          <img
            src={EditIcon}
            onClick={() => {
              setErrors([]);
              setTab("add_item");
              setEditItem(item);
            }}
            className="icon-button"
            title="Edit"
            alt="Edit"
          />
          <img
            src={DeleteIcon}
            onClick={(e) => deleteItem(e, item)}
            className="icon-button"
            title="Delete"
            alt="Delete"
          />
        </div>
      </div>

      {item.locations.length > 0 ? (
        <h3>In inventory at: </h3>
      ) : (
        <p>Not in any inventory</p>
      )}
      <div className="inventory-list">
        {item.locations
          ? item.locations.map((location) => (
              <div key={location._id} className="item">
                <div className="container">
                  <strong>Location:</strong>{" "}
                  <LocationLink
                    location={location}
                    viewLocation={viewLocation}
                  />
                </div>
                <span>
                  <strong>Description:</strong> {location.description}
                </span>
                <span>
                  <strong>Quantity:</strong>{" "}
                  {location.items.reduce(
                    (quantity, currentItem) =>
                      quantity +
                      (currentItem.item === item._id
                        ? currentItem.quantity
                        : 0),
                    0,
                  )}
                </span>
                <img
                  src={DeleteIcon}
                  type="submit"
                  onClick={() =>
                    removeFromInventory(
                      findMatchingLocationItem(item, location),
                      location,
                    )
                  }
                  alt="Delete from location"
                  title="Delete from location"
                  className="icon-button"
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Item;
