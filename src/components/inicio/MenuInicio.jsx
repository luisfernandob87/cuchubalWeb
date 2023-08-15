import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

export default function MenuInicio() {
  const navigate = useNavigate();

  return (
    <nav className="menuInicio">
      <img
        src={imagen}
        alt="React"
        onClick={() => {
          navigate("/");
        }}
      />
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
          navigate("/login");
        }}
      >
        Iniciar Sesión
      </a>
      <a
        onClick={() => {
          navigate("/add");
        }}
      >
        Crear Cuenta
      </a>
    </nav>
  );
}
