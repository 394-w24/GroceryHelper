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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const HomePage = () => {
  const Theme = useTheme();
  const [tab, setTab] = useState(0);
  const [groceries, setGroceries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

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
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{ pt: "3%" }}
      >
        {tabsValue.map((location, i) => (
          <Tab
            sx={{ margin: "1px", fontSize: "20px" }}
            label={location}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      <FoodList />
      <ul>
        {groceries.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <GroceryForm open={isDialogOpen} onClose={toggleDialog} />
      <Footer onAddFoodClick={toggleDialog} />
    </div>
  );
};

export default HomePage;
