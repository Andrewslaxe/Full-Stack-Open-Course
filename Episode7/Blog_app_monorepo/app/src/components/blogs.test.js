import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('renders content blog', () => {
	let view, initBlog
	const mockHandler = jest.fn()

	beforeEach(() => {
		initBlog = {
			title: 'Test blog',
			author: 'Test author',
			url: 'www.test.com',
			likes: 5,
			user: {
				name: 'Test user',
				username: 'testuser',
				id: '5e9f8f8f8f8f8f8f8f8f8f8',
			},
		}

		view = render(<Blog blog={initBlog} likeBlog={mockHandler} />)
	})

	test('renders show title and author', () => {
		const div = view.container.querySelector('.blog')
		expect(div).toHaveTextContent('Test blog Test author')
	})

	test('the default style of the blog info is none', () => {
		const info = view.container.querySelector('.infoBlog')
		expect(info).toHaveStyle('display: none')
	})

	test('clicking the button shows the info', () => {
		const viewButton = view.getByText('view')
		fireEvent.click(viewButton)
		const info = view.container.querySelector('.infoBlog')
		expect(info).toHaveStyle('display:block')
	})

	test('clicking the like button', async () => {
		const like = view.getByText('like')
		await fireEvent.click(like)
		await fireEvent.click(like)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})

describe('testing the blog form', () => {
	test('renders the blog form', () => {
		const addBlog = jest.fn()
		const view = render(<BlogForm AddBlog={addBlog} />)
		const title = view.container.querySelector('.title')
		const author = view.container.querySelector('.author')
		const url = view.container.querySelector('.url')
		const form = view.container.querySelector('form')

		fireEvent.change(title, {
			target: { value: 'testing of forms could be easier' },
		})
		fireEvent.change(author, {
			target: { value: 'test user' },
		})
		fireEvent.change(url, {
			target: { value: 'http://www.example.com' },
		})
		fireEvent.submit(form)
		expect(addBlog.mock.calls).toHaveLength(1)

		expect(addBlog.mock.calls[0][0]).toStrictEqual({
			title: 'testing of forms could be easier',
			author: 'test user',
			url: 'http://www.example.com',
		})
	})
})
