import axios from "axios"

let token = null
const url = "api/users"

const STORAGE_KEY = "loggedBlogAppUser"

const setUser = (user) => {
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getAllUser = async () => {
  const request = await axios.get(url)
  return request.data
}

const getToken = () => token

export default {
  setUser, getUser, clearUser, getToken
}