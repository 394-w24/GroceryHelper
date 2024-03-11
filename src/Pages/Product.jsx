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
import { db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";
import foodData from "../assets/data.json";

const Product = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState(null);
  const [chosenName, setChosenName] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const temp = [];
      foodData.forEach((curr) => {
        if (
          !!curr.freeze &&
          curr.freeze === -1 &&
          !!curr.pantry &&
          curr.pantry === -1 &&
          !!curr.refrigerate &&
          curr.refrigerate === -1
        ) {
          return;
        }

        if (!curr["pantry"] && !curr["fridge"] && !curr["freezer"]) {
          return;
        }

        temp.push(curr);
      });

      const docRef = collection(db, "userProducts");
      const docSnap = await getDocs(docRef);

      docSnap.forEach((doc) => {
        const tempData = Object.assign(doc.data(), { productId: doc.id });
        temp.push(tempData);
      });

      setAllData(temp);
    };

    init();
  }, []);

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
    facingMode: { ideal: "environment" },
  };

  useEffect(() => {
    if (image) {
      setIsConfirmModalOpen(true);
    }
  }, [image]);

  return (
    <Box data-cy="productPage">
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
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: "600px",
        }}
      >
        <Webcam
          audio={false}
          height={1080}
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
          <IconButton data-testid="cameraIconButton" onClick={() => capture()}>
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
        {isDialogOpen && (
          <GroceryForm
            open={isDialogOpen}
            onClose={toggleDialog}
            onAddFoodItem={handleAddFoodItem}
            passedInFoodName={chosenName}
            productName={foodName}
            allData={allData || []}
          />
        )}
      </Box>

      {isConfirmModalOpen && (
        <ConfirmModal
          open={isConfirmModalOpen}
          onClose={toggleConfirmModal}
          onConfirm={openGroceryFormOnConfirm}
          setChosenName={setChosenName}
          image={image}
          name={foodName}
          allData={allData || []}
        />
      )}
    </Box>
  );
};

export default Product;
