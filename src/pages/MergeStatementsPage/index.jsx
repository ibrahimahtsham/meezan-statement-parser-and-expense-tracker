import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function MergeStatementsPage() {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [merged, setMerged] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map((f) => f.name));
    setMerged(null);
  };

  const handleMerge = async () => {
    // Read all files as text
    const texts = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (evt) => resolve(evt.target.result);
            reader.readAsText(file);
          })
      )
    );
    // Naive merge: just concatenate all CSVs, skipping headers after the first
    let mergedCsv = "";
    texts.forEach((text, idx) => {
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (idx === 0) {
        mergedCsv += lines.join("\n");
      } else {
        mergedCsv += "\n" + lines.slice(1).join("\n");
      }
    });
    setMerged(mergedCsv);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 3 }, width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="h4">Merge Statements</Typography>
          <Button
            variant="text"
            startIcon={
              showInstructions ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
            onClick={() => setShowInstructions((prev) => !prev)}
            sx={{ alignSelf: "flex-start" }}
          >
            {showInstructions
              ? "Hide instructions"
              : "Show instructions on how to use this page"}
          </Button>
          <Collapse in={showInstructions}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>How to use this page:</strong>
              <br />
              If you have data for more than a year on Meezan, you will need to
              download a separate CSV file for each year (Meezan only lets you
              download a CSV for a limit of one year at a time).
              <br />
              Download a CSV for each year you want to include, then upload all
              those files here. This page will stitch them together into a
              single CSV file that you can use for further analysis.
            </Typography>
          </Collapse>
          <Typography>
            Select multiple Meezan CSV files (e.g. 2023, 2024, 2025) to merge
            them into one.
          </Typography>
          <Button variant="contained" component="label">
            Select CSV Files
            <input
              type="file"
              accept=".csv"
              multiple
              hidden
              onChange={handleFilesChange}
            />
          </Button>
          {fileNames.length > 0 && (
            <Alert severity="info">
              Selected: <b>{fileNames.join(", ")}</b>
            </Alert>
          )}
          <Button
            variant="outlined"
            disabled={files.length < 2}
            onClick={handleMerge}
          >
            Merge Files
          </Button>
          {merged && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Merged CSV (download below):
              </Typography>
              <Button
                variant="contained"
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                  merged
                )}`}
                download="merged_statement.csv"
              >
                Download Merged CSV
              </Button>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default MergeStatementsPage;
