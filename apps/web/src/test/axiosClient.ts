/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

async function getUser() {
  try {
    const response = await axios.get('http://localhost:3000/api/user')
    console.log(response.data.data)
    return response.data.data
  } catch (error: any) {
    console.error(error)
    if (error.response) {
      // In trường hợp lỗi từ server, ví dụ như 404
      console.log('Error Response:', error.response)
    }
  }
}

export default getUser
