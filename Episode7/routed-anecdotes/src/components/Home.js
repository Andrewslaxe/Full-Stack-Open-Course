import {Link} from "react-router-dom";

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const Home = ({anecdotes}) => {
  return (
    <div>
      <AnecdoteList anecdotes={anecdotes}/>
    </div>
  )
}

export default Home