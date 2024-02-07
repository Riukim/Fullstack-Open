const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">log in</button>
    </form>
  )
}

export default LoginForm