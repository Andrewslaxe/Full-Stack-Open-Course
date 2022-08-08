import {useParams} from "react-router-dom";

const Anecdote = ({anecdotes, setAnecdotes}) => {
  const {id} = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))
  const vote = () => {
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === Number(id) ? voted : a))
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      <button onClick={vote}>vote</button>
    </div>
  )
}

export default Anecdote