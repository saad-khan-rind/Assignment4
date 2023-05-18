const express = require("express");
const router = express.Router();

const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

router.get("/categories/", async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/categories/:name", async (req, res) => {
  try {
    const category = await ProductModel.find({ category: req.params.name });
    if (!category) throw Error("Category not found");
    res.json(category);
  } catch (err) {
    res.json({ message: err.message });
  }
});


module.exports = router;
