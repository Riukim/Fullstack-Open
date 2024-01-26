const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})
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

	if (!body.title || !body.author || !body.url) {
		return response.status(400).json({ error: "Title, author, and url are required" })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	const savedBlog = await blog.save()
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
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter