import React from "react";

function ItemLink({ item, viewItem }) {
  return (
    <button
      type="button"
      className="item-button"
      onClick={() => {
        viewItem(item);
      }}
    >
      <h3>{item.name}</h3>
    </button>
  );
}

export default ItemLink;
