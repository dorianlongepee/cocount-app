import React, { useContext } from "react";
import "./App.css";
import LoginPage from "./screens/login";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { UserContext } from "./context/UserContext";
import Home from "@/screens/home";
import SnackbarCloseButton from "./components/SnackbarCloseButton";
import { CreateAccount } from "./screens/createAccount";
import CategoriesManagement from "./screens/categoriesManagement";

function App() {
  const { user } = useContext(UserContext);
  return (
    <SnackbarProvider
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
    >
      <Routes>
        {user._id !== "" ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/" element={<LoginPage />}></Route>
        )}
        <Route path="/register" element={<CreateAccount />}></Route>
        <Route path="/categories" element={<CategoriesManagement />}></Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
