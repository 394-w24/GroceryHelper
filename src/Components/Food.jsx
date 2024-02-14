import React from "react";
import { Box, Typography, useTheme, Chip } from "@mui/material";

const Food = ({ fooditem }) => {
	const { name, id, quantity, status, note, days_until_expired } = fooditem;
	const isExpired = status === "expired";

	return (
		<Box
			key={id}
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
					sx={{ mb: 1, fontWeight: "bold", userSelect: "none" }}
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
					{quantity} pcs
				</Typography>

				{isExpired ? (
					<Chip label='Expired!' color='error' sx={{ userSelect: "none" }} />
				) : (
					<Chip
						label={`Expires in ${days_until_expired} days`}
						color='warning'
						sx={{ userSelect: "none" }}
					/>
				)}
			</Box>
		</Box>
	);
};

export default Food;
