import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Chip } from "@mui/material";
import {
	getDocs,
	getDoc,
	collection,
	query,
	where,
	doc,
} from "firebase/firestore";
import { db } from "../Firebase";

const Food = ({ fooditem }) => {
	const {
		createdAt,
		expiredAt,
		imageURL,
		productId,
		quantity,
		storageType,
		userId,
		id,
	} = fooditem;
	const [productName, setProductName] = useState("name loading");
	const expirationDate = expiredAt.toDate();
	const today = new Date();
	const difference = expirationDate - today;
	const millisecondsInADay = 1000 * 60 * 60 * 24;
	const daysUntilExpiration = Math.floor(difference / millisecondsInADay);

	useEffect(() => {
		const fetchProductName = async () => {
			const productRef = doc(db, "products", productId);
			const snapshot = await getDoc(productRef);
			setProductName(snapshot.data().name);
		};
		fetchProductName();
	}, [productId]);

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
					{productName}
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
