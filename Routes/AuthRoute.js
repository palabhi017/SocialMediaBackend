import express from "express";
import {
  signUpUser,
  loginUser,
  editUserProfile,
} from "../Controllers/AuthController.js";
import multer from "multer";
import authMiddleware from "../Middlewares/AuthMiddleware.js";
const upload = multer({ storage: multer.memoryStorage() });
const AuthRouter = express.Router();

AuthRouter.post("/signup", signUpUser);
AuthRouter.post("/login", loginUser);
AuthRouter.patch(
  "/editProfile",
  authMiddleware,
  upload.single("Image"),
  editUserProfile
);

export default AuthRouter;
