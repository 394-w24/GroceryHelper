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
      1: "#73BA9B",
      2: "#73BA9B",
      3: "#D5F2E3",
      4: "#BA2D0B",
      5: "#01110A",
      claim: "#FEBF46"
    },
  },
  breakpoints: {
    values: { ...breakpoints },
    unit: "px",
  },
  typography: {
    h1: {
      fontFamily: "Julius Sans One",
      fontWeight: 700,
      fontSize: "1.7rem",
    },
    h2: {
      fontFamily: "Julius Sans One",
      fontWeight: 400,
      fontSize: "1rem",
    },
    h3: {
      fontFamily: "Julius Sans One",
      fontWeight: 700,
      fontSize: "1.2rem",
    },
    h4: {
      fontFamily: "Julius Sans One",
      fontWeight: 300,
      fontSize: "0.8rem",
    },
    h5: {
      fontFamily: "Julius Sans One",
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
      color: "#D5F2E3"
    },
  },
});
