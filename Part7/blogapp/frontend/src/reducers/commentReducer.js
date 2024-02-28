import { createSlice } from "@reduxjs/toolkit"
import commentsService from "../services/comments"

const commentSlice = createSlice({
  name: "comments",
  initialState: [] ,
  reducers: {
    addComment(state, action) {
      state.comments = [...state.comments, action.payload]
    },

    setComments(state, action) {
      return action.payload
    }
  }
})

export const { addComment, setComments } = commentSlice.actions

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await commentsService.getComments(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (blogId, content) => {
  return async (dispatch) => {
    const newComment = await commentsService.createComment(blogId, content)
    dispatch(addComment(newComment))
  }
}

export default commentSlice.reducer