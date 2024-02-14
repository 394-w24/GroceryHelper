import React from "react";
import { Box, Typography } from "@mui/material";
import Food from "./Food";

const defaultFoodItems = [
  {
    name: "Avocado",
    id: 1,
    quantity: "2pcs",
    daysUntilExpiration: 0, // Assuming expired items have 0 days left
    category: "Pantry", // Example category, adjust as needed
  },
  {
    name: "Banana",
    id: 2,
    quantity: "2pcs",
    daysUntilExpiration: 3,
    category: "Pantry",
  },
  {
    name: "Cherry",
    id: 3,
    quantity: "2pcs",
    daysUntilExpiration: 3,
    category: "Pantry",
  },
  {
    name: "Avocado",
    id: 4,
    quantity: "2pcs",
    daysUntilExpiration: 3,
    category: "Pantry",
  },
];

const FoodList = ({ foodItems }) => {
  const itemsToDisplay = foodItems ? foodItems : defaultFoodItems;

  return (
    <Box sx={{ padding: "5%" }}>
      {itemsToDisplay.map((fooditem) => (
        <Food key={fooditem.id} fooditem={fooditem} />
      ))}
    </Box>
  );
};

export default FoodList;
