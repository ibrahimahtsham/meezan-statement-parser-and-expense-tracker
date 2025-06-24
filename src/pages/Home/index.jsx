import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as XLSX from "xlsx";
import { parseMeezanStatement } from "./utils/parseMeezanStatement";

function Home() {
  const [fileName, setFileName] = useState("");
  const [statement, setStatement] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const parsed = parseMeezanStatement(workbook);
      setStatement(parsed);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload Meezan XLSX Statement
      </Typography>
      <Box>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Select File
          <input
            type="file"
            accept=".xlsx"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {fileName && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected: {fileName}
          </Typography>
        )}
      </Box>
      {statement && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Account Info</Typography>
          <Typography>Account Number: {statement.accountNumber}</Typography>
          <Typography>Account Holder: {statement.accountHolder}</Typography>
          <Typography>Opening Balance: {statement.openingBalance}</Typography>
          <Typography>Closing Balance: {statement.closingBalance}</Typography>
          <Typography>Currency: {statement.currency}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Transactions
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Booking Date</TableCell>
                  <TableCell>Value Date</TableCell>
                  <TableCell>Doc No</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Debit</TableCell>
                  <TableCell>Credit</TableCell>
                  <TableCell>Available Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statement.transactions.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{tx.bookingDate}</TableCell>
                    <TableCell>{tx.valueDate}</TableCell>
                    <TableCell>{tx.docNo}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>{tx.debit}</TableCell>
                    <TableCell>{tx.credit}</TableCell>
                    <TableCell>{tx.availableBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default Home;
