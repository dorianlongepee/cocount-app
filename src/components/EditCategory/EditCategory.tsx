import { updateCategory } from "@/api/categories.api";
import { revalidate } from "@/api/fetcher";
import { Category } from "@/types/category";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

interface props {
  category: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditCategory = ({ category, open, setOpen }: props) => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  useEffect(() => {
    if (name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEdit = async () => {
    try {
      await updateCategory(category._id, { name: name });
      revalidate("categories");
      enqueueSnackbar("Catégorie modifiée", { variant: "success" });
      handleClose();
    } catch (e: any) {
      enqueueSnackbar(e.response.data, { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modification d'une catégorie</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="name"
          label="Nom"
          onChange={handleChangeName}
          defaultValue={category.name}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleEdit} disabled={!isValid}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};
