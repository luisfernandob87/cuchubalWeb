import React from "react";
import Footer from "./inicio/Footer";
import Principal from "./reinicioPassword/Principal";
import MenuInicio from "./inicio/MenuInicio";

function ReinicioPassword() {
  return (
    <div className="principal-container">
      <MenuInicio />
      <Principal />
      <Footer />
    </div>
  );
}

export default ReinicioPassword;
