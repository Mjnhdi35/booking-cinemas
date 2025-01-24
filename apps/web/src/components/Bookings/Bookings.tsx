/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoviesDetails, newBooking } from '../../apis/axiosClient'
import { MovieModel } from '../../models/MovieModel'
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'

const Bookings = () => {
  const [movie, setMovie] = useState<MovieModel>()
  const [inputs, setInputs] = useState<{ seatNumber: string; date: string }>({
    seatNumber: '',
    date: '',
  })
  const { id } = useParams<{ id: string }>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      getMoviesDetails(id)
        .then((res) => {
          setMovie(res)
        })
        .catch((err) => console.log(err))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => {
      const newInputs = {
        ...prevState,
        [e.target.name]: e.target.value,
      }

      // Nếu người dùng thay đổi seatNumber, chúng ta sẽ chuyển đổi thành mảng số
      if (e.target.name === 'seatNumber') {
        const seatNumbers = e.target.value
          .split(',')
          .map((seat) => parseInt(seat.trim()))
          .filter((seat) => !isNaN(seat)) // Lọc bỏ các giá trị không phải là số
        newInputs.seatNumber = seatNumbers.join(', ') // Hiển thị lại dưới dạng chuỗi
      }

      return newInputs
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Kiểm tra các trường dữ liệu có trống hay không
    if (!inputs.seatNumber || !inputs.date) {
      setError('Please fill out all fields.')
      return
    }

    setError(null)

    if (!movie) {
      setError('Movie not found')
      return
    }

    // Lấy userId từ localStorage
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setError('User not logged in')
      return
    }

    // Kiểm tra lại ObjectId của movie._id
    if (!movie._id || !/^[0-9a-fA-F]{24}$/.test(movie._id)) {
      setError('Invalid movie ID')
      return
    }

    // Chuyển đổi seatNumber thành mảng số
    const seatNumbersArray = inputs.seatNumber
      .split(',')
      .map((seat) => parseInt(seat.trim()))
      .filter((seat) => !isNaN(seat)) // Lọc các giá trị không phải là số

    const bookingData = {
      seatNumber: seatNumbersArray, // Mảng số ghế
      showtime: inputs.date, // Ngày và giờ chiếu

      movie: movie._id.toString(), // Đảm bảo movieId là chuỗi hợp lệ
      user: userId, // User ID từ localStorage
    }

    console.log('Booking data:', bookingData)

    newBooking(bookingData)
      .then((res) => {
        console.log('Booking successful:', res)
      })
      .catch((err) => {
        console.error('Booking failed:', err)
        setError('Failed to create booking. Please try again later.')
      })
  }

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography padding={5} variant="h4" textAlign={'center'}>
            Đặt vé phim: {movie.title}
          </Typography>
          <Box display={'flex'} justifyContent={'center'}>
            <Box
              display={'flex'}
              justifyContent={'column'}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={'auto'}
            >
              <img
                width={'528px'}
                height={'754px'}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={'80%'} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                  Starrer:
                  {movie.actors.map((actor) => ' ' + actor + ' ')}
                </Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={'50%'} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={'auto'}
                  display="flex"
                  flexDirection={'column'}
                >
                  <FormLabel>Số ghế</FormLabel>
                  <TextField
                    name="seatNumber"
                    type="text"
                    margin="normal"
                    variant="standard"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    helperText="Nhập số ghế (cách nhau bởi dấu phẩy)"
                  />
                  <FormLabel>Ngày đặt vé</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Đặt ngay
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  )
}

export default Bookings
