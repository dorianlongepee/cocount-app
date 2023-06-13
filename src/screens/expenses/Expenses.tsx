import { Stack } from "@mui/material";
import useSWR from "swr";
import { baseUrl } from "@/constants";
import { fetcher } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import IsLoading from "@/components/IsLoading";
import { ExpenseCard } from "@/components/ExpenseCard";

export const Expenses = () => {
  const {
    data: expenses,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/expense`, fetcher);
  if (error) return <div>échec du chargement</div>;
  if (isLoading) return <IsLoading />;

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
