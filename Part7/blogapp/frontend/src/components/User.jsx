import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { initializeUsers } from "../reducers/userReducer"
import { ListGroup, Badge } from "react-bootstrap"

const User = () => {
  const { userId } = useParams()
  /* console.log(typeof (userId), userId) */
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === userId)
  const blogs = useSelector((state) => state.blogs)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch, blogs])

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`)
  }

  const byLikes = (a, b) => b.likes - a.likes
  const style = {
    marginTop: "20px",
    marginBottom: "20px",
  }

  if (!user || !blogs) {
    return null
  }

  return (
    <div>
      <h2 style={style}>Blogs Created by {user.name}:</h2>
      {user.blogs.length === 0 ? (
        <p>No Blogs Added!</p>
      ) : (
        <ListGroup>
          {user.blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <ListGroup.Item
                action
                variant="secondary"
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="d-flex justify-content-between align-items-start"
              >
                {blog.title}
                <Badge bg="primary" pill>
                likes: {blog.likes}
                </Badge>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </div>
  )
}

export default User
