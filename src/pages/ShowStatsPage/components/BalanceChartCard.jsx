import React, { useEffect, useState, useRef } from "react";
import { Paper, Typography } from "@mui/material";
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

function BalanceChartCard({ balanceData }) {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Balance Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={balanceData}>
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
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default BalanceChartCard;
