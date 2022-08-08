import {useNavigate} from "react-router-dom";
import useField from "../hooks/useField"

const Create = ({anecdotes, setAnecdotes, setMsg}) => {
  const {reset: resetContent, ...content} = useField("text")
  const {reset: resetAuthor, ...author} = useField("text")
  const {reset: resetInfo, ...info} = useField("password")
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
    setMsg(`a new anecdote ${content} created!`)
    setTimeout(() => {
      setMsg('')
    }, 10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        content: <input {...content}/><br/>
        author: <input {...author}/><br/>
        url for more info: <input {...info}/><br/>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default Create