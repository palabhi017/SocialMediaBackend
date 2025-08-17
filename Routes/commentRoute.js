const express = require("express")
const { getUserComments, postUserComments } = require("../Controllers/commentController.js")
const commentRouter = express.Router()

commentRouter.get("/getComment", getUserComments)
commentRouter.post("/postComment", postUserComments)


module.exports = commentRouter
