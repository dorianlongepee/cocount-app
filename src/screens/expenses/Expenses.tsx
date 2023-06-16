import { Box, Button, Paper, Skeleton, Stack } from "@mui/material";
import { Expense } from "@/types/expense";
import { ExpenseCard } from "@/components/ExpenseCard";
import { useState } from "react";
import EditExpense from "@/components/EditExpense/EditExpense";

interface props {
  expenses: Expense[];
  errorExpenses: any;
  loadingExpenses: boolean;
}

const expenseFallback: Expense = {
  _id: "",
  name: "",
  category: {
    _id: "",
    name: "",
  },
  amount: 0,
  paidBy: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
  },
  beneficiaries: [],
  createdAt: "",
  updatedAt: "",
  refunded: false,
};

export const Expenses = ({
  errorExpenses,
  loadingExpenses,
  expenses,
}: props) => {
  const [open, setOpen] = useState(false);
  const [expenseToOpen, setOpenedExpense] = useState(expenseFallback);

  if (errorExpenses) return <div>échec du chargement</div>;
  if (loadingExpenses)
    return (
      <Paper variant="outlined" sx={{ padding: "1rem", marginTop: "1rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="110px" />
          <Skeleton variant="text" width="55px" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="90px" />
          <Skeleton variant="text" width="60px" />
        </Box>
      </Paper>
    );

  const openDialog = (expense: Expense) => {
    setOpenedExpense(expense);
    setOpen(true);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        align-items="stretch"
        spacing={1}
      >
        {expenses.map((expense: Expense) => (
          <Button
            sx={{ padding: 0, textTransform: "none" }}
            key={expense._id}
            onClick={() => openDialog(expense)}
          >
            <ExpenseCard expense={expense} />
          </Button>
        ))}
      </Stack>
      <EditExpense
        openDialog={open}
        setOpenDialog={setOpen}
        expense={expenseToOpen}
      />
    </>
  );
};
