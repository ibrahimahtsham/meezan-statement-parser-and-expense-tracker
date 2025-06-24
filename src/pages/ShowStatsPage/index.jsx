import { Box, Typography } from "@mui/material";
import AccountInfoCard from "./components/AccountInfoCard";
import SummaryCard from "./components/SummaryCard";
import BalanceChartCard from "./components/BalanceChartCard";
import sumAmounts from "./utils/sumAmounts";
import categorizeTransaction from "./utils/categorizeTransaction";
import CategoryBreakdownCard from "./components/CategoryBreakdownCard";
import NetChangeChartCard from "./components/NetChangeChartCard";
import SpendingHeatmapCard from "./components/SpendingHeatmapCard";
import TopExpensesCard from "./components/TopExpensesCard";
import MonthlyTrendsChartCard from "./components/MonthlyTrendsChartCard";

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
    description: t.description,
    credit: t.credit,
    debit: t.debit,
  }));

  // Category breakdown for debits (expenses)
  const categoryBreakdown = {};
  transactions.forEach((t) => {
    if (t.debit && parseFloat(t.debit) > 0) {
      const category = categorizeTransaction(t.description);
      categoryBreakdown[category] =
        (categoryBreakdown[category] || 0) + parseFloat(t.debit);
    }
  });

  const spendingIncomeRatio =
    totalDebits && totalCredits
      ? (totalDebits / totalCredits).toFixed(2)
      : "N/A";

  let net = 0;
  const netChangeData = transactions.map((t) => {
    const credit = parseFloat(t.credit || 0);
    const debit = parseFloat(t.debit || 0);
    net += credit - debit;
    return {
      date: t.bookingDate,
      net,
    };
  });

  const dailySpending = {};
  transactions.forEach((t) => {
    if (t.debit && parseFloat(t.debit) > 0) {
      dailySpending[t.bookingDate] =
        (dailySpending[t.bookingDate] || 0) + parseFloat(t.debit);
    }
  });

  const topExpenses = transactions
    .filter((t) => t.debit && parseFloat(t.debit) > 0)
    .sort((a, b) => parseFloat(b.debit) - parseFloat(a.debit))
    .slice(0, 5);

  const monthlyStats = {};
  transactions.forEach((t) => {
    // Use the full bookingDate as the key (assumes format "DD MMM YYYY")
    const monthKey = t.bookingDate;
    if (!monthlyStats[monthKey]) {
      monthlyStats[monthKey] = { debit: 0, credit: 0 };
    }
    monthlyStats[monthKey].debit += parseFloat(t.debit || 0);
    monthlyStats[monthKey].credit += parseFloat(t.credit || 0);
  });
  const monthlyLabels = Object.keys(monthlyStats);
  const monthlyDebits = monthlyLabels.map((m) => monthlyStats[m].debit);
  const monthlyCredits = monthlyLabels.map((m) => monthlyStats[m].credit);

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
        spendingIncomeRatio={spendingIncomeRatio}
      />
      <CategoryBreakdownCard breakdown={categoryBreakdown} />
      <BalanceChartCard balanceData={balanceData} />
      <NetChangeChartCard netChangeData={netChangeData} />
      <SpendingHeatmapCard dailySpending={dailySpending} />
      <TopExpensesCard topExpenses={topExpenses} />
      <MonthlyTrendsChartCard
        labels={monthlyLabels}
        debits={monthlyDebits}
        credits={monthlyCredits}
      />
    </Box>
  );
}

export default ShowStatsPage;
