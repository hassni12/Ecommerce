import express from "express";
import { addOrderItems, getOrderItems,updateOrderToDeliverd ,updateOrderToPaid,getMyOrders,adminGetUsersOrders } from "../controller/orderController.js";
import { protect,admin } from "../middleware/tokenMiddleware.js";
const routes = express.Router();
routes.route("/").post(protect, addOrderItems).get(protect,admin,adminGetUsersOrders )

routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderItems);
routes.route("/:id/pay").put(protect,updateOrderToPaid );
routes.route("/:id/deliver").put(protect,admin,updateOrderToDeliverd );

export default routes;
