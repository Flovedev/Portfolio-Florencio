import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Starfield from "./components/menu/Starfield";
import Home from "./components/home/Home";
import NavBar from "./components/menu/NavBar";
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import About from "./components/about/About";

function App() {
  return (
    <BrowserRouter>
      <Starfield />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
