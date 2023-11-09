import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:3000";

function Navbar({ currentTab, setTab, viewItem }) {
  const catalogClassname =
    currentTab == "catalog" ||
    currentTab == "item_detail" ||
    currentTab == "add_item"
      ? "tab selected"
      : "tab";
  const inventoryClassname = currentTab == "inventory" || currentTab=="location_detail" || currentTab=="add_location" ? "tab selected" : "tab";

  return (
    <div className="nav-bar">
      <div
        className={catalogClassname}
        onClick={() => {
          viewItem(null);
          setTab("catalog");
        }}
      >
        Catalog
      </div>
      <div className={inventoryClassname} onClick={() => setTab("inventory")}>
        Inventory
      </div>
    </div>
  );
}

export default Navbar;
