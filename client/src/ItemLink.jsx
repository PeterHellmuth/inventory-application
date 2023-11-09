import React from "react";

function ItemLink({ item, viewItem }) {
  return (
    <a
      href="#"
      className="item-link"
      onClick={() => {
        viewItem(item);
      }}
    >
      <h3>{item.name}</h3>
    </a>
  );
}

export default ItemLink;
