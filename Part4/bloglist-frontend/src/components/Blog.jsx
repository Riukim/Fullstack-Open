import { useState } from "react"
import Togglable from "./Togglable"
import "./styles.css"

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {

  const [userLikes, setLikes] = useState(blog.likes || 0)
  
/*   const updatedBlog ={
    title: blog.title,
    author: blog.author,
    url: blog.url,
    id: blog.id,
    likes: userLikes + 1,
    ...(blog.user && { user: blog.user.id })
  }

  const addLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: userLikes + 1
      }
      await updateBlog(updatedBlog)
      setLikes(userLikes + 1)
    } catch (error) {
      console.error("Error updating blog", error)
    }
  } */

  const addLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: userLikes + 1
      }
      await updateBlog(updatedBlog)
      setLikes(userLikes + 1)
    } catch (error) {
      console.error("Error updating blog", error)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  
  return(
    <div style={blogStyle}>
      <b>Title:</b> {blog.title}

      <Togglable buttonLabel="view" buttonLabel2="hide">
        <b>Author:</b> {blog.author} <br />

        <b>URL:</b> {blog.url} <br />

        <b>Likes:</b> {blog.likes} 
          <button onClick={addLike}>
            Add Like
          </button><br />

        {blog.user && blog.user.name && (
          <><b>User:</b> {blog.user.name}</>
        )} <br />
        {blog.user && blog.user.username && blog.user.username === username && (
        <button className="removeButton" onClick={() => deleteBlog(blog.id, blog)}>Remove</button>
        )}
      </Togglable>
    </div> 
  )}

export default Blog