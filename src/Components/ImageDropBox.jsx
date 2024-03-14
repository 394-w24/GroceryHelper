import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";

function ImageDropBox({ onImageUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onImageUpload(file);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed grey",
        padding: 2,
        marginTop: 2,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <Typography>Drag and drop or select an image of the item</Typography>
    </Box>
  );
}

export default ImageDropBox;
