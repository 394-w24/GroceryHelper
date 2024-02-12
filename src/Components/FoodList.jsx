import React, {useState} from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import Food from './Food';


const FoodList = () => {
    const theme = useTheme();

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
                    "id": 1,
                    "quantity": "2pcs",
                    "status": "expired",
                    "note": "eat it"
                },
                {
                    "name": "Banana",
                    "id": 2,
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                },
                {
                    "name": "Cherry",
                    "id": 3,
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                },
                {
                    "name": "Avocado",
                    "id": 4,
                    "quantity": "2pcs",
                    "status": "expires soon",
                    "days_until_expired": 3
                }
            ]
        }
    }

    const [allFood, setAllFood] = useState(defaultfood.kitchen.items);


    return allFood.length !== 0? (
        <Box sx = {{padding: '5%'}}>
            {allFood.map((fooditem, i) => (
                <Food key={i} fooditem={fooditem} />
            ))}

        </Box>
    ): null;
}

export default FoodList