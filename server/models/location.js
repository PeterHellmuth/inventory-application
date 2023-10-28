/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtual for book's URL
LocationSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Location", LocationSchema);
