import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case '@blog/get':
      return action.payload
    case '@blog/create':
      return [...state, action.blog]
    case '@blog/like':
      return state.map(blog => {
          if (blog.id === action.id) {
            return {...blog, likes: blog.likes + 1}
          } else {
            return blog
          }
        }
      )
    case '@blog/comment':
      return state.map(blog => {
        if (blog.id === action.id) {
          return {...blog, comments: [...blog.comments, action.comment]}
        } else {
          return blog
        }
      })
    case '@blog/remove':
      return state.filter(blog => blog.id !== action.id)
    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    dispatch({
      type: '@blog/get',
      payload: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: '@blog/create',
      blog: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.like(blog)
    dispatch({
      type: '@blog/like',
      id: blog.id
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogService.comment(id, comment)
    dispatch({
      type: '@blog/comment',
      id: id,
      comment: comment
    })
  }
}
export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: '@blog/remove',
      id: blog.id
    })
  }
}