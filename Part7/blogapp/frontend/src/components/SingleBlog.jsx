import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { initializeBlogs } from "../reducers/blogReducer"
import { voteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Button } from "react-bootstrap"

const SingleBlog = () => {
  const { blogId } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleVote = (blog) => {
    dispatch(voteBlog(blog))
    dispatch(createNotification(`Voted for ${blog.title}`, "success", 3))
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
      {blog.user && blog.user.name &&
      <div>Added by {blog.user.name}</div>}
    </div>
  )
}

export default SingleBlog
