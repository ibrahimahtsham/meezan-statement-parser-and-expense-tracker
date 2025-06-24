import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
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
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 3 }, width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight={700} align="center" gutterBottom>
            Meezan Statement Parser
          </Typography>
          <Card elevation={3} sx={{ width: "100%" }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadFileIcon />}
                  sx={{ minWidth: 160 }}
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
                  <Alert severity="info" sx={{ flex: 1 }}>
                    Selected: <strong>{fileName}</strong>
                  </Alert>
                )}
              </Stack>
            </CardContent>
          </Card>
          {statement && (
            <Paper
              elevation={2}
              sx={{ p: 3, width: "100%", overflowX: "auto" }}
            >
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
                    {statement.openingCurrency}{" "}
                    {formatAmount(statement.openingBalance)}
                  </b>
                </Typography>
                <Typography>
                  Closing Balance:{" "}
                  <b>
                    {statement.closingCurrency}{" "}
                    {formatAmount(statement.closingBalance)}
                  </b>
                </Typography>
                <Typography>
                  Currency: <b>{statement.currency}</b>
                </Typography>
              </Stack>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button variant="outlined" onClick={handleLogJson}>
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
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Home;
