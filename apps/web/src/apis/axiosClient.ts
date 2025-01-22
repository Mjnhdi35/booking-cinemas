import axios from 'axios'

export const getAllMovies = async () => {
  const res = await axios
    .get('http://localhost:3000/api/movies')
    .catch((err) => console.log('lỗi phim' + err))

  if (res?.status !== 200) {
    return console.log('Không có dữ liệu của phim')
  }
  const dataMovies = await res.data.data.data
  return dataMovies
}
