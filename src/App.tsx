import React from 'react';
import './App.css';
import LoginPage from "./screens/login";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
    </Routes>
  );
}

export default App;
