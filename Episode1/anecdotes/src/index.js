import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)
const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(5))

	const SetVotes = (index) => {
		const newVotes = [...votes]
		newVotes[index] += 1
		setVotes(newVotes)
	}

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<div>
				{props.anecdotes[selected]}
				<br></br>
				Has {votes[selected]} votes
			</div>
			<Button handleClick={() => SetVotes(selected)} text="Vote" />
			<Button
				handleClick={() =>
					setSelected(Math.floor(Math.random() * (props.anecdotes.length - 1)))
				}
				text="next anecdote"
			/>
			<h2>Anecdote with most votes</h2>
			<div>
				{props.anecdotes[votes.indexOf(Math.max(...votes))]}
				<br></br>
				Has {Math.max(...votes)} votes
			</div>
		</div>
	)
}

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
