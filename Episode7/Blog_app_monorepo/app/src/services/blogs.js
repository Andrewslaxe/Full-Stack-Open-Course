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
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (object) => {
  const newObject = {
    title: object.title,
    author: object.author,
    url: object.url,
    likes: object.likes + 1
  }
  await axios.put(`${baseUrl}/${object.id}`, newObject)
  return object.id
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment})
  return response.status
}

const remove = async (object) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.status
}

export default {setToken, getAll, like, comment, create, remove}
