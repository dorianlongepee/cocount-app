import { addCategory } from "@/api/categories.api";
import { revalidate, useData } from "@/api/fetcher";
import CategoryCard from "@/components/CategoryCard";
import EditCategory from "@/components/EditCategory";
import Header from "@/components/Header";
import IsLoading from "@/components/IsLoading";
import { Category } from "@/types/category";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const CategoriesManagement = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [name, setName] = useState("");
  const [categoryToOpen, setOpenedCategory] = useState<Category | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => {
    setOpenCreate(false);
    setName("");
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await addCategory({ name: name });
      revalidate("categories");
      enqueueSnackbar("Catégorie créée", { variant: "success" });
      handleCloseCreate();
    } catch (e: any) {
      enqueueSnackbar(e.response.data, { variant: "error" });
    }
  };

  useEffect(() => {
    if (name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name]);

  const {
    data: categories,
    isLoading,
  }: { data: Category[]; error: any; isLoading: boolean } =
    useData("categories");

  if (isLoading) return <IsLoading />;

  return (
    <>
      <Header title="Catégories" goBack />
      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          paddingY: "1rem",
        }}
      >
        <Stack spacing={1}>
          <Button
            variant="contained"
            sx={{ width: "fit-content", alignSelf: "end" }}
            onClick={handleOpenCreate}
          >
            Ajouter une catégorie
          </Button>
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              setOpenEdit={setOpenEdit}
              setOpenedCategory={setOpenedCategory}
            />
          ))}
        </Stack>
      </Container>

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>Création d'une catégorie</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="name"
            label="Nom"
            onChange={handleChangeName}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Annuler</Button>
          <Button onClick={handleCreate} disabled={!isValid}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>

      {categoryToOpen && (
        <EditCategory
          category={categoryToOpen}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}
    </>
  );
};
