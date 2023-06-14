import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import EuroIcon from "@mui/icons-material/Euro";
import BalanceIcon from "@mui/icons-material/Balance";
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { TABCHOICE, TabChoice } from "@/constants";

interface props {
  setTab: (tab: TabChoice) => void;
}

export const TabBar = (p: props) => {
  const { setTab } = p;

  const tabsProps = [
    {
      icon: <EuroIcon />,
      label: "Dépenses",
      choice: TABCHOICE.EXPENSES,
    },
    {
      icon: <BalanceIcon />,
      label: "Balance",
      choice: TABCHOICE.BALANCE,
    },
    {
      icon: <SettingsIcon />,
      label: "Paramètres",
      choice: TABCHOICE.SETTINGS,
    },
  ];

  const renderTabs = () => {
    return tabsProps.map((tab) => {
      return (
        <IconButton
          color="inherit"
          onClick={() => setTab(tab.choice)}
          sx={{ width: "33%", flexDirection: "column", borderRadius: "8px" }}
          key={tab.choice}
        >
          {tab.icon}
          <Typography variant="overline">{tab.label}</Typography>
        </IconButton>
      );
    });
  };

  return (
    <AppBar position="static" component="footer">
      <Toolbar sx={{ padding: "6px 0" }}>{renderTabs()}</Toolbar>
    </AppBar>
  );
};
