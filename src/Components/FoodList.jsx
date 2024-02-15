import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SwipeOptions from "./SwipeOptions";

const FoodList = ({ foodItems, handleDeleteFood }) => {
	return (
		<Box sx={{ padding: "5%" }}>
			{foodItems.map((fooditem, i) => (
				// <Food key={i} fooditem={fooditem} />
				<SwipeOptions
					key={i}
					fooditem={fooditem}
					handleDeleteFood={handleDeleteFood}
				/>
			))}
		</Box>
	);
};

export default FoodList;
