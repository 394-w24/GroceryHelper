import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Button,
  Box,
} from "@mui/material";

const ConfirmModal = ({ open, onClose, onConfirm, image, name }) => {
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
          onClick={onConfirm}
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
    </Dialog>
  );
};

export default ConfirmModal;
