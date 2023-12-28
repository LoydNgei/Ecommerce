const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const PaypalRoute = require("./routes/Payments/Paypal");
const cors = require("cors");

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull..."))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", PaypalRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running on port 4000...");
});