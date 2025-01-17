import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default axiosClient
