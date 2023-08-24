import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/menu/NavBar";
import Starfield from "./components/menu/Starfield";

function App() {
  return (
    <BrowserRouter>
      <Starfield />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
