import express from "express";
import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";
import {
  getProducts,
  getProductsById
  , getProductAdminAndDelete,
  updateAdminProductsById, adminCreateProduct
} from "../controller/productController.js";
// getProducts
import { admin, protect } from "../middleware/tokenMiddleware.js"
// admin
const routes = express.Router();
routes.route("/")
.get(getProducts)
.post(protect, admin, adminCreateProduct)

routes.route("/:id")
.get(getProductsById)
.delete(protect, admin, getProductAdminAndDelete)
.put(protect, admin, updateAdminProductsById)







export default routes;
