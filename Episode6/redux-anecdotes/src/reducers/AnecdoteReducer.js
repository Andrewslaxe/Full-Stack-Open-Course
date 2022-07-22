import {getAll, postAnecdote, vote} from '../services/Anecdotes'

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case '@anecdote/create':
      return [...state, action.payload]

    case '@anecdote/vote':
      const {id} = action.payload
      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })

    case '@anecdote/init':
      return action.payload

    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch({
      type: '@anecdote/init',
      payload: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await postAnecdote(content)
    dispatch({
      type: '@anecdote/create',
      payload: newAnecdote
    })
  }
}

export const voteAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await vote(content)
    dispatch({
      type: '@anecdote/vote',
      payload: anecdote
    })
  }
}
