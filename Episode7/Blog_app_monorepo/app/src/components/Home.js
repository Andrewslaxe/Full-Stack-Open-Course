import {useState} from 'react'

import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'
import {Button} from "react-bootstrap";


const Home = () => {
  const [visible, setVisible] = useState(false)

  const showFunc = {display: visible ? '' : 'none'}

  return (
    <div>
      <h2 style={{color: "#0d6efd"}}>Blogs</h2>
      <div style={showFunc}>
        <BlogForm/>
      </div>
      <BlogList/>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'cancel' : 'create new'}
      </Button>
    </div>
  )
}

export default Home