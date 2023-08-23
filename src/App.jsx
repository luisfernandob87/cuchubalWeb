import "./App.css";
import Principal from "./components/Principal";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearCuenta from "./components/CrearCuenta";
import Funciones from "./components/Funciones";
import Preguntas from "./components/Preguntas";
import Politica from "./components/Politicas";
import Contacto from "./components/Contacto";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cuchubal from "./components/Cuchubal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<CrearCuenta />} />
      <Route path="/functions" element={<Funciones />} />
      <Route path="/faq" element={<Preguntas />} />
      <Route path="/confidentiality" element={<Politica />} />
      <Route path="/contact" element={<Contacto />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/cuchubal/*" element={<Cuchubal />} />
      </Route>
    </Routes>
  );
}

export default App;
