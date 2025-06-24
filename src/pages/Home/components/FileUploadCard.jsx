import {
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  Typography,
  Collapse,
  Link,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";

function FileUploadCard({ fileName, onFileChange }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <Card elevation={3} sx={{ width: "100%" }}>
      <CardContent>
        <Stack spacing={2}>
          <Button
            variant="text"
            startIcon={
              showInstructions ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
            onClick={() => setShowInstructions((prev) => !prev)}
            sx={{ alignSelf: "flex-start" }}
          >
            {showInstructions
              ? "Hide instructions on how to get CSV file"
              : "Show instructions on how to get CSV file"}
          </Button>
          <Collapse in={showInstructions}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>How to get your Meezan statement file:</strong>
              <br />
              1. Go to the Meezan app:{" "}
              <Link
                href="https://play.google.com/store/apps/details?id=com.ofss.tx.meezan&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download from Google Play
              </Link>
              <br />
              2. Log in and tap the <strong>Transactions</strong> button (top
              right, under "Show Balance").
              <br />
              3. Tap the <strong>Download</strong> button (right side, under
              "Show Balance").
              <br />
              4. In the popup menu that appears from the bottom, choose the{" "}
              <strong>CSV</strong> file format and download the file.
              <br />
              5.{" "}
              <strong>
                Before downloading, select the start and end date for the period
                you want to track expenses for.
              </strong>
              <br />
              6. Once the app downloads the CSV, open it with Google Sheets.
              <br />
              7. Press the 3 dots button on the top right and then choose{" "}
              <strong>Share & export</strong>.
              <br />
              8. You can send it to yourself as a CSV via WhatsApp (message
              yourself, for example) or any other way you prefer.
              <br />
              9. Once you have the CSV file, upload it here directly.
            </Typography>
          </Collapse>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <Typography variant="body1" sx={{ minWidth: 120 }}>
              Please upload your Meezan statement (.csv):
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ minWidth: 160 }}
            >
              Select File
              <input type="file" accept=".csv" hidden onChange={onFileChange} />
            </Button>
            {fileName && (
              <Alert severity="info" sx={{ flex: 1 }}>
                Selected: <strong>{fileName}</strong>
              </Alert>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FileUploadCard;
