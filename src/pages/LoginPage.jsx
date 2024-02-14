import React from "react";
import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../Firebase";

const StyledButton = styled(Button)({
  backgroundColor: "#196f3d ",
  color: "white",
  "&:hover": {
    backgroundColor:"#003E1F",
  },
  width: "80%",
  height: "50px",
  border: "none",
});

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleSignIn = () => {
    signUpWithGoogle(navigate);
  };
  
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary["lightGreen"]
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "55px" }}>
          Stay Fresh
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <StyledButton onClick={handleSignIn}>Login With Google</StyledButton>
      </Box>
    </Box>
  );
};

export default LoginPage;
