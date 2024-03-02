import logo from "../assets/logo/logo.jpg";
import React, { useState } from "react";
import {
  Dialog,
  MobileStepper,
  Button,
  Typography,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

const OnboardingPopup = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3; // Adjust based on the number of slides

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const slides = [
    {
      label: "Welcome to the App!",
      description: "Here's how you can get started...",
    },
    {
      label: "Feature 1",
      description: "Learn how to use feature 1...",
      image: logo,
    },
    {
      label: "Feature 2",
      description: "Learn how to use feature 2...",
      image: logo,
    },
    // Add more slides as needed
  ];

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: 400,
          maxWidth: 400,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {slides[activeStep].image && (
          <CardMedia
            component="img"
            image={slides[activeStep].image}
            alt={slides[activeStep].label}
            sx={{ width: "100%", height: "auto", marginBottom: 2 }}
          />
        )}
        <Typography variant="h5">{slides[activeStep].label}</Typography>
        <Typography>{slides[activeStep].description}</Typography>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Dialog>
  );
};

export default OnboardingPopup;
