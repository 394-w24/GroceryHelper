import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Food from "./Food";
import SwipeOptions from "./SwipeOptions";
import { getDocs, getDoc, collection, query, where } from "firebase/firestore";
import { db } from "../Firebase";

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

const FoodList = ({ foodItems, handleDeleteFood }) => {
	useEffect(() => {
		const getAllFoodType = async () => {
			const productsRef = collection(db, "products");
			const docs = await getDocs(productsRef);
			let products = [];
			docs.forEach((product) => {
				// console.log(product.data());
				products.push(product.data());
			});
			// console.log(products);
			// console.log(products.map((product) => product.name));
		};
		getAllFoodType();
	}, []);

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
