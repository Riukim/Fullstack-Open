import Togglable from "./Togglable"

const Blog = ({ blog }) => {

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
        <b>Likes:</b> {blog.likes} <br />
        {blog.user && blog.user.name && (
          <><b>User:</b> {blog.user.name}</>
        )}
      </Togglable>
    </div> 
  )}

export default Blog