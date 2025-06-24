import { Box, Typography } from "@mui/material";

function ShowStatsPage({ statement }) {
  if (!statement) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No statement data loaded.</Typography>
        <Typography variant="body2">
          Please upload your Meezan statement first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Statistics
      </Typography>
      {/* Graphs and stats will go here */}
      <Typography variant="body1">
        (Graphs and statistics coming soon!)
      </Typography>
    </Box>
  );
}

export default ShowStatsPage;
