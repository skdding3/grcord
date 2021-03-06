import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useCallback } from "react";
import ProfileModal from "./Modal/ProfileModal";

function Header() {
  const { user, theme } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleCloseProfileModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  const handleOpenMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => setAnchorEl(null), []);

  const handleClickOpen = useCallback(() => {
    setShowProfileModal(true);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);
  return (
    <>
      {/* TODO backgroundColor 테마적용 */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "white",
          backgroundColor: theme.mainTheme,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <TagIcon />
            <Typography variant="h6" component="div">
              GRCORD
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
              <Typography variant="h6" component="div" sx={{ color: "white" }}>
                {user.currentUser?.displayName}
              </Typography>
              <Avatar
                sx={{ marginLeft: "10px" }}
                alt="profileImage"
                src={user.currentUser?.photoURL}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClickOpen}>
                <Typography textAlign="center">프로필 이미지</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileModal
        open={showProfileModal}
        handleClose={handleCloseProfileModal}
      />
    </>
  );
}

export default Header;
