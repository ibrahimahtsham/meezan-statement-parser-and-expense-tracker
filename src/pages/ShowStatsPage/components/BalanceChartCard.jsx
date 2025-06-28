import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { formatPKRAmount } from "../utils/formatPKRAmount";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dayjs from "dayjs";

// Custom tooltip component
function CustomTooltip({ active, payload, label }) {
  const [showFull, setShowFull] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (active && payload && payload.length) {
      setShowFull(false);
      timerRef.current = setTimeout(() => setShowFull(true), 3000);
    } else {
      setShowFull(false);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [active, payload, label]);

  if (active && payload && payload.length) {
    const { balance, description, credit, debit } = payload[0].payload;
    const descToShow =
      !showFull && description && description.length > 30
        ? description.slice(0, 30) + "..."
        : description || "-";

    let change = null;
    let changeColor = "";
    if (credit && parseFloat(credit) > 0) {
      change = `+${formatPKRAmount(credit)}`;
      changeColor = "success.main";
    } else if (debit && parseFloat(debit) > 0) {
      change = `-${formatPKRAmount(debit)}`;
      changeColor = "error.main";
    }

    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">
          <b>Date:</b> {label}
        </Typography>
        <Typography variant="body2">
          <b>Balance:</b> {formatPKRAmount(balance)}
        </Typography>
        {change && (
          <Typography variant="body2" sx={{ color: changeColor }}>
            <b>{credit && parseFloat(credit) > 0 ? "Credit" : "Debit"}:</b>{" "}
            {change}
          </Typography>
        )}
        <Typography variant="body2">
          <b>Description:</b> {descToShow}
        </Typography>
      </Paper>
    );
  }
  return null;
}

function getYearsFromData(data) {
  const years = new Set(data.map((d) => dayjs(d.date).year()));
  const currentYear = dayjs().year();
  years.add(currentYear); // Ensure current year is present
  return Array.from(years).sort((a, b) => b - a); // highest to least
}

const months = [
  "All",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Helper to find indices where a new month starts
function getMonthStartIndices(data) {
  let lastMonth = null;
  return data
    .map((d, i) => {
      const month = dayjs(d.date).month();
      if (month !== lastMonth) {
        lastMonth = month;
        return i;
      }
      return null;
    })
    .filter((i) => i !== null);
}

// Custom dot component
function MonthStartDot(props) {
  const { cx, cy, index, monthStartIndices } = props;
  if (monthStartIndices.includes(index)) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#1976d2"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }
  return null;
}

function BalanceChartCard({ balanceData }) {
  const theme = useTheme();
  const years = getYearsFromData(balanceData);

  // State for filters
  const [selectedYear, setSelectedYear] = useState("All");
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter data based on year/month or date range
  let filteredData = balanceData;
  if (startDate && endDate) {
    filteredData = filteredData.filter(
      (d) =>
        dayjs(d.date).isAfter(dayjs(startDate).subtract(1, "day")) &&
        dayjs(d.date).isBefore(dayjs(endDate).add(1, "day"))
    );
  } else if (selectedYear !== "All") {
    filteredData = filteredData.filter(
      (d) => dayjs(d.date).year() === selectedYear
    );
    if (selectedMonth !== "All") {
      const monthIdx = months.indexOf(selectedMonth);
      filteredData = filteredData.filter(
        (d) => dayjs(d.date).month() === monthIdx - 1
      );
    }
  }

  // Find indices where a new month starts
  const monthStartIndices = getMonthStartIndices(filteredData);

  // Handlers
  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedMonth("All");
    setStartDate(null);
    setEndDate(null);
  };
  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setStartDate(null);
    setEndDate(null);
  };
  const handleDateChange = (setter, value) => {
    setter(value);
    setSelectedYear("All");
    setSelectedMonth("All");
  };

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Balance Over Time
      </Typography>

      {/* Year Buttons */}
      <Box sx={{ mb: 1 }}>
        <ButtonGroup variant="outlined" size="small">
          <Button
            variant={selectedYear === "All" ? "contained" : "outlined"}
            onClick={() => handleYearClick("All")}
          >
            All
          </Button>
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "contained" : "outlined"}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </Button>
          ))}
        </ButtonGroup>
        <IconButton
          size="small"
          onClick={() => setMonthMenuOpen((o) => !o)}
          sx={{ ml: 1 }}
          disabled={selectedYear === "All"}
        >
          {monthMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Month Selector */}
      <Collapse in={monthMenuOpen && selectedYear !== "All"}>
        <Box sx={{ mb: 1 }}>
          <ButtonGroup variant="outlined" size="small">
            {months.map((month) => (
              <Button
                key={month}
                variant={selectedMonth === month ? "contained" : "outlined"}
                onClick={() => handleMonthClick(month)}
              >
                {month}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Collapse>

      {/* Date Range Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(val) => handleDateChange(setStartDate, val)}
            maxDate={endDate || undefined}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(val) => handleDateChange(setEndDate, val)}
            minDate={startDate || undefined}
            slotProps={{ textField: { size: "small" } }}
          />
        </Box>
      </LocalizationProvider>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid stroke={theme.palette.divider} />
          <XAxis dataKey="date" stroke={theme.palette.text.primary} />
          <YAxis
            stroke={theme.palette.text.primary}
            tickFormatter={formatPKRAmount}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={(dotProps) => (
              <MonthStartDot
                {...dotProps}
                monthStartIndices={monthStartIndices}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default BalanceChartCard;
