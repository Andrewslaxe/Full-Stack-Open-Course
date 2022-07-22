import axios from 'axios'

const anecdotesUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(anecdotesUrl)
  return response.data
}

export const postAnecdote = async (content) => {
  const anecdote = {content, votes: 0}
  const response = await axios.post(anecdotesUrl, anecdote)
  return response.data
}

export const vote = async (content) => {
  const anecdote = {...content, votes: content.votes + 1}
  const response = await axios.put(`${anecdotesUrl}/${content.id}`, anecdote)
  return response.data
}
