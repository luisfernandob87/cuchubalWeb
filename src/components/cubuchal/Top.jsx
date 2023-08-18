import React from "react";
import imagen from "../../assets/react.svg";

function Top() {
  return (
    <header>
      <nav>
        <img src={imagen} alt="Logo" />
        <h5>Hola: USUARIO</h5>
        <button>Cerrar Sesión</button>
      </nav>
    </header>
  );
}

export default Top;
