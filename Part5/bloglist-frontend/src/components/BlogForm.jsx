import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewAuthor("")
    setNewTitle("")
    setNewUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <b>Title: </b><input name="title" value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
      />
      <br />
      <b>Author: </b><input name="author" value={newAuthor}
        onChange={event => setNewAuthor(event.target.value)} />
      <br />
      <b>URL: </b><input name="url" value={newUrl}
        onChange={event => setNewUrl(event.target.value)}/>
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm