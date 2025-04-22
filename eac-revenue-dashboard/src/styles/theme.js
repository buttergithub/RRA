// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light theme colors
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
        }
      : {
          // Dark theme colors
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
});

// Create theme instance
export const theme = createTheme(getDesignTokens('light'));

// Helper function to get theme based on mode
export const getTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};