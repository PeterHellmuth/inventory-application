const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Location = require("../models/location");
require("../models/location");

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.send(item);
});

exports.item_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be specified."),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must be specified.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than $0."),
  body("description").trim().optional({ falsy: true }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).send(errors.array());
    } else {
      // Data from form is valid.

      // Save author.
      await item.save();
      res.status(200).send();
    }
  }),
];

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of item and all locations with it in parallel
  const [item, allLocationsWithItem] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Location.find({ "items.item": req.params.id }).exec(),
  ]);

  if (allLocationsWithItem.length > 0 || item == null) {
    res.status(400).send("Can't delete this item");
  } else {
    await Item.findByIdAndRemove(req.body.itemid);
    res.status(200).send("Deleted");
  }
});

exports.item_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be specified."),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must be specified.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than $0."),
  body("description").trim().optional({ falsy: true }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).send(errors.array());
    } else {
      // Data from form is valid.

      // Update item
      await Item.findByIdAndUpdate(req.params.id, item, {});
      // Redirect to book detail page.
      res.status(200).send();
    }
  }),
];

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate("locations").exec();
  res.send(allItems);
});
