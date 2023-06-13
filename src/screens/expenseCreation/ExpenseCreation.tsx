import { Box } from "@mui/material";
import { fetcher } from "@/api/fetcher";
import useSWR from "swr";
import { baseUrl } from "@/constants";

const ExpenseCreation = () => {
  const {
    data: expenses,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/expense`, fetcher);
  if (error) return <div>échec du chargement</div>;
  if (isLoading) return <div>chargement...</div>;

  // rendu des données
  return (
    <Box>
      {expenses.map((expense: any) => (
        <div>{expense.name}</div>
      ))}
    </Box>
  );
};
export default ExpenseCreation;
