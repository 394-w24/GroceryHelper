import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SwipeOptions from "./SwipeOptions";

const FoodList = ({
	foodItems,
	handleDeleteFood,
	handleEditQuantity,
	// rerender,
}) => {
	return (
		<Box
			sx={{
				padding: "2%",
				paddingBottom: "80px",
			}}
		>
			{foodItems.map((fooditem, i) => (
				// <Food key={i} fooditem={fooditem} />
				<SwipeOptions
					key={i}
					fooditem={fooditem}
					handleDeleteFood={handleDeleteFood}
					handleEditQuantity={handleEditQuantity}
					// rerender={rerender}
				/>
			))}
		</Box>
	);
};

export default FoodList;
