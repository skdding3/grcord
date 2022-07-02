import React from "react";
import { List, ListItem, ListItemIcon } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

function ThemeMenu() {
  return (
    <>
      <List sx={{ overflow: "auto", width: 60, backgroundColor: "#150C16" }}>
        <ListItem button>
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
    </>
  );
}

export default ThemeMenu;
