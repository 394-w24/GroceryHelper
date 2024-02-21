import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SwipeOptions from "./SwipeOptions";

const FoodList = ({ foodItems, handleDeleteFood, handleEditQuantity }) => {
  return (
    <Box
      sx={{
        padding: "15px 5px",
        marginBottom: "80px",
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
      {foodItems.map((fooditem, i) => (
        <SwipeOptions
          key={i}
          fooditem={fooditem}
          handleDeleteFood={handleDeleteFood}
          handleEditQuantity={handleEditQuantity}
        />
      ))}
    </Box>
  );
};

export default FoodList;
