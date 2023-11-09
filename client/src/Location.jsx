/* eslint-disable no-underscore-dangle */
import React from "react";
import ItemLink from "./ItemLink";

function Location({
  locationId,
  deleteLocation,
  allItems,
  setErrors,
  setTab,
  setEditLocation,
  updateItemInventory,
  allLocations,
  removeFromInventory,
  viewItem,
}) {
  const findItem = (id) => {
    let returnItem = null;
    allItems.forEach((item) => {
      if (item._id === id) {
        returnItem = item;
      }
    });
    return returnItem;
  };

  let location = null;
  allLocations.map((currentLoc) => {
    if (currentLoc._id === locationId) {
      location = currentLoc;
    }
  });

  return (
    <div className="item-detail">
      <div className="location-header">
        <div className="location-details">
          <h3>Name: {location.name}</h3>
          <p>Description: {location.description}</p>
        </div>
        <div className="location-buttons">
          <button
            type="button"
            onClick={() => {
              setErrors([]);
              setTab("add_location");
              setEditLocation(location);
            }}
            className="item-button"
          >
            Edit Name
          </button>
          <button
            type="button"
            onClick={(e) => deleteLocation(e, location)}
            className="item-button"
          >
            Delete Location
          </button>
        </div>
      </div>
      <form action="" method="POST" className="add-inventory-form">
        <label htmlFor="item">
          Add item to inventory:
          <select id="item" name="item" required>
            {allItems.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">
          Quantity:
          <input type="number" name="quantity" id="quantity" required />
        </label>
        <button
          className="item-button"
          type="submit"
          onClick={(e) => updateItemInventory(e, null, location)}
        >
          Submit
        </button>
      </form>
      {location.items.length > 0 ? (
        <h3>Items in inventory: </h3>
      ) : (
        <p>No items in inventory</p>
      )}
      <div className="inventory-list">
        {location.items
          ? location.items.map((item) => (
              <div key={item.item} className="item">
                <div className="container">
                  <strong>Item:</strong>{" "}
                  <ItemLink
                    item={findItem(item.item)}
                    viewItem={viewItem}
                  />
                </div>
                <span>
                  <strong>Description:</strong>{" "}
                  {findItem(item.item).description}
                </span>
                <span className="flex">
                  <strong>Quantity:</strong> {item.quantity}
                </span>
                <div className="container">
                  <form action="" method="POST" className="quantity-sub-form">
                    <label htmlFor="quantity">
                      Set new quantity:
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                      />
                    </label>
                    <button
                      className="item-button"
                      type="submit"
                      onClick={(e) => updateItemInventory(e, item, location)}
                    >
                      Set
                    </button>
                  </form>
                  <button
                    className="item-button"
                    type="submit"
                    onClick={() => removeFromInventory(item, location)}
                  >
                    Delete from this location
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Location;
