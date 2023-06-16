import { Box, Card, Typography, useTheme } from "@mui/material";
import { Expense } from "@/types/expense";

interface props {
  expense: Expense;
}

export const ExpenseCard = ({ expense }: props) => {
  const theme = useTheme();
  const getDate = () => {
    const date = new Date(expense.createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Card variant="outlined" sx={{ padding: "1rem", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ color: `${theme.palette.primary.main}`, fontWeight: "medium" }}
        >
          {expense.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: `${theme.palette.primary.main}`, fontWeight: "medium" }}
        >
          {expense.amount} €
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">
          payé par {expense.paidBy.firstname}
        </Typography>
        <Typography variant="body2">{getDate()}</Typography>
      </Box>
    </Card>
  );
};
