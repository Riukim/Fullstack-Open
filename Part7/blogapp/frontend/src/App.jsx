import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { useUser, useUserDispatch } from "./UserContext"
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch,
  Link
} from "react-router-dom"
import { Button, Container, Navbar, Nav } from "react-bootstrap"


import Blog from "./components/Blog"
import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Users from "./components/Users"
import User from "./components/User"
import SingleBlog from "./components/SingleBlog"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useUser()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userDispatch = useUserDispatch()
  const match = useMatch("/blogs/:blogId")

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
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home" as={Link} to="/blogs">
            BlogApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as={Link} to="/blogs">
                Blogs
              </Nav.Link>
              <Nav.Link href="#" as={Link} to="/users">
                Users
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Navbar.Text>
                Signed in as: <a>{user && `${user.name}`}</a>
                <div>
                  <Button variant="secondary" onClick={handleLogout}>
                    logout
                  </Button>
                </div>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Notification />

      <Routes>
        <Route
          path="/blogs"
          element={
            <div>
              <h2>Blogs</h2>
              {!match && (
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <NewBlog />
                </Togglable>
              )}
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
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/blogs/:blogId" element={<SingleBlog />} />
        <Route path="/" element={<Navigate to="/blogs" replace />} />
      </Routes>
    </div>
  )
}

export default App
