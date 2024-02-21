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
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  doc,
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
  const [displayedFoodItems, setDisplayedFoodItems] = useState([]);
  // const [rerender, setRerender] = useState(false);

  const handleAddFoodItem = (newItem) => {
    setFoodItems([...foodItems, newItem]); //update local frontend
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
    // console.log(newValue);
  };

  const handleDeleteFood = (foodId) => {
    console.log(foodId);
    setFoodItems((prev) => prev.filter((food) => food.id != foodId));
    const docRef = doc(db, "userGroceries", foodId);
    deleteDoc(docRef);
  };

  const handleEditQuantity = (foodId, quantity) => {
    const index = foodItems.findIndex((food) => food.id == foodId);
    setFoodItems((prev) => {
      const copy = [...prev];
      const edittedItem = Object.assign({}, copy[index]);
      edittedItem.quantity = quantity;
      copy.splice(index, 1, edittedItem);
      // console.log("replace", prev[index]);
      return copy;
    });
  };

  useEffect(() => {
    const getUserGroceries = async () => {
      const userGroceryRef = collection(db, "userGroceries");
      const q = query(userGroceryRef, where("userId", "==", uid));
      const snapshot = await getDocs(q);
      let groceries = [];
      snapshot.forEach((doc) => {
        let currData = doc.data();
        currData["expiredAt"] = currData["expiredAt"].toDate();
        groceries.push({
          ...currData,
          id: doc.id,
        });
      });

      //   groceries.sort((x, y) => x.expiredAt - y.expiredAt);
      setFoodItems(groceries);
    };
    getUserGroceries();
  }, []);

  const tabsValue = ["All", "Fridge", "Freezer", "Pantry"];
  //   let storingMethod = tabsValue[tab];

  useEffect(() => {
    const storingMethod = tabsValue[tab];
    foodItems.sort((x, y) => x.expiredAt - y.expiredAt);
    if (storingMethod === "All") {
      setDisplayedFoodItems(foodItems);
    } else {
      const temp = foodItems.filter(
        (foodItem) => foodItem.storageType === storingMethod
      );
      setDisplayedFoodItems(temp);
    }
    // setRerender(!rerender);
  }, [foodItems, tab]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Kitchen />
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        {tabsValue.map((location, i) => (
          <Tab
            key={i}
            sx={{
              margin: "1px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            label={location}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      <FoodList
        foodItems={displayedFoodItems}
        handleDeleteFood={handleDeleteFood}
        handleEditQuantity={handleEditQuantity}
        // rerender={rerender}
      />
      <GroceryForm
        open={isDialogOpen}
        onClose={toggleDialog}
        onAddFoodItem={handleAddFoodItem}
      />

      <Footer onAddFoodClick={toggleDialog} />
    </Box>
  );
};

export default HomePage;
