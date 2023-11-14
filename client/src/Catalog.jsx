/* eslint-disable no-underscore-dangle */
import React from "react";
import ItemLink from "./ItemLink";
import EditIcon from "../media/edit.svg"
import DeleteIcon from "../media/delete.svg"

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
        Add New Item
      </button>

      {allItems != null
        ? allItems.map((item) => (
            <div className="item" key={item._id}>
              <ItemLink item={item} viewItem={viewItem} />
              <div className="container">
                <img
                src={EditIcon}
             
                  onClick={() => {
                    setErrors([]);
                    setTab("add_item");
                    setEditItem(item);
                  }}
                  className="icon-button"
                  alt="Edit"
                  title="Edit"
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
          ))
        : "There are no items"}
    </div>
  );
}

export default Catalog;
