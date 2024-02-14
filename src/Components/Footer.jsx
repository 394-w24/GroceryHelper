import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box, IconButton, useTheme } from "@mui/material";

const Footer = ({ onAddFoodClick }) => {
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
        height: "80px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTop: "#4E2A84",
        backgroundColor: "#003E1F",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.primary[3],
          color: theme.palette.primary["main"],
          margin: 3,
          "&:hover": {
            backgroundColor: theme.palette.primary[5],
          },
        }}
        onClick={onAddFoodClick}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          {" "}
          + Add Food Item{" "}
        </Typography>
      </Button>
    </Box>
  );
};

export default Footer;
