import React, { useState, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EditModal = ({ open, onClose, onSave, initialValue }) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (event) => {
		setValue(parseInt(event.target.value));
	};

	useEffect(() => {
		if (open) setValue(initialValue);
	}, [open]);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

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
			<DialogTitle>Edit Quantity</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				{/* <Button onClick={() => setValue((prev) => (prev > 1 ? prev - 1 : 0))}>
					<RemoveIcon />
				</Button> */}
				<TextField
					type='number'
					InputProps={{
						inputProps: { min: 0 },
						style: { textAlign: "center", fontSize: "20px" },
						startAdornment: (
							<InputAdornment position='start'>
								<IconButton
									onClick={() => setValue((prev) => (prev > 1 ? prev - 1 : 0))}
									aria-label='decrease quantity'
								>
									<RemoveIcon />
								</IconButton>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => setValue((prev) => prev + 1)}
									aria-label='increase quantity'
								>
									<AddIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					value={value}
					onChange={handleChange}
					sx={
						{
							// width: "30%",
						}
					}
				/>
				{/* <Button onClick={() => setValue((prev) => prev + 1)}>
					<AddIcon />
				</Button> */}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>
					<CloseIcon />
				</Button>
				<Button onClick={() => onSave(value)} color='primary'>
					<DoneIcon
						sx={{
							color: "primary",
						}}
					/>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditModal;
