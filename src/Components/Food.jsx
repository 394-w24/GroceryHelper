import React from "react";
import { Box, Typography, useTheme, Chip } from "@mui/material";

const Food = ({ fooditem }) => {
	const { name, quantity, daysUntilExpiration, category } = fooditem;

	return (
		<Box
			sx={{
				marginInline: "10px",
				width: "100%",
				display: "flex",
				alightItems: "center",
				justifyContent: "space-between",
				p: 2,
				mb: 1,
				boxShadow: 3,
				borderRadius: 3,
				backgroundColor: "white",
			}}
		>
			<Box>
				<Typography
					variant='h6'
					sx={{ fontWeight: "bold", userSelect: "none" }}
				>
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
				<Typography variant='body2' sx={{ userSelect: "none" }}>
					Quantity: {quantity}
				</Typography>
        <Chip
          label={`${daysUntilExpiration} days until expiration`}
          color='warning'
          sx={{ userSelect: "none" }}
        />
			</Box>
		</Box>
	);
};

export default Food;
