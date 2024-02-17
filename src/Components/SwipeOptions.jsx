import React, {
	useState,
	ReactNode,
	CSSProperties,
	useId,
	useEffect,
} from "react";
import { useSwipeable } from "react-swipeable";
import { Box, Button, useTheme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Food from "./Food";
import DeleteConfirmationModal from "./DeleteConfimationModal";
import EditModal from "./EditModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const SwipeOptions = ({
	fooditem,
	handleDeleteFood,
	handleEditQuantity,
	rerender,
}) => {
	const [isScrolling, setIsScrolling] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [foodInfo, setfoodInfo] = useState(fooditem);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [quantity, setQuantity] = useState(fooditem?.quantity);

	const theme = useTheme();
	// console.log(foodInfo);

	useEffect(() => {
		const init = () => {
			setfoodInfo(fooditem);
			setQuantity(fooditem.quantity);
		};

		init();
	}, [rerender]);

	const handlers = useSwipeable({
		onSwiped: () => handlePanEnd(),
		onSwipeStart: (eventData) => handlePanStart(eventData),
		onSwiping: (eventData) => handleSwipe(eventData),
		trackMouse: true,
	});

	const handlePanStart = (e) => {
		if (e.dir === "Down" || e.dir === "Up") {
			setIsScrolling(true);
		}
	};

	const handlePanEnd = () => {
		setIsScrolling(false);
	};

	const handleSwipe = (e) => {
		if (!isScrolling) {
			if (e.dir === "Left" && !isExpanded) {
				setIsExpanded(true);
			} else if (e.dir === "Right" && isExpanded) {
				setIsExpanded(false);
			}
		}
	};

	const handleEditSave = (newValue) => {
		if (newValue === 0) {
			setDeleteModalOpen(true);
		} else {
			handleEditQuantity(fooditem.id, newValue);
			// setfoodInfo((prev) => ({
			// 	...prev,
			// 	quantity: newValue,
			// }));
			setEditModalOpen(false);
			setIsExpanded(false);
			const docRef = doc(db, "userGroceries", foodInfo.id);
			updateDoc(docRef, {
				quantity: newValue,
			});
		}
	};

	const handleDeleteConfirm = () => {
		setDeleteModalOpen(false);
		setIsExpanded(false);
		// console.log("foodInfo: " + foodInfo.id);
		// console.log("fooditem: " + fooditem.id);
		handleDeleteFood(foodInfo.id);
	};

	return (
		<Box
			sx={{
				height: "100px",
				width: "100%",
				position: "relative",
				overflow: "hidden",
				display: "inline-flex",
				boxSizing: "border-box",
				// backgroundColor: "#000",
			}}
		>
			<Box {...handlers}>
				<Box
					sx={{
						height: "100%",
						transform: `translateX(${isExpanded ? `-140px` : "0px"})`,
						width: "100%",
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "space-between",
						position: "absolute",
						transition: "all 0.25s ease",
						boxSizing: "border-box",
						// paddingTop: "1rem",
						// paddingBottom: "0.8rem",
						zIndex: 2,
					}}
				>
					<Food key={foodInfo.id} fooditem={foodInfo} />
				</Box>
				<Box
					sx={{
						height: "90%",
						// display: isExpanded ? "flex" : "none",
						display: "flex",
						width: "100%",
						position: "absolute",
						top: "5px",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-end",
						zIndex: 1,
						paddingRight: "10px",
					}}
				>
					<Button
						onClick={() => setEditModalOpen(true)}
						sx={{
							height: "100%",
							borderRadius: 3,
							// border: "2px solid #427E57",
							"&:hover": {
								backgroundColor: "#427E57",
								color: "#fff",
							},
							backgroundColor: theme.palette.primary[2],
						}}
					>
						<EditOutlinedIcon fontSize='large' />
					</Button>
					<Button
						onClick={() => setDeleteModalOpen(true)}
						sx={{
							height: "100%",
							borderRadius: 3,
							marginLeft: "4px",
							"&:hover": {
								backgroundColor: "#427E57",
								color: "#fff",
							},
							backgroundColor: theme.palette.primary[2],
						}}
					>
						<DeleteOutlineIcon fontSize='large' />
					</Button>
					<EditModal
						open={isEditModalOpen}
						onClose={() => setEditModalOpen(false)}
						onSave={handleEditSave}
						initialValue={quantity}
					/>
					<DeleteConfirmationModal
						open={isDeleteModalOpen}
						onClose={() => setDeleteModalOpen(false)}
						onConfirm={handleDeleteConfirm}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default SwipeOptions;
