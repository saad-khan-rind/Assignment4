const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

// router.get("/", async (req, res) => {
//   const user = await UserModel.find();
//   res.json(user);
// });

router.get("/getAll", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/getById/", async (req, res) => {
  try {
    const user = await UserModel.find({ id: req.query.id });
    if (!user) throw Error("User not found");
    res.json(user[0]);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Limit results
router.get("/limit/:limit", async (req, res) => {
  try {
    const users = await UserModel.find().limit(parseInt(req.params.limit));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort results
router.get("/sort/:field", async (req, res) => {
  try {
    const users = await UserModel.find().sort(req.params.field);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/getById/", async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ id: req.query.id });
    if (!user) throw Error("User not found");
    res.json({ message: "User deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Add User
router.post("/add", async (req, res) => {
  const newUser = new UserModel(req.body);
  try {
    const user = await newUser.save();
    if (!user) throw Error("Something went wrong while saving the new user");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update User
router.put("/update/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw Error("Something went wrong while updating the user");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
