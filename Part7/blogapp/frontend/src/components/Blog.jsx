import PropTypes from "prop-types"
import { deleteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Table, Button, OverlayTrigger, Popover } from "react-bootstrap"
import { Link } from "react-router-dom"

const Blog = ({ blog, canRemove }) => {
  const dispatch = useDispatch()

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(
      createNotification(
        `The blog' ${blog.title}' by '${blog.author} removed`,
        "error",
        3
      )
    )
  }

  return (
    <Table striped bordered>
      <tbody>
        <tr>
          <td>
            <Link id="blog" to={`/blogs/${blog.id}`}>{blog.title}</Link> by{" "}
            {blog.author}
          </td>
        </tr>
        <tr>
          {canRemove && (
            <td>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Header as="h3">Delete Blog</Popover.Header>
                    <Popover.Body>
                        Are you sure you want to delete this blog?
                      <br />
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(blog)}
                      >
                          Confirm Delete
                      </Button>
                    </Popover.Body>
                  </Popover>
                }
                rootClose
                onHide={() => {}}
                transition
              >
                <Button variant="danger">Delete</Button>
              </OverlayTrigger>
            </td>
          )}
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
    likes: PropTypes.number,
  }),
}

export default Blog
