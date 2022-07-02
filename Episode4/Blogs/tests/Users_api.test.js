const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe("When you try to add a user", () => {
	test("When the username is short", async () => {
		const newUser = {
			username: "Ke",
			name: "Test User",
			password: "Test Password",
		}
		await api.post("/api/users").send(newUser).expect(400)
	})

	test("When the password is short", async () => {
		const newUser = {
			username: "Kengodcito",
			name: "Test User",
			password: "Te",
		}
		await api.post("/api/users").send(newUser).expect(400)
	})

	test("When the username isn't unique", async () => {
		const newUser = {
			username: "Kengodcito",
			name: "TestUser",
			password: "TestPassword",
		}
		await api.post("/api/users").send(newUser).expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
