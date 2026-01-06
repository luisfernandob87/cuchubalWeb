import React from "react";
import "../../styles/InfoInicio.css";
import heroImage from "../../assets/hero.png";
import { FiTrendingUp, FiShield, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function InfoInicio() {
  const navigate = useNavigate();

  return (
    <section className="hero-container animate-fade-in">
      <div className="hero-content">
        <div className="badge">100% GRATIS Y SEGURO</div>
        <h1>El Futuro del Ahorro <span className="gradient-text">Comunitario</span></h1>
        <p>
          Organiza tus cuchubales, tandas o sociedades con facilidad.
          Lleva el control total de turnos, pagos y participantes en un solo lugar,
          sin depósitos ni comisiones.
        </p>

        <div className="hero-actions">
          <button className="btn-primary-large" onClick={() => navigate("/add")}>
            Empezar ahora — Es Gratis
          </button>
          <button className="btn-outline-large" onClick={() => navigate("/functions")}>
            Ver funciones
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <FiShield />
            <span>Seguro</span>
          </div>
          <div className="stat">
            <FiUsers />
            <span>Colaborativo</span>
          </div>
          <div className="stat">
            <FiTrendingUp />
            <span>Eficiente</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img src={heroImage} alt="Cuchubal Digital" className="float-animation" />
        <div className="visual-glow"></div>
      </div>
    </section>
  );
}

export default InfoInicio;
