const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { authController } = require("./routes/auth.js");
const { loginController } = require("./routes/auth.js");
const { updateUser } = require("./routes/users.js");
const { addProduct, getProduct } = require("./routes/product.js");
const app = express();
const port = 4500;

//Db Connect
const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://localhost:27017/Restshopping");
    console.log("DB Success");
  } catch (error) {
    console.log("Failed to connect");
  }
};
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes
authController(router);
loginController(router);
updateUser(router);
addProduct(router);
getProduct(router);
app.use(router);
app.listen(port, () => {
  console.log(`Server at port ${port}`);
});
