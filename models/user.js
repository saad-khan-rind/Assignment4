const mongoose = require("mongoose");

const user = new mongoose.Schema({
  id: Number,
  email: String,
  username: String,
  password: String,
  name: {
    firstname: String,
    lastname: String,
  },
  address: {
    city: String,
    street: String,
    number: Number,
    zipcode: String,
    geolocation: {
      lat: String,
      long: String,
    },
  },
  phone: String,
});

const UserModel = mongoose.model("User", user);
module.exports = UserModel;
