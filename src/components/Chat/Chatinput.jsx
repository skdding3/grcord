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
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import ImageModal from "../Modal/ImageModal";

function Chatinput() {
  const { channel, user } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [ImageModalOpen, SetImageModalOpen] = useState(false);

  const handleCilckOpen = useCallback(() => SetImageModalOpen(true), []);
  const handleClickClose = useCallback(() => SetImageModalOpen(false), []);

  const handleChange = useCallback((e) => setMessage(e.target.value), []);

  const handleTooglePicker = useCallback(
    () => setShowEmoji((show) => !show),
    []
  );

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

  // 이모지 선택시 채팅창 적용
  const handleSelectEmoji = useCallback((e) => {
    const sym = e.unified.split("-");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setMessage((messageValue) => messageValue + emoji);
  }, []);

  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        {showEmoji && (
          <Picker
            set="google"
            className="emojipicker"
            title="이모지를 선택하세요."
            onSelect={handleSelectEmoji}
            emoji="point_up"
            style={{ position: "absolute", bottom: "80px" }}
          />
        )}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <InsertEmoticonIcon onClick={handleTooglePicker} />
                </IconButton>
                <IconButton onClick={handleCilckOpen}>
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
        <ImageModal open={ImageModalOpen} handleClose={handleClickClose} />
      </Grid>
    </Grid>
  );
}

export default Chatinput;
