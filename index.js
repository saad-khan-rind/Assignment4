const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const axios = require("axios");

const productRoutes = require("./routes/productRoutes");
const product = require("./models/product");

const cartRoutes = require("./routes/cartRoutes");
const cart = require("./models/cart");

const userRoutes = require("./routes/userRoutes");
const user = require("./models/user");

const categoryRoutes = require('./routes/categoryRoutes');
const category=require('./models/category')

const app = express();

app.use(express.json());

// DB
mongoose
  .connect("mongodb://0.0.0.0:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error", err));

// middleware
app.use(morgan("dev"));

// get products
// axios
//   .get("https://fakestoreapi.com/products")
//   .then((response) => {
//     const products = response.data.map((product) => ({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       image: product.image,
//       rating: product.rating
//     }));
//     product.insertMany(products);
//     console.log("Products saved to MongoDB!");
//   })
//   .catch((error) => console.log(error));

app.use("/products", productRoutes);


// get categories
// axios
//   .get("https://fakestoreapi.com/products/categories")
//   .then((response) => {
//     const categories = response.data.map((cat) => ({
//       name: cat
//     }));
//     category.insertMany(categories);
//     console.log("Categories saved to MongoDB!");
//   })
//   .catch((error) => console.log(error));

app.use("/products", categoryRoutes);


//get cart

// axios
//   .get("https://fakestoreapi.com/carts")
//   .then((response) => {
//     const carts = response.data.map((cart) => ({
//       id: cart.id,
//       userId: cart.userId,
//       date: cart.date,
//       products: cart.products,
//     }));
//     cart.insertMany(carts);
//     console.log("Carts saved to MongoDB!");
//   })
//   .catch((error) => console.log(error));

app.use("/cart", cartRoutes);

//get users

// axios
//   .get("https://fakestoreapi.com/users")
//   .then((response) => {
//     const users = response.data.map((user) => ({
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       password: user.password,
//       name: {
//         firstname: user.name.firstname,
//         lastname: user.name.lastname,
//       },
//       address: {
//         city: user.address.city,
//         street: user.address.street,
//         number: user.address.number,
//         zipcode: user.address.zipcode,
//         geolocation: {
//           lat: user.address.geolocation.lat,
//           long: user.address.geolocation.long,
//         },
//       },
//       phone: user.phone,
//     }));
//     user.insertMany(users);
//     console.log("Users saved to MongoDB!");
//   })
//   .catch((error) => console.log(error));

app.use("/users", userRoutes);

// port
const port = 8008;

// Listeners
const server = app.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
