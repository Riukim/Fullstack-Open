const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe("when there is initially some blogs saved", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs")

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}, 100000)

	test("unique identifier is named id", async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToTest = blogsAtStart[0]

		expect(blogToTest.id).toBeDefined()
	})
})

describe("addition of a new blog", () => {
	test("a valid blog can be added", async () => {
		const newBlog = {
			title: "async/await simplifies making async calls",
			author: "me :)",
			url: "somernadomsites.com",
			likes: 7000000000
		}

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const title = blogsAtEnd.map(n => n.title)
		expect(title).toContain(
			"async/await simplifies making async calls"
		)
	}, 10000)
	test("blog without likes get by default 0 likes", async () => {
		const newBlog = {
			title: "I don't have any likes",
			author: "me :)",
			url: "sadlifenolikes.com",
		}

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
	})

	test("blog without title is not added", async () => {
		const newBlog = {
			author: "me :)",
			url: "sadlifenolikes.com",
			likes: 10
		}

		await api.post("/api/blogs").send(newBlog).expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	},)

	test("blog without url is not added", async () => {
		const newBlog = {
			title: "async/await simplifies making async calls",
			author: "me :)",
			likes: 7000000000
		}

		await api.post("/api/blogs").send(newBlog).expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
})

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const title = blogsAtEnd.map(r => r.title)

		expect(title).not.toContain(blogsAtEnd.title)
	})
})

describe("updating likes of a blog", () => {
	test("succeds with valid data", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			likes: blogToUpdate.likes + 10
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
			.expect("Content-Type", /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		const updatedBlogs = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)

		expect(updatedBlogs.likes).toBe(blogToUpdate.likes +10)
	})

})

afterAll(async () => {
	await mongoose.connection.close()
})