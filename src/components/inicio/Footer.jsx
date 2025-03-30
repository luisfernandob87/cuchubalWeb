import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/funciones">Funciones</Link>
        <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
        <Link to="/politica-confidencialidad">Política de confidencialidad</Link>
        <Link to="/contactanos">Contáctanos</Link>
      </div>
      <div className="footer-copyright">
        © Todos los derechos reservados, {currentYear}.
      </div>
    </footer>
  );
}

export default Footer;
