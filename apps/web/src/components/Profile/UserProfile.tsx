import React, { Fragment, useEffect, useState } from 'react'
import { getUserBooking } from '../../apis/axiosClient'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const UserProfile = () => {
  const [bookings, setBookings] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    getUserBooking()
      .then((res) => {
        console.log(res.bookings)

        setBookings(res.bookings)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <Box width={'100%'} display={'flex'}>
      {bookings && (
        <Fragment>
          <Box
            width={'30%'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <AccountCircleIcon sx={{ fontSize: '5rem' }} />
            <Typography
              padding={1}
              width={'auto'}
              textAlign={'center'}
              borderRadius={6}
              border={'1px solid #ccc'}
            ></Typography>
          </Box>
        </Fragment>
      )}
      <Box width={'70%'}></Box>
    </Box>
  )
}

export default UserProfile
