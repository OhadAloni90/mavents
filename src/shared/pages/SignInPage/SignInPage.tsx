import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import { UserContext } from '../../../App';
import GameButton from '../../components/Button/Button';
import GameContainer from '../../components/GameContainer/GameContainer';
import SendIcon from '@mui/icons-material/Send';
import { useUI } from '../../../providers/UIContext/UIContext';
import ClearIcon from '@mui/icons-material/Clear';
import { defaultContainerStyles } from '../../../themes/utils/containerSizes';

const BASE_URL = 'https://quicktap-backend-219181450324.us-central1.run.app';

export default function SignInPage() {
  const [username, setUsername] = React.useState('');
  const { setUserId } = React.useContext(UserContext);
  const navigate = useNavigate();
  const { showToast, setUser } = useUI();
  const handleUserType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e || !e?.target?.value) return;
    setUsername(e.target.value);
    setUser(e.target.value);
  };
  const handleClear = () => {
    setUsername('');
  };
  const handleStart = async () => {
    if (!username) return showToast('Must have atleast 1 character', 'error');
    try {
      const res = await fetch(`${BASE_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.userId) {
        setUserId(data.userId);
        navigate('/game');
      }
    } catch (error) {
      console.error('Failed to get userId:', error);
    } 
  };

  return (
    <Container  sx={{
      ...defaultContainerStyles
    }}
  >
      <Typography variant="h1" gutterBottom sx={{ marginBottom: '50px' }} >
        Welcome to mavens Game
      </Typography>
      <GameContainer width={430} height={120} >
        <Typography variant="body2" gutterBottom  sx={{ textAlign: 'left', marginBottom: '25px' }}>
          Enter player name
        </Typography>
        {/* Flex container for the input and button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Input"
            value={username}
            onChange={handleUserType}
            slotProps={{
              input: {
                endAdornment: username && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <GameButton
            text="Start game"
            icon={<SendIcon />}
            iconPosition="start"
            fullWidth={true}
            onClick={handleStart}
          />
        </Box>
      </GameContainer>
    </Container>
  );
}
