const router = require("express").Router()
const Blog = require("../models/blog")
const Comment = require("../models/comment")

router.get("/:id/comments", async (request, response) => {
    const { id } = request.params
    const blogs = await Blog
        .findById(id)
        .populate({
            path: "comments",
            select: "comment"
        })

    response.json(blogs)
})

router.post("/:id/comments", async (request, response, next) => {
    const body = request.body.comment
    const { id } = request.params

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return response.status(404).json({ error: "Blog not found" })
        }

        const comment = new Comment({
            comment: body
        })

        const savedComment = await comment.save()

        blog.comments = blog.comments.concat(savedComment)
        await blog.save()

        response.status(201).json({
            id: savedComment._id,
            comment: savedComment.comment,
        }); 
    } catch (error) {
        next(error)
    }
})

module.exports = router
