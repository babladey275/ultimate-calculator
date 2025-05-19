// LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(phoneNumber, pin);
    if (success) {
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 5,
          padding: 5,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          backgroundColor: "#ffffffee",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome to the Ultimate Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Please log in to access the turnkey property investment tools
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          textAlign="left"
          onSubmit={handleSubmit}
        >
          <Typography variant="subtitle2" fontWeight="medium" mb={1}>
            Phone Number
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your phone number"
            margin="dense"
            sx={{ mb: 2 }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Typography variant="subtitle2" fontWeight="medium" mb={1}>
            PIN Code
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter 4-digit PIN"
            margin="dense"
            type="password"
            inputProps={{ maxLength: 4 }}
            sx={{ mb: 3 }}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              background: "linear-gradient(to right, #1E3A8A, #2563EB)",
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(to right, #1E40AF, #3B82F6)",
              },
            }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
