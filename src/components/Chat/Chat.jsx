import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Chatinput from "./Chatinput";
import ChatMessage from "./ChatMessage";

function Chat() {
  const { channel } = useSelector((state) => state);
  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel.currentChannel} />
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ mt: 3, position: "relative" }}
      >
        <List
          sx={{
            height: "calc(100vh - 350px)",
            overflow: "scroll",
            width: "100%",
            position: "relative",
          }}
        >
          {/* 채팅메세지 */}
          <ChatMessage />
        </List>
        <Divider />
        <Chatinput />
      </Grid>
    </>
  );
}

export default Chat;
