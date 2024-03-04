import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Notification = () => {
  const info = useSelector((state) => state.notification)

  if (!info || !info.message) {
    return null
  }

  const variant = info.type === "error" ? "danger" : "success"

  return <Alert variant={variant}>{info.message}</Alert>

}

export default Notification
