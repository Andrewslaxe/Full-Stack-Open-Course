import {useState} from 'react'

import {setNotification} from "../reducers/notificationReducer";
import {createBlog} from "../reducers/blogReducer";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog(newBlog)
    props.setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5)
    setNewBlog({title: '', author: '', url: ''})
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Label>Title</Form.Label>
        <Form.Group className={"col-3 mb-3"} id={'title'}>
          <Form.Control
            className='title_form'
            value={newBlog.title}
            placeholder={'Enter title'}
            onChange={({target}) =>
              setNewBlog({...newBlog, title: target.value})
            }
          />
        </Form.Group>
        <Form.Group className={"col-3 mb-3"}>
          <Form.Label>Author</Form.Label>
          <Form.Control
            className='author_form'
            value={newBlog.author}
            placeholder={'Enter author'}
            onChange={({target}) =>
              setNewBlog({...newBlog, author: target.value})
            }
          />
        </Form.Group>
        <Form.Group className={"col-3 mb-3"}>
          <Form.Label>Url</Form.Label>
          <Form.Control
            className='url_form'
            type='url'
            value={newBlog.url}
            placeholder={'Enter url'}
            onChange={({target}) =>
              setNewBlog({...newBlog, url: target.value})
            }
          />
        </Form.Group>
        <Button type='submit'>create</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

const connectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default connectedBlogForm
