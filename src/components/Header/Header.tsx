import { tabChoice } from "@/constants";
import { Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

interface props {
  tab: tabChoice;
}

export const Header = (p: props) => {
  const { tab } = p;

  const getTabName = (tab: tabChoice) => {
    switch (tab) {
      case tabChoice.BALANCE:
        return "Balance";
      case tabChoice.EXPENSES:
        return "Dépenses";
      case tabChoice.SETTINGS:
        return "Paramètres";
    }
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          {getTabName(tab)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
