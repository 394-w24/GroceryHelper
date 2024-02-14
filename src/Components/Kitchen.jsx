import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
  Divider,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Kitchen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary["main"],
        color: theme.palette.primary[3],
      }}
    >
      <Typography
        variant="h1"
        sx={{ padding: 3, textAlign: "center", fontSize: "50px" }}
      >
        My Kitchen
      </Typography>
      <Divider></Divider>
    </Box>
  );
};

export default Kitchen;
