import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { tabChoice } from "@/constants";
import EuroIcon from "@mui/icons-material/Euro";
import BalanceIcon from "@mui/icons-material/Balance";
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";

interface props {
  setTab: (tab: tabChoice) => void;
}

export const TabBar = (p: props) => {
  const { setTab } = p;
  return (
    <AppBar position="static" component="footer">
      <Toolbar sx={{ padding: "6px 0" }}>
        <IconButton
          color="inherit"
          onClick={() => setTab(tabChoice.EXPENSES)}
          sx={{ width: "33%", flexDirection: "column", borderRadius: "8px" }}
        >
          <EuroIcon />
          <Typography variant="overline">Dépenses</Typography>
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => setTab(tabChoice.BALANCE)}
          sx={{ width: "33%", flexDirection: "column", borderRadius: "8px" }}
        >
          <BalanceIcon />
          <Typography variant="overline">Balance</Typography>
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => setTab(tabChoice.SETTINGS)}
          sx={{ width: "33%", flexDirection: "column", borderRadius: "8px" }}
        >
          <SettingsIcon />
          <Typography variant="overline">Paramètres</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
