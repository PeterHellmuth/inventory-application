const express = require("express");

const router = express.Router();
const itemController = require("../controllers/itemController");
const locationController = require("../controllers/locationController");

/* GET items listing. */
router.get("/items", itemController.item_list);

// GET request for one item
router.get("/item/:id", itemController.item_detail);

// POST request to delete an item
router.post("/item/:id/delete", itemController.item_delete_post);

// POST request to update an item
router.post("/item/:id/update", itemController.item_update_post);

// POST request to create an item
router.post("/item/create", itemController.item_create_post);

/* GET locations listing. */
router.get("/locations", locationController.location_list);

// GET request for one item
router.get("/location/:id", locationController.location_detail);

// POST request to delete an item
router.post("/location/:id/delete", locationController.location_delete_post);

// POST request to update an item
router.post("/location/:id/update", locationController.location_update_post);

// POST request to create an item
router.post("/location/create", locationController.location_create_post);

router.post(
  "/location/:id/updateItemInventory/:itemid",
  locationController.location_update_item_inventory_post
);

module.exports = router;
