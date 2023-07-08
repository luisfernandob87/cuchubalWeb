import React from "react";
import imagen from "../assets/react.svg";

export const MenuInicio = () => {
  return (
    <nav className="menuInicio">
      <img src={imagen} alt="React" />
      <a href="#">Funciones</a>
      <a href="#">Preguntas Frecuentes</a>
      <a href="#">Iniciar Sesión</a>
      <a href="#">Crear Cuenta</a>
    </nav>
  );
};
