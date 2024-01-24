const _ = require("lodash")

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes = blogs => {
	return blogs.reduce((countLikes, blog) => countLikes + blog.likes, 0)
}

const favoriteBlog = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const likesArray = blogs.map(blog => blog.likes)
	const maxLikes = Math.max(...likesArray)

	const favoriteBlog = blogs.find(blog => blog.likes === maxLikes)

	return {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes
	}
}

const mostBlogs = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const blogAuthors = blogs.map(blog => blog.author)

	const mostBlogs = _
		.chain(blogAuthors)
		.countBy()
		.entries()
		.maxBy(entry => entry[1])
		.value()

	return {
		author : mostBlogs[0],
		blogs : mostBlogs[1]
	}
}

const mostLikes = blogs => {
	if (blogs.length === 0) {
		return null
	}

	const blogAuthors = blogs.map(blog => ({
		author: blog.author,
		likes: blog.likes
	}))

	const mostLikes = _
		.chain(blogAuthors)
		.groupBy("author")
		.map((group, author) => ({
			author,
			likes: _.sumBy(group, "likes")
		}))
		.maxBy("likes")
		.value()

	return mostLikes
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}