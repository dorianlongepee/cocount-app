import { Expense } from "@/types/expense";
import { User } from "@/types/user";
import { Box, Chip, Paper, Stack, Typography, useTheme } from "@mui/material";

interface props {
  users: User[];
  expenses: Expense[];
}

export const Balance = ({ users, expenses }: props) => {
  const theme = useTheme();

  return (
    <>
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
            <Chip color="error" label="-100€" />
          </Paper>
        ))}
      </Stack>
    </>
  );
};
