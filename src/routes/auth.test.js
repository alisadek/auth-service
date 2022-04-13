const request = require("supertest");
const app = require("../app");

describe("Test POST /api/auth/signin", () => {
	test("It should respond with 200 success", async () => {
		const response = await request(app)
			.post("/api/auth/signin")
			.send({ email: "admin1@gmail.com", password: "123456" })
			.expect(200);
	});
});
