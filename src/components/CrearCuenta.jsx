import React from "react";
import Footer from "./inicio/Footer";
import Principal from "./crearCuenta/Principal";
import MenuInicio from "./inicio/MenuInicio";

function CrearCuenta() {
  return (
    <div className="principal-container">
    <div className="containerAdd">
      <MenuInicio />
      <Principal />
      <Footer />
    </div>
    </div>
  );
}

export default CrearCuenta;
