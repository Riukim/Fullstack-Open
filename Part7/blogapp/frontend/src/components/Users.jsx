import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeUsers } from "../reducers/userReducer"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)


  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch, blogs])

  /* console.log(users) */

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
