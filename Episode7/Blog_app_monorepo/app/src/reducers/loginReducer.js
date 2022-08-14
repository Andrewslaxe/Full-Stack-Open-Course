import loginService from "../services/login";
import blogService from "../services/blogs";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case '@login/login':
      return action.user

    case '@login/logout':
      return null

    case '@login/getUser':
      return action.user
    default:
      return state
  }
}

export const login = (content) => {
  return async dispatch => {
    const user = await loginService.login(content)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({
      type: '@login/login',
      user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: '@login/logout'
    })
  }
}

export const getUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: '@login/getUser',
        user
      })
    } else {
      dispatch({
        type: '@login/getUser',
        user: null
      })
    }
  }
}
