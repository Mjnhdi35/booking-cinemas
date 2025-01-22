// import React, { useEffect, useState } from 'react'
// import {
//   AppBar,
//   Autocomplete,
//   Box,
//   Button,
//   Tab,
//   Tabs,
//   TextField,
//   Toolbar,
// } from '@mui/material'
// import MovieIcon from '@mui/icons-material/Movie'
// import { getAllMovies } from '../apis/axiosClient'
// import { Movies } from '../models/Movies'
// import { Link } from 'react-router-dom'

// const Header: React.FC = () => {
//   const [value, setValue] = useState<number>(0)
//   const [movies, setMovies] = useState<Movies[]>([])
//   useEffect(() => {
//     getAllMovies()
//       .then((data) => {
//         console.log(data)
//         setMovies(data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])

//   return (
//     <AppBar position="sticky" sx={{ bgcolor: '#efebdb' }}>
//       <Toolbar>
//         <Box width={'20%'}>
//           <Button component={Link} to="/">
//             <MovieIcon style={{ color: '#ff3333' }} />
//           </Button>
//         </Box>
//         <Box width={'30%'}>
//           <Autocomplete
//             sx={{ margin: '2px', padding: '4px' }}
//             freeSolo
//             options={movies && movies.map((option) => option.title)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label="Tìm kiếm phim"
//                 size="small"
//                 sx={{
//                   '& .MuiInputLabel-root': {
//                     color: '#555',
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#555',
//                   },
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': {
//                       borderColor: '#efebdb',
//                     },
//                     '&:hover fieldset': {
//                       borderColor: '#efebdb',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#555',
//                     },
//                   },
//                   input: { color: '#555' },
//                   padding: '4px',
//                 }}
//               />
//             )}
//           />
//         </Box>
//         <Box display={'flex'} sx={{ color: '#555' }}>
//           <Tabs
//             textColor="primary"
//             value={value}
//             sx={{
//               '& .MuiTabs-indicator': {
//                 backgroundColor: '#555',
//               },
//               '& .MuiTab-root': {
//                 color: '#555',
//               },
//               '& .MuiTab-root.Mui-selected': {
//                 color: '#555',
//               },
//               textTransform: 'none',
//             }}
//             onChange={(e, val) => setValue(val)}
//           >
//             <Tab
//               component={Link}
//               sx={{ textTransform: 'none' }}
//               to="/movies"
//               label={'Phim'}
//             />
//             <Tab
//               component={Link}
//               sx={{ textTransform: 'none' }}
//               to="/login"
//               label={'Đăng nhập'}
//             />
//             <Tab
//               component={Link}
//               sx={{ textTransform: 'none' }}
//               to="/support"
//               label={'Hỗ trợ'}
//             />
//           </Tabs>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default Header
