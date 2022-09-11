import { json, request, response } from "express";
import asyncHandler from "express-async-handler";
import { Order } from "../model/orderModel.js";

const addOrderItems = asyncHandler(async (req, res, next) => {
  console.log(req);
  const id = { userId: req.user };
  console.log(id.userId, "id");

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("no order items");
  } else {
    const order = await Order.create({
      userId: id.userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
    res.json(order);
  }
});
const getOrderItems = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("userId","name email");
  if (!order) {
    throw new Error(`Order ${req.params.id} not foun `);
  } else {
    res.json(order);
  }
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
      id:req.body.paymentResult.id,
      status:req.body.paymentResult.status,
      update_time:req.body.paymentResult.update_time,
        email_address:req.body.paymentResult.email_address
      

    }
    const updatedData=await order.save()
    res.json(updatedData);
    console.log(updatedData)
      } else {
        throw new Error(`Order not found`);
  
  }
});

const getMyOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find({users:req.user._id})
 res.json(order)
});

export { addOrderItems, getOrderItems ,updateOrderToPaid ,getMyOrders };