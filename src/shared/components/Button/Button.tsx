import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GameButtonProps } from '../../../utils/types/componentsTypes';

export default function GameButton({
  text,
  icon,
  iconPosition = 'start',
  fullWidth,
  width,
  ...rest
}: GameButtonProps) {
  const startIcon = iconPosition === 'start' ? icon : undefined;
  const endIcon   = iconPosition === 'end'   ? icon : undefined;
  const StyledButton = styled(Button)(({ theme }) => ({
    width: width,
    boxShadow: 'none'
  }));
  return (
    <StyledButton
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      {...rest}
      onClick={rest.onClick}
    >
      <Typography variant='mavenMediumText'>
      {text}
      </Typography>
    </StyledButton>
  );
}
