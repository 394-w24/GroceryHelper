import React, { useEffect, useState } from "react";
import "../index.css";
import FoodList from "../Components/FoodList";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Kitchen from "../Components/Kitchen";
import GroceryForm from "../Components/GroceryForm";
import {
	Container,
	Box,
	Button,
	Typography,
	useTheme,
	Tabs,
	Tab,
} from "@mui/material";
import {
	doc,
	getDocs,
	getDoc,
	deleteDoc,
	collection,
	query,
	where,
} from "firebase/firestore";
import { db } from "../Firebase";

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const HomePage = () => {
	const uid = localStorage.getItem("uid");
	const Theme = useTheme();
	const [tab, setTab] = useState(0);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [foodItems, setFoodItems] = useState([]);

	const handleAddFoodItem = (newItem) => {
		setFoodItems([...foodItems, newItem]);
	};

	const toggleDialog = () => {
		setIsDialogOpen(!isDialogOpen);
	};

	const handleChange = (event, newValue) => {
		setTab(newValue);
		console.log(newValue);
	};

	const handleDeleteFood = (foodId) => {
		console.log(foodId);
		setFoodItems((prev) => prev.filter((food) => food.id != foodId));
		const docRef = doc(db, "userGroceries", foodId);
		deleteDoc(docRef);
	};

	useEffect(() => {
		const getUserGroceries = async () => {
			const userGroceryRef = collection(db, "userGroceries");
			const q = query(userGroceryRef, where("userId", "==", uid));
			const snapshot = await getDocs(q);
			let groceries = [];
			snapshot.forEach((doc) => {
				groceries.push({ ...doc.data(), id: doc.id });
			});
			// console.log(groceries);
			setFoodItems(groceries);
		};
		getUserGroceries();
	}, []);

	const tabsValue = ["All", "Fridge", "Freezer", "Pantry"];

	return (
		<div>
			<Kitchen />
			<Tabs
				value={tab}
				onChange={handleChange}
				indicatorColor='secondary'
				textColor='inherit'
				variant='fullWidth'
				aria-label='full width tabs example'
				sx={{ pt: "3%" }}
			>
				{tabsValue.map((location, i) => (
					<Tab
						key={i}
						sx={{ margin: "1px", fontSize: "20px" }}
						label={location}
						{...a11yProps(i)}
					/>
				))}
			</Tabs>
			<FoodList foodItems={foodItems} handleDeleteFood={handleDeleteFood} />
			<GroceryForm
				open={isDialogOpen}
				onClose={toggleDialog}
				onAddFoodItem={handleAddFoodItem}
			/>
			<Footer onAddFoodClick={toggleDialog} />
		</div>
	);
};

export default HomePage;
