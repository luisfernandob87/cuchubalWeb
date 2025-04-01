import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/functions">Funciones</Link>
        <Link to="/faq">Preguntas Frecuentes</Link>
        <Link to="/confidentiality">Política de confidencialidad</Link>
        <Link to="/contact">Contáctanos</Link>
      </div>
      <div className="footer-copyright">
        © Todos los derechos reservados, {currentYear}.
      </div>
    </footer>
  );
}

export default Footer;
