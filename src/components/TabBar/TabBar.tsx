import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Fab, Skeleton, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Expense } from "@/types/expense";
import { getTotalAmount, getUserShares } from "@/utils/expenses.utils";
import { UserContext } from "@/context/UserContext";
import CreateExpense from "@/components/CreateExpense";

interface props {
  expenses: Expense[];
  loadingExpenses: boolean;
}

export const TabBar = ({ expenses, loadingExpenses }: props) => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const getUserTotal = () => {
    if (loadingExpenses) return <Skeleton variant="text" width="55px" />;
    const userShares = getUserShares(expenses, user._id);
    return (
      <Typography
        variant="button"
        component="p"
        align="left"
        sx={{ lineHeight: 1.5 }}
      >
        {userShares} €
      </Typography>
    );
  };

  const getTotal = () => {
    if (loadingExpenses) return <Skeleton variant="text" width="55px" />;
    const totalAmount = getTotalAmount(expenses);
    return (
      <Typography
        variant="button"
        component="p"
        align="right"
        sx={{ lineHeight: 1.5 }}
      >
        {totalAmount} €
      </Typography>
    );
  };

  const openCreationDialog = () => {
    setOpenCreateDialog(true);
  };

  return (
    <>
      <AppBar
        position="static"
        component="footer"
        sx={{
          backgroundColor: `${theme.palette.grey[800]}`,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="overline"
              component="p"
              sx={{ lineHeight: 1.5 }}
            >
              Mon coût total
            </Typography>
            {getUserTotal()}
          </Box>
          <StyledFab
            color="primary"
            aria-label="add"
            onClick={openCreationDialog}
          >
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="overline"
              component="p"
              align="right"
              sx={{ lineHeight: 1.5 }}
            >
              Total dépenses
            </Typography>
            {getTotal()}
          </Box>
        </Toolbar>
      </AppBar>
      <CreateExpense
        openDialog={openCreateDialog}
        setOpenDialog={setOpenCreateDialog}
      />
    </>
  );
};
