// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Vibrant blue
    },
    secondary: {
      main: '#dc004e', // Vibrant pink
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff', // White cards
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1976d2', // Primary color for headings
    },
  },
});

export default theme;