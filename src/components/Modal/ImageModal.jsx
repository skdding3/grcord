/* eslint-disable react-hooks/rules-of-hooks */
import { UploadFile } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../firebase";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { async } from "@firebase/util";
import {
  set,
  push,
  ref,
  getDatabase,
  serverTimestamp,
} from "firebase/database";
import { useSelector } from "react-redux";

function imageModal({ open, handleClose }) {
  const { channel, user } = useSelector((state) => state);
  const [file, setFile] = useState(null);

  const onChangeAddFile = useCallback((e) => {
    const addedFile = e.target.files[0];
    if (addedFile) setFile(addedFile);
  }, []);

  const createImageMessage = useCallback(
    (fileUrl) => ({
      timestamp: serverTimestamp(),
      user: {
        id: user.currentUser.uid,
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL,
      },
      image: fileUrl,
    }),
    [
      user.currentUser.uid,
      user.currentUser.displayName,
      user.currentUser.photoURL,
    ]
  );

  const UploadFile = () => {
    // TODO uploading
    const filePath = `chat/${uuidv4()}.${file.name.split(".").pop()}`;
    const uploadTask = uploadBytesResumable(
      refStorage(getStorage(), filePath),
      file
    );
    const unsubscribe = uploadTask.on(
      "state_changed",
      (snap) => {
        const percentUploaded = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        // set percent 함수 넣기
        console.log(percentUploaded);
      },
      (err) => {
        console.error("error");
        // TODO uploading state
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.ref);
          await set(
            push(ref(getDatabase(), "messages/" + channel.currentChannel?.id)),
            createImageMessage(downloadUrl)
          );
          // TODO uploading state
          unsubscribe();
        } catch (error) {
          console.error(error);
          // TODO uploading state
          unsubscribe();
        }
      }
    );
  };

  const handleSendFile = useCallback(() => {
    UploadFile();
    handleClose();
    setFile(null);
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Input
          margin="dense"
          inputProps={{ accept: "image/jpeg, image/jpg, image/png, image/gif" }}
          type="file"
          fullWidth
          variant="standard"
          onChange={onChangeAddFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSendFile}>전송</Button>
      </DialogActions>
    </Dialog>
  );
}

export default imageModal;
