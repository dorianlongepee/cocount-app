import { useData } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import { User } from "@/types/user";
import { getUserShares } from "@/utils/expenses.utils";
import { Box, Chip, Paper, Stack, Typography, useTheme } from "@mui/material";

interface props {
  expenses: Expense[];
}

export const Balance = ({ expenses }: props) => {
  const theme = useTheme();
  const { data: users }: { data: User[]; isLoading: boolean } =
    useData("users");

  const getBalance = (user: User) => {
    const balance = getUserShares(expenses, user._id);
    if (balance > 0) {
      return <Chip label={`Doit ${balance}€`} color="error" />;
    } else {
      return <Chip label={`N'a pas de dette`} color="success" />;
    }
  };

  return (
    <Stack spacing={1}>
      {users.map((user) => (
        <Paper
          key={user._id}
          sx={{
            padding: "1rem",
            backgroundColor: theme.palette.grey[100],
            display: "flex",
          }}
          elevation={0}
        >
          <Typography variant="subtitle1" component="h2">
            {user.firstname} {user.lastname}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {getBalance(user)}
        </Paper>
      ))}
    </Stack>
  );
};
