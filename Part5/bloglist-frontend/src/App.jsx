import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, [refresh]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    const { title, author } = blogObject;

    try {
      const newBlog = await blogService.create(blogObject);
      /* const updatedBlogs = await blogService.getAll() */
      /* console.log('Nuovo blog creato:', updatedBlogs) */
      setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes));
      setNotification({
        text: `A new blog ${title} by ${author} is added`,
        type: notification,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding blog:", error);
      setNotification({
        text: `${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updatedBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject);
      const updatedBlogs = await blogService.getAll();
      console.log(updatedBlogs);
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setNotification({
        text: `Blog ${blogObject.title} liked`,
        type: notification,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setRefresh(!refresh);
    } catch (error) {
      setNotification({
        text: `${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id, blog) => {
    try {
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(id);
        const response = await blogService.getAll();
        setBlogs(response.sort((a, b) => b.likes - a.likes));
        setNotification({
          text: `Blog "${blog.title}" removed succesfuly`,
          type: notification,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      /*       setNotification({
        text: `${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null)
      }, 5000) */
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification({
        text: `${error.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

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
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />

      <Togglable buttonLabel="new blog" buttonLabel2="cancel">
        <h2>Create New Blog</h2>

        <BlogForm createBlog={addBlog} />
      </Togglable>

      <p>
        <b>{user.name}</b> logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updatedBlog}
          deleteBlog={deleteBlog}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default App;
