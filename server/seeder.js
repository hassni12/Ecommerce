import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/user.js";
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import {Order }from "./model/orderModel.js";
// import  from "./config/dbConnection.js";
// dbConnection
import products from "./data/products.js";
import { dbConnection } from "./config/dbConnection.js";
dotenv.config();
dbConnection()

const importData = async () => {

  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(user);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      console.log(product)
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported ".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit(1);
  }
};
const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Imported ".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
