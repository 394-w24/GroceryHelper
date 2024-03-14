import { Box, Button, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../Firebase";
import logo from "../assets/logo/logo.jpg";

const StyledButton = styled(Button)({
  backgroundColor: "#196f3d ",
  color: "white",
  "&:hover": {
    backgroundColor: "#003E1F",
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
        backgroundColor: "rgb(140, 219, 110)",
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
        <img
          src={logo}
          alt="Stay Fresh Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "130%",
            height: "auto",
            width: "auto",
          }}
        />
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
        <StyledButton data-cy="login" onClick={handleSignIn}>
          Login With Gmail
        </StyledButton>
      </Box>
    </Box>
  );
};
export default LoginPage;
