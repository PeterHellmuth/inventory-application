import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:3000";
import catalogIcon from "../media/catalog.svg"
import inventoryIcon from "../media/inventory.svg"

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
      ><img src={catalogIcon} alt="Catalog" className="icon"/>
        Catalog
      </div>
      <div className={inventoryClassname} onClick={() => setTab("inventory")}>
      <img src={inventoryIcon} alt="Inventory" className="icon"/>
        Inventory
      </div>
    </div>
  );
}

export default Navbar;
