import { Box } from "@mui/system";
import Header from "../components/Header";
import React from "react";

function Main() {
  return (
    // TODO backgroundColor 테마 적용
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <Header />
    </Box>
  );
}

export default Main;
