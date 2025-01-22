import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ToggleButtonFilms from './ToggleButtonFilms/ToggleButtonFilms'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { Movies } from '../models/Movies'
import { getAllMovies } from '../apis/axiosClient'

const HomePage = () => {
  const [movies, setMovies] = useState<Movies[]>([])
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log(data)
        setMovies(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
      <Box width={'80%'} height={'40%'} margin={'auto'} padding={2}>
        <img
          src="https://res.cloudinary.com/dccfk1x2g/image/upload/v1737521001/hsljezjaft3w4g4dw6hf.png"
          alt="hero01"
          width={'100%'}
          height={'100%'}
        />
      </Box>
      <ToggleButtonFilms />
      <Box
        display={'flex'}
        width={'100%'}
        justifyContent={'center'}
        flexWrap={'wrap'}
        alignItems="center"
      >
        {movies.slice(0, 4).map((item, index) => (
          <Box key={index}>
            <MovieItem
              _id={item._id}
              title={item.title}
              posterUrl={item.posterUrl}
              releaseDate={item.releaseDate}
              description={item.description}
            />
          </Box>
        ))}
      </Box>
      <Box display={'flex'} padding={3} margin={'auto'}>
        <Button
          variant="contained"
          component={Link}
          to="/movies"
          sx={{
            margin: 'auto',
            bgcolor: '#efefef',
            color: '#231f20',
            border: '1px solid #efefef',
            textTransform: 'none',
          }}
        >
          Xem thêm
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
