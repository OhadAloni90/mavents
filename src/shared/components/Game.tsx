import React, { useState, useEffect } from 'react';
// import ScoreBoard from './ScoreBoard';
// import KeyDisplay from './KeyDisplay';
// import Timer from './Timer';
// import ResetButton from './ResetButton';
import { Box, Typography } from '@mui/material';
import ResetButton from './Button/Button';
import Timer from './Timer/Timer';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import KeyDisplay from './KeyDisplay/KeyDisplay';
import { useUI } from '../../providers/UIContext/UIContext';

const DEFAULT_TIME = 3;

const Game: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [targetKey, setTargetKey] = useState<string>(generateRandomKey());
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Timer logic
  useEffect(() => {
    if (gameOver) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameOver, targetKey]);

  // Global key press listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      // Compare key press (case-insensitive)
      if (e.key.toUpperCase() === targetKey) {
        setScore((prev) => prev + 1);
        setTargetKey(generateRandomKey());
        setTimeLeft(DEFAULT_TIME);
      } else {
        setGameOver(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, targetKey]);

  // Reset game function
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setTargetKey(generateRandomKey());
    setTimeLeft(DEFAULT_TIME);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <ScoreBoard score={score} />
      <KeyDisplay keyToPress={targetKey} />
      <Timer timeLeft={timeLeft} />
      {gameOver && (
        <Typography variant="h4" color="error" sx={{ mt: 2 }}>
          Game Over!
        </Typography>
      )}
    </Box>
  );
};

// Helper to generate a random key from A-Z
function generateRandomKey(): string {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return keys[Math.floor(Math.random() * keys.length)];
}

export default Game;
