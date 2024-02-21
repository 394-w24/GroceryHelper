import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Container,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../Firebase";
import EmailIcon from "@mui/icons-material/Email";

const MyStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary["2"],
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.primary["1"],
  },
  justifyContent: 'start', 
  alignItems: 'center',    
  padding: "8px",
  paddingLeft: "25px",
  borderRadius: "16px",
  fontSize: "1rem",
  textAlign: "left",
  width: "85%",
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleSignIn = () => {
    signUpWithGoogle(navigate);
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        marginBottom="75px"
        marginTop="15%"
        fontSize="2.3rem"
        align="center"
        color={theme.palette.primary["main"]}
      >
        StayFresh.
      </Typography>
      <Box justifyContent="start" marginLeft="5%">
        <Typography
          variant="h1"
          component="h2"
          fontSize="2rem"
          marginBottom="0.3em"
          color={theme.palette.primary["main"]}
        >
          Reduce Waste!
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.primary["main"]}
          marginBottom="75px"
        >
          say goodbye to spoilage &amp;
          <br /> get tailored suggestions
        </Typography>
      </Box>
      <Box mt={2} width="100%" display="flex" marginLeft="5%">
        <MyStyledButton
          variant="contained"
          onClick={handleSignIn}
          startIcon={
            <EmailIcon style={{ color: "black" }} />
          }
        >
          Login with Gmail
        </MyStyledButton>
      </Box>
    </Container>
  );
};

export default LoginPage;
