/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import axios from 'axios'

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false) // Loading state

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/login-admin',
        { email, password },
      )
      setToken(response.data.access_token)
      setError('')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Login failed: ' + err.message)
    }
  }

  const fetchUsers = async () => {
    setLoading(true) // Set loading state to true
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('data ne', response.data.data.data)

      setUsers(response.data.data.data)
      setError('')
    } catch (err: any) {
      setError('Failed to fetch users: ' + err.message)
    } finally {
      setLoading(false) // Set loading state to false after fetching
    }
  }

  return (
    <div>
      {!token ? (
        <div>
          <h1>Email:</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1>Password:</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Admin Panel</h1>
          <button onClick={fetchUsers}>Get Users</button>
          {error && <p>{error}</p>}
          {loading ? (
            <p>Loading users...</p> // Loading message
          ) : (
            <>
              {users.length > 0 ? (
                <ul>
                  {users.map((user: any) => (
                    <li key={user._id}>
                      <strong>{user.name}</strong>
                      <br />
                      Email: {user.email}
                      <br />
                      Phone: {user.phone}
                      <br />
                      Age: {user.age}
                      <br />
                      Tickets:{user.tickets}
                      <br />
                      Bookings:{user.bookings}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users fetched yet.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
