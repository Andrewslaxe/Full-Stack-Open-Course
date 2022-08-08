import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
	const [visible, setVisible] = useState(false)
	const showFunc = { display: visible ? '' : 'none' }

	const like = async (event) => {
		event.preventDefault()
		await likeBlog(blog)
	}

	const remove = async (event) => {
		event.preventDefault()
		await deleteBlog(blog)
	}

	const info = () => {
		return (
			<>
				<div className='url'>{blog.url}</div>
				<div className='likes'>
					{blog.likes}
					<button onClick={like}> like </button>
				</div>
				<div>{blog.user.name ? blog.user.name : blog.user}</div>
				<button onClick={remove}> delete</button>
			</>
		)
	}

	return (
		<>
			<ul className='blog_title_author'>
				{blog.title} {blog.author}
				<button onClick={() => setVisible(!visible)}>
					{visible ? 'hide' : 'view'}
				</button>
				<div className='infoBlog' style={showFunc}>
					{info()}
				</div>
			</ul>
		</>
	)
}

export default Blog
