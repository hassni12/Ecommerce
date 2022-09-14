import * as path from 'path'
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import helmet from "helmet";

import { dbConnection } from "./config/dbConnection.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";



dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet())
// app.use()
dbConnection();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json("sended message");
});
app.use("/api/products", productRoutes)

app.use("/api/users", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname=path.resolve()
// const __dirname = path.dirname(__filename);

// / console.log(path)
app.use('/upload',express.static(path.join(__dirname,'/upload')));



app.use(notFound);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`successfully connected to port ${port}`.underline.yellow);
  // console.log("hello".underline.red)
});
