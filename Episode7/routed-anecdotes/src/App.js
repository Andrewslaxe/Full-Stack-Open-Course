import {useState} from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import Home from './components/Home'
import Create from "./components/Create"
import About from "./components/About"
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const Menu = () => {
  const style = {padding: '10px'}
  return (
    <div>
      <Link style={style} to='/'>Anecdotes</Link>
      <Link style={style} to='/create'>Create new</Link>
      <Link style={style} to='/about'>About</Link>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See <a
    href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for
    the source code.
  </div>
)


const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'https://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  return (
    <div>
      <h1>Software anecdotes</h1>
      <BrowserRouter>
        <Menu/>
        <Notification message={notification}/>
        <Routes>
          <Route path='/' element={<Home anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>}/>
          <Route path='/create'
                 element={<Create anecdotes={anecdotes} setAnecdotes={setAnecdotes} setMsg={setNotification}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/anecdotes/:id'
                 element={<Anecdote anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
