import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import "./Top.css"; // We'll need to create this CSS file

function Top() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("usuario");

  return (
    <div className="top-principal-container">
      <header className="top-header">
        <nav className="top-nav">
          <div className="top-logo-container">
            <img src={imagen} alt="Logo" className="top-logo" />
          </div>
          <h5 className="top-greeting">Hola: {username}</h5>
          <button className="top-logout-btn" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Top;
