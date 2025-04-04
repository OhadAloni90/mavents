import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

export default function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Score passed via navigate('/game-over', { state: { score } })
  const { score } = (location.state as { score: number }) || { score: 0 };

  const handlePlayAgain = () => {
    navigate('/game');
  };

  const handleGoLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Game Over
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {score}
      </Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={handlePlayAgain} sx={{ mr: 2 }}>
          Play Again
        </Button>
        <Button variant="outlined" onClick={handleGoLeaderboard}>
          Leaderboard
        </Button>
      </Box>
    </Container>
  );
}
