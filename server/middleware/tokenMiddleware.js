import  jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
// import User fr
// userModel
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      console.log(decoded,"decoded");
      req.user = await User.findById(decoded.id).select("-password");
      next();
      console.log(req.user,"req")
    } catch (error) {
      res.status(401);
      throw new Error("not authenticated");
    }
    if (!token) {

      const error = new Error("Not Authenticated");
      error.statusCode = 401;
      throw error;
    }

  }
});
export const admin= asyncHandler(async (req, res, next) => {
  if (req.user&&req.user.isAdmin) {
  next()
  }else{
    res.status(401);
    throw new Error("not authenticated as admin");
  }


})