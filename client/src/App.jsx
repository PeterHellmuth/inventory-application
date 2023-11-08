/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect, React } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Catalog from "./Catalog";
import Inventory from "./Inventory";
import Item from "./Item";
import Location from "./Location";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || "3000");
const SERVER_URL = "http://localhost:" + port;

function App() {
  const [currentTab, setTab] = useState("catalog");
  // catalog, inventory, item_detail, new_item
  const [allItems, setAllItems] = useState(null);
  const [allLocations, setAllLocations] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [errors, setErrors] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editLocation, setEditLocation] = useState(null);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  // catalog, inventory, edit item, add item, blah blah

  const viewLocation = (id) => {
    setCurrentLocationId(id);
    setTab("location_detail");
  };

  async function updateCatalog() {
    await Promise.all([
      fetch(`${SERVER_URL}/inventory/items`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setAllItems(res);
        }),
      fetch(`${SERVER_URL}/inventory/locations`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setAllLocations(res);
        }),
    ]);
  }

  useEffect(() => {
    updateCatalog();
  }, []);

  const viewItem = (item) => {
    if (item) {
      setCurrentItem(item);
      setTab("item_detail");
    }
  };

  const deleteItem = (item) => {
    fetch(`${SERVER_URL}/inventory/item/${item._id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemid: item._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("catalog");
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  const removeFromInventory = (item, location) => {
    let fetchUrl = "";
    if (item && location) {
      fetchUrl = `${SERVER_URL}/inventory/location/${location._id}/deleteItemInventory/${item.item}`;
    }
    fetch(fetchUrl, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("location_detail");
          });
          return true;
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteLocation = (location) => {
    fetch(`${SERVER_URL}/inventory/location/${location._id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemid: location._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("inventory");
            setCurrentLocationId(null);
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const addLocation = (event, locationToEdit = null) => {
    event.preventDefault();

    let fetchUrl = "";
    let data = null;
    if (locationToEdit) {
      fetchUrl = `${SERVER_URL}/inventory/location/${locationToEdit._id}/update`;
      data = JSON.stringify({
        name: event.target.parentNode.name.value,
        description: event.target.parentNode.description.value,
        id: locationToEdit._id,
      });
    } else {
      fetchUrl = `${SERVER_URL}/inventory/location/create`;
      data = JSON.stringify({
        name: event.target.parentNode.name.value,
        description: event.target.parentNode.description.value,
      });
    }
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("inventory");
          });
          return true;
        }
        return res.json().then((err) => {
          const errorMessages = {};
          err.forEach((error) => {
            errorMessages[error.path] = error.msg;
          });
          setErrors(errorMessages);
        });
      })
      .catch((err) => console.log(err));
  };
  const updateItemInventory = (event, item, location) => {
    event.preventDefault();
    let fetchUrl = "";
    let data = null;
    if (item) {
      fetchUrl = `${SERVER_URL}/inventory/location/${location._id}/updateItemInventory/${item.item}`;
      data = JSON.stringify({
        quantity: event.target.parentNode.quantity.value,
        addQuantity: false,
      });
    } else {
      fetchUrl = `${SERVER_URL}/inventory/location/${location._id}/updateItemInventory/${event.target.parentNode.item.value}`;
      data = JSON.stringify({
        quantity: event.target.parentNode.quantity.value,
        addQuantity: true,
      });
    }

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("location_detail");
          });
          return true;
        }
        return res.json().then((err) => {
          const errorMessages = {};
          err.forEach((error) => {
            errorMessages[error.path] = error.msg;
          });
          setErrors(errorMessages);
        });
      })
      .catch((err) => console.log(err));
  };

  const addItem = (event, itemToEdit = null) => {
    event.preventDefault();

    let fetchUrl = "";
    let data = null;
    if (itemToEdit) {
      fetchUrl = `${SERVER_URL}/inventory/item/${itemToEdit._id}/update`;
      data = JSON.stringify({
        name: event.target.parentNode.name.value,
        description: event.target.parentNode.description.value,
        price: event.target.parentNode.price.value,
        id: itemToEdit._id,
      });
    } else {
      fetchUrl = `${SERVER_URL}/inventory/item/create`;
      data = JSON.stringify({
        name: event.target.parentNode.name.value,
        description: event.target.parentNode.description.value,
        price: event.target.parentNode.price.value,
      });
    }
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          updateCatalog().then(() => {
            setTab("catalog");
          });
          return true;
        }
        return res.json().then((err) => {
          const errorMessages = {};
          err.forEach((error) => {
            errorMessages[error.path] = error.msg;
          });
          setErrors(errorMessages);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar currentTab={currentTab} setTab={setTab} viewItem={viewItem} />
      {currentTab === "catalog" ? (
        <Catalog
          setErrors={setErrors}
          setTab={setTab}
          deleteItem={deleteItem}
          setEditItem={setEditItem}
          allItems={allItems}
          viewItem={viewItem}
        />
      ) : currentTab === "item_detail" ? (
        <Item
          deleteItem={deleteItem}
          item={currentItem}
          setEditItem={setEditItem}
          setTab={setTab}
          setErrors={setErrors}
          viewLocation={viewLocation}
        />
      ) : currentTab === "location_detail" ? (
        <Location
          deleteLocation={deleteLocation}
          locationId={currentLocationId}
          setEditLocation={setEditLocation}
          setTab={setTab}
          allItems={allItems}
          setErrors={setErrors}
          updateItemInventory={updateItemInventory}
          allLocations={allLocations}
          removeFromInventory={removeFromInventory}
          viewItem={viewItem}
        />
      ) : currentTab === "add_item" ? (
        <AddItem errors={errors} addItem={addItem} itemToEdit={editItem} />
      ) : currentTab === "add_location" ? (
        <AddLocation
          errors={errors}
          addLocation={addLocation}
          locationToEdit={editLocation}
        />
      ) : (
        <Inventory
          setErrors={setErrors}
          setTab={setTab}
          deleteLocation={deleteLocation}
          setEditLocation={setEditLocation}
          allLocations={allLocations}
          viewLocation={viewLocation}
          addLocation={addLocation}
        />
      )}
    </div>
  );
}

export default App;
