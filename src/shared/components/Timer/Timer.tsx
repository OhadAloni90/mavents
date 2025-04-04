import React from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <Typography variant="h6" sx={{ mb: 2 }}>
      Time Left: {timeLeft}s
    </Typography>
  );
};

export default Timer;
