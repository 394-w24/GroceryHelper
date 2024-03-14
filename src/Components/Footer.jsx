import React from "react";
import { Typography, Button } from "@mui/material";
import { Box, useTheme } from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const Footer = ({ onAddFoodClick }) => {
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
        data-testid="camera-button"
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
          data-cy="footer"
          sx={{
            fontWeight: "bolder",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Take Photo
        </Typography>
        <CameraAltIcon />
      </Button>
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
        onClick={onAddFoodClick}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Manual Input
        </Typography>
        <KeyboardIcon />
      </Button>
    </Box>
  );
};

export default Footer;
