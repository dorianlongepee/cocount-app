import { TABCHOICE, TabChoice } from "@/constants";
import { Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

interface props {
  tab: TabChoice;
}

export const Header = (p: props) => {
  const { tab } = p;

  const getTabName = (tab: TabChoice) => {
    switch (tab) {
      case TABCHOICE.BALANCE:
        return "Balance";
      case TABCHOICE.EXPENSES:
        return "Dépenses";
      case TABCHOICE.SETTINGS:
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
