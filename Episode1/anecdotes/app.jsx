import { useState } from 'react'

const ShowAnecdote = ({ anecdote }) => {
  return (<div className='anecdote'>{anecdote} </div>)
}

export default function App () {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    selected < anecdotes.length - 1 ? setSelected(selected + 1) : setSelected(0)
  }

  const voteAnecdote = (index) => {
    const newVotes = [...votes]
    newVotes[index] += 1
    setVotes(newVotes)
  }
  const mostVoted = () => {
    return votes.findIndex(vote => vote === Math.max(...votes))
  }
  return (
    <div className='mainPage'>
      <h1 className='anecdoteTitle'>Anecdote of the day</h1>
      <ShowAnecdote anecdote={anecdotes[selected]} />
      <div className='votes'>{votes[selected]} votes</div>
      <div className='buttons'>
        <button className='voteButton' onClick={() => voteAnecdote(selected)}>Vote</button>
        <button className='nextButton' onClick={() => nextAnecdote()}>Next Anecdote</button>
      </div>
      <footer className='mostVoted'>
        <h1 className='anecdoteTitle '>Anecdote with most votes</h1>
        <ShowAnecdote anecdote={anecdotes[mostVoted()]} />
      </footer>
    </div>
  )
}
