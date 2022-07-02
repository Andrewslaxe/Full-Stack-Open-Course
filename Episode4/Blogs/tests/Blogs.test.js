const Blog_Func = require("../utils/blogs_functions")
const helper = require("./test_helper")

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = Blog_Func.totalLikes(helper.listWithOneBlog)
		expect(result).toBe(5)
	})

	test("when list has six blogs", () => {
		const result = Blog_Func.totalLikes(helper.initialBlogs)
		expect(result).toBe(45)
	})

	test("Favorite blog when list has only one blog", () => {
		const result = Blog_Func.favoriteBlogs(helper.listWithOneBlog)

		expect(result).toEqual({
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			likes: 5,
		})
	})

	test("Favorite blog when list has six blogs", () => {
		const result = Blog_Func.favoriteBlogs(helper.initialBlogs)

		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		})
	})

	test("The author with more blogs", () => {
		const result = Blog_Func.mostBlogs(helper.initialBlogs)

		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		})
	})

	test("The favorite author with six blogs", () => {
		const result = Blog_Func.mostLikes(helper.initialBlogs)

		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 21,
		})
	})
})
