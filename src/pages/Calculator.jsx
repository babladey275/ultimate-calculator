import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Slider,
  Select,
  MenuItem,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
  Grid,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createCalculate } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Calculator = () => {
  // === State ===
  const { userId } = useAuth();
  const [propertyType, setPropertyType] = useState("Single Family Residence");
  const [marketArea, setMarketArea] = useState("Indianapolis, IN");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [annualReturnRate, setAnnualReturnRate] = useState(10);
  const [propertyManagementFee, setPropertyManagementFee] = useState(10);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // === Configuration Data ===
  const propertyData = {
    "Single Family Residence": {
      rentMultiplier: 0.008,
      expenseRatio: 0.4,
      maintenanceCostPercentage: 1.5,
    },
    Duplex: {
      rentMultiplier: 0.009,
      expenseRatio: 0.42,
      maintenanceCostPercentage: 1.6,
    },
    Triplex: {
      rentMultiplier: 0.01,
      expenseRatio: 0.45,
      maintenanceCostPercentage: 1.7,
    },
    Fourplex: {
      rentMultiplier: 0.011,
      expenseRatio: 0.48,
      maintenanceCostPercentage: 1.8,
    },
  };

  const marketData = {
    "Indianapolis, IN": {
      appreciationRate: 3,
      taxRate: 0.0125,
      insuranceRate: 0.005,
    },
    "Cleveland, OH": {
      appreciationRate: 2.5,
      taxRate: 0.015,
      insuranceRate: 0.0055,
    },
    "Memphis, TN": {
      appreciationRate: 2.2,
      taxRate: 0.014,
      insuranceRate: 0.006,
    },
    "Tampa, FL": {
      appreciationRate: 4,
      taxRate: 0.018,
      insuranceRate: 0.007,
    },
    "Jacksonville, FL": {
      appreciationRate: 3.8,
      taxRate: 0.017,
      insuranceRate: 0.007,
    },
    "Atlanta, GA": {
      appreciationRate: 4.2,
      taxRate: 0.02,
      insuranceRate: 0.0065,
    },
    "Birmingham, AL": {
      appreciationRate: 3.1,
      taxRate: 0.013,
      insuranceRate: 0.0055,
    },
  };

  // === Calculation Logic ===
  const calculateReturns = async () => {
    setLoading(true);

    try {
      const market = marketData[marketArea];
      const property = propertyData[propertyType];

      // === Formula 1: Total Investment ===
      const purchasePrice = investmentAmount / (downPaymentPercentage / 100);
      const totalInvestment = investmentAmount;
      const loanAmount = purchasePrice - totalInvestment;

      // === Formula 2: Monthly Rent ===
      const grossMonthlyRent = purchasePrice * property.rentMultiplier;

      // === Formula 3: Annual Gross Income ===
      const annualGrossIncome = grossMonthlyRent * 12;

      // === Formula 4: Annual Expenses ===
      const annualExpenses =
        annualGrossIncome * property.expenseRatio +
        purchasePrice * market.taxRate +
        purchasePrice * market.insuranceRate +
        annualGrossIncome * (propertyManagementFee / 100) +
        purchasePrice * (property.maintenanceCostPercentage / 100);

      // === Formula 5: NOI ===
      const annualNOI = annualGrossIncome - annualExpenses;

      // === Formula 7: Mortgage Payment ===
      let annualMortgagePayment = 0;
      let principalReduction = 0;

      if (loanAmount > 0) {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfPayments = loanTermYears * 12;
        const monthlyMortgagePayment =
          (loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        annualMortgagePayment = monthlyMortgagePayment * 12;

        // Calculate principal reduction
        const monthlyPrincipal =
          monthlyMortgagePayment - loanAmount * monthlyInterestRate;
        principalReduction = monthlyPrincipal * 12 * holdPeriod;
      }

      // === Formula 6: Cash Flow ===
      const annualCashFlow = annualNOI - annualMortgagePayment;
      const monthlyCashFlow = annualCashFlow / 12;

      // === Formula 8: Cap Rate ===
      const capRate = (annualNOI / purchasePrice) * 100;

      // === Formula 9: Cash-on-Cash ===
      const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;

      // === Formula 10: Total Return ===
      const futurePropertyValue =
        purchasePrice * Math.pow(1 + market.appreciationRate / 100, holdPeriod);
      const equityGain = futurePropertyValue - purchasePrice;
      const totalCashFlow = annualCashFlow * holdPeriod;
      const totalReturn = equityGain + principalReduction + totalCashFlow;
      const annualizedROI =
        (Math.pow(1 + totalReturn / totalInvestment, 1 / holdPeriod) - 1) * 100;

      // === Formula 11: Target Return ===
      const targetYearlyReturn = investmentAmount * (annualReturnRate / 100);
      const targetTotalReturn = targetYearlyReturn * holdPeriod;
      const targetMonthlyIncome = targetYearlyReturn / 12;
      const meetsTarget = annualizedROI >= annualReturnRate;

      // Set results
      setResults({
        purchasePrice,
        monthlyCashFlow,
        annualCashFlow,
        totalReturn,
        roi: annualizedROI,
        capRate,
        cashOnCashReturn,
        futurePropertyValue,
        equityGain,
        principalReduction,
        totalCashFlow,
        targetYearlyReturn,
        targetTotalReturn,
        targetMonthlyIncome,
        meetsTarget,
      });

      // API call data
      const apiData = {
        propertyType,
        marketArea,
        investmentAmount,
        holdPeriod,
        annualReturnRate,
        propertyManagementFee,
        vacancyRate,
        monthlyCashFlow,
        annualCashFlow,
        totalReturn,
        roi: annualizedROI,
        contactId: userId,
      };

      await createCalculate(apiData);

      toast.success("Investment submitted successfully!");
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // === Constants ===
  const downPaymentPercentage = 20;
  const annualInterestRate = 6;
  const loanTermYears = 30;

  return (
    <Container maxWidth="full" sx={{ py: 4, textAlign: "left" }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight="bold" variant="h5" mb={2} textAlign="left">
          Turnkey Investment Calculator
        </Typography>

        {/* Property Type */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Property Type
        </Typography>
        <Select
          fullWidth
          size="small"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          sx={{ mb: 2 }}
          IconComponent={ExpandMoreIcon}
        >
          {Object.keys(propertyData).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {/* Market Area */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Market Area
        </Typography>
        <Select
          fullWidth
          size="small"
          value={marketArea}
          onChange={(e) => setMarketArea(e.target.value)}
          sx={{ mb: 2 }}
          IconComponent={ExpandMoreIcon}
        >
          {Object.keys(marketData).map((area) => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>

        {/* Investment Amount */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Investment Amount: ${investmentAmount.toLocaleString()}
        </Typography>
        <Slider
          value={investmentAmount}
          onChange={(e, val) => setInvestmentAmount(val)}
          min={50000}
          max={1000000}
          step={10000}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption">$50K</Typography>
          <Typography variant="caption">$1M</Typography>
        </Box>

        {/* Hold Period */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Hold Period (Years): {holdPeriod}
        </Typography>
        <Slider
          value={holdPeriod}
          onChange={(e, val) => setHoldPeriod(val)}
          min={1}
          max={30}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption">1 Year</Typography>
          <Typography variant="caption">30 Years</Typography>
        </Box>

        {/* Annual Return Rate */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Annual Return Rate: {annualReturnRate}%
        </Typography>
        <Slider
          value={annualReturnRate}
          onChange={(e, val) => setAnnualReturnRate(val)}
          min={5}
          max={20}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption">5%</Typography>
          <Typography variant="caption">20%</Typography>
        </Box>

        {/* Property Management Fee */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Property Management Fee: {propertyManagementFee}%
        </Typography>
        <Slider
          value={propertyManagementFee}
          onChange={(e, val) => setPropertyManagementFee(val)}
          min={5}
          max={15}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption">5%</Typography>
          <Typography variant="caption">15%</Typography>
        </Box>

        {/* Vacancy Rate */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Vacancy Rate: {vacancyRate}%
        </Typography>
        <Slider
          value={vacancyRate}
          onChange={(e, val) => setVacancyRate(val)}
          min={0}
          max={15}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="caption">0%</Typography>
          <Typography variant="caption">15%</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Projected Returns */}
        {results && (
          <>
            <Typography
              fontWeight="bold"
              variant="h6"
              mb={2}
              sx={{ backgroundColor: "#F3F4F6" }}
            >
              Projected Returns
            </Typography>
            <Table size="small" sx={{ mb: 2, backgroundColor: "#F3F4F6" }}>
              <TableBody>
                <TableRow>
                  <TableCell>Monthly Cash Flow:</TableCell>
                  <TableCell>Annual Cash Flow:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    ${Math.round(results.monthlyCashFlow).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    ${Math.round(results.annualCashFlow).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} sx={{ pt: 2, pb: 1 }}>
                    Total Return (After {holdPeriod} Years):
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ fontSize: "1.1rem", fontWeight: "bold", pb: 2 }}
                  >
                    ${Math.round(results.totalReturn).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} sx={{ pt: 1 }}>
                    ROI (Return on Investment):
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {results.roi.toFixed(1)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}

        {/* Calculate Button */}
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            fontWeight: "bold",
            py: 1.5,
            mt: 1,
          }}
          onClick={calculateReturns}
        >
          {loading ? "Calculating..." : "Calculate My Returns"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Calculator;
