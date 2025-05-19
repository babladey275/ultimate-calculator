import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    handleMenuClose();
  };

  return (
    <Paper
      sx={{
        position: "relative",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
        backgroundColor: "#1A365D",
        color: "white",
        py: 4,
        px: 4,
        textAlign: "center",
      }}
    >
      {/* Settings Icon */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 24,
        }}
      >
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            backgroundColor: "#2C5282",
            "&:hover": {
              backgroundColor: "#2B6CB0",
            },
            color: "white",
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ fontSize: 18, mr: 1, color: "#4B5563" }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>

      {/* Title & Subtitle */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Ultimate Turnkey Investment Calculator
      </Typography>
      <Typography variant="h6">
        Calculate your potential returns on turnkey property investments
      </Typography>
    </Paper>
  );
};

export default Header;
