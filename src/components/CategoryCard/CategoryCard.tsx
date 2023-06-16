import { delCategory } from "@/api/categories.api";
import { revalidate } from "@/api/fetcher";
import { Category } from "@/types/category";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface props {
  category: Category;
}

export const CategoryCard = ({ category }: props) => {
  const handleDelete = async () => {
    try {
      await delCategory(category._id);
      revalidate("categories");
      enqueueSnackbar("Catégorie supprimée", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(e.response.data, { variant: "error" });
    }
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="h2">
        {category.name}
      </Typography>
      <Box>
        {/* <IconButton aria-label="edit">
          <EditOutlined />
        </IconButton> */}
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
};
