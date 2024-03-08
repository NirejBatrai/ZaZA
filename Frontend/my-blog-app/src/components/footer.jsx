import React from "react";
import { Box } from "@mui/material";

function footer() {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0,0,0,.7)",
        height: "60px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ color: "afafafa" }}>Footer</Box>
    </Box>
  );
}

export default footer;
