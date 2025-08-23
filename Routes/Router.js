import express from "express";
import AuthRouter from "./AuthRoute.js";
import commentRouter from "./commentRoute.js";
import postRouter from "./postRoute.js";
import authMiddleware from "../Middlewares/AuthMiddleware.js";
const allRouter = express.Router();

allRouter.use("/auth", AuthRouter);
allRouter.use("/comment", authMiddleware, commentRouter);
allRouter.use("/post", authMiddleware, postRouter);

export default allRouter;
