const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: [true, "Email Required"],
    type: String,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  firstname: {
    required: true,
    type: String,
    required: true,
  },
  lastname: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
  cart: {
    type: Array(mongoose.Types.ObjectId),
  },
  wishlist: {
    type: Array(mongoose.Types.ObjectId),
  },
});

module.exports = mongoose.model("User", userSchema);
