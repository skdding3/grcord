import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import {
  child,
  ref,
  getDatabase,
  get,
  orderByChild,
  query,
  onChildAdded,
  startAt,
} from "firebase/database";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Chatinput from "./Chatinput";
import ChatMessage from "./ChatMessage";

function Chat() {
  const { channel, user } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef();

  useEffect(() => {
    if (!channel.currentChannel) return;
    async function getMessages() {
      const snapShot = await get(
        child(ref(getDatabase()), "messages/" + channel.currentChannel.id)
      );
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [channel.currentChannel]);

  useEffect(() => {
    if (!channel.currentChannel) return;
    const sorted = query(
      ref(getDatabase(), "messages/" + channel.currentChannel.id),
      orderByChild("timestamp")
    );
    const unsubscribe = onChildAdded(
      query(sorted, startAt(Date.now())),
      (snapshot) =>
        setMessages((oldMessages) => [...oldMessages, snapshot.val()])
    );
    return () => {
      unsubscribe?.();
    };
  }, [channel.currentChannel]);

  // 메세지 자동 스크롤 기능
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [messages.length]);

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
          {messages.map((message) => (
            <ChatMessage
              key={message.timestamp}
              message={message}
              user={user}
            />
          ))}
          <div ref={messageEndRef}></div>
        </List>
        <Divider />
        <Chatinput />
      </Grid>
    </>
  );
}

export default Chat;
