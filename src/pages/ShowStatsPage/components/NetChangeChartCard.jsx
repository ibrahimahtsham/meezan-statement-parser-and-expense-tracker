import { Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function NetChangeChartCard({ netChangeData }) {
  const data = {
    labels: netChangeData.map((d) => d.date),
    datasets: [
      {
        label: "Net Change (PKR)",
        data: netChangeData.map((d) => d.net),
        fill: false,
        borderColor: "#1976d2",
        tension: 0.2,
      },
    ],
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Net Change Over Time
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
}

export default NetChangeChartCard;
