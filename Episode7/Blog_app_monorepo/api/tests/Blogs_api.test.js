const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

describe('When there is initially some notes saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

	test('All blogs are returned as json', async () => {
		const response = await api
			.get('/api/blogs')
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})
})

test('Unique propertie of the blog is ID', async () => {
	const response = await api.get('/api/blogs')
	response.body.map((res) => expect(res.id).toBeDefined())
})

describe('Testing POST blogs', () => {
	let header
	beforeEach(async () => {
		const User = await api
			.post('/api/login')
			.send({ username: 'Kengancito', password: 'Peraza24.' })
		header = { Authorization: `bearer ${User.body.token}` }
	})

	test('A blog has been added', async () => {
		const newBlog = {
			title: 'This is a test blog',
			author: 'Kengan',
			url: 'google.com',
			likes: 132,
		}

		await api.post('/api/blogs').send(newBlog).expect(201).set(header)
		const BlogAtEnd = await helper.blogsInDb()
		expect(BlogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		const Titles = BlogAtEnd.map((n) => n.title)
		expect(Titles).toContain('This is a test blog')
	})

	test('Blog without likes is added with 0 likes', async () => {
		const newBlog = {
			title: 'This is a test blog without likes',
			author: 'Kengan',
			url: 'google.com',
		}

		await api.post('/api/blogs').send(newBlog).expect(201).set(header)
		const BlogAtEnd = await helper.blogsInDb()
		expect(BlogAtEnd).toHaveLength(helper.initialBlogs.length + 2)
		const testblog = BlogAtEnd.find(
			(n) => n.title === 'This is a test blog without likes'
		)
		expect(testblog.likes).toEqual(0)
	})

	test('Blog without title and url', async () => {
		const newBlog = {
			author: 'Kengan',
			likes: 12,
		}

		await api.post('/api/blogs').send(newBlog).expect(400).set(header)
	})
})
describe('Deleting a blog', () => {
	let header
	beforeEach(async () => {
		const User = await api
			.post('/api/login')
			.send({ username: 'Kengancito', password: 'Peraza24.' })
		header = { Authorization: `bearer ${User.body.token}` }
	})
	test('Delete a blog', async () => {
		const Allblogs = await helper.blogsInDb()
		const Blogid = Allblogs[Allblogs.length - 1].id
		await api.delete(`/api/blogs/${Blogid}`).expect(204).set(header)
	})
})

test('Update the likes in a blog', async () => {
	const Id = '5a422a851b54a676234d17f7'
	let res = await api.get(`/api/blogs/${Id}`)
	const Blog = res.body
	Blog.likes = 89
	await api.put(`/api/blogs/${Id}`).send(Blog)
	res = await api.get(`/api/blogs/${Id}`)
	expect(res.body.likes).toEqual(Blog.likes)
})

afterAll(() => {
	mongoose.connection.close()
})
