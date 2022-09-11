import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import helmet from "helmet";

import { dbConnection } from "./config/dbConnection.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// notFound
// dbConnection
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet())
dbConnection();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json("sended message");
});
app.use("/api/products",productRoutes )

app.use("/api/users",userRoutes)
app.use("/api/order",orderRoutes)
app.get("/api/config/paypal",(req, res) => {


  res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`successfully connected to port ${port}`.underline.yellow);
  // console.log("hello".underline.red)
});
