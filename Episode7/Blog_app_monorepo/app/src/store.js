import {applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {notificationReducer} from './reducers/notificationReducer'
import {blogReducer} from './reducers/blogReducer'
import {loginReducer} from "./reducers/loginReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer
})

const store = configureStore(
  {reducer},
  composeWithDevTools(applyMiddleware(thunk))
)

export default store