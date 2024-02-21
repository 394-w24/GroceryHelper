import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Chip } from "@mui/material";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Food = ({ fooditem }) => {
  const {
    createdAt,
    expiredAt,
    imageURL,
    productId,
    quantity,
    storageType,
    userId,
    id,
  } = fooditem;
  const [productName, setProductName] = useState("");
  const expirationDate = expiredAt;
  const today = new Date();
  const difference = expirationDate - today;
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysUntilExpiration = Math.floor(difference / millisecondsInADay);

  useEffect(() => {
    const fetchProductName = async () => {
      if (!productId) {
        return;
      }
      const productRef = doc(db, "products", productId);
      const snapshot = await getDoc(productRef);
      setProductName(snapshot.data().name);
    };
    fetchProductName();
  }, [productId]);

  return (
    <Box
      sx={{
        marginInline: "10px",
        width: "100%",
        minHeight: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        boxShadow: 10,
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginRight: "5px" }}
              >
                {productName}
              </Typography>
              <Box
                sx={{
                  background: "#D9D9D9",
                  padding: "3px 10px",
                  borderRadius: "15px",
                }}
              >
                {storageType}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                {quantity}
                {quantity == 1 ? "pc" : "pcs"}
              </Typography>
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                |
              </Typography>
              {daysUntilExpiration < 0 && (
                <Box
                  sx={{
                    padding: "3px 10px",
                    backgroundColor: "#FCA5A5",
                    borderRadius: "15px",
                  }}
                >
                  Expired!!!
                </Box>
              )}
              {daysUntilExpiration == 0 && (
                <Box
                  sx={{
                    padding: "3px 10px",
                    backgroundColor: "#FBC300",
                    borderRadius: "15px",
                  }}
                >
                  Expires today, eat it!
                </Box>
              )}
              {daysUntilExpiration > 0 && daysUntilExpiration < 2 && (
                <Box
                  sx={{
                    padding: "3px 10px",
                    backgroundColor: "#FBC300",
                    borderRadius: "15px",
                  }}
                >
                  About to expire, eat it!
                </Box>
              )}
              {daysUntilExpiration > 2 && (
                <Typography variant="h6">
                  Expires in {daysUntilExpiration} days
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MoreHorizIcon sx={{ fontSize: "30px" }} />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", userSelect: "none" }}
        >
          {productName}
        </Typography>
        <Typography
          variant="h7"
          sx={{
            fontSize: "17px",
            fontStyle: "italic",
            userSelect: "none",
          }}
        >
          {storageType}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ userSelect: "none" }}>
          Quantity: {quantity}
        </Typography>
        <Chip
          label={
            daysUntilExpiration >= 0
              ? `${daysUntilExpiration} days left`
              : "Expired"
          }
          color={
            daysUntilExpiration < 4
              ? "error"
              : daysUntilExpiration < 8
              ? "warning"
              : "success"
          }
          sx={{ userSelect: "none", fontSize: "17px" }}
        />
      </Box> */}
    </Box>
  );
};

export default Food;
