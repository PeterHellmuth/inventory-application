/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// Virtual for book's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
