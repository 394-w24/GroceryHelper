import React, { useState, useEffect, useId } from "react";
import {
  Box,
  Button,
  Dialog,
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
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import categoryData from "../assets/category.json";

export default function GroceryForm({
  open,
  onClose,
  onAddFoodItem,
  passedInFoodName,
  productName,
  allData,
}) {
  const [groceryItem, setGroceryItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(0);
  const [daysUntilExpiration, setDaysUntilExpiration] = useState(1);
  const [allGroceryTypes, setAllGroceryTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [chosenProductId, setChosenProductId] = useState(null);
  const [chosenProduct, setChosenProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [matchNotFound, setMatchNotFound] = useState(false);
  const [isUserAdding, setIsUserAdding] = useState(false);
  const [userProduct, setUserProduct] = useState(null);
  const [openResults, setOpenResults] = useState(false);

  const openPopper = () => setOpenResults(true);
  const closePopper = () => setOpenResults(false);

  const navigate = useNavigate();

  const handleImageUpload = (file) => {
    setImageFile(file);
  };

  const handleFoodDetected = async (detectedItems) => {
    if (detectedItems.length > 0) {
      const detectedItem = detectedItems[0].toLowerCase();
      const matchedOption = options.find((option) =>
        option.name.toLowerCase().includes(detectedItem)
      );

      if (matchedOption) {
        await updateSelection(matchedOption);
        setSelectedOption(matchedOption);

        await handleSelect(null, matchedOption);
      } else {
        setMatchNotFound(true);
        setSelectedOption(null);
      }
    } else {
      console.log("No food items detected");
      setMatchNotFound(false);
    }
  };

  const updateSelection = async (selectedItem) => {
    setSelectedOption(selectedItem);

    if (selectedItem) {
      const categoryLabels = ["pantry", "refrigerate", "freeze"];
      const currCategory = categoryLabels[category];

      const expirationDays = selectedItem[currCategory];
      setDaysUntilExpiration(expirationDays || -1);
    }
  };

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

  const addCustomProduct = async () => {
    const docRef = await addDoc(collection(db, "userProducts"), {
      categoryId: 26,
      description: "",
      freeze: category === 0 ? daysUntilExpiration : -1,
      name: userProduct,
      pantry: category === 1 ? daysUntilExpiration : -1,
      refrigerate: category === 2 ? daysUntilExpiration : -1,
    });

    const id = docRef.id;
    return id;
  };

  const handleSubmit = async () => {
    const categoryLabels = ["Pantry", "Fridge", "Freezer"];
    const selectedCategory = categoryLabels[category];
    const currDate = new Date();

    if (isUserAdding) {
      const newProductId = await addCustomProduct();

      try {
        const docRef = await addDoc(collection(db, "userGroceries"), {
          createdAt: currDate,
          expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
          imageURL: "",
          productId: newProductId,
          quantity: quantity,
          storageType: selectedCategory,
          userId: localStorage.getItem("uid"),
        });

        onAddFoodItem({
          createdAt: currDate,
          expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
          id: docRef.id,
          imageURL: "",
          productId: newProductId,
          quantity: quantity,
          storageType: selectedCategory,
          userId: localStorage.getItem("uid"),
        });

        resetForm();
        onClose();
        navigate(0);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "userGroceries"), {
          createdAt: currDate,
          expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
          imageURL: "",
          productId: chosenProductId,
          quantity: quantity,
          storageType: selectedCategory,
          userId: localStorage.getItem("uid"),
        });

        onAddFoodItem({
          createdAt: currDate,
          expiredAt: GetExpirationDate(currDate, daysUntilExpiration),
          id: docRef.id,
          imageURL: "",
          productId: chosenProductId,
          quantity: quantity,
          storageType: selectedCategory,
          userId: localStorage.getItem("uid"),
        });

        resetForm();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setGroceryItem("");
    setQuantity(1);
    setCategory(0);
    setDaysUntilExpiration(1);
    setSelectedOption(null);
    setMatchNotFound(false);
    setImageFile(null);
    setChosenProductId(null);
    setChosenProduct(null);
    setIsUserAdding(false);
    setUserProduct(null);
  };

  useEffect(() => {
    if (passedInFoodName !== null) {
      if (passedInFoodName === "" && productName != null) {
        setIsUserAdding(true);
        setUserProduct(productName);
        return;
      }

      const filtered = allData.filter((item) => {
        const { name, description } = item || "";
        const temp = description ? `${name}/${description}` : name;
        return temp === passedInFoodName || "";
      });

      const selected = filtered[0];
      setSelectedOption(selected);
      handleSelect(null, selected);
    } else {
      setSelectedOption(null);
    }
  }, [passedInFoodName]);

  const handleSelect = async (event, value) => {
    const categoryLabels = ["pantry", "refrigerate", "freeze"];
    const currCategory = categoryLabels[category];

    if (value) {
      const { name, description, categoryId } = value;

      if (!!value.productId) {
        console.log("here", value);
        setChosenProductId(value.productId);
        setDaysUntilExpiration(value[currCategory]);
        setChosenProduct(value);
      } else {
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
    }
  };

  useEffect(() => {
    const updateOptions = () => {
      const lowercased = searchTerm.toLowerCase();
      const filtered = allData.filter((item) => {
        const { name } = item || "";
        return name.toLowerCase().includes(lowercased) || "";
      });
      setOptions(filtered);
    };

    updateOptions();
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
      <Dialog
        open={open}
        onClose={() => {
          resetForm();
          onClose();
        }}
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: "10px",
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Grocery Item</DialogTitle>
        <DialogContent>
          {matchNotFound && (
            <Box sx={{ color: "red", marginTop: "10px" }}>
              Could not match image to item, please select manually from
              dropdown.
            </Box>
          )}
          <Autocomplete
            id="user-search-autocomplete"
            open={openResults}
            onOpen={openPopper}
            onClose={closePopper}
            options={options}
            noOptionsText={
              <Button
                onClick={() => {
                  closePopper();
                  setUserProduct(searchTerm);
                  setIsUserAdding(true);
                }}
              >
                Can't Find My Item?
              </Button>
            }
            value={selectedOption}
            getOptionLabel={(option) =>
              option
                ? `${option.name}${
                    option.description ? "/" + option.description : ""
                  }${
                    option.categoryId === 26
                      ? ""
                      : "/" + categoryData[option.categoryId]?.categoryName
                  }`
                : ""
            }
            style={{ marginBlock: "10px" }}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
              if (!newInputValue) {
                setSelectedOption(null);
                setMatchNotFound(false);
              }
            }}
            onChange={(event, newValue) => {
              setSelectedOption(newValue);
              setMatchNotFound(false);
              if (newValue) {
                console.log("newvalue is", newValue);
                setSearchTerm(newValue.name);
                handleSelect(event, newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Grocery Item"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {isUserAdding && (
            <TextField
              margin="dense"
              id="productNameInput"
              label="product Name"
              type="string"
              fullWidth
              variant="outlined"
              value={userProduct}
              sx={{ marginBlock: "10px" }}
              onChange={(e) => setUserProduct(e.target.value)}
            ></TextField>
          )}

          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
            sx={{ marginBlock: "10px" }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={decrementQuantity}
                    aria-label="decrease quantity"
                  >
                    <RemoveIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={incrementQuantity}
                    aria-label="increase quantity"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="daysUntilExpiration"
            label={
              daysUntilExpiration === -1
                ? "Please enter your own days"
                : "Days Until Expiration"
            }
            type="number"
            placeholder="Days"
            fullWidth
            variant="outlined"
            sx={{ marginBlock: "10px" }}
            value={daysUntilExpiration === -1 ? "" : daysUntilExpiration}
            onChange={(e) => setDaysUntilExpiration(e.target.value)}
          />
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ marginTop: 2 }}
          >
            <Tab label="Pantry" sx={{ minWidth: "60px" }} />
            <Tab label="Fridge" sx={{ minWidth: "60px" }} />
            <Tab label="Freezer" sx={{ minWidth: "60px" }} />
          </Tabs>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              marginRight: "10px",
              color: "#000000",
              backgroundColor: "#ffffff",
              fontWeight: "bolder",
              border: "1px solid #D9D9D9",
            }}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={daysUntilExpiration < 1}
            variant="contained"
            sx={{
              backgroundColor: "#D9DF95",
              color: "#000000",
              fontWeight: "bolder",
            }}
          >
            Save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
