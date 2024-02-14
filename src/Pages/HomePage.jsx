import React, { useEffect, useState } from "react";
import FoodList from "../Components/FoodList";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Kitchen from "../Components/Kitchen";
import {
	Container,
	Box,
	Button,
	Typography,
	useTheme,
	Tabs,
	Tab,
} from "@mui/material";

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const HomePage = () => {
	const Theme = useTheme();
	const [tab, setTab] = useState(0);

	const handleChange = (event, newValue) => {
		setTab(newValue);
	};

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
			<FoodList />
			<Footer />
		</div>
	);
};

export default HomePage;
