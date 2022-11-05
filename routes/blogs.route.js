const express = require("express")
const blogController = require("../controllers/blog.controller")
const authenticateUser = require("../middleware/auth")
const authorizedUser = require("../middleware/authurized")

const blogRouter = express.Router()

blogRouter.get("/",  blogController.getAllBlogs)
blogRouter.get("/blog/:id",  blogController.getABlog)
blogRouter.post("/", authenticateUser, blogController.createBlog)
blogRouter.patch("/:id", authenticateUser, authorizedUser, blogController.updateBlog)
blogRouter.patch("/publish/:id", authenticateUser, authorizedUser, blogController.publishBlog)
blogRouter.delete("/:id", authenticateUser, authorizedUser, blogController.deleteBlog)
blogRouter.get("/myblogs", authenticateUser, blogController.getMyBlogs)

module.exports = blogRouter;