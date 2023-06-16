import { delExpense, updateExpense } from "@/api/expenses.api";
import { revalidate, useData } from "@/api/fetcher";
import { Category } from "@/types/category";
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
  SelectChangeEvent,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

interface props {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  expense: Expense;
}

const EditExpense = ({ openDialog, setOpenDialog, expense }: props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<User[]>([]);

  // Fetching from API to populate the selects
  const { data: users }: { data: User[] } = useData("users");
  const { data: categories }: { data: Category[] } = useData("categories");

  const userOptions = users?.map((user: User) => (
    <MenuItem key={user._id} value={`${user._id}`}>
      {user.firstname} {user.lastname}
    </MenuItem>
  ));

  const categoryOptions = categories?.map((category: Category) => (
    <MenuItem key={category._id} value={category._id}>
      {category.name}
    </MenuItem>
  ));

  // Handlers
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBeneficiariesChange = (e: SelectChangeEvent<unknown>) => {
    setBeneficiaries(e.target.value as User[]);
  };

  useEffect(() => {
    setName(expense.name);
    setCategory(expense.category ? expense.category._id : "");
    setAmount(expense.amount);
    setPaidBy(expense.paidBy._id);
    setBeneficiaries(expense.beneficiaries);
  }, [expense]);

  const handleSubmit = async () => {
    const newExpense = {
      name,
      category,
      amount,
      paidBy,
      beneficiaries,
    };

    try {
      await updateExpense(expense._id, newExpense);
      revalidate("expenses");
      enqueueSnackbar("Dépense modifiée", { variant: "success" });
      setOpenDialog(false);
    } catch (e: any) {
      enqueueSnackbar(e.response.data, { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
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
      <DialogTitle>Modification d'une dépense</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ paddingY: "1rem" }}>
          <TextField
            required
            id="name"
            label="Nom"
            onChange={handleChangeName}
            variant="outlined"
            defaultValue={expense.name}
            fullWidth
          />

          <FormControl>
            <InputLabel id="category">Catégorie</InputLabel>
            <Select
              label="Catégorie"
              labelId="selectCategoryLabel"
              id="category"
              defaultValue={expense.category ? expense.category._id : ""}
              onChange={(e: SelectChangeEvent<string>) =>
                setCategory(e.target.value)
              }
            >
              {categoryOptions}
            </Select>
          </FormControl>

          <FormControl required>
            <InputLabel id="amount">Montant</InputLabel>
            <OutlinedInput
              id="amount"
              label="Montant"
              defaultValue={expense.amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </FormControl>

          <FormControl required>
            <InputLabel id="paidBy">Payé par</InputLabel>
            <Select
              label="Payé par"
              labelId="selectPaidByLabel"
              id="paidBy"
              defaultValue={expense.paidBy._id}
              onChange={(e: SelectChangeEvent<string>) =>
                setPaidBy(e.target.value)
              }
            >
              {userOptions}
            </Select>
          </FormControl>

          <FormControl required>
            <InputLabel id="beneficiaries">Bénéficiaires</InputLabel>
            <Select
              label="Bénéficiaires"
              labelId="selectBeneficiariesLabel"
              id="beneficiaries"
              variant="outlined"
              multiple
              defaultValue={expense.beneficiaries.map(
                (beneficiary: User) => beneficiary._id
              )}
              onChange={handleBeneficiariesChange}
            >
              {userOptions}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error">
          Supprimer
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Modifier</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpense;
