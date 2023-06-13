import { useState } from "react";
import { tabChoice } from "@/constants";
import { Header } from "@/components/Header";
import { Box, Container } from "@mui/material";
import { TabBar } from "@/components/TabBar";
import { Expenses } from "../expenses";
import { Balance } from "../balance";
import { Settings } from "../settings";

// Main component whenever user is logged in
const Home = () => {
  const [tab, setTab] = useState<tabChoice>(tabChoice.EXPENSES);

  const renderPage = () => {
    switch (tab) {
      case tabChoice.EXPENSES:
        return <Expenses />;
      case tabChoice.BALANCE:
        return <Balance />;
      case tabChoice.SETTINGS:
        return <Settings />;
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Header tab={tab} />
      <Container
        maxWidth="xl"
        sx={{
          overflowY: "scroll",
          flexGrow: 1,
        }}
      >
        {renderPage()}
      </Container>
      <TabBar setTab={setTab} />
    </Box>
  );
};
export default Home;
