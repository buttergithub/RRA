import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        backgroundColor: '#f5f7fa',
        color: '#333',
        lineHeight: 1.6,
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
);