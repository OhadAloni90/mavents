import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import componentsOverride from './components';
import { headerShadow } from './utils/shadows';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 12, 
  },
});

theme.components = {
  ...theme.components,
  ...componentsOverride(theme),
};

export default theme;
