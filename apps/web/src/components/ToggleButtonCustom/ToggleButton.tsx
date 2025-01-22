import React from 'react'
import { Typography } from '@mui/material'

interface ToggleButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  selectedColor: string
  unselectedColor: string
  selectedBgColor: string
  unselectedBgColor: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isSelected,
  onClick,
  selectedColor,
  unselectedColor,
  selectedBgColor,
  unselectedBgColor,
}) => (
  <Typography
    variant="button"
    textAlign="center"
    margin={1}
    padding={2}
    bgcolor={isSelected ? selectedBgColor : unselectedBgColor}
    color={isSelected ? selectedColor : unselectedColor}
    onClick={onClick}
    sx={{
      cursor: 'pointer',
      '&:hover': { opacity: 0.8 },
    }}
  >
    {label}
  </Typography>
)

export default ToggleButton
