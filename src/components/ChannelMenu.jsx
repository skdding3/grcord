import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function ChannelMenu() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetail, setChannelDetail] = useState("");
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {/* TODO 테마반영 */}
      <List sx={{ overflow: "auto", width: 240, backgroundColor: "#1976d2" }}>
        <ListItem
          secondaryAction={
            <IconButton sx={{ color: "white" }} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText
            primary="채널"
            sx={{ wordBreak: "break-all", color: "white" }}
          />
        </ListItem>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>채널 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 채널명과 설명을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="채널명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="설명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelDetail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChannelMenu;
