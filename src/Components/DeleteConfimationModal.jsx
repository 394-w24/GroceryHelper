import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				style: {
					borderRadius: 15,
					padding: "10px",
				},
			}}
		>
			<DialogTitle>
				<Typography
					sx={{
						fontFamily: "Arial",
						fontSize: "20px",
						fontWeight: "bold",
					}}
				>
					Confirm Delete
				</Typography>
			</DialogTitle>
			<DialogContent>Are you sure to delete this item?</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>
					<CloseIcon />
				</Button>
				<Button onClick={onConfirm} color='error'>
					<DeleteOutlineIcon />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
