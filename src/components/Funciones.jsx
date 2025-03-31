import React from "react";
import MenuInicio from "./inicio/MenuInicio";
import Footer from "./inicio/Footer";
import Principal from "./funciones/Principal";

function Funciones() {
  return (
    <div className="principal-container">
      <MenuInicio />
      <Principal />
      <Footer />
    </div>
  );
}

export default Funciones;
