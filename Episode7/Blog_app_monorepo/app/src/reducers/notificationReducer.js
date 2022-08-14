let timeOutId
export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case '@notification/setMsg':
      return action
    default:
      return state
  }
}

export const setNotification = (message, kind, time) => {
  if (timeOutId !== undefined) {
    clearTimeout(timeOutId)
  }
  return (dispatch) => {
    dispatch({
      type: '@notification/setMsg',
      message,
      kind
    })
    timeOutId = setTimeout(() => {
      dispatch({
        type: '@notification/setMsg',
        message: '',
        kind
      })
    }, 1000 * time)
  }
}