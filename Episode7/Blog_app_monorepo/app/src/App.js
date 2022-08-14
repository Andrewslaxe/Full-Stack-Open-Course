import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {useEffect} from "react";
import {connect, useDispatch} from "react-redux";

import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

import {getUser, logout} from "./reducers/loginReducer";
import {getBlogs} from "./reducers/blogReducer";
import {Button} from "react-bootstrap";

const App = (props) => {
  const dispatch = useDispatch()
  const style = {padding: '5px', textDecoration: 'none'}

  useEffect(() => {
    props.getBlogs()
    props.getUser()
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    props.logout()
  }

  return (
    <div>
      <div className='container'>
        <BrowserRouter>
          <div className={"row my-auto"}>
            {props.user ? (<>
              <Link className={"col-1"} style={style} to="/">Blogs</Link>
              <Link className={"col-1"} style={style} to="/users">Users</Link>
              <div className={"col-2 "} style={{padding: '5px', color: "#0d6efd"}}>{props.user?.name} logged in</div>
              <Button className={"col-1"} onClick={handleLogout}>Logout</Button>
            </>) : null}
          </div>
          <Notification/>
          {props.user ? (
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/user/:id" element={<User/>}/>
              <Route path="/blogs/:id" element={<Blog/>}/>
            </Routes>) : (
            <div>
              <LoginForm/>
            </div>
          )}
        </BrowserRouter>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  logout,
  getUser,
  getBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)