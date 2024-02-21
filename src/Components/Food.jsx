import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
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

const Food = ({ fooditem, isExpanded, setIsExpanded }) => {
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
        border: "1px solid #D9D9D9",
        boxShadow: "0 7px 2px -2px #D9D9D9",
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  fontSize: "14px",
                }}
              >
                {storageType}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "10px", fontSize: "18px" }}
              >
                {quantity}
                {quantity == 1 ? "pc" : "pcs"}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  marginRight: "5px",
                  backgroundColor: "#000000",
                }}
              />
              {daysUntilExpiration < 0 && (
                <Box
                  sx={{
                    padding: "3px 10px",
                    backgroundColor: "#FCA5A5",
                    borderRadius: "15px",
                    fontSize: "14px",
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
                    fontSize: "14px",
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
                    fontSize: "14px",
                  }}
                >
                  About to expire, eat it!
                </Box>
              )}
              {daysUntilExpiration > 2 && (
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
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
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <MoreHorizIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Food;
