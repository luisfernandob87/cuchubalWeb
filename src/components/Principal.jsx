import React from "react";
import Footer from "./inicio/Footer";
import FuncionalidadesInicio from "./inicio/FuncionalidadesInicio";
import InfoInicio from "./inicio/InfoInicio";
import MenuInicio from "./inicio/MenuInicio";
import RotuloInicio from "./inicio/RotuloInicio";

function Principal() {
  return (
    <>
      <MenuInicio />
      <InfoInicio />
      <RotuloInicio />
      <FuncionalidadesInicio />
      <Footer />
    </>
  );
}
export default Principal;
