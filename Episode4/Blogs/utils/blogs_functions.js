const _ = require("lodash")
const Blog = require("../models/blog")

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

const totalLikes = (blogs) => {
	let total = 0
	blogs.map((blog) => (total += blog.likes))
	return total
}

const favoriteBlogs = (blogs) => {
	const fav = _.maxBy(blogs, "likes")
	return { title: fav.title, author: fav.author, likes: fav.likes }
}

const mostBlogs = (blogs) => {
	const authors = _.map(blogs, "author")
	let obj = []

	authors.map((author) => {
		obj.some((auth) => auth.author === author)
			? (obj[obj.findIndex((auth) => auth.author === author)].blogs += 1)
			: obj.push({ author: author, blogs: 1 })
	})

	return _.maxBy(obj, "blogs")
}

const mostLikes = (blogs) => {
	let obj = []

	blogs.map((blog) => {
		obj.some((auth) => auth.author === blog.author)
			? (obj[obj.findIndex((a) => a.author === blog.author)].likes +=
					blog.likes)
			: obj.push({ author: blog.author, likes: blog.likes })
	})

	return _.maxBy(obj, "likes")
}

const mostLike = 2

module.exports = {
	blogsInDb,
	totalLikes,
	favoriteBlogs,
	mostBlogs,
	mostLikes,
	mostLike,
}
