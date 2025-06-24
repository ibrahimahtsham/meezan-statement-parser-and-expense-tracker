import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InstructionsCollapse from "./components/InstructionsCollapse";
import { useMergeStatements } from "./hooks/useMergeStatements";
import { mergeCsvFiles } from "./utils/mergeCsvFiles";

function MergeStatementsPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const { files, fileNames, merged, setMerged, setFiles, setFileNames } =
    useMergeStatements();

  // Only allow adding one file at a time
  const handleFileAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => [...prev, file]);
      setFileNames((prev) => [...prev, file.name]);
    }
    // Reset input so same file can be added again if needed
    e.target.value = "";
  };

  // Remove a file from the list
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  };

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
            Please add your Meezan CSV files <b>one by one</b>, starting from
            the <b>oldest</b> statement (e.g. 2023) and ending with the{" "}
            <b>newest</b> (e.g. 2025). The order you add them will be the order
            they are merged.
          </Typography>
          <Button variant="contained" component="label">
            Add CSV File
            <input type="file" accept=".csv" hidden onChange={handleFileAdd} />
          </Button>
          {fileNames.length > 0 && (
            <Alert severity="info">
              <b>Files to be merged (oldest to newest):</b>
              <List dense>
                {fileNames.map((name, idx) => (
                  <ListItem
                    key={name + idx}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFile(idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
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
