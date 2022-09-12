import express from "express";
import { addOrderItems, getOrderItems ,updateOrderToPaid,getMyOrders} from "../controller/orderController.js";
import { protect } from "../middleware/tokenMiddleware.js";
const routes = express.Router();
routes.route("/").post(protect, addOrderItems);
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderItems);
routes.route("/:id/pay").put(protect,updateOrderToPaid );
export default routes;
