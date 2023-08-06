import { createTheme } from '@mui/material';

// Augumenting Palette to include blueshade color
declare module '@mui/material/styles' {
  interface Palette {
    blueshade: Palette['primary'];
  }

  interface PaletteOptions {
    blueshade?: PaletteOptions['primary'];
  }
}
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3F75E7',
    },
    secondary: {
      main: '#D8E3FF',
    },
    error: {
      main: '#F86C7D',
    },
    success: {
      main: '#34AC64',
    },
    blueshade: {
      main: '#2D78E9',
      light: '#2CD5E0',
      dark: '#2E40E2',
      contrastText: '#FFFFFF',
    },
  },
});

export default customTheme;
