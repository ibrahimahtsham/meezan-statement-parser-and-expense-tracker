import { Box, Typography, Paper, Grid } from "@mui/material";
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

function sumAmounts(transactions, key) {
  return transactions
    .map((t) => parseFloat(t[key] || "0"))
    .reduce((a, b) => a + b, 0);
}

function ShowStatsPage({ statement }) {
  const theme = useTheme(); // <-- Move this to the top

  if (!statement) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No statement data loaded.</Typography>
        <Typography variant="body2">
          Please upload your Meezan statement first.
        </Typography>
      </Box>
    );
  }

  const {
    accountNumber,
    accountHolder,
    openingBalance,
    closingBalance,
    currency,
    transactions,
  } = statement;
  const totalDebits = sumAmounts(transactions, "debit");
  const totalCredits = sumAmounts(transactions, "credit");
  const numTransactions = transactions.length;

  // Prepare data for balance over time
  const balanceData = transactions.map((t) => ({
    date: t.bookingDate,
    balance: parseFloat(t.availableBalance),
  }));

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Account Statistics
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Account Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Account Holder:</strong> {accountHolder}
            </Typography>
            <Typography variant="body2">
              <strong>Account Number:</strong> {accountNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Currency:</strong> {currency}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Opening Balance:</strong> {openingBalance}
            </Typography>
            <Typography variant="body2">
              <strong>Closing Balance:</strong> {closingBalance}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Total Debits:</strong> {totalDebits.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Total Credits:</strong> {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              <strong>Transactions:</strong> {numTransactions}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Balance Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceData}>
            <CartesianGrid stroke={theme.palette.divider} />
            <XAxis dataKey="date" stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
              }}
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
    </Box>
  );
}

export default ShowStatsPage;
