let timeOutId
export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case '@notification/setMsg':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  if (timeOutId !== undefined) {
    clearTimeout(timeOutId)
  }
  return (dispatch) => {
    dispatch({
      type: '@notification/setMsg',
      message
    })
    timeOutId = setTimeout(() => {
      dispatch({
        type: '@notification/setMsg',
        message: ''
      })
    }, 1000 * time)
  }
}
