import express from "express";
import { addOrderItems, getOrderItems ,updateOrderToPaid,getMyOrders,adminGetUsersOrders } from "../controller/orderController.js";
import { protect,admin } from "../middleware/tokenMiddleware.js";
const routes = express.Router();
routes.route("/").post(protect, addOrderItems).get(protect,admin,adminGetUsersOrders )
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderItems);
routes.route("/:id/pay").put(protect,updateOrderToPaid );
export default routes;
