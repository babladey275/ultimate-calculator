import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Paper,
  MenuItem,
  Select,
  FormGroup,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createQuestionnaire } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const QualifyingQuestions = () => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    accreditedInvestor: "",
    investedBefore: "",
    lookingToInvest: "",
    primaryGoal: "",
    investmentTimeline: "",
    investmentCapital: "",
    useFinancing: "",
    interestedMarkets: [],
    propertyTypes: [],
    investmentTiming: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleRadioChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], name]
        : prev[category].filter((item) => item !== name),
    }));
  };

  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transformedData = {
      isAccreditedInvestor: formData.accreditedInvestor === "Yes",
      hasInvestedBefore: formData.investedBefore === "Yes",
      lookingTimeframe: formData.lookingToInvest,
      primaryInvestmentGoal: formData.primaryGoal,
      investmentTimeline: formData.investmentTimeline,
      capitalToInvest: formData.investmentCapital,
      useFinancing: formData.useFinancing,
      marketsInterested: formData.interestedMarkets,
      propertyTypesInterested: formData.propertyTypes,
      investmentTimeframe: formData.investmentTiming,
      contactId: userId,
    };

    try {
      const res = await createQuestionnaire(transformedData);
      console.log("questionnaire", res);
      toast.success("Questionnaire submitted successfully!");
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Something went wrong. Please try again.");
      setSubmitStatus("error");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
        Investor Qualification Questionnaire
      </Typography>
      <Typography color="text.secondary" paragraph sx={{ textAlign: "left" }}>
        Please answer these questions to help us understand your investment
        goals and capabilities.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "left" }}>
        {/* 1. Accredited Investor */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>1. Are you an accredited investor?</FormLabel>
          <RadioGroup
            name="accreditedInvestor"
            value={formData.accreditedInvestor}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 2. Invested Before */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>2. Have you invested in real estate before?</FormLabel>
          <RadioGroup
            name="investedBefore"
            value={formData.investedBefore}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 3. Looking to Invest */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>
            3. How long have you been looking to invest in real estate?
          </FormLabel>
          <Select
            name="lookingToInvest"
            value={formData.lookingToInvest}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="Less than 1 month">Less than 1 month</MenuItem>
            <MenuItem value="1-3 months">1-3 months</MenuItem>
            <MenuItem value="3-6 months">3-6 months</MenuItem>
            <MenuItem value="6-12 months">6-12 months</MenuItem>
            <MenuItem value="More than 1 year">More than 1 year</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 4. Primary Goal */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>4. What is your primary investment goal?</FormLabel>
          <Select
            name="primaryGoal"
            value={formData.primaryGoal}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="Cash flow">Cash flow</MenuItem>
            <MenuItem value="Capital appreciation">
              Capital appreciation
            </MenuItem>
            <MenuItem value="Tax benefits">Tax benefits</MenuItem>
            <MenuItem value="Portfolio diversification">
              Portfolio diversification
            </MenuItem>
            <MenuItem value="Long-term wealth building">
              Long-term wealth building
            </MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 5. Investment Timeline */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>5. What is your investment timeline?</FormLabel>
          <Select
            name="investmentTimeline"
            value={formData.investmentTimeline}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
            <MenuItem value="1-3 years">1-3 years</MenuItem>
            <MenuItem value="3-5 years">3-5 years</MenuItem>
            <MenuItem value="5-10 years">5-10 years</MenuItem>
            <MenuItem value="10+ years">10+ years</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 6. Capital to Invest */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>6. How much capital are you looking to invest?</FormLabel>
          <Select
            name="investmentCapital"
            value={formData.investmentCapital}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="Less than $50,000">Less than $50,000</MenuItem>
            <MenuItem value="$50,000 - $100,000">$50,000 - $100,000</MenuItem>
            <MenuItem value="$100,000 - $250,000">$100,000 - $250,000</MenuItem>
            <MenuItem value="$250,000 - $500,000">$250,000 - $500,000</MenuItem>
            <MenuItem value="$500,000 - $1,000,000">
              $500,000 - $1,000,000
            </MenuItem>
            <MenuItem value="More than $1,000,000">
              More than $1,000,000
            </MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 7. Use Financing */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>7. Are you planning to use financing?</FormLabel>
          <RadioGroup
            name="useFinancing"
            value={formData.useFinancing}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="No (Cash Purchase)"
              control={<Radio />}
              label="No (Cash Purchase)"
            />
            <FormControlLabel
              value="Undecided"
              control={<Radio />}
              label="Undecided"
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 8. Markets Interested */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>8. Which markets are you most interested in?</FormLabel>
          <FormGroup>
            {[
              "Indianapolis, IN",
              "Memphis, TN",
              "Jacksonville, FL",
              "Birmingham, AL",
              "Cleveland, OH",
              "Tampa, FL",
              "Atlanta, GA",
            ].map((city) => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox
                    name={city}
                    checked={formData.interestedMarkets.includes(city)}
                    onChange={(e) =>
                      handleCheckboxChange(e, "interestedMarkets")
                    }
                  />
                }
                label={city}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 9. Property Types */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>9. What property types are you interested in?</FormLabel>
          <FormGroup>
            {["Single Family Homes", "Duplexes", "Triplexes", "Fourplexes"].map(
              (type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      name={type}
                      checked={formData.propertyTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange(e, "propertyTypes")}
                    />
                  }
                  label={type}
                />
              )
            )}
          </FormGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* 10. Investment Timing */}
        <FormControl fullWidth margin="normal" sx={{ textAlign: "left" }}>
          <FormLabel>
            10. When are you looking to make your next investment?
          </FormLabel>
          <Select
            name="investmentTiming"
            value={formData.investmentTiming}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="As soon as possible">As soon as possible</MenuItem>
            <MenuItem value="Within 1-3 months">Within 1-3 months</MenuItem>
            <MenuItem value="Within 3-6 months">Within 3-6 months</MenuItem>
            <MenuItem value="Within 6-12 months">Within 6-12 months</MenuItem>
            <MenuItem value="More than 12 months">More than 12 months</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" fullWidth>
            Submit Questionnaire
          </Button>
        </Box>

        {submitStatus === "success" && (
          <Typography mt={2} color="success.main">
            Questionnaire submitted successfully!
          </Typography>
        )}
        {submitStatus === "error" && (
          <Typography mt={2} color="error.main">
            Something went wrong. Please try again.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default QualifyingQuestions;
