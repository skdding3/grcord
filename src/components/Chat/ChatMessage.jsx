import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function ChatMessage({ message, user }) {
  return (
    <ListItem>
      <ListItemAvatar sx={{ alignself: "stretch" }}>
        <Avatar
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          alt="profile image"
          src={message.user.avatar}
        />
      </ListItemAvatar>
      <Grid container sx={{ ml: 2 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
          <ListItemText
            sx={{ display: "flex" }}
            primary={message.user.name}
            primaryTypographyProps={{
              fontWeight: "bold",
              // 본인인 경우 오렌지 아니면 블랙이도록 채팅메세지 컬러설정
              color:
                message.user.id === user.currentUser.uid ? "orange" : "black",
            }}
            secondary={dayjs(message.timestamp).fromNow()}
            secondaryTypographyProps={{ color: "gray", ml: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align="left"
            xs={{ wordBreak: "break-all" }}
            primary={message.content}
          />
          {/* TODO 이미지 추가 */}
          {/* <img alt="message" src="" style={{maxWidth:"100%"}} /> */}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default ChatMessage;
