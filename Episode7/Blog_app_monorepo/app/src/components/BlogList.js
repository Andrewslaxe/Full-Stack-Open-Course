import {useSelector} from "react-redux"

import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const Blog = ({blog}) => {
    return (
      <Link style={{textDecoration: "none"}} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    )
  }
  return (
    <Table striped={true}>
      <tbody>
      {blogs.map((blog) => (
        <tr key={blog.id}>
          <td>
            <Blog
              blog={blog}
            />
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}
export default BlogList
