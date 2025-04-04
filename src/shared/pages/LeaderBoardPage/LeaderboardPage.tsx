import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import theme from '../../../themes';
import SendIcon from '@mui/icons-material/Send';
import GameButton from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";


const BASE_URL = 'https://quicktap-backend-219181450324.us-central1.run.app';

interface LeaderboardItem {
  userId: string;
  username: string;
  score: number;
}

export default function LeaderboardPage() {
    const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/leaderboard`);
      const data = await res.json();
      // data.leaderboards is unsorted, so let's sort by score descending
      const sorted = data.leaderboards.sort((a: LeaderboardItem, b: LeaderboardItem) => b.score - a.score);
      setLeaderboard(sorted);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
      HIGHSCORES TABLE
      </Typography>
      <Box mt={4}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: theme?.palette?.brandPink02.main}}>
                <TableCell>POS</TableCell>
                <TableCell>Player name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {leaderboard?.map((item, index) => (
                <TableRow key={item.userId + index}   >
                  <TableCell sx={{color: index === 0 ? theme.palette.brandGreen.main : theme.palette.primary.main}}>{index === 0 && <EmojiEventsIcon></EmojiEventsIcon>}{index + 1}</TableCell>
                  <TableCell sx={{color: index === 0 ? theme.palette.brandGreen.main : theme.palette.primary.main}} >{item.username}</TableCell>
                  <TableCell sx={{color: index === 0 ? theme.palette.brandGreen.main : theme.palette.primary.main}}>{item.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      <GameButton
            text="Restart game"
            icon={<SendIcon/>}
            iconPosition="start"
            fullWidth={true}
            onClick={() =>  {navigate('/game')}}
          />
    </Container>
  );
}
