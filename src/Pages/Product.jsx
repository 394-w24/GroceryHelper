import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import Webcam from "react-webcam";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import placeholder from "../assets/imagePlaceholder.webp";
import GroceryForm from "../Components/GroceryForm";
import FoodRecognition from "../Components/FoodRecognition";
import ConfirmModal from "../Components/ConfirmModal";
import recognizeImage from "../helper";

const Product = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState(null);

  const toggleDialog = () => {
    if (isConfirmModalOpen) {
      setIsConfirmModalOpen(false);
    }
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    if (isDialogOpen && !isConfirmModalOpen) {
      setFoodName(null);
    }
  }, [isDialogOpen]);

  const toggleConfirmModal = () => {
    setImage(null);
    setFoodName(null);
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const openGroceryFormOnConfirm = () => {
    setIsDialogOpen(true);
  };

  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const result = await recognizeImage(imageSrc);
    setFoodName(result);
    setImage(imageSrc);
  }, [webcamRef]);

  const handleAddFoodItem = () => {};

  const videoConstraints = {
    width: { min: 640, ideal: 1920 },
    height: { min: 720, ideal: 1080 },
    facingMode: "enviornment",
  };

  useEffect(() => {
    if (image) {
      setIsConfirmModalOpen(true);
    }
  }, [image]);

  return (
    <Box>
      <IconButton onClick={() => (window.location.href = "/")}>
        <ChevronLeftIcon />
      </IconButton>
      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Take a picture of your grocery, one at a time
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "600px",
        }}
      >
        <Webcam
          audio={false}
          height={1080}
          width="100%"
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          videoConstraints={videoConstraints}
        ></Webcam>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            border: "1px solid #D9D9D9",
            borderRadius: "100%",
            position: "absolute",
            bottom: 5,
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            background: "#D9D9D9",
          }}
        >
          <IconButton onClick={() => capture()}>
            <CameraAltIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <Button
          variant="contained"
          onClick={toggleDialog}
          sx={{ background: "#ffffff", color: "#000000" }}
        >
          Manual Input My Item
        </Button> */}

        <GroceryForm
          open={isDialogOpen}
          onClose={toggleDialog}
          onAddFoodItem={handleAddFoodItem}
          passedInFoodName={foodName}
        />
      </Box>

      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={toggleConfirmModal}
        onConfirm={openGroceryFormOnConfirm}
        image={image}
        name={foodName}
      />
    </Box>
  );
};

export default Product;
