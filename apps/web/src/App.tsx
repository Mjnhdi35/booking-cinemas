import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Movies from './components/Movies/Movies'
import Support from './components/Support/Support'
import Login from './components/Login/Login'
import LoginAdmin from './components/Login/LoginAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, AppDispatch, RootState, userActions } from './store'
import { useEffect } from 'react'
import Bookings from './components/Bookings/Bookings'
import UserProfile from './components/Profile/UserProfile'

function App() {
  const dispatch: AppDispatch = useDispatch()
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.admin.isLoggedIn,
  )
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn,
  )

  console.log('admin logged', isAdminLoggedIn)

  console.log('user logged', isUserLoggedIn)

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(userActions.login())
    } else if (localStorage.getItem('adminId')) {
      dispatch(adminActions.login())
    }
  }, [])

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/user" element={<UserProfile />} />

          <Route path="/bookings/:id" element={<Bookings />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
