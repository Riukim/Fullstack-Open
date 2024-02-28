import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { initializeBlogs } from "../reducers/blogReducer"
import { voteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Button, Form } from "react-bootstrap"
import { createComment, initializeComments } from "../reducers/commentReducer"
import Togglable from "./Togglable"

const SingleBlog = () => {
  const [comment, setComment] = useState("")
  const { blogId } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeComments(blogId))
  }, [dispatch, blogId])

  const handleVote = (blog) => {
    dispatch(voteBlog(blog))
    dispatch(createNotification(`Voted for ${blog.title}`, "success", 3))
  }

  const addComment = async (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment
    }

    console.log("new comment: ", newComment)

    dispatch(createComment(blogId, newComment))
    dispatch(createNotification(`New comment added to ${blog.title}`, "success", 3))

    setComment("")
  }

  if (!blogs) {
    return null
  }

  const blog = blogs.find((blog) => blog.id === blogId)

  if (!blog) {
    return <div>No blogs found</div>
  }

  console.log("Struttura del blog:", blog)
  console.log("Nome del blog:", blog.title)
  console.log("Commenti del blog:", comments.comments)

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}
        <Button onClick={() => handleVote(blog)}>like</Button>
      </div>
      {blog.user && blog.user.name && <div>Added by {blog.user.name}</div>}
      <div>
        <h3>Comments:</h3>
        <Togglable buttonLabel="new comment">
          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Label>Comment: </Form.Label>
              <Form.Control
                id="comment"
                placeholder="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                style={{ width: "300px" }}
              />
            </Form.Group>
            <Button type="submit" style={{ margin: "10px" }}>
              create
            </Button>
          </Form>
        </Togglable>
        {comments && comments.comments && comments.comments.length > 0 ? (
          <ul>
            {comments.comments.map((comment, index) => (
              <li key={index}>{comment.comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet!</p>
        )}
      </div>
    </div>
  )
}

export default SingleBlog
