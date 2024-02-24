import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function FoodRecognition({ imageFile, onFoodDetected }) {
  const [foodItems, setFoodItems] = useState([]);

  const PAT = "58da21198d904a27b939b5845659ab29"; // Auth token
  const USER_ID = "clarifai";
  const APP_ID = "main";
  const MODEL_ID = "food-item-recognition";
  const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        console.log("Base64image", base64Image);
        const apiUrl = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Key ${PAT}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_app_id: {
              user_id: USER_ID,
              app_id: APP_ID,
            },
            inputs: [
              {
                data: {
                  image: {
                    base64: base64Image,
                  },
                },
              },
            ],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const items = data.outputs[0].data.concepts.map(
              (item) => item.name
            );
            console.log("items", items);
            setFoodItems(items);
            onFoodDetected(items);
          })
          .catch((err) => {
            console.error(err);
            onFoodDetected([]);
          });
      };
    }
  }, [imageFile, PAT, USER_ID, APP_ID, MODEL_ID, MODEL_VERSION_ID]);

  return (
    <div>
      {foodItems.length === 0 && (
        <Typography>No food items detected</Typography>
      )}
    </div>
  );
}

export default FoodRecognition;
