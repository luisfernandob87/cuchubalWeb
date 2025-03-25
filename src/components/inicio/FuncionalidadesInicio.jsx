import React from "react";
import "../../styles/FuncionalidadesInicio.css";
import { FaFileAlt, FaUsers, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

function FuncionalidadesInicio() {
  return (
    <div className="funcionalidades-container">
      <h2>Funcionalidades</h2>
      
      <div className="funcionalidades-grid">
        <div className="funcionalidad-card">
          <div className="icon-container">
            <FaFileAlt />
          </div>
          <h3>Crea los cuchubales que quieras, sin costo alguno.</h3>
        </div>
        
        <div className="funcionalidad-card">
          <div className="icon-container">
            <FaUsers />
          </div>
          <h3>Agrega a todas las personas que quieras, mientras más gente más estarás ahorrando.</h3>
        </div>
        
        <div className="funcionalidad-card">
          <div className="icon-container">
            <FaEnvelope />
          </div>
          <h3>Notifica por correo electrónico la participación de los integrantes.</h3>
        </div>
        
        <div className="funcionalidad-card">
          <div className="icon-container">
            <FaCalendarAlt />
          </div>
          <h3>Agrega periodos de pago y la plataforma le indicará a los usuarios la fecha que les toca recibir.</h3>
        </div>
      </div>
    </div>
  );
}

export default FuncionalidadesInicio;
