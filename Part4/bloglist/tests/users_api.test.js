const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash("password", 10)

	await new User({ username: "test", passwordHash }).save()
})

describe("when there is initially one user registered", () => {
	test("user is returned", async () => {
		const usersAtStart = await helper.usersInDb()

		expect(usersAtStart[0].username).toBe("test")
	})

	test("creating a new user succeds with valid data", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "testTest",
			name: "test",
			password: "password",
		}

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		const usersAtEnd = await helper.usersInDb()

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
		expect(newUser.username).toBe(usersAtEnd[usersAtEnd.length - 1].username)
	})

	test("creating user with invalid password length return 400", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "testTest2",
			name: "test",
			password: "12",
		}

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)

		expect(response.body.error).toContain("Password must be at least 3 characters long")

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test("creating user with invalid username length return 400", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "te",
			name: "test",
			password: "password123",
		}

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)

		expect(response.body.error).toContain("Username must be at least 3 characters long")

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test("creating user with no password return 400", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "testTest2",
			name: "test",
			password: "",
		}

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)

		expect(response.body.error).toContain("Password must be at least 3 characters long")

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test("creating user with no username return 400", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "",
			name: "test",
			password: "password123",
		}

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)

		expect(response.body.error).toContain("Please insert a username")

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})