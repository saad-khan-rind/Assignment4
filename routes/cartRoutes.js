const express = require("express");
const router = express.Router();

const CartModel = require("../models/cart");

// router.get("/", async (req, res) => {
//   const cart = await CartModel.find();
//   res.json(cart);
// });

// Get all shopping cart items
router.get("/getAll", async (req, res) => {
  try {
    const shoppingCart = await CartModel.find();
    res.json(shoppingCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single shopping cart item by ID
router.get("/getById/", async (req, res) => {
  try {
    const cart = await CartModel.find({ id: req.query.id });
    if (!cart) throw Error("Cart not found");
    res.json(cart[0]);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Limit results
router.get("/limit/:limit", async (req, res) => {
  try {
    const shoppingCart = await CartModel.find().limit(
      parseInt(req.params.limit)
    );
    res.json(shoppingCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort results
router.get("/sort/:field", async (req, res) => {
  try {
    const shoppingCart = await CartModel.find().sort(req.params.field);
    res.json(shoppingCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get shopping cart items within a date range
router.get("/date/:start/:end", async (req, res) => {
  try {
    const shoppingCart = await CartModel.find({
      dateAdded: {
        $gte: new Date(req.params.start),
        $lte: new Date(req.params.end),
      },
    });
    res.json(shoppingCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get shopping cart items for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const shoppingCart = await CartModel.find({ userId: req.params.userId });
    res.json(shoppingCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new shopping cart item
router.post("/addCart", async (req, res) => {
  try {
    const { id, userId, date, products } = req.body;

    const cart = await CartModel.create({
      id,
      userId,
      date,
      products,
    });

    res.status(201).json(cart);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Update a shopping cart item
router.patch("/updateCart/:id", async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) throw Error("Cart not found");
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a shopping cart item by ID
router.delete("/getById/", async (req, res) => {
  try {
    const cart = await CartModel.findOneAndDelete({ id: req.query.id });
    if (!cart) throw Error("Cart not found");
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
