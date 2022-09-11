import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";
// const routes = express.Router();

// route GET api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
// route GET api/products/:id
const getProductsById = asyncHandler(async (req, res) => {
  const filteredProduct = await Product.findById(req.params.id);
  if (filteredProduct) {
    res.json(filteredProduct);
  } else {
    throw new Error(`Product ${req.params._id} not found`);
  }
});
export { getProductsById, getProducts };
