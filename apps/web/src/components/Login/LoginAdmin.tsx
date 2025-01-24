import React from 'react'
import LoginForm from './LoginForm'
import { AdminModel, UserModel } from '../../models/UserModel'
import { sendAdminLoginRequest } from '../../apis/axiosClient'
import { adminActions, AppDispatch } from '../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  _id: string
  email: string
  addedMovies: any[]
  createdAt: string
  updatedAt: string
  exp: number
  iat: number
  __v: number
}

const LoginAdmin = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const getDataInput = async (
    data: AdminModel | { inputs: UserModel; signup: boolean },
  ) => {
    try {
      if ('email' in data && 'password' in data) {
        const res = await sendAdminLoginRequest(data)

        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token)
          const decodedToken: DecodedToken = jwtDecode(res.access_token)

          const { _id: adminId, email } = decodedToken
          localStorage.setItem('adminId', adminId)
          localStorage.setItem('adminEmail', email)
          dispatch(adminActions.login())

          navigate('/')
          alert('Admin Login successful')
        } else {
          alert('Admin Login failed: No token returned')
        }
      } else {
        alert('Invalid data format for Admin login')
      }
    } catch (err: any) {
      alert('An error occurred: ' + err.message)
    }
  }

  return (
    <div>
      <LoginForm onSubmit={getDataInput} isAdmin={true} />
    </div>
  )
}

export default LoginAdmin
