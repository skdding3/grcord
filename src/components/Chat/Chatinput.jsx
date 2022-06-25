import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import React, { useCallback } from "react";
import { useState } from "react";
import "../../firebase";
import {
  getDatabase,
  set,
  push,
  ref,
  serverTimestamp,
} from "firebase/database";
import { useSelector } from "react-redux";

function Chatinput() {
  const { channel, user } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback((e) => setMessage(e.target.value), []);

  const createMessage = useCallback(
    () => ({
      timestamp: serverTimestamp(),
      user: {
        id: user.currentUser.uid,
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
      },
      content: message,
    }),
    [
      message,
      user.currentUser.uid,
      user.currentUser.displayName,
      user.currentUser.photoURL,
    ]
  );

  // 엔터키 입력시 데이터 전송 로직 추가
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      clickSendMessage();
    }
  };

  // 클릭시 데이터 전송 로직
  const clickSendMessage = useCallback(async () => {
    if (!message) return;
    setLoading(true);
    try {
      await set(
        push(ref(getDatabase(), "messages/" + channel.currentChannel.id)),
        createMessage()
      );
      setLoading(false);
      setMessage("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [message, channel.currentChannel?.id, createMessage]);

  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton disabled={loading} onClick={clickSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메세지 입력"
          fullWidth
          value={message}
          onChange={handleChange}
          onKeyPress={onKeyPress}
        />
      </Grid>
    </Grid>
  );
}

export default Chatinput;
