import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/AnecdoteReducer'
import {setNotification} from '../reducers/NotificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button type='button' onClick={handleClick}>
          vote
        </button>
      </div>
    </>
  )
}

const Anecdotes = (props) => {
  return (
    <>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteAnecdote(anecdote)
            props.setNotification(`You voted for '${anecdote.content}'`, 5)
          }}
        />
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  const sortedAnecdotes = [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  const filter = state.filter
  const anecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase())
  })

  return {
    anecdotes: anecdotes,
    filter: filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default connectedAnecdotes
