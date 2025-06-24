import { Card, CardContent, Typography, Grid } from "@mui/material";

function SummaryCard({
  totalDebits,
  totalCredits,
  numTransactions,
  spendingIncomeRatio,
}) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2">Total Debits</Typography>
            <Typography variant="subtitle1">
              <b>PKR {totalDebits.toLocaleString()}</b>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2">Total Credits</Typography>
            <Typography variant="subtitle1">
              <b>PKR {totalCredits.toLocaleString()}</b>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2">Transactions</Typography>
            <Typography variant="subtitle1">
              <b>{numTransactions}</b>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2">Spending/Income Ratio</Typography>
            <Typography variant="subtitle1">
              <b>{spendingIncomeRatio}</b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
