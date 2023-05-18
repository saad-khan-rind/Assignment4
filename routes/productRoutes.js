const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

const ProductModel = require("../models/product");

// router.get("/", async (req, res) => {
//   const products = await ProductModel.find();
//   res.json(products);
// });

router.get("/getAll", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/getById/", async (req, res) => {
  try {
    const product = await ProductModel.find({ id: req.query.id });
    if (!product) throw Error("Product not found");
    res.json(product[0]);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/search/", async (req, res) => {
  try {
    // const name = req.query;
    // const query = {};
    // if (name) query.name = new RegExp(name, "i");
    // const products = await ProductModel.find(query);
    const products = await ProductModel.find({ title: req.query.title });
    if (!products) throw Error("Product not found");
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Limit results
router.get("/limit/:limit", async (req, res) => {
  try {
    const products = await ProductModel.find().limit(
      parseInt(req.params.limit)
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort results
router.get("/sort/:field", async (req, res) => {
  try {
    const products = await ProductModel.find().sort(req.params.field);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/productAdd", async (req, res) => {
  try {
    const { id, title, price, description, category, image, rating } = req.body;
    const product = await ProductModel.create({
      id,
      title,
      price,
      description,
      category,
      image,
      rating
    });

    res.status(201).json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/getById/:id", async (req, res) => {
  // try {
  //   const { id, title, price, description, category, image } = req.query;
  //   const product = await ProductModel.find({ id: req.query.id });
  //   console.log(id);
  //   if (!product[0]) throw Error("Product not found");
  //   if (id) product[0].id = id;
  //   if (title) product[0].title = title;
  //   if (price) product[0].price = price;
  //   if (description) product[0].description = description;
  //   if (category) product[0].category = category;
  //   if (image) product[0].image = image;

  //   await product[0].save();
  //   res.json(product);
  // } catch (err) {
  //   res.json({ message: err.message });
  // }

  const { id } = req.params;
  const product = await ProductModel.findOneAndUpdate(
    { id: id },
    { ...req.body }
  );

  if (!product) {
    res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
});

router.delete("/getById/", async (req, res) => {
  try {
    const product = await ProductModel.findOneAndDelete({ id: req.query.id });
    if (!product) throw Error("Product not found");
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
