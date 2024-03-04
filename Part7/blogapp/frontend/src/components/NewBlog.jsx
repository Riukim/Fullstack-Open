import { useState } from "react"
import { createNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { Form, Button, Container } from "react-bootstrap"

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
    dispatch(createNotification(`New blog added ${newBlog.title}`, "success ", 3))

    setTitle("")
    setAuthor("")
    setUrl("")

  }

  return (
    <Container>
      <h4>Create a new blog</h4>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label htmlFor="title">title</Form.Label>
          <Form.Control
            id="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">author</Form.Label>
          <Form.Control
            id="author"
            placeholder="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">url</Form.Label>
          <Form.Control
            id="url"
            placeholder="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{ margin: "10px" }}
          data-testid="create-button"
        >
          create
        </Button>
      </Form>
    </Container>
  )
}

export default BlogForm