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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Kitchen = () => {
    const theme = useTheme();

    return (

        <Box sx ={{display: "flex", flexDirection:"column"}} >
        <Typography variant="h4" sx={{margin: 2, marginTop: 3, textAlign: "center"}}>
            My Kitchen 
        </Typography>
        <Divider></Divider>
        </Box> 


    );
};

export default Kitchen;