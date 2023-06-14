import { Box, Paper, Skeleton, Stack } from "@mui/material";
import useSWR from "swr";
import { baseUrl } from "@/constants";
import { fetcher } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import { ExpenseCard } from "@/components/ExpenseCard";

export const Expenses = () => {
  const {
    data: expenses,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/expense`, fetcher);
  if (error) return <div>échec du chargement</div>;
  if (isLoading)
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

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        align-items="stretch"
        spacing={2}
        sx={{ padding: "1rem 0" }}
      >
        {expenses.map((expense: Expense) => (
          <ExpenseCard expense={expense} key={expense._id} />
        ))}
      </Stack>
    </>
  );
};
