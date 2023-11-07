/* eslint-disable no-underscore-dangle */
import React from "react";
import ItemLink from "./ItemLink";

function Catalog({
  setTab,
  allItems,
  viewItem,
  setErrors,
  deleteItem,
  setEditItem,
}) {
  return (
    <div className="catalog">
      <button
        type="button"
        onClick={() => {
          setErrors([]);
          setTab("add_item");
          setEditItem(null);
        }}
        className="item-button"
      >
        Add item to catalog
      </button>

      {allItems != null
        ? allItems.map((item) => (
            <div className="item" key={item._id}>
              <ItemLink item={item} viewItem={viewItem} />
              <div>
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
          ))
        : "There are no items"}
    </div>
  );
}

export default Catalog;
