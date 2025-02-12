'use client';

import { createTheme, ThemeProvider } from '@mui/material';

export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3857F4',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#253E99',
                borderRadius: '8px',
              },
              '&:hover fieldset': {
                borderColor: '#253E99',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#253E99',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
