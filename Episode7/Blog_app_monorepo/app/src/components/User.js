import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAll} from "../services/users";

const User = () => {
  const [users, setUsers] = useState([])
  const {id} = useParams()

  useEffect(() => {
    getAll().then(users => setUsers(users))
  }, [])

  const user = users.find(u => u.id === id)
  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user?.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User