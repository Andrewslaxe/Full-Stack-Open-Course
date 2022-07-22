export const filterReducer = (state = '', action) => {
  switch (action.type) {
    case '@filter/setFilter':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: '@filter/setFilter',
    filter
  }
}
