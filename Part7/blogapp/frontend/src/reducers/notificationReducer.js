import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const createNotification = (message, type, time) => {
  return async dispatch => {
    dispatch(setNotification({ message, type }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer