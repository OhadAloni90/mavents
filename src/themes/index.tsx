import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import componentsOverride from './components';
import { customAlertShadows, dialogsShadow, gameHeaderAndCubeShadow, headerShadow } from './utils/shadows';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 12, 
    
  },
  customShadows: {
    alert: customAlertShadows,
    header: headerShadow,
    dialogs: dialogsShadow,
    gameHeader: gameHeaderAndCubeShadow,
    gameCube: gameHeaderAndCubeShadow,
  },
});

theme.components = {
  ...theme.components,
  ...componentsOverride(theme),
};

export default theme;
