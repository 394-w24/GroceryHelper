import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Tabs,
	Tab,
	InputAdornment,
	IconButton,
	Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
	getDocs,
	getDoc,
	collection,
	query,
	where,
	Timestamp,
	addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import foodItems from "../assets/data.json";
import categoryData from "../assets/category.json";
import GroceryAutocomplete from "./GroceryAutocomplete";

export default function GroceryForm({ open, onClose, onAddFoodItem }) {
	const [groceryItem, setGroceryItem] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [category, setCategory] = useState(0);
	const [daysUntilExpiration, setDaysUntilExpiration] = useState(1);
	const [allGroceryTypes, setAllGroceryTypes] = useState({});
	const [allData, setAllData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [options, setOptions] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [chosenProductId, setChosenProductId] = useState(null);
	const [chosenProduct, setChosenProduct] = useState(null);

	const handleCategoryChange = (event, newValue) => {
		setCategory(newValue);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
	};

	const GetExpirationDate = (date, daystoAdd) => {
		if (daystoAdd === -1) {
			return "No data yet";
		}
		const milliesecondsPerDay = 1000 * 60 * 60 * 24;
		const newDate = new Date(date.getTime() + daystoAdd * milliesecondsPerDay);
		return newDate;
	};

	const handleSubmit = async () => {
		const categoryLabels = ["Pantry", "Fridge", "Freezer"];
		const selectedCategory = categoryLabels[category];
		const currDate = new Date();

		onAddFoodItem({
			createdAt: currDate,
			expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
			imageURL: "",
			productId: chosenProductId,
			quantity: quantity,
			storageType: selectedCategory,
			userId: localStorage.getItem("uid"),
		});

		try {
			await addDoc(collection(db, "userGroceries"), {
				createdAt: currDate,
				expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
				imageURL: "",
				productId: chosenProductId,
				quantity: quantity,
				storageType: selectedCategory,
				userId: localStorage.getItem("uid"),
			});

			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const init = () => {
			const filtered = foodItems.map((curr) => {
				const categoryLabels = ["pantry", "Fridge", "freezer"];
				const currCategory = categoryLabels[category];

				if (!curr[currCategory]) {
					return null;
				}

				return curr;
			});

			setAllData(filtered);
		};

		init();
	}, []);

	const handleSelect = async (event, value) => {
		const categoryLabels = ["pantry", "refrigerate", "freeze"];
		const currCategory = categoryLabels[category];

		if (value) {
			const { name, description, categoryId } = value;
			const docRef = collection(db, "products");
			const q = query(
				docRef,
				where("categoryId", "==", categoryId),
				where("name", "==", name),
				where("description", "==", description)
			);

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setChosenProductId(doc.id);
				setDaysUntilExpiration(doc.data()[currCategory]);
				setChosenProduct(doc.data());
			});

			setSearchResults([value]);
		}
	};

	useEffect(() => {
		const updateOptions = () => {
			const lowercased = searchTerm.toLowerCase();
			const filtered = allData.filter((item) => {
				const { name } = item;
				// console.log(name);
				return name.toLowerCase().includes(lowercased) || "";
			});
			// console.log(filtered);
			setOptions(filtered);
		};

		// if (searchTerm !== "") {
		// console.log("here", searchTerm);
		updateOptions();
		// }
	}, [searchTerm, allData]);

	useEffect(() => {
		const handleAllCategories = () => {
			const temp = [];
			Object.values(categoryData).forEach((curr) => {
				temp.push(curr);
			});
			setAllCategories(temp);
		};

		handleAllCategories();
	}, []);

	useEffect(() => {
		const updateExpirationData = () => {
			const categoryLabels = ["pantry", "refrigerate", "freeze"];
			const currCategory = categoryLabels[category];
			if (!chosenProduct) {
				setDaysUntilExpiration(-1);
				return;
			}
			const currExpirationDate = chosenProduct[currCategory];
			setDaysUntilExpiration(currExpirationDate);
		};

		updateExpirationData();
	}, [category]);

	return (
		<Box>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
				<DialogTitle>Add Grocery Item</DialogTitle>
				<DialogContent>
					<Autocomplete
						id='user-search-autocomplete'
						options={options}
						inputValue={searchTerm}
						getOptionLabel={(option) => {
							const { name, description, categoryId } = option;

							const result = `${name}${description ? "/" + description : ""}/${
								categoryData[categoryId].categoryName
							}`;
							return result;
						}}
						style={{ marginBlock: "10px" }}
						onInputChange={(event, newInputValue) => {
							setSearchTerm(newInputValue);
						}}
						onChange={handleSelect}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Grocery Item'
								variant='outlined'
								fullWidth
							/>
						)}
					/>
					<TextField
						margin='dense'
						id='quantity'
						label='Quantity'
						type='number'
						fullWidth
						variant='outlined'
						value={quantity}
						sx={{ marginBlock: "10px" }}
						onChange={(e) => setQuantity(Number(e.target.value))}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<IconButton
										onClick={decrementQuantity}
										aria-label='decrease quantity'
									>
										<RemoveIcon />
									</IconButton>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={incrementQuantity}
										aria-label='increase quantity'
									>
										<AddIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						margin='dense'
						id='daysUntilExpiration'
						label='Days Until Expiration'
						type='number'
						fullWidth
						variant='outlined'
						sx={{ marginBlock: "10px" }}
						value={daysUntilExpiration}
						onChange={(e) => setDaysUntilExpiration(e.target.value)}
					/>
					<Tabs
						value={category}
						onChange={handleCategoryChange}
						indicatorColor='primary'
						textColor='primary'
						variant='fullWidth'
						sx={{ marginTop: 2 }}
					>
						<Tab label='Pantry' />
						<Tab label='Fridge' />
						<Tab label='Freezer' />
					</Tabs>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit} disabled={daysUntilExpiration < 1}>
						Add Item
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
