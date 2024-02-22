import { createContext, useContext, useReducer, useEffect } from "react"

const userReducer = (state, action) => {
  switch (action.type) {
  case "LOGIN":
    return {
      ...state,
      user: action.payload
    }

  case "LOGOUT":
    return {
      ...state,
      user: null
    }


  default:
    return state
  }
}

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: "LOGIN",
        payload: user
      })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("loggedBlogAppUser")
    dispatch({ type: "LOGOUT" })
  }

  return (
    <UserContext.Provider value={{ state, dispatch, logout }}>
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
  return dispatch
}



