import { createContext, useContext, useReducer, useEffect } from "react"
import storageService from "./services/storage"
import userService from "./services/login"

const userReducer = (state, action) => {
  switch (action.type) {
  case "LOGIN":
    return {
      ...state,
      user: action.payload,
    }

  case "LOGOUT":
    return {
      ...state,
      user: null,
    }

  default:
    return state
  }
}

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const loggedUser = storageService.loadUser()
    /* console.log(loggedUser) */
    if (loggedUser) {
      dispatch({
        type: "LOGIN",
        payload: loggedUser,
      })
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await userService.login(credentials)
      storageService.saveUser(user)
      dispatch({
        type: "LOGIN",
        payload: user
      })
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const logout = () => {
    storageService.removeUser()
    dispatch({ type: "LOGOUT" })
  }

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const { state } = useContext(UserContext)
  return state.user
}

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext)
  return { dispatch, login: useContext(UserContext).login, logout: useContext(UserContext).logout }
}
