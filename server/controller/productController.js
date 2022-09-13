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
    throw new Error(`Product ${req.params.id} not found`);
  }
});
const getProductAdminAndDelete = asyncHandler(async (req, res) => {
  const filteredProduct = await Product.findById(req.params.id);
  if (filteredProduct) {
    await filteredProduct.remove()
    res.json({ message: 'Product deleted successfully', data: filteredProduct });
  } else {
    res.json({ message: `Product not found` });
  }
});
const updateAdminProductsById = asyncHandler(async (req, res) => {

  const { name, image, brand, description, category, countInStock, price } = req.body
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name
    product.brand = brand
    product.description = description
    product.category = category
    product.price = price
    product.countInStock = countInStock
    product.image = image
    const updatedProduct = await product.save();
    res.sendStatus(200).json({ message: "updated products successfully", data: updatedProduct });
  } else {
    res.status(404).send({ message: 'products not updated' });
  }
});
const adminCreateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, description, category, countInStock, price } = req.body

  const product = await Product.create({
    name:"name of any Product", image:"/", brand, description, category, countInStock, price
  });
  if (product) {
    res.status(200).json({
      message: 'Product created successfully', data: product
    });
  } else {
    res.status(404).json({
      message: 'can not create product'
    });
  }

});
export { getProductsById, getProducts, getProductAdminAndDelete, updateAdminProductsById, adminCreateProduct };
