const express = require("express");

const router = express.Router();
const itemController = require("../controllers/itemController");

/* GET items listing. */
router.get("/items", itemController.item_list);

// GET request for one item
router.get("/item/:id", itemController.item_detail);

// POST request to delete an item
router.post("/item/:id/delete", itemController.item_delete_post);

// POST request to update an item
router.post("/item/:id/update", itemController.item_update_post);

// GET request to update an item
router.post("/item/:id/update", itemController.item_update_get);

// POST request to create an item
router.post("/item/create", itemController.item_create_post);

module.exports = router;
