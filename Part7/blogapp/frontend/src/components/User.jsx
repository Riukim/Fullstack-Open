import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { initializeUsers } from "../reducers/userReducer"

const User = () => {
  const { userId } = useParams()
  /* console.log(typeof (userId), userId) */
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === userId)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch, blogs])

  /* console.log(users) */

  if (!user || !blogs) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs Created:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
