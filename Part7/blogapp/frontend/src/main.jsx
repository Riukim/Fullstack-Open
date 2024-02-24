import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store"
import { Provider } from "react-redux"
import { UserProvider } from "./UserContext"
import { BrowserRouter as Router } from "react-router-dom"

console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </Provider>
)