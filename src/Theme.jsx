import { createTheme } from "@mui/material";

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#003E1F",
      1: "#427E57",
      2: "#D9DF95",
      3: "#FBC300",
      4: "#FDFDFF",
      5: "#2F2D30",
      green: "#003E1F",
      claim: "#FEBF46",
      lightGreen: "#86dd69",
      darkGreen: "#427E57",
    },
  },
  breakpoints: {
    values: { ...breakpoints },
    unit: "px",
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "1.7rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.2rem",
    },
    h4: {
      fontWeight: 300,
      fontSize: "0.8rem",
    },
    h5: {
      fontSize: "0.6rem",
    },
    body1: {
      fontFamily: "Julius Sans One",
      fontWeight: 400,
      fontSize: "0.9rem",
      textAlign: "justify",
    },
    body2: {
      fontFamily: "Julius Sans One",
      fontWeight: 400,
      fontSize: "1.2rem",
    },
    button: {
      fontFamily: "Julius Sans One",
      fontWeight: 400,
      fontSize: "0.9rem",
      textTransform: "none",
    },
  },
});
