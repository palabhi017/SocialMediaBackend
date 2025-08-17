const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRouter = require("./Routes/AuthRoute");
dotenv.config();

//Express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", AuthRouter);

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
