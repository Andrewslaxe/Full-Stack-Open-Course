import {useEffect, useRef, useState} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Loginform from './components/loginform'
import BlogForm from './components/BlogForm'
import Togglable from './components/ToggleView'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setmsg] = useState({message: '', type: ''})

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setmsg({message: 'wrong username or password', type: 'error'})
      setTimeout(() => {
        setmsg({message: null, type: null})
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const AddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setmsg({
      message: `New blog ${blog.title} by ${blog.author} added`,
      type: 'success',
    })
    setTimeout(() => {
      setmsg({message: null, type: null})
    }, 5000)
  }

  const likeBlog = async (blog) => {
    blog.likes += 1
    const res = await blogService.update(blog)
    if (res === 200 && blogs) {
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)))
    }
  }

  const deleteBlog = async (blog) => {
    const res = await blogService.remove(blog)
    if (res === 204) {
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setmsg({
        message: `the blog ${blog.title} by ${blog.author} has been deleted`,
        type: 'success',
      })
      setTimeout(() => {
        setmsg({message: null, type: null})
      }, 5000)
    } else {
      setmsg({
        message: `the blog ${blog.title} by ${blog.author} can't be deleted`,
        type: 'error',
      })
      setTimeout(() => {
        setmsg({message: null, type: null})
      }, 5000)
    }
  }

  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={msg.message} type={msg.type}/>
      {user === null ? (
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <div>
            {user.name} logged in{' '}
            <button onClick={handleLogout} type='button'>
              logout
            </button>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm AddBlog={AddBlog}/>
            </Togglable>
          </div>
          <ul>
            {blogs.map((blog) => (
              <Blog
                className='blog'
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
