"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3857F4",
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
      MuiTypography: {
        defaultProps: {
          fontFamily: "Lato",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Lato",
            textTransform: "none",
            borderRadius: "4px",
            fontWeight: "600",
          },
          contained: {
            color: "#D7FF7B",
          },
          outlined: {
            border: "#253E99 1px solid",
            color: "#253E99",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
