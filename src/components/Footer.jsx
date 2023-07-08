import React from "react";

export const Footer = () => {
  const anio = new Date().getFullYear();
  return (
    <footer>
      <div className="linkFooter">
        <a href="#">Funciones</a>
        <a href="#">Preguntas Frecuentes</a>
        <a href="#">Politica de confidencialidad</a>
        <a href="#">Contacto</a>
      </div>
      <p>Todos los derechos reservados, {anio}</p>
    </footer>
  );
};
