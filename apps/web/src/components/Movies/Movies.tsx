import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { getAllMovies } from '../../apis/axiosClient'
import MovieItem from './MovieItem'
import { MovieModel } from '../../models/MovieModel'

const Movies = () => {
  const [movie, setMovie] = useState<MovieModel[]>([])
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovie(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <Box margin={'auto'} marginTop={4}>
      <Typography
        margin={'auto'}
        variant="h4"
        padding={2}
        width={'40%'}
        textAlign={'center'}
        bgcolor={'#6f6247'}
        color="#231f20"
      >
        Tất cả phim
      </Typography>

      <Box
        width={'100%'}
        margin={'auto'}
        marginTop={5}
        display={'flex'}
        justifyContent={'flex-start'}
        flexWrap={'wrap'}
        textAlign={'center'}
      >
        {movie &&
          movie.map((item, index) => {
            return (
              <MovieItem
                key={index}
                _id={item._id}
                title={item.title}
                description={item.description}
                actors={item.actors}
                posterUrl={item.posterUrl}
                releaseDate={item.releaseDate}
              />
            )
          })}
      </Box>
    </Box>
  )
}

export default Movies
