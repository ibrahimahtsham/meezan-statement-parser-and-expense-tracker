import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function TopExpensesCard({ topExpenses }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 5 Expenses
        </Typography>
        <List>
          {topExpenses.map((t, idx) => (
            <ListItem key={idx} divider>
              <ListItemText
                primary={`${t.description}`}
                secondary={`${t.bookingDate} — PKR ${parseFloat(
                  t.debit
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopExpensesCard;
