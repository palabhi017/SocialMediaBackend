import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import allRouter from "./Routes/Router.js";
import dotenv from "dotenv";
dotenv.config();

//Express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/", allRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
