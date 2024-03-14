import React, { useEffect, useState } from "react";
import "../index.css";
import FoodList from "../Components/FoodList";
import Footer from "../Components/Footer";
import Kitchen from "../Components/Kitchen";
import GroceryForm from "../Components/GroceryForm";
import { Box, useTheme, Tabs, Tab } from "@mui/material";
import {
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import OnboardingPopup from "../Components/OnboardingPopup";
import foodData from "../assets/data.json";

const HomePage = () => {
  const uid = localStorage.getItem("uid");
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [displayedFoodItems, setDisplayedFoodItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const temp = [];
      foodData.forEach((curr) => {
        if (
          !!curr.freeze &&
          curr.freeze === -1 &&
          !!curr.pantry &&
          curr.pantry === -1 &&
          !!curr.refrigerate &&
          curr.refrigerate === -1
        ) {
          return;
        }

        if (!curr["pantry"] && !curr["fridge"] && !curr["freezer"]) {
          return;
        }

        temp.push(curr);
      });

      const docRef = collection(db, "userProducts");
      const docSnap = await getDocs(docRef);

      docSnap.forEach((doc) => {
        const tempData = Object.assign(doc.data(), { productId: doc.id });
        temp.push(tempData);
      });

      setAllData(temp);
    };

    init();
  }, []);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (uid) {
        const userSettingsRef = doc(db, "users", uid);
        const docSnap = await getDoc(userSettingsRef);

        if (docSnap.exists() && docSnap.data().onboardingComplete) {
          setShowOnboarding(false);
        } else {
          setShowOnboarding(true);
        }
      }
    };

    checkOnboardingStatus();
  }, [uid]);

  const handleCompleteOnboarding = async () => {
    if (uid) {
      const userSettingsRef = doc(db, "users", uid);
      await updateDoc(userSettingsRef, {
        onboardingComplete: true,
      });
      setShowOnboarding(false);
    }
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAddFoodItem = (newItem) => {
    setFoodItems([...foodItems, newItem]);
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
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

      setFoodItems(groceries);
    };
    getUserGroceries();
  }, []);

  const tabsValue = ["All", "Fridge", "Freezer", "Pantry"];

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
  }, [foodItems, tab]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Kitchen />
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        scrollButtons={false}
      >
        {tabsValue.map((location, i) => (
          <Tab
            key={i}
            sx={{
              minWidth: "10%",
              margin: "1px",
              fontSize: "15px",
              fontWeight: "bold",
              textAlign: "center",
              color: theme.palette.primary["darkGreen"],
            }}
            label={location}
          />
        ))}
      </Tabs>
      {showOnboarding && <OnboardingPopup onClose={handleCompleteOnboarding} />}

      <FoodList
        foodItems={displayedFoodItems}
        handleDeleteFood={handleDeleteFood}
        handleEditQuantity={handleEditQuantity}
      />

      <GroceryForm
        open={isDialogOpen}
        onClose={toggleDialog}
        onAddFoodItem={handleAddFoodItem}
        allData={allData}
      />

      <Footer onAddFoodClick={toggleDialog} />
    </Box>
  );
};

export default HomePage;
