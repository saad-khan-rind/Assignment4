const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  id: Number,
  userId: Number,
  date: Date,
  products: Array,
});

const CartModel = mongoose.model("Cart", cart);
module.exports = CartModel;
