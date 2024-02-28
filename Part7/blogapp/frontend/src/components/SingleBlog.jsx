import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { initializeBlogs } from "../reducers/blogReducer"
import { voteBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Button } from "react-bootstrap"
import getComments from "../services/comments"

const SingleBlog = () => {
  const { blogId } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initializeBlogs())
      try {
        const commentsData = await getComments(blogId)

        setComments(commentsData)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    fetchData()
  }, [dispatch, blogId])

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
