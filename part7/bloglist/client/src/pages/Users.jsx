import userService from '../services/users'

import { useQuery } from '@tanstack/react-query'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Blog service not available due to problems in the server</div>
  }

  const users = result.data

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th># of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
