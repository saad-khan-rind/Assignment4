const mongoose = require("mongoose");

const product = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: mongoose.Schema.Types.Mixed
});


const ProductModel = mongoose.model("Product", product);
module.exports = ProductModel;
