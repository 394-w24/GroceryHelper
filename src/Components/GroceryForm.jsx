import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import ImageDropBox from './ImageDropBox';
import FoodRecognition from './FoodRecognition';

export default function GroceryForm({ open, onClose, onAddFoodItem }) {
  const [imageFile, setImageFile] = useState(null);
  const handleImageUpload = (file) => {
    setImageFile(file);
  };
  
  const [groceryItem, setGroceryItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(0);
  const [daysUntilExpiration, setDaysUntilExpiration] = useState("");

  const handleFoodDetected = (detectedItems) => {
    if (detectedItems.length > 0) {
      setGroceryItem(detectedItems[0]);
    } else {
      console.log("No food items detected");
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

  const handleSubmit = () => {
    const categoryLabels = ["Pantry", "Fridge", "Freezer"];
    const selectedCategory = categoryLabels[category];
    onAddFoodItem({
      name: groceryItem,
      quantity,
      category: selectedCategory,
      daysUntilExpiration,
    });
    onClose();
  };

  return (
    <Box>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Grocery Item</DialogTitle>
      <DialogContent>
        <ImageDropBox onImageUpload={handleImageUpload} />
        {imageFile && <FoodRecognition imageFile={imageFile} onFoodDetected={handleFoodDetected} />}


          <TextField
            autoFocus
            margin="dense"
            id="groceryItem"
            label="Grocery Item"
            type="text"
            fullWidth
            variant="outlined"
            value={groceryItem}
            onChange={(e) => setGroceryItem(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
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
            label="Days Until Expiration"
            type="number"
            fullWidth
            variant="outlined"
            value={daysUntilExpiration}
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
            <Tab label="Pantry" />
            <Tab label="Fridge" />
            <Tab label="Freezer" />
          </Tabs>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Item</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
