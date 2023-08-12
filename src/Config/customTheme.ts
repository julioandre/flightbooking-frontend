import { createTheme } from '@mui/material/styles';

// Doe so we can use the cutomButton name as a variant
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    customButton: true;
  }
}
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
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'customButton' },
          style: {
            background: 'linear-gradient(to top,#2E40E2,#2D78E9,#2CD5E0)',
          },
        },
      ],
    },
  },
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
    warning: {
      main: '#F09846',
    },
    success: {
      main: '#34AC64',
      light: '#B2F4D9',
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
