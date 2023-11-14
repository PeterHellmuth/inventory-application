/* eslint-disable no-underscore-dangle */
import React from "react";
import ItemLink from "./ItemLink";
import EditIcon from "../media/edit.svg"
import DeleteIcon from "../media/delete.svg"
import SaveIcon from "../media/save.svg"

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
          <img
         
            onClick={() => {
              setErrors([]);
              setTab("add_location");
              setEditLocation(location);
            }}
            className="icon-button"
            src={EditIcon}
            alt="Edit Name"
            title="Edit Name"
          />

          <img
            type="button"
            src={DeleteIcon}
            onClick={(e) => deleteLocation(e, location)}
            className="icon-button"
            alt="Delete Location"
            title="Delete Location"
          />
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
        <img
        src={SaveIcon}
          className="icon-button"
 
          onClick={(e) => updateItemInventory(e, null, location)}
          title="Submit"
          alt="Submit"
        />
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
                    <img
                    src={SaveIcon}
                      className="icon-button"
                      
                      onClick={(e) => updateItemInventory(e, item, location)}
                      title="Set Quantity"
                      alt="Set Quantity"
                    />
                  </form>
                  <img
                  src={DeleteIcon}
                    className="icon-button"
                    onClick={() => removeFromInventory(item, location)}
                    alt="Delete from this location"
                    title="Delete from this location"
                  />
                    
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Location;
