import express from "express";
import { signUpUser, loginUser } from "../Controllers/AuthController.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", signUpUser);
AuthRouter.post("/login", loginUser);

export default AuthRouter;
