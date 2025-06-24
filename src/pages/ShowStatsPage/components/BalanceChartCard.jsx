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
          <Tooltip
            contentStyle={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
            }}
            formatter={(value) => formatPKRAmount(value)}
          />
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
