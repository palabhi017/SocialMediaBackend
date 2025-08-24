import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import allRouter from "./Routes/Router.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./Config/SocketService.js";
dotenv.config();

//Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "localhost:5173",
    method: ["GET", "POST"],
  },
});

initializeSocket(io);
app.set("io", io);
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api", allRouter)

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
