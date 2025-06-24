import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MonthlyTrendsChartCard({ labels, debits, credits }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Spending (Debits)",
        data: debits,
        backgroundColor: "#d32f2f",
      },
      {
        label: "Income (Credits)",
        data: credits,
        backgroundColor: "#388e3c",
      },
    ],
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Spending & Income
        </Typography>
        <Bar data={data} />
      </CardContent>
    </Card>
  );
}

export default MonthlyTrendsChartCard;
