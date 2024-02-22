import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import storageService from "./services/storage"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs, removeBlog } from "./reducers/blogReducer"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState("")

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      dispatch(createNotification(`Welcome back, ${user.username}!`, "success", 5))
    } catch (e) {
      dispatch(createNotification("wrong username or password", "error", 5))
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    dispatch(createNotification("logged out", "success", 5))
  }

  /*   const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog.id)
      dispatch(createNotification(`The blog' ${blog.title}' by '${blog.author} removed`, "error", 5))
      dispatch(removeBlog(blog.id))
    }
  } */

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
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
    </div>
  )
}

export default App
