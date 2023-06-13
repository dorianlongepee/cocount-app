import React, { useContext } from "react";
import "./App.css";
import LoginPage from "./screens/login";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { UserContext } from "./context/UserContext";
import { UserContextType } from "@/types/user";
import Home from "@/screens/home";

function App() {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <SnackbarProvider>
      <Routes>
        {user._id !== "" ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/" element={<LoginPage />}></Route>
        )}
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
