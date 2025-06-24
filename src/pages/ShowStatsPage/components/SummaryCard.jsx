import { Paper, Typography, Grid } from "@mui/material";
import { formatPKRAmount } from "../utils/formatPKRAmount";

function SummaryCard({ totalDebits, totalCredits, numTransactions }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">
            <strong>Total Payments (Debits):</strong>{" "}
            {formatPKRAmount(totalDebits)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">
            <strong>Total Income (Credits):</strong>{" "}
            {formatPKRAmount(totalCredits)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">
            <strong>Transactions:</strong> {numTransactions}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SummaryCard;
