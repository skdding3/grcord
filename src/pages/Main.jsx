import { Box } from "@mui/system";
import Header from "../components/Header";
import React from "react";
import { Drawer, Toolbar } from "@mui/material";
import ChannelMenu from "../components/Menu/ChannelMenu";
import Chat from "../components/Chat/Chat";
import ThemeMenu from "../components/Menu/ThemeMenu";

function Main() {
  return (
    // TODO backgroundColor 테마 적용
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <Header />
      <Drawer variant="permanent" sx={{ width: 300 }} className="no-scroll">
        <Toolbar />
        <Box sx={{ display: "flex", minHeight: "calc( 100vh - 64px )" }}>
          <ThemeMenu />
          <ChannelMenu />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Chat />
      </Box>
    </Box>
  );
}

export default Main;
