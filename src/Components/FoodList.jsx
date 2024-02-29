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
      {foodItems.length === 0 ? (
        <Box
          align="center"
          sx={{
            width: "100%",
            minHeight: "100%",
            padding: 2,
            display: "flex",
            mt: 20,
            // border: "1px solid #D9D9D9",
            // boxShadow: "0 7px 2px -2px #D9D9D9",
            borderRadius: 3,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            textColor="inherit"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            No Items Stored Yet...
          </Typography>
        </Box>
      ) : (
        foodItems.map((fooditem, i) => (
          <SwipeOptions
            key={i}
            fooditem={fooditem}
            handleDeleteFood={handleDeleteFood}
            handleEditQuantity={handleEditQuantity}
          />
        ))
      )}
    </Box>
  );
};

export default FoodList;
