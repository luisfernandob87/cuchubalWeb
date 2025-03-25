import React from "react";
import "../../styles/InfoInicio.css";
import savingImage from "../../assets/saving-illustration.png"; // Necesitarás una imagen similar

function InfoInicio() {
  return (
    <div className="info-inicio-container">
      <div className="info-image">
        <img src={savingImage} alt="Ahorro colaborativo" />
      </div>
      <div className="info-text">
        <div className="gratis-tag">GRATIS</div>
        <h2>Organice de manera exitosa todos los cuchubales, tandas o sociedades de ahorro no importa como le digan en tu país.</h2>
        <p>Somos solo una plataforma para llevar el control, no te pediremos métodos de pago ni algún tipo de depósito.</p>
      </div>
    </div>
  );
}

export default InfoInicio;
