import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../Firebase";

const StyledButton = styled(Button)({
  backgroundColor: "#4E2A84",
  color: "white",
  "&:hover": {
    backgroundColor: "#3e316b",
  },
  width: "80%",
  height: "50px",
  border: "none",
});

const LoginPage = () => {
  const navigate = useNavigate();
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
        background: "linear-gradient(to bottom, #422a8a, #2d1c4b)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "55px" }}>
          Grocery Helper
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50%",
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
