import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Food from "./Food";
import SwipeOptions from "./SwipeOptions";

const defaultFoodItems = [
  {
    name: "Avocado",
    id: 1,
    quantity: 2,
    daysUntilExpiration: 0, // Assuming expired items have 0 days left
    category: "Pantry", // Example category, adjust as needed
  },
  {
    name: "Banana",
    id: 2,
    quantity: 2,
    daysUntilExpiration: 3,
    category: "Pantry",
  },
  {
    name: "Cherry",
    id: 3,
    quantity: 2,
    daysUntilExpiration: 3,
    category: "Pantry",
  },
  {
    name: "Avocado",
    id: 4,
    quantity: 2,
    daysUntilExpiration: 3,
    category: "Pantry",
  },
];

const FoodList = ({foodItems}) => {
	const [itemsToDisplay, setItemsToDisplay] = useState(foodItems ? foodItems : defaultFoodItems);

	const deleteFood = (foodId) => {
		setItemsToDisplay((prev) => prev.filter((food) => food.id != foodId));
	};

	return (
		<Box sx={{ padding: "5%" }}>
			{itemsToDisplay.map((fooditem, i) => (
				// <Food key={i} fooditem={fooditem} />
				<SwipeOptions
					key={fooditem.id}
					fooditem={fooditem}
					deleteFood={deleteFood}
				>
					{i}
				</SwipeOptions>
			))}
		</Box>
	);
};

export default FoodList;
