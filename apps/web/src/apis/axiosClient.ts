import axios from 'axios'

export const getAllMovies = async () => {
  const res = await axios
    .get('/movies')
    .catch((err) => console.log('lỗi phim' + err))

  if (res?.status !== 200) {
    return console.log('Không có dữ liệu của phim')
  }
  const dataMovies = await res.data.data.data
  return dataMovies
}

export const sendUserSignupRequest = async (data: {
  name: string
  email: string
  password: string
}): Promise<any> => {
  try {
    const res = await axios.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (res.data.data.status !== 'error') {
      return res.data.data
    }
  } catch (err: any) {
    console.error('Error during signup request:', err)
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Đã xảy ra lỗi trong quá trình đăng ký.')
  }
}

export const sendUserLoginRequest = async (data: {
  email: string
  password: string
}) => {
  try {
    const response = await axios.post('/login', data)
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
  }
}

export const sendAdminLoginRequest = async (data: {
  email: string
  password: string
}) => {
  try {
    const response = await axios.post('/login-admin', data)
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
  }
}

export const getMoviesDetails = async (_id: string) => {
  const res = await axios.get(`/movies/${_id}`).catch((err) => console.log(err))

  if (res?.data.data.status !== 'success') return res
  const resData = res.data.data.data
  return resData
}

export const newBooking = async (data: {
  movie: string
  showtime: string
  seatNumber: number[]
  user: string
}) => {
  try {
    const response = await axios.post('/bookings', {
      movie: data.movie,
      showtime: data.showtime,
      seatNumber: data.seatNumber,
      user: data.user,
    })
    console.log('Booking created successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}
export const getUserBooking = async () => {
  const id = localStorage.getItem('userId')
  const res = await axios.get(`/users/${id}`).catch((err) => console.log(err))

  if (res?.data.data.status !== 'success') {
    return console.log(' vui long thu lai')
  }

  const resData = res.data.data.data
  return resData
}
