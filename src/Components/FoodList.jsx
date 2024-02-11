import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import Food from './Food';


const FoodList = () => {
    const theme = useTheme();
    const [allFood, setAllFood] = useState([]);

    const defaultfood =  {
        "kitchen": {
            "categories": [
                "all",
                "fridge",
                "freezer",
                "pantry"
            ],
            "items": [
                {
                    "name": "Avocado",
                    "quantity": "2pcs",
                    "status": "expired",
                    "note": "eat it"
                },
                {
                    "name": "Avocado",
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                },
                {
                    "name": "Avocado",
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                },
                {
                    "name": "Avocado",
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                }
            ]
        }
    }






  return (
    <div>FoodList Hello </div>
  )
}

export default FoodList