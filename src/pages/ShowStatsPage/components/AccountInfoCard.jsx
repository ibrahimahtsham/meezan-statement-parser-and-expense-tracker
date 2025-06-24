import { Paper, Typography, Grid } from "@mui/material";
import { formatPKRAmount } from "../utils/formatPKRAmount";

function AccountInfoCard({
  accountHolder,
  accountNumber,
  currency,
  openingBalance,
  closingBalance,
}) {
  return (
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
            <strong>Opening Balance:</strong> {formatPKRAmount(openingBalance)}
          </Typography>
          <Typography variant="body2">
            <strong>Closing Balance:</strong> {formatPKRAmount(closingBalance)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AccountInfoCard;
