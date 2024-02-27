import { createSlice } from "@reduxjs/toolkit"
import userServices from "../services/user"

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAllUser()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer