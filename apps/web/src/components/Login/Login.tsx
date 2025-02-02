import React from 'react'
import LoginForm from './LoginForm'
import { AdminModel, UserModel } from '../../models/UserModel'
import { sendUserLoginRequest } from '../../apis/axiosClient'
import { AppDispatch, userActions } from '../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  _id: string
  email: string
  name: string
  bookings: any[]
  exp: number
  iat: number
  createdAt: string
  updatedAt: string
  __v: number
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const getDataInput = async (
    data: AdminModel | { inputs: UserModel; signup: boolean },
  ) => {
    try {
      if ('inputs' in data && 'signup' in data) {
        const { inputs } = data as { inputs: UserModel; signup: boolean }
        const res = await sendUserLoginRequest(inputs)

        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token)
          const decodedToken: DecodedToken = jwtDecode(res.access_token)

          const { _id, email, name } = decodedToken
          localStorage.setItem('userId', _id)
          localStorage.setItem('userEmail', email)
          localStorage.setItem('userName', name)
          dispatch(userActions.login())

          navigate('/')
          alert('User Login successful')
        } else {
          alert('User Login failed: No token returned')
        }
      } else {
        alert('Invalid data format')
      }
    } catch (err: any) {
      alert('An error occurred: ' + err.message)
    }
  }

  return (
    <div>
      <LoginForm onSubmit={getDataInput} isAdmin={false} />
    </div>
  )
}

export default Login
