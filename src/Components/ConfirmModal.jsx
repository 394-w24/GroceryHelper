import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import foodItems from "../assets/data.json";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  setChosenName,
  image,
  name,
}) => {
  const [step, setStep] = useState(0);
  const [allData, setAllData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const temp = [];
      foodItems.forEach((curr) => {
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

  const filterFoods = () => {
    const lowercased = name.toLowerCase();
    const filtered = allData.filter((item) => {
      const { name } = item || "";
      return name.toLowerCase().includes(lowercased) || "";
    });

    setFilteredOptions(filtered);
  };

  useEffect(() => {
    if (step === 1) {
      filterFoods();
    }
  }, [step]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 15,
          padding: "10px",
        },
      }}
    >
      {step === 0 && (
        <>
          <DialogTitle>
            <Typography
              sx={{
                fontFamily: "Arial",
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              We have detected
            </Typography>
          </DialogTitle>
          <DialogContent>
            <img src={image}></img>
            <Typography
              sx={{
                marginTop: "20px",
                fontFamily: "Arial",
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Arial",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Is this correct?
            </Typography>
          </DialogContent>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                marginRight: "10px",
                color: "#000000",
                backgroundColor: "#ffffff",
                fontWeight: "bolder",
                border: "1px solid #D9D9D9",
              }}
            >
              No, retake photo
            </Button>
            <Button
              onClick={() => setStep(1)}
              variant="contained"
              sx={{
                backgroundColor: "#D9DF95",
                color: "#000000",
                fontWeight: "bolder",
              }}
            >
              Yes
            </Button>
          </Box>
        </>
      )}
      {step === 1 && (
        <Box>
          <Box
            sx={{
              marginBottom: "10px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filteredOptions.length === 0 ? (
              <>
                <Typography>
                  We don't have {name} in our database. Do you want to add it
                  manually?
                </Typography>
                <Button
                  onClick={() => {
                    setChosenName("");
                    onConfirm();
                  }}
                >
                  Continue!
                </Button>
              </>
            ) : (
              <>
                <Typography>Choose from one of the options</Typography>
                {filteredOptions.map((option) => {
                  return (
                    <Button
                      onClick={() => {
                        setChosenName(`${option.name}/${option.description}`);
                        onConfirm();
                      }}
                      variant="contained"
                      sx={{
                        color: "#000000",
                        width: "100%",
                        marginBottom: "5px",
                        backgroundColor: "#ffffff",
                        fontWeight: "bolder",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      {option.name}/{option.description}
                    </Button>
                  );
                })}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                color: "#000000",
                backgroundColor: "#ffffff",
                fontWeight: "bolder",
                border: "1px solid #D9D9D9",
              }}
            >
              No, retake photo
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ConfirmModal;
