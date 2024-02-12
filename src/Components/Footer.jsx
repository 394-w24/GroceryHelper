import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box, IconButton, useTheme } from "@mui/material";

const Footer = () => {
    const theme = useTheme();

return (
    <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      alignSelf: "flex-end",
      height: "100px",
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderTop: "#4E2A84",
      backgroundColor: "#003E1F",
    }}
  >
    <Button variant="contained" 
    sx={{backgroundColor: "#D5F2E3", color:"#003E1F", margin: 3 }}>
        + Add Food Item
    </Button>
</Box>

);
};

export default Footer;
