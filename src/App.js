import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import Inicio from "./componentes/Inicio";
//import Inicio from "./componentes/Inicio";
import  { useEffect } from "react";


function App() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />

        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
    </Router>
  );
}

export default App;
