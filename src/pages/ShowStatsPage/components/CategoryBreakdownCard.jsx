import { Card, CardContent, Typography, Box } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryBreakdownCard({ breakdown }) {
  const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const categories = sorted.map(([cat]) => cat);
  const amounts = sorted.map(([, amt]) => amt);
  const total = amounts.reduce((sum, val) => sum + val, 0);

  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: [
          "#1976d2",
          "#388e3c",
          "#fbc02d",
          "#d32f2f",
          "#7b1fa2",
          "#0288d1",
          "#c2185b",
          "#ffa000",
          "#388e3c",
          "#f57c00",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense Category Breakdown
        </Typography>
        <Box sx={{ mb: 2 }}>
          {categories.map((cat, idx) => {
            const percent = total
              ? ((amounts[idx] / total) * 100).toFixed(1)
              : 0;
            return (
              <Typography
                key={cat}
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {cat}:{" "}
                <b>
                  PKR{" "}
                  {amounts[idx].toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </b>{" "}
                <span style={{ color: "#888" }}>({percent}%)</span>
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ width: 320, height: 320, mx: "auto" }}>
          <Pie data={data} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CategoryBreakdownCard;
