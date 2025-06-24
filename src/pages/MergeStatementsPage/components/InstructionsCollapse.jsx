import { Typography, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function InstructionsCollapse({ show, setShow }) {
  return (
    <>
      <Button
        variant="text"
        startIcon={show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={() => setShow((prev) => !prev)}
        sx={{ alignSelf: "flex-start" }}
      >
        {show
          ? "Hide instructions"
          : "Show instructions on how to use this page"}
      </Button>
      <Collapse in={show}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>How to use this page:</strong>
          <br />
          If you have data for more than a year on Meezan, you will need to
          download a separate CSV file for each year (Meezan only lets you
          download a CSV for a limit of one year at a time).
          <br />
          Download a CSV for each year you want to include, then upload all
          those files here. This page will stitch them together into a single
          CSV file that you can use for further analysis.
        </Typography>
      </Collapse>
    </>
  );
}
