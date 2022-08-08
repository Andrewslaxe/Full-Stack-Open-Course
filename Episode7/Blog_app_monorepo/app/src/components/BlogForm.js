import { useState } from 'react'

const BlogForm = ({ AddBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const addBlog = (event) => {
		event.preventDefault()
		AddBlog(newBlog)
		setNewBlog({ title: '', author: '', url: '' })
	}

	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					<label>Title</label>
					<input
						className='title_form'
						value={newBlog.title}
						onChange={({ target }) =>
							setNewBlog({ ...newBlog, title: target.value })
						}
					/>
				</div>
				<div>
					<label>Author</label>
					<input
						className='author_form'
						value={newBlog.author}
						onChange={({ target }) =>
							setNewBlog({ ...newBlog, author: target.value })
						}
					/>
				</div>
				<div>
					<label>Url</label>
					<input
						className='url_form'
						type='url'
						value={newBlog.url}
						onChange={({ target }) =>
							setNewBlog({ ...newBlog, url: target.value })
						}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default BlogForm
