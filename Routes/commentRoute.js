import express from "express";
import {
  getUserComments,
  postUserComments,
} from "../Controllers/commentController.js";
const commentRouter = express.Router();

commentRouter.get("/getComment", getUserComments);
commentRouter.post("/postComment", postUserComments);

export default commentRouter;
