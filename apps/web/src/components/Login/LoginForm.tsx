import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import React, { useState } from 'react'
import { AdminModel, UserModel } from '../../models/UserModel'

const labelStyle = { mt: 1, mb: 1 }
export interface LoginFormProps {
  onSubmit: (data: AdminModel | { inputs: UserModel; signup: boolean }) => void
  isAdmin?: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isAdmin = false }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isSignup, setIsSignup] = useState<boolean>(false)
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isAdmin) {
      const adminData: AdminModel = {
        email: inputs.email,
        password: inputs.password,
      }
      onSubmit(adminData)
    } else {
      const userData = { inputs, signup: isSignup }
      onSubmit(userData)
    }
  }
  return (
    <Dialog
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#FFF8DC',
            padding: 2,
          },
          elevation: 6,
        },
      }}
      open={true}
    >
      <Box sx={{ ml: 'auto', padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={'center'}>
        {!isAdmin && isSignup ? 'Đăng ký' : 'Đăng nhập'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          width={400}
          margin={'auto'}
          padding={6}
          alignContent={'center'}
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Tên</FormLabel>
              <TextField
                type={'name'}
                name="name"
                value={inputs.name}
                variant="standard"
                margin="normal"
                onChange={handleChangeInput}
              />
            </>
          )}

          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            type={'email'}
            name="email"
            value={inputs.email}
            variant="standard"
            margin="normal"
            onChange={handleChangeInput}
          />

          <FormLabel sx={labelStyle}>Mật Khẩu</FormLabel>
          <TextField
            type={'password'}
            name={'password'}
            value={inputs.password}
            variant="standard"
            margin="normal"
            onChange={handleChangeInput}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: '#efebdb',
              borderRadius: 10,
              color: '#555',
              textTransform: 'none',
            }}
            variant="contained"
          >
            {isSignup ? 'Đăng ký' : 'Đăng nhập'}
          </Button>
          {!isAdmin && (
            <Button
              fullWidth
              disableTouchRipple
              sx={{
                mt: 2,
                borderRadius: 10,
                textTransform: 'none',
                textDecoration: 'underline',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                },
                '&:active': {
                  backgroundColor: 'transparent',
                },
              }}
              variant="text"
              onClick={() => setIsSignup(!isSignup)}
            >
              Đi đến {isSignup ? 'Đăng Nhập' : 'Đăng ký'}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  )
}

export default LoginForm
