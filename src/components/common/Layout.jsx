// components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Navbar />
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
