const express = require("express");
const AuthRouter = require("./AuthRoute");
const commentRouter = require("./commentRoute");
const allRouter=express.Router()


allRouter.use("/auth", AuthRouter);
allRouter.use("/comment",commentRouter)


module.exports=allRouter
