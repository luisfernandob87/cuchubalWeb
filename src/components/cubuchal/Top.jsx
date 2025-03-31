import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

function Top() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("usuario");

  return (
      <div className="principal-container">
    <header>
      <nav>
        <img src={imagen} alt="Logo" />
        <h5>Hola: {username}</h5>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </nav>
    </header>
    </div>
  );
}

export default Top;
