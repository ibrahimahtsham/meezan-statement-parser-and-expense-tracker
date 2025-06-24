import { Paper, Typography, Stack, Divider, Box, Button } from "@mui/material";
import { formatAmount } from "../utils/formatAmount";
import TransactionsDataGrid from "./TransactionsDataGrid";

function AccountInfoCard({ statement, onLogJson }) {
  return (
    <Paper elevation={2} sx={{ p: 3, width: "100%", overflowX: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Account Info
      </Typography>
      <Stack spacing={1} divider={<Divider flexItem />}>
        <Typography>
          Account Number: <b>{statement.accountNumber}</b>
        </Typography>
        <Typography>
          Account Holder: <b>{statement.accountHolder}</b>
        </Typography>
        <Typography>
          Opening Balance:{" "}
          <b>
            {statement.openingCurrency} {formatAmount(statement.openingBalance)}
          </b>
        </Typography>
        <Typography>
          Closing Balance:{" "}
          <b>
            {statement.closingCurrency} {formatAmount(statement.closingBalance)}
          </b>
        </Typography>
        <Typography>
          Currency: <b>{statement.currency}</b>
        </Typography>
      </Stack>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Button variant="outlined" onClick={onLogJson}>
          Log JSON
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>
        Transactions
      </Typography>
      <Box sx={{ width: "100%", minWidth: 900 }}>
        <TransactionsDataGrid transactions={statement.transactions} />
      </Box>
    </Paper>
  );
}

export default AccountInfoCard;
