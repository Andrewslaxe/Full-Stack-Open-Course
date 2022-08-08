import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async (object) => {
	const newObject = {
		title: object.title,
		author: object.author,
		url: object.url,
		likes: object.likes,
	}

	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.put(`${baseUrl}/${object.id}`, newObject, config)
	return response.status
}

const remove = async (object) => {
	const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
	console.log('The user is', user, ' and the blog is,object', object)
	if (object.user === user.id || object.user.id === user.id) {
		if (window.confirm(`Remove blog ${object.title} by ${user.name}`)) {
			const config = {
				headers: { Authorization: token },
			}
			const response = await axios.delete(`${baseUrl}/${object.id}`, config)
			return response.status
		}
	}
}

export default { setToken, getAll, create, update, remove }
