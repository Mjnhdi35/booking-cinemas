import { Box } from '@mui/material'
import React, { useState } from 'react'
import ToggleButton from '../ToggleButtonCustom/ToggleButton'

const ToggleButtonFilms = () => {
  const [selected, setSelected] = useState<boolean>(true)
  const toggleButtonFilmsArr = [
    {
      label: 'Phim đang chiếu',
      value: false,
      selectedColor: '#F5FFFA',
      unselectedColor: '#231f20',
      selectedBgColor: '#6f6247',
      unselectedBgColor: '#efeBDB',
    },
    {
      label: 'Phim sắp chiếu',
      value: true,
      selectedColor: '#F5FFFA',
      unselectedColor: '#6f6247',
      selectedBgColor: '#6f6247',
      unselectedBgColor: '#efeBDB',
    },
  ]
  const handleClick = (value: boolean) => {
    setSelected(value)
  }

  return (
    <Box padding={5} margin={'auto'} display={'flex'} justifyContent={'center'}>
      {toggleButtonFilmsArr.map((item) => (
        <ToggleButton
          key={item.label}
          label={item.label}
          isSelected={selected === item.value}
          onClick={() => handleClick(item.value)}
          selectedColor={item.selectedColor}
          unselectedColor={item.unselectedColor}
          selectedBgColor={item.selectedBgColor}
          unselectedBgColor={item.unselectedBgColor}
        />
      ))}
    </Box>
  )
}

export default ToggleButtonFilms
