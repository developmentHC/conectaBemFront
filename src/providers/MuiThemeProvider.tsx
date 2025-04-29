"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3857F4",
      },
    },
    typography: {
      h5: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: "130%",
        letterSpacing: "0",
      },
      body1: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "150%",
        letterSpacing: "0",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#253E99",
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: "#253E99",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#253E99",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
