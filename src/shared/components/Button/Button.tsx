import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GameButtonProps } from '../../../utils/types/componentsTypes';
const StyledButton = styled(Button)(({ theme }) => ({
}));
export default function GameButton({
  text,
  icon,
  iconPosition = 'start',
  fullWidth,
  ...rest
}: GameButtonProps) {
  const startIcon = iconPosition === 'start' ? icon : undefined;
  const endIcon   = iconPosition === 'end'   ? icon : undefined;

  return (
    <StyledButton
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      {...rest}
      onClick={rest.onClick}
    >
      {text}
    </StyledButton>
  );
}
