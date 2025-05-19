import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const TopProperties = () => {
  const properties = [
    {
      id: 1,
      title: "3BR/2BA Single Family Home",
      location: "Indianapolis, IN",
      squareFt: 1950,
      builtYear: 2005,
      price: 185000,
      monthlyRent: 1550,
      capRate: 8.5,
      propertyType: "Single Family Home",
    },
    {
      id: 2,
      title: "Duplex - 2 Units",
      location: "Cleveland, OH",
      squareFt: 2200,
      builtYear: 2000,
      price: 225000,
      monthlyRent: 2100,
      capRate: 9.2,
      propertyType: "Duplex",
    },
    {
      id: 3,
      title: "3BR/2.5BA Townhouse",
      location: "Memphis, TN",
      squareFt: 1800,
      builtYear: 2012,
      price: 195000,
      monthlyRent: 1650,
      capRate: 8.2,
      propertyType: "Townhouse",
    },
    {
      id: 4,
      title: "Triplex - 3 Units",
      location: "Tampa, FL",
      squareFt: 3000,
      builtYear: 2008,
      price: 350000,
      monthlyRent: 3300,
      capRate: 9.5,
      propertyType: "Triplex",
    },
    {
      id: 5,
      title: "4BR/3BA Single Family Home",
      location: "Birmingham, AL",
      squareFt: 2500,
      builtYear: 2015,
      price: 210000,
      monthlyRent: 1830,
      capRate: 8.7,
      propertyType: "Single Family Home",
    },
  ];

  const renderPropertyCard = (property) => {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {/* Placeholder Image */}
        <CardMedia
          component="div"
          sx={{
            height: 160,
            bgcolor: "#e0e4e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8d9da8",
            fontSize: 14,
          }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: "#5c7080",
              textAlign: "center",
            }}
          >
            Property Image
          </Typography>
        </CardMedia>

        {/* Property Details */}
        <CardContent sx={{ p: 2, pb: 0, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight="bold"
            sx={{ fontSize: "0.95rem", mb: 0.5, textAlign: "left" }}
          >
            {property.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.875rem", textAlign: "left" }}
          >
            {property.location}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem", mb: 1, textAlign: "left" }}
          >
            {property.squareFt.toLocaleString()} sq ft • Built{" "}
            {property.builtYear}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#0d47a1",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textAlign: "left",
            }}
          >
            ${property.price.toLocaleString()}
          </Typography>

          {/* Rent and Cap Rate */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mt: 1,
              mb: 1.5,
            }}
          >
            {/* Monthly Rent */}
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ fontSize: "0.7rem" }}
              >
                Est. Monthly Rent:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                ${property.monthlyRent.toLocaleString()}
              </Typography>
            </Box>

            {/* Cap Rate */}
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ fontSize: "0.7rem" }}
              >
                Cap Rate:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {property.capRate}%
              </Typography>
            </Box>
          </Box>

          {/* View Details Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: "auto",
              mb: 1.5,
              py: 0.75,
              bgcolor: "#1565c0",
              "&:hover": { bgcolor: "#0d47a1" },
              textTransform: "none",
              fontSize: "0.85rem",
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, textAlign: "left" }}
      >
        Top 5 Available Properties
      </Typography>

      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={property.id}>
            {renderPropertyCard(property)}
          </Grid>
        ))}
      </Grid>

      {/* Request Property Info Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1,
            bgcolor: "#1565c0",
            "&:hover": { bgcolor: "#0d47a1" },
            textTransform: "none",
          }}
        >
          Request Property Information Package
        </Button>
      </Box>
    </Box>
  );
};

export default TopProperties;
