const express = require("express")
const authController = require("../controllers/auth.controller")

const blogRouter = express.Router()

blogRouter.post("/signup", authController.signup)
blogRouter.post("/login", authController.login)


module.exports = blogRouter;