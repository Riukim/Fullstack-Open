import { useState } from "react"
import PropTypes from "prop-types"
import { deleteBlog, voteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Blog = ({ blog, canRemove }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleVote = (blog) => {
    dispatch(voteBlog(blog))
    dispatch(createNotification(`Voted for ${blog.title}`,"success", 3))
  }

  const handleDelete = (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(deleteBlog(blog))
      dispatch(
        createNotification(
          `The blog' ${blog.title}' by '${blog.author} removed`,
          "error",
          3
        )
      )
    }

  }

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid"
  }

  return (
    <Table striped bordered>
      <tbody>
        <tr>
          <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
            {/*<Button onClick={() => setVisible(!visible)}>
              {visible ? "hide" : "show"}
            </Button>
            {visible && (
              <div>
                <a href={blog.url}> {blog.url}</a>
                <div>
                  likes {blog.likes}
                  <Button onClick={() => handleVote(blog)}>like</Button>
                </div>
                <div>{blog.user && blog.user.name}</div>
                {canRemove && (
                  <Button onClick={() => handleDelete(blog)}>delete</Button>
                )}
              </div>
            )} */}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

Blog.propTypes = {
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
}

export default Blog