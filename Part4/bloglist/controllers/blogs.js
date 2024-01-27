const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

/* const getTokenFrom = request => {
	const authorization = request.get("authorization")
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "")
	}
	return null
} */

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog
		.find({}).populate("user", { username: 1, name: 1 })

	response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post("/", async (request, response) => {
	const body = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" })
	}

	const user = await User.findById(decodedToken.id)

	if (!body.title || !body.author || !body.url) {
		return response.status(400).json({ error: "Title, author, and url are required" })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body

	const blog = {
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	if (updatedBlog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.delete("/:id", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" })
	}

	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	}else{
		return response.status(401).json({ error: "Unauthorized to delete the blog" })
	}
})

module.exports = blogsRouter