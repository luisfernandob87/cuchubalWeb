import React from "react";
import imagen from "../assets/react.svg";

export const InfoInicio = () => {
  return (
    <section className="infoInicio">
      <img src={imagen} alt="Logo Inicio" />
      <p>
        <strong>Gratis</strong>
        Organice de manera exitosa todos los cuchubales, tandas o sociedades de
        ahorro no importa como le digan en tu país. Somos solo una plataforma
        para llevar el control, no te pediremos metodos de pago ni algun tipo de
        deposito.
      </p>
    </section>
  );
};
