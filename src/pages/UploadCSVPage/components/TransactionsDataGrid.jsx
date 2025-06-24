import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

function TransactionsDataGrid({ transactions }) {
  const [filteredRows, setFilteredRows] = useState(transactions);

  const parseDate = (dateStr) => {
    // Handles "06 Mar 2023" -> Date object
    if (!dateStr) return null;
    const [day, monthStr, year] = dateStr.split(" ");
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(monthStr);
    if (month === -1) return null;
    return new Date(Number(year), month, Number(day));
  };

  const columns = [
    { field: "id", headerName: "#", width: 60 },
    {
      field: "bookingDate",
      headerName: "Booking Date",
      width: 120,
      sortComparator: (v1, v2) => {
        const d1 = parseDate(v1);
        const d2 = parseDate(v2);
        if (!d1 && !d2) return 0;
        if (!d1) return -1;
        if (!d2) return 1;
        return d1 - d2;
      },
    },
    {
      field: "valueDate",
      headerName: "Value Date",
      width: 120,
      sortComparator: (v1, v2) => {
        const d1 = parseDate(v1);
        const d2 = parseDate(v2);
        if (!d1 && !d2) return 0;
        if (!d1) return -1;
        if (!d2) return 1;
        return d1 - d2;
      },
    },
    { field: "description", headerName: "Description", flex: 1, minWidth: 300 },
    {
      field: "debit",
      headerName: "Debit",
      width: 120,
      type: "number",
    },
    {
      field: "credit",
      headerName: "Credit",
      width: 120,
      type: "number",
    },
    {
      field: "availableBalance",
      headerName: "Available Balance",
      width: 150,
      type: "number",
    },
  ];

  // Prepare rows with id and parse numbers up front
  const rows =
    (filteredRows || []).map((tx, idx) => ({
      id: idx + 1,
      ...tx,
      debit:
        tx.debit && tx.debit !== ""
          ? Number(tx.debit.toString().replace(/,/g, ""))
          : undefined,
      credit:
        tx.credit && tx.credit !== ""
          ? Number(tx.credit.toString().replace(/,/g, ""))
          : undefined,
      availableBalance:
        tx.availableBalance && tx.availableBalance !== ""
          ? Number(tx.availableBalance.toString().replace(/,/g, ""))
          : undefined,
    })) || [];

  // Filter handlers
  const handleShowAll = () => setFilteredRows(transactions);
  const handleDebits = () =>
    setFilteredRows(transactions.filter((tx) => tx.debit && tx.debit !== ""));
  const handleCredits = () =>
    setFilteredRows(transactions.filter((tx) => tx.credit && tx.credit !== ""));
  const handleBankCharges = () =>
    setFilteredRows(
      transactions.filter(
        (tx) =>
          tx.description &&
          tx.description.toLowerCase().includes("bank charges")
      )
    );
  const handleProfit = () =>
    setFilteredRows(
      transactions.filter(
        (tx) =>
          tx.description &&
          tx.description.toLowerCase().includes("payment of profit")
      )
    );
  const handleATM = () =>
    setFilteredRows(
      transactions.filter(
        (tx) =>
          tx.description &&
          tx.description.toLowerCase().includes("atm cash withdrawal")
      )
    );

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button onClick={handleShowAll} variant="outlined">
          Show All
        </Button>
        <Button onClick={handleDebits} variant="outlined">
          Only Debits
        </Button>
        <Button onClick={handleCredits} variant="outlined">
          Only Credits
        </Button>
        <Button onClick={handleBankCharges} variant="outlined">
          Bank Charges
        </Button>
        <Button onClick={handleProfit} variant="outlined">
          Payment of Profit
        </Button>
        <Button onClick={handleATM} variant="outlined">
          ATM Withdrawals
        </Button>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight={false}
        showToolbar
      />
    </Box>
  );
}

export default TransactionsDataGrid;
