import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => { /*MODIFICA PER MOSTRARE NOME QUANDO AGGIUNGI NUOVO BLOG*/ 
    const { title, author } = blogObject

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification({
          text: `a new blog ${title} by ${author} is added`,
          type: notification,
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
      
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        text: `${error.response.data.error}`,
        type: "error",
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />

      <Togglable buttonLabel="new blog" buttonLabel2="cancel">
        <h2>Create New Blog</h2>

          <BlogForm createBlog={addBlog}/>

      </Togglable>

      <p><b>{user.name}</b> logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>

      {blogs.map(blog => 

          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App