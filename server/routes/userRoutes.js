import express from "express";
import { authUser,registerUser,adminGetUsers ,usersDelete,getUserProfile,updateUserProfile , getAdminUserForUpdate, updateAdminUser} from "../controller/userController.js";
import { protect,admin } from "../middleware/tokenMiddleware.js";
// protect
const routes = express.Router();
routes.route("/login").post(authUser)
routes.route("/admin").get(protect,admin,adminGetUsers)
routes.route("/admin/:id").delete(protect,admin,usersDelete).get(protect,admin,getAdminUserForUpdate).put(protect,admin,updateAdminUser)

routes.route("/register").post(registerUser)
routes.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)

export default routes;