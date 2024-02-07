import { useState } from "react";
import Togglable from "./Togglable";
/* import "./styles.css" */

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const [userLikes, setLikes] = useState(blog.likes || 0);

  const addLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: userLikes + 1,
      };
      await updateBlog(updatedBlog);
      setLikes(userLikes + 1);
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <span className="title">Title: {blog.title}</span> <br />
      <span className="author">Author: {blog.author}</span> <br />
      <Togglable buttonLabel="view" buttonLabel2="hide">
        <span className="blogURL">URL: {blog.url} </span> <br />
        <span className="blogLikes">Likes: {blog.likes} </span>
        <button onClick={addLike}>Add Like</button> <br />
        {blog.user && blog.user.name && (
          <>
            <b>User:</b> {blog.user.name}
          </>
        )}{" "}
        <br />
        {blog.user && blog.user.username && blog.user.username === username && (
          <button
            className="removeButton"
            onClick={() => deleteBlog(blog.id, blog)}
          >
            Remove
          </button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
