/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import getUser from './test/axiosClient'

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser()
      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        setError('Failed to fetch users or data is not an array')
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && Array.isArray(users) && (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
