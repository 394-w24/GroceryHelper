import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const Food = ({ fooditem }) => {
  const { name, quantity, daysUntilExpiration, category } = fooditem;
  console.log(fooditem);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 1,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="body2">Quantity: {quantity}</Typography>
        <Chip
          label={`${daysUntilExpiration} days until expiration`}
          color="warning"
        />
      </Box>
    </Box>
  );
};

export default Food;
