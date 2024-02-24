import { useState } from "react"
import { useUserDispatch } from "../UserContext"
import storageServices from "../services/storage"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { useNavigate } from "react-router-dom"
import { Form, Container, Button } from "react-bootstrap"
import Notification from "./Notification"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const userDispatch = useUserDispatch()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    try {
      await userDispatch.login(credentials)
      const user = storageServices.loadUser()
      dispatch(createNotification(`Welcome back ${user.name}`, "success", 3))
    } catch (error) {
      dispatch(createNotification("Wrong username or password", "error", 3))
      console.error("Login failed:", error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername("")
    setPassword("")
    navigate("/Blogs")
  }

  return (
    <Container>
      <h2>Welcome to BlogApp!</h2>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          id="login-button"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm