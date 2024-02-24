import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { useUser, useUserDispatch } from "./UserContext"
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
  Router
} from "react-router-dom"
import { Button } from "react-bootstrap"


import Blog from "./components/Blog"
import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useUser()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userDispatch = useUserDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = async () => {
    userDispatch.logout()
    dispatch(createNotification(`${user.name} logged out`, "success", 3))
    navigate("/login")
  }

  if (!user) {
    return (
      <div className="container">
        <LoginForm />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <h2>blogs</h2>
      <Notification />
      <div>
        {user && `${user.name} logged in`}
        <Button onClick={handleLogout}>logout</Button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <Routes>
        <Route
          path="/Blogs"
          element={
            <div>
              {blogs
                .slice()
                .sort(byLikes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    canRemove={
                      user && blog.user && blog.user.username === user.username
                    }
                  />
                ))}
            </div>
          }
        />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
