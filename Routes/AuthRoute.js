const express = require("express");
const { signUpUser, loginUser } = require("../Controllers/AuthController");
const AuthRouter = express.Router();

AuthRouter.post("/signup", signUpUser);
AuthRouter.post("/login", loginUser);

module.exports = AuthRouter;
