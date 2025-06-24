import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import InstructionsCollapse from "./components/InstructionsCollapse";
import { useMergeStatements } from "./hooks/useMergeStatements";
import { mergeCsvFiles } from "./utils/mergeCsvFiles";

function MergeStatementsPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const { files, fileNames, merged, setMerged, handleFilesChange } =
    useMergeStatements();

  const handleMerge = async () => {
    const mergedCsv = await mergeCsvFiles(files);
    setMerged(mergedCsv);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 3 }, width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="h4">Merge Statements</Typography>
          <InstructionsCollapse
            show={showInstructions}
            setShow={setShowInstructions}
          />
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
