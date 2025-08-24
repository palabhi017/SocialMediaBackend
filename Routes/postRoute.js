import express from "express";
import { createPost, getAllPost } from "../Controllers/postController.js";
const postRouter = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost", upload.single("Image"), createPost);
postRouter.get("/getAllpost", getAllPost);

export default postRouter;
