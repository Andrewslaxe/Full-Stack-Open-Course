import axios from 'axios'
const API_URL = import.meta.env.VITE_BACKEND_KEY

const postContact = (note) => {
  return axios.post(API_URL, note)
}

const getPersons = () => {
  return axios.get(API_URL)
    .then(response => response.data)
}

const deleteContact = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}

const updateContact = (id, contact) => {
  return axios.put(`${API_URL}/${id}`, contact)
}

export default {
  getAll: getPersons,
  create: postContact,
  delete: deleteContact,
  update: updateContact
}
