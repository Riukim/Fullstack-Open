import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToLike = state.find(n => n.id === id)

      const blogToUpdate = { ...blogToLike, likes: blogToLike.likes + 1 }

      /* console.log(JSON.parse(JSON.stringify(state))) */

      return state.map(blog => blog.id !== id ? blog : blogToUpdate)
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    setBlogs(state, action) {
      return action.payload
    },

    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { like, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogsService.remove(content.id)
    dispatch(removeBlog(content.id))
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    const votedBlog = await blogsService.update(blog.id, blog.likes + 1)
    dispatch(like(votedBlog.id))
  }
}

export default blogSlice.reducer
