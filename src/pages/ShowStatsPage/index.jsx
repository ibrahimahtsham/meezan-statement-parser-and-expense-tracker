import { Box, Typography } from "@mui/material";
import AccountInfoCard from "./components/AccountInfoCard";
import SummaryCard from "./components/SummaryCard";
import BalanceChartCard from "./components/BalanceChartCard";
import sumAmounts from "./utils/sumAmounts";

function ShowStatsPage({ statement }) {
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
      <AccountInfoCard
        accountHolder={accountHolder}
        accountNumber={accountNumber}
        currency={currency}
        openingBalance={openingBalance}
        closingBalance={closingBalance}
      />
      <SummaryCard
        totalDebits={totalDebits}
        totalCredits={totalCredits}
        numTransactions={numTransactions}
      />
      <BalanceChartCard balanceData={balanceData} />
    </Box>
  );
}

export default ShowStatsPage;
