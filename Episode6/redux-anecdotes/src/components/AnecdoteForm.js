import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/AnecdoteReducer'
import {setNotification} from '../reducers/NotificationReducer'

function NewNote(props) {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`New anecdote: '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(NewNote)
export default connectedAnecdotes
