import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function TransactionsDataGrid({ transactions }) {
  const columns = [
    { field: "id", headerName: "#", width: 60 },
    { field: "bookingDate", headerName: "Booking Date", width: 120 },
    { field: "valueDate", headerName: "Value Date", width: 120 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 300 },
    {
      field: "debit",
      headerName: "Debit",
      width: 120,
    },
    {
      field: "credit",
      headerName: "Credit",
      width: 120,
    },
    {
      field: "availableBalance",
      headerName: "Available Balance",
      width: 150,
    },
  ];

  const rows =
    transactions?.map((tx, idx) => ({
      id: idx + 1,
      ...tx,
    })) || [];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight={false}
      />
    </Box>
  );
}

export default TransactionsDataGrid;
