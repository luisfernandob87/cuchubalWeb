import "./App.css";
import Principal from "./components/Principal";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearCuenta from "./components/CrearCuenta";
import Funciones from "./components/Funciones";
import Preguntas from "./components/Preguntas";
import Politica from "./components/Politicas";
import Contacto from "./components/Contacto";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<CrearCuenta />} />
        <Route path="/functions" element={<Funciones />} />
        <Route path="/faq" element={<Preguntas />} />
        <Route path="/confidentiality" element={<Politica />} />
        <Route path="/contact" element={<Contacto />} />
        <Route element={<ProtectedRoutes />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
