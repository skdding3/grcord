import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
} from "@mui/material";
import React from "react";

function ProfileModal({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>프로필 이미지 변경</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          <Input
            type="file"
            inputProps={{
              accept: "image/jpg, image/jpeg, image/png, image/gif",
            }}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
