import React from 'react';
import { Typography } from '@mui/material';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <Typography variant="h5" sx={{ mb: 2 }}>
      Score: {score}
    </Typography>
  );
};

export default ScoreBoard;
