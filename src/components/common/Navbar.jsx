// components/Navbar.js
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const tabLabels = [
  "Calculator",
  // "Top 5 Properties",
  "Qualifying Questions",
  "Videos",
  // "Book a Call",
];

const tabRoutes = [
  "/",
  // "/top-properties",
  "/questions",
  "/videos",
  // "/book-call",
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Sync active tab with current route
  useEffect(() => {
    const index = tabRoutes.findIndex((route) => route === location.pathname);
    if (index !== -1) {
      setActiveTab(index);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(tabRoutes[newValue]);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          backgroundColor: "#F7F8FA",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          aria-label="Navigation Tabs"
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              label={label}
              disableRipple
              sx={{
                textTransform: "none",
                fontSize: "16px",
                color: "#1F2937",
                minHeight: "48px",
                px: 3,
                backgroundColor:
                  activeTab === index ? "#1F51E5" : "transparent",
                borderRadius:
                  index === 0
                    ? "10px 0 0 10px"
                    : index === tabLabels.length - 1
                    ? "0 10px 10px 0"
                    : 0,
                "&.Mui-selected": {
                  color: "#FFFFFF",
                },
                "&:hover": {
                  backgroundColor: activeTab === index ? "#1F51E5" : "#E5E7EB",
                },
              }}
            />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default Navbar;
