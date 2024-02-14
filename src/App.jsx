import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import { checkIfLoggedIn, getUserData } from "./Firebase";
import LoginPage from "./pages/LoginPage";
import { Box } from "@mui/material";
import LoadingContainer from "./components/LoadingContainer";

const privateRoutes = [
  {
    path: "/",
    component: () => <HomePage />,
  },
  {
    path: "*",
    component: () => <HomePage />,
  }
];

const publicRoutes = [
  {
    path: "/login",
    component: () => <LoginPage />,
  },
];

const App = () => {
  const isSignedIn = checkIfLoggedIn();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfUidMatches = async () => {
      if (isSignedIn) {
        const user = await getUserData();
        if (!user || user.uid !== localStorage.getItem("uid")) {
          alert("Please Sign In Again!");
          localStorage.removeItem("lastSignIn");
          localStorage.removeItem("name");
          localStorage.removeItem("photoUrl");
          localStorage.removeItem("uid");
          window.location.reload();
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    checkIfUidMatches();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <Routes>
              {privateRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    isSignedIn ? <route.component /> : <Navigate to="/login" />
                  }
                />
              ))}
              {publicRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    isSignedIn ? <Navigate to="/" /> : <route.component />
                  }
                />
              ))}
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </LoadingContainer>
  );
};

export default App;
