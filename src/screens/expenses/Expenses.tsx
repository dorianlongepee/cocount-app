import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { revalidate, useUsers } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import { ExpenseCard } from "@/components/ExpenseCard";
import { useState } from "react";
import { User } from "@/types/user";
import { enqueueSnackbar } from "notistack";
import { delExpense } from "@/api/expenses.api";

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

interface props {
  users: User[];
  expenses: Expense[];
  errorExpenses: any;
  loadingExpenses: boolean;
}

export const Expenses = ({
  users,
  errorExpenses,
  loadingExpenses,
  expenses,
}: props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [formInputs, setFormInputs] = useState(expenseFallback);

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

  const userOptions = users?.map((user: User) => (
    <MenuItem key={user._id} value={user._id}>
      {user.firstname}
    </MenuItem>
  ));

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const openDialog = (expense: Expense) => {
    setFormInputs(expense);
    setOpen(true);
  };

  const deleteExpense = async () => {
    try {
      await delExpense(formInputs._id);
      revalidate("expenses");
      enqueueSnackbar("Dépense supprimée", { variant: "success" });
      setOpen(false);
    } catch (e: any) {
      enqueueSnackbar(e.response.data.error, { variant: "error" });
    }
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
            sx={{ padding: 0 }}
            key={expense._id}
            onClick={() => openDialog(expense)}
          >
            <ExpenseCard expense={expense} />
          </Button>
        ))}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Détails de la dépense</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ paddingY: "1rem" }}>
            <TextField
              id="name"
              label="Nom"
              onChange={(e) => handleInput(e)}
              defaultValue={formInputs.name}
              variant="outlined"
              fullWidth
            />
            <FormControl>
              <InputLabel id="amount">Montant</InputLabel>
              <OutlinedInput
                id="amount"
                label="Montant"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => handleInput(e)}
                defaultValue={formInputs.amount}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="paidBy">Payé par</InputLabel>
              <Select
                label="Payé par"
                labelId="selectPaidByLabel"
                id="paidBy"
                defaultValue={formInputs.paidBy._id}
              >
                {userOptions}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteExpense} color="error">
            Supprimer
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose} disabled>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
