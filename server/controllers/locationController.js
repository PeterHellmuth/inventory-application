const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Location = require("../models/location");
require("../models/location");

exports.location_detail = asyncHandler(async (req, res, next) => {
  const location = await Location.findById(req.params.id)
    .populate("items")
    .exec();
  if (location === null) {
    // No results.
    const err = new Error("Location not found");
    err.status = 404;
    return next(err);
  }

  res.send(location);
});

exports.location_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const location = new Location({
      name: req.body.name,
      description: req.body.description,
      items: [],
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).send(errors.array());
    } else {
      // Data from form is valid.

      // Save author.
      await location.save();
      res.status(200).send();
    }
  }),
];

exports.location_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of location
  const location = await Location.findById(req.params.id).exec();

  if (location.items.length > 0) {
    res.status(400).send("Can't delete this location, delete inventory first.");
  } else {
    await Location.findByIdAndRemove(req.body.itemid);
    res.status(200).send("Deleted");
  }
});

exports.location_update_item_inventory_post = [
  // Validate and sanitize fields.
  body("quantity")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Quantity must be specified.")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a whole number greater than 0."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const [currentLocation, currentItem] = await Promise.all([
      Location.findById(req.params.id).exec(),
      Item.findById(req.params.itemid).exec(),
    ]);
    console.log(req.params.itemid);
    if (req.body.addQuantity) {
      let exists = false;
      currentLocation.items.map((item) => {
        if (item.item.toString() === req.params.itemid) {
          item.quantity = Number(item.quantity) + Number(req.body.quantity);
          exists = true;
        }
      });
      if (!exists) {
        currentLocation.items.push({
          item: req.params.itemid,
          quantity: req.body.quantity,
        });
      }
    } else {
      currentLocation.items.map((item) => {
        if (item.item.toString() === req.params.itemid) {
          item.quantity = Number(req.body.quantity);
        }
      });
    }

    let itemHasLocation = false;
    currentItem.locations.map((location) => {
      if (location.toString() === req.params.id) {
        itemHasLocation = true;
      }
    });
    if (!itemHasLocation) {
      currentItem.locations.push(req.params.id);
    }

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).send(errors.array());
    } else {
      // Data from form is valid.

      // Update item
      await Promise.all([
        Location.findByIdAndUpdate(req.params.id, currentLocation, {}),
        Item.findByIdAndUpdate(req.params.itemid, currentItem, {}),
      ]);
      // Redirect to book detail page.
      res.status(200).send();
    }
  }),
];

exports.location_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const currentLocation = await Location.findById(req.params.id).exec();
    currentLocation.name = req.body.name;
    currentLocation.description = req.body.description;

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).send(errors.array());
    } else {
      // Data from form is valid.

      // Update item
      await Location.findByIdAndUpdate(req.params.id, currentLocation, {});
      // Redirect to book detail page.
      res.status(200).send();
    }
  }),
];

exports.location_list = asyncHandler(async (req, res, next) => {
  const allLocations = await Location.find().exec();
  res.send(allLocations);
});
