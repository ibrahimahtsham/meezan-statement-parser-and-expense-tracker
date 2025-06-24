import { Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function formatPKRAmount(value) {
  return `PKR ${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

function NetChangeChartCard({ netChangeData }) {
  const theme = useTheme();

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Net Change Over Time
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          This chart displays the cumulative net change in your account balance
          over time, calculated as total credits minus total debits for each
          day. It helps you visualize how your balance has increased or
          decreased throughout the statement period.
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={netChangeData}>
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
              formatter={formatPKRAmount}
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default NetChangeChartCard;
