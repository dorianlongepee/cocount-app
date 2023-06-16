import { addExpense } from "@/api/expenses.api";
import { revalidate, useData } from "@/api/fetcher";
import { UserContext } from "@/context/UserContext";
import { Category } from "@/types/category";
import { User } from "@/types/user";
import {
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
import { useContext, useEffect, useState } from "react";

interface props {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export const CreateExpense = ({ openDialog, setOpenDialog }: props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useContext(UserContext);

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

  // State definition
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(1);
  const [paidBy, setPaidBy] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<User[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Effects
  useEffect(() => {
    if (
      name &&
      amount &&
      !Number.isNaN(amount) &&
      paidBy &&
      beneficiaries.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, amount, paidBy, beneficiaries]);

  // Handlers
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBeneficiariesChange = (
    e: SelectChangeEvent<typeof beneficiaries>
  ) => {
    setBeneficiaries(e.target.value as User[]);
  };

  const handleSubmit = async () => {
    const newExpense = {
      name,
      category,
      amount,
      paidBy,
      beneficiaries,
    };

    try {
      await addExpense(newExpense);
      revalidate("expenses");
      enqueueSnackbar("Dépense créée", { variant: "success" });
      setOpenDialog(false);
    } catch (e: any) {
      enqueueSnackbar(e.response.data, { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Création d'une dépense</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ paddingY: "1rem" }}>
          <TextField
            required
            id="name"
            label="Nom"
            onChange={handleChangeName}
            variant="outlined"
            defaultValue={name}
            fullWidth
          />

          <FormControl>
            <InputLabel id="category">Catégorie</InputLabel>
            <Select
              label="Catégorie"
              labelId="selectCategoryLabel"
              id="category"
              defaultValue=""
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
              defaultValue={user._id}
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
              defaultValue={[]}
              onChange={handleBeneficiariesChange}
            >
              {userOptions}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          Créer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
