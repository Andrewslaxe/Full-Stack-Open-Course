const listHelper = require("../utils/testing")

test("Dummy returns one", () => {
	const blogs = []
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})
