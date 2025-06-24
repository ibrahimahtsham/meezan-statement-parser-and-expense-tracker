import { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import { parseMeezanStatement } from "./utils/parseMeezanStatement";
import FileUploadCard from "./components/FileUploadCard";
import AccountInfoCard from "./components/AccountInfoCard";

function UploadCSVPage({ statement, setStatement }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const csvText = evt.target.result;
      const parsed = parseMeezanStatement(csvText);
      setStatement(parsed);
    };
    reader.readAsText(file);
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
          <FileUploadCard fileName={fileName} onFileChange={handleFileChange} />
          {statement && (
            <AccountInfoCard statement={statement} onLogJson={handleLogJson} />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default UploadCSVPage;
