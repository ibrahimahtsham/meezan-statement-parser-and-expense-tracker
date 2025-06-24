import { Card, CardContent, Typography, useTheme } from "@mui/material";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function SpendingHeatmapCard({ dailySpending }) {
  const theme = useTheme();
  const values = Object.entries(dailySpending).map(([date, count]) => ({
    date,
    count,
  }));

  // Find min/max for color scaling
  const max = Math.max(...values.map((v) => v.count), 1);

  // Helper for legend
  const getColor = (level) => {
    switch (level) {
      case 1:
        return theme.palette.primary.light;
      case 2:
        return theme.palette.primary.main;
      case 3:
        return theme.palette.secondary.main;
      case 4:
        return theme.palette.error.main;
      default:
        return theme.palette.mode === "dark" ? "#222" : "#eee";
    }
  };

  const tooltipId = "spending-heatmap-tooltip";

  // Tooltip attributes for each value
  const tooltipDataAttrs = (value) => {
    if (!value || !value.date) return null;
    return {
      "data-tooltip-id": tooltipId,
      "data-tooltip-content": `${value.date}: PKR ${Number(
        value.count
      ).toLocaleString()}`,
    };
  };

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
          tooltipDataAttrs={tooltipDataAttrs}
          showWeekdayLabels={true}
        />
        <Tooltip id={tooltipId} />
        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
          <span
            style={{
              width: 20,
              height: 20,
              background: getColor(0),
              display: "inline-block",
              marginRight: 4,
              border: "1px solid #ccc",
            }}
          />
          <Typography variant="caption" sx={{ mr: 2 }}>
            No spending
          </Typography>
          {[1, 2, 3, 4].map((level) => (
            <span
              key={level}
              style={{
                width: 20,
                height: 20,
                background: getColor(level),
                display: "inline-block",
                marginRight: 4,
                border: "1px solid #ccc",
              }}
            />
          ))}
          <Typography variant="caption" sx={{ ml: 1 }}>
            Low → High
          </Typography>
        </div>
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
