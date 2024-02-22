import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import storageService from "./services/storage"
import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { useUser } from "./UserContext"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useUser()

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = async () => {
    dispatch.logout()
    storageService.removeUser()
    dispatch(createNotification("logged out", "success", 5))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
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
        <button onClick={handleLogout}>logout</button>
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
