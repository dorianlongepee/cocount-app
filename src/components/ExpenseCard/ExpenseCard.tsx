import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Expense } from "@/types/expense";

interface props {
  expense: Expense;
}

export const ExpenseCard = (p: props) => {
  const theme = useTheme();
  const { expense } = p;

  const getDate = () => {
    const date = new Date(expense.createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Paper variant="outlined" sx={{ padding: "1rem" }}>
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
          Payé par {expense.paidBy.firstname}
        </Typography>
        <Typography variant="body2">{getDate()}</Typography>
      </Box>
    </Paper>
  );
};
