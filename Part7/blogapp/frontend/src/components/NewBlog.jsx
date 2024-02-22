import { useState } from "react"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(newBlog))
    dispatch(createNotification(`New blog added ${newBlog.title}`, "success ", 5))

    setTitle("")
    setAuthor("")
    setUrl("")

  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            placeholder="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm