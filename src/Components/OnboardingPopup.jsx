import React, { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../assets/onBoard/1.png";
import img2 from "../assets/onBoard/2.png";
import img3 from "../assets/onBoard/3.png";
import img4 from "../assets/onBoard/4.png";
import img5 from "../assets/onBoard/5.png";
import img6 from "../assets/onBoard/6.png";
import img7 from "../assets/onBoard/7.png";
import {
  Dialog,
  MobileStepper,
  Button,
  Typography,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";

const OnboardingPopup = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 7;
  const images = [img1, img2, img3, img4, img5, img6, img7];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const slides = [
    {
      label: "Welcome to Our App!",
      description: "We're excited to have you onboard. Let's get you started.",
      image: null,
    },
    ...images.map((image, index) => ({
      image,
    })),
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
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              maxHeight: "100%",
            }}
          />
        )}
        <Typography variant="h1">{slides[activeStep].label}</Typography>
        <Typography sx={{ textAlign: "center" }}>
          {slides[activeStep].description}
        </Typography>
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
