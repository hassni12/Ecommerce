import express from "express";
import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";
import {
  getProducts,
  getProductsById,
} from "../controller/productController.js";
// getProducts
const routes = express.Router();
routes.route("/").get(getProducts)
routes.route("/:id").get(getProductsById)






export default routes;
