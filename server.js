const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const allRouter=require("./Routes/Router")
dotenv.config();

//Express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/", allRouter)

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
