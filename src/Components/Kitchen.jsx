import React from "react";
import { Box, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Kitchen = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        color: theme.palette.primary["darkGreen"],
        padding: "10px 5px",
      }}
    >
      <Box sx={{ width: "20%" }}></Box>
      <Box sx={{ width: "60%" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bolder",
          }}
        >
          My Kitchen
        </h1>
      </Box>
      <Box
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PersonIcon
          onClick={() => (window.location.href = "/profile")}
          sx={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default Kitchen;
