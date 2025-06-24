import { Button, Card, CardContent, Stack, Alert } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function FileUploadCard({ fileName, onFileChange }) {
  return (
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
            <input type="file" accept=".xlsx" hidden onChange={onFileChange} />
          </Button>
          {fileName && (
            <Alert severity="info" sx={{ flex: 1 }}>
              Selected: <strong>{fileName}</strong>
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FileUploadCard;
