"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3857F4",
      },
    },
    typography: {
      fontFamily: [
        "Lato",
        "-apple-system",
        "Roboto",
        "Arial",
        "sans-serif",
      ].join(","),
      h5: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: "130%",
        letterSpacing: "0",
        color: "#1D1B20",
      },
      h6: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "130%",
        letterSpacing: "0",
        color: "#1D1B20",
      },
      body1: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "150%",
        letterSpacing: "0",
        color: "#1D1B20",
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
            textTransform: "none",
            borderRadius: "4px",
          },
          outlined: {
            border: "1px solid #253E99",
            color: "#253E99",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "26px",
            letterSpacing: "0.46px",
          },
          contained: {
            backgroundColor: "#3857F4",
            color: "#D7FF7B",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "26px",
            letterSpacing: "0.46px",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
