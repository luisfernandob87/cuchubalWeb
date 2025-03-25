import React from "react";
import Footer from "./inicio/Footer";
import FuncionalidadesInicio from "./inicio/FuncionalidadesInicio";
import InfoInicio from "./inicio/InfoInicio";
import MenuInicio from "./inicio/MenuInicio";
import RotuloInicio from "./inicio/RotuloInicio";
import "../styles/Principal.css";

function Principal() {
  return (
    <div className="principal-container">
      <MenuInicio />
      <div className="hero-section">
        <InfoInicio />
      </div>
      <RotuloInicio />
      <FuncionalidadesInicio />
      <Footer />
    </div>
  );
}
export default Principal;
