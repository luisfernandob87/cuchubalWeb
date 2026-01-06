import React from "react";
import Footer from "./inicio/Footer";
import FuncionalidadesInicio from "./inicio/FuncionalidadesInicio";
import InfoInicio from "./inicio/InfoInicio";
import MenuInicio from "./inicio/MenuInicio";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/Principal.css";

function Principal() {
  const navigate = useNavigate();

  return (
    <div className="principal-container">
      <MenuInicio />

      <main>
        <InfoInicio />

        <FuncionalidadesInicio />

        <section className="cta-section animate-fade-in">
          <div className="cta-card">
            <div className="cta-content">
              <h2>¿Listo para empezar a <span className="gradient-text">ahorrar juntos</span>?</h2>
              <p>Únete a miles de personas que ya gestionan sus ahorros de forma inteligente.</p>
              <button className="btn-primary-large" onClick={() => navigate("/add")}>
                Crear mi primer Cuchubal <FiArrowRight />
              </button>
            </div>
            <div className="cta-glow"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Principal;
