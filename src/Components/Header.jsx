import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box, IconButton, useTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
	const theme = useTheme();

	return (
		<AppBar
			position='static'
			sx={{ backgroundColor: theme.palette.primary["main"] }}
		>
			<Toolbar>
				<Typography variant='h6' sx={{ flexGrow: 1 }}>
					GroceryHelper
				</Typography>

				<IconButton>
					<AccountCircleIcon
						sx={{ width: "35px", height: "35px", color: "white" }}
					/>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
