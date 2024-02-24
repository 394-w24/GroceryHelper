import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box, IconButton, useTheme } from "@mui/material";

const Footer = ({}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 5,
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
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.primary["darkGreen"],
          "&:hover": {
            backgroundColor: theme.palette.primary[5],
          },
          height: "60px",
          width: "120[x",
          borderRadius: "10%%",
        }}
        onClick={() => (window.location.href = "/newProduct")}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Add Item
          {/* Add
          <br />
          Items */}
        </Typography>
      </Button>
    </Box>
  );
};

export default Footer;
