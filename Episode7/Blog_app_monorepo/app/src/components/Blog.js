import {useParams} from "react-router-dom";

import {likeBlog, commentBlog} from "../reducers/blogReducer";
import {setNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";

const Blog = (props) => {
  const {id} = useParams()
  const Blog = props.blogs.find(u => u.id === id)

  const like = (event) => {
    event.preventDefault()
    props.likeBlog(Blog)
    props.setNotification(`You liked ${Blog.title}`, 'success', 5)
  }

  const comment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    props.commentBlog(Blog.id, comment)
    props.setNotification(`You commented ${comment}`, 'success', 5)
  }

  return (
    <div>
      <h1 style={{color: "#0d6efd"}}>{Blog?.title} {Blog?.author}</h1>
      <a style={{textDecoration: "none"}} href={Blog?.url}>{Blog?.url}</a>
      <div className={"col-5"}>{Blog?.likes} likes
        <Button className={"col-1"} onClick={like}>like</Button>
      </div>
      <div>added by {Blog?.user.name}</div>
      <h3>comments</h3>
      <Form onSubmit={comment}>
        <input name="comment"/>
        <Button type="submit">add comment</Button>
      </Form>
      <ul>
        {Blog?.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  likeBlog,
  commentBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)