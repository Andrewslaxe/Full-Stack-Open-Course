import {applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {anecdoteReducer} from './reducers/AnecdoteReducer'
import {notificationReducer} from './reducers/NotificationReducer'
import {filterReducer} from './reducers/FilterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = configureStore(
  {reducer: reducer},
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
