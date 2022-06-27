import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
} from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import AvatarEditor from "react-avatar-editor";

function ProfileModal({ open, handleClose }) {
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setPreviewImage(reader.result);
    });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>프로필 이미지 변경</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          <Input
            type="file"
            onChange={handleChange}
            inputProps={{
              accept: "image/jpg, image/jpeg, image/png, image/gif",
            }}
            label="변경할 프로필 이미지 선택"
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            {previewImage && (
              <AvatarEditor
                image={previewImage}
                width={120}
                height={120}
                border={50}
                scale={2}
                style={{ display: "inline" }}
              />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>취소</Button>
        <Button>확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileModal;
