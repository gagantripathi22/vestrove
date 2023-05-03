const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  addedAt: {
    type: Date,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);
