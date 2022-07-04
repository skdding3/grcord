import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";

function ThemeMenu() {
  const [mainTheme, setMainTheme] = useState("#FFFFFF");
  const [subTheme, setSubTheme] = useState("#FFFFFF");
  const [showThemeModal, setShowThemeModal] = useState(false);

  const handleChangeMain = useCallback((color) => setMainTheme(color), []);
  const handleChangeSub = useCallback((color) => setSubTheme(color), []);
  const handleClickOpen = useCallback(() => setShowThemeModal(true), []);
  const handleClose = useCallback(() => setShowThemeModal(false), []);
  return (
    <>
      <List sx={{ overflow: "auto", width: 60, backgroundColor: "#150C16" }}>
        <ListItem button onClick={handleClickOpen}>
          <ListItemIcon sx={{ color: "white" }}>
            <PaletteIcon />
          </ListItemIcon>
        </ListItem>
        {/* 추가되는 테마 */}
        <ListItem>
          <div className="theme-box">
            <div
              className="theme-main"
              style={{ backgroundColor: "red" }}
            ></div>
            <div
              className="theme-sub"
              style={{ backgroundColor: "white" }}
            ></div>
          </div>
        </ListItem>
      </List>
      <Dialog open={showThemeModal} onClose={handleClose}>
        <DialogTitle>테마 색상 선택</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2}>
            <div>
              Main
              <HexColorPicker color={mainTheme} onChange={handleChangeMain} />
            </div>
            <div>Sub</div>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ThemeMenu;
