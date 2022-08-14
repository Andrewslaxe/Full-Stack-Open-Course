import {getAll} from "../services/users"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAll().then(users => setUsers(users))
  }, [])

  users.sort(function (a, b) {
    return b.blogs.length - a.blogs.length
  })

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users