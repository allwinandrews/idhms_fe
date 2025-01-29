import type { ThemeOptions } from '@mui/material/styles';

// Extend Material-UI theme types
declare module '@mui/material/styles' {
  interface Palette {
    hover: Palette['primary'];
    active: Palette['primary'];
  }

  interface PaletteOptions {
    hover?: PaletteOptions['primary'];
    active?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    surface?: string;
  }

  interface TypeText {
    contrast?: string;
  }
}

// Define a spacing function
const spacing = (factor: number): number => factor * 8;

// Define design tokens with the ThemeOptions type
const designTokens: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff6090',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    hover: {
      main: '#155fa0',
    },
    active: {
      main: '#0f4b73',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      surface: '#fafafa', // Custom key for surface background
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
      contrast: '#ffffff', // Custom key for contrast text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: '3rem',
      letterSpacing: '-0.02em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  spacing,
};

export default designTokens;
