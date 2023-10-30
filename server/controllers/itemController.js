const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Location = require("../models/location");

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
    .escape()
    .withMessage("Name must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const item = new Item({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send("error");
    } else {
      // Data from form is valid.

      // Save author.
      await item.save();
      // Redirect to new author record.
      res.send(item);
    }
  }),
];

exports.item_delete_post = asyncHandler(
  async (req, res, next) => "delete_post"
);
exports.item_update_post = asyncHandler(
  async (req, res, next) => "item_update_post"
);
exports.item_update_get = asyncHandler(
  async (req, res, next) => "item_update_get"
);
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().populate("locations").exec();
  res.send(allItems);
});
