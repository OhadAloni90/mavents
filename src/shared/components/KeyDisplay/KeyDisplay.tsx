import React from 'react';
import { Typography, Paper } from '@mui/material';

interface KeyDisplayProps {
  keyToPress: string;
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({ keyToPress }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, display: 'inline-block', mb: 2 }}>
      <Typography variant="h4">Press: {keyToPress}</Typography>
    </Paper>
  );
};

export default KeyDisplay;
