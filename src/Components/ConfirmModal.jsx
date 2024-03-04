import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Button,
  Box,
} from "@mui/material";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  setChosenName,
  image,
  name,
  allData,
}) => {
  const [step, setStep] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);

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
                {filteredOptions.map((option, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={() => {
                        console.log(
                          option,
                          option.description,
                          "okay",
                          option.description
                            ? `${option.name}/${option.description}`
                            : `${option.name}`
                        );
                        setChosenName(
                          option.description
                            ? `${option.name}/${option.description}`
                            : `${option.name}`
                        );
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
                      {option.description
                        ? `${option.name}/${option.description}
                      `
                        : `${option.name}`}
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                onClose();
                onConfirm();
              }}
              variant="contained"
              sx={{
                color: "#000000",
                backgroundColor: "#ffffff",
                fontWeight: "bolder",
                border: "1px solid #D9D9D9",
              }}
            >
              Add Item Manually
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ConfirmModal;
