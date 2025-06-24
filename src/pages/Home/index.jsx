import { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as XLSX from "xlsx";
import { parseMeezanStatement } from "./utils/parseMeezanStatement";
import TransactionsDataGrid from "./components/TransactionsDataGrid";
import { formatAmount } from "./utils/formatAmount";

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

  const handleLogJson = () => {
    if (statement) {
      console.log(JSON.stringify(statement, null, 2));
    }
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
          <Typography>
            Opening Balance: {statement.openingCurrency}{" "}
            {formatAmount(statement.openingBalance)}
          </Typography>
          <Typography>
            Closing Balance: {statement.closingCurrency}{" "}
            {formatAmount(statement.closingBalance)}
          </Typography>
          <Typography>Currency: {statement.currency}</Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button variant="outlined" onClick={handleLogJson}>
              Log JSON
            </Button>
          </Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Transactions
          </Typography>
          <TransactionsDataGrid transactions={statement.transactions} />
        </Box>
      )}
    </Container>
  );
}

export default Home;
