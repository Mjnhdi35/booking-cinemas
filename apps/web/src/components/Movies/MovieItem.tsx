import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import React from 'react'

interface MovieItemProps {
  title: string
  posterUrl: string
  releaseDate: Date
  description: string
  _id: string
}

const MovieItem: React.FC<MovieItemProps> = ({
  title,
  posterUrl,
  releaseDate,
  description,
  _id,
}) => {
  return (
    <Card
      sx={{
        width: 228,
        height: 420,
        margin: 1,
        borderRadius: 1,
        position: 'relative',
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        },
      }}
    >
      <img
        src={posterUrl}
        height={'334px'}
        width={'228px'}
        alt={description}
        style={{
          objectFit: 'cover',
          transition: '0.3s',
        }}
      />
      <p style={{ display: 'none' }}>{_id}</p>
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.69)',
          opacity: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'opacity 0.3s ease',
          ':hover': {
            opacity: 1,
          },
        }}
      >
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50%',
            width: '100%',
            padding: '0 12px',
          }}
        >
          <Button
            sx={{
              color: '#c0b687',
              border: '1px solid #c0b687',
              padding: '12px',
              width: '100%',
              marginBottom: '5px',
              fontSize: '16px',
            }}
            size="small"
          >
            Đặt vé
          </Button>
          <Button
            sx={{
              color: '#c0b687',
              border: '1px solid #c0b687',
              padding: '12px',
              width: '100%',
              fontSize: '16px',
              marginLeft: '0px',
            }}
            style={{ marginLeft: '0' }}
            size="small"
          >
            Chi tiết
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default MovieItem
