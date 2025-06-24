import { Card, CardContent, Typography, useTheme } from "@mui/material";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function SpendingHeatmapCard({ dailySpending }) {
  const theme = useTheme();
  const values = Object.entries(dailySpending).map(([date, count]) => ({
    date,
    count,
  }));

  // Find min/max for color scaling
  const max = Math.max(...values.map((v) => v.count), 1);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Spending Heatmap
        </Typography>
        <CalendarHeatmap
          startDate={values[0]?.date}
          endDate={values[values.length - 1]?.date}
          values={values}
          classForValue={(value) => {
            if (!value || value.count === 0) return "color-empty";
            // 4 levels of color
            const level = Math.ceil((value.count / max) * 4);
            return `color-scale-${level}`;
          }}
        />
        <style>
          {`
            .color-empty { fill: ${
              theme.palette.mode === "dark" ? "#222" : "#eee"
            }; }
            .color-scale-1 { fill: ${theme.palette.primary.light}; }
            .color-scale-2 { fill: ${theme.palette.primary.main}; }
            .color-scale-3 { fill: ${theme.palette.secondary.main}; }
            .color-scale-4 { fill: ${theme.palette.error.main}; }
          `}
        </style>
      </CardContent>
    </Card>
  );
}

export default SpendingHeatmapCard;
