import { delExpense } from "@/api/expenses.api";
import { revalidate, useData } from "@/api/fetcher";
import { Expense } from "@/types/expense";
import { User } from "@/types/user";
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
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface props {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  expense?: Expense;
}

const ExpenseDialog = ({ openDialog, setOpenDialog, expense }: props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { data: users }: { data: User[] } = useData("users");

  const userOptions = users?.map((user: User) => (
    <MenuItem key={user._id} value={user._id}>
      {user.firstname}
    </MenuItem>
  ));

  const handleClose = () => {
    setOpenDialog(false);
  };

  const deleteExpense = async () => {
    try {
      await delExpense(expense!._id);
      revalidate("expenses");
      enqueueSnackbar("Dépense supprimée", { variant: "success" });
      setOpenDialog(false);
    } catch (e: any) {
      enqueueSnackbar(e.response.data.error, { variant: "error" });
    }
  };

  return (
    <Dialog
      open={openDialog}
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
            defaultValue={expense ? expense.name : ""}
            variant="outlined"
            fullWidth
          />
          <FormControl>
            <InputLabel id="amount">Montant</InputLabel>
            <OutlinedInput
              id="amount"
              label="Montant"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              defaultValue={expense ? expense.amount : 0}
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
              defaultValue={expense ? expense.paidBy._id : ""}
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
  );
};
export default ExpenseDialog;
