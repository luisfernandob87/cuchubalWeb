import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const anio = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer>
      <div className="linkFooter">
        <a
          onClick={() => {
            navigate("/functions");
          }}
        >
          Funciones
        </a>
        <a
          onClick={() => {
            navigate("/faq");
          }}
        >
          Preguntas Frecuentes
        </a>
        <a
          onClick={() => {
            navigate("/confidentiality");
          }}
        >
          Politica de confidencialidad
        </a>
        <a
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contacto
        </a>
      </div>
      <p>Todos los derechos reservados, {anio}</p>
    </footer>
  );
}
export default Footer;
