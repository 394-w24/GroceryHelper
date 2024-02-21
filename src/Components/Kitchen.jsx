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
import LogoutIcon from "@mui/icons-material/Logout";
import { HomeOutlined } from "@mui/icons-material";
import { handleLogOut } from "../Firebase";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Kitchen = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: theme.palette.primary["darkGreen"],
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: 3 }}
      >
        <Grid item xs={true}>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bolder",
            }}
          >
            My Kitchen
          </Typography>
        </Grid>
        <Grid item>
          <HomeOutlined
            onClick={() => (window.location.href = "/profile")}
            sx={{ cursor: "pointer" }}
          />
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Kitchen;
