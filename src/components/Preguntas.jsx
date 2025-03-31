import React from "react";
import MenuInicio from "./inicio/MenuInicio";
import Footer from "./inicio/Footer";
import Principal from "./preguntas/Principal";

function Preguntas() {
  return (
    <div className="principal-container">
    
      <MenuInicio />
      <Principal />
      <Footer />
    </div>
  );
}

export default Preguntas;
