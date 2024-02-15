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
        backgroundColor: theme.palette.primary["green"],
        color: theme.palette.primary.contrastText,
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
            sx={{ textAlign: "center", fontSize: "50px" }}
          >
            My Kitchen
          </Typography>
        </Grid>
        <Grid item>
          <LogoutIcon onClick={handleLogOut} sx={{ cursor: "pointer" }} />
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Kitchen;
