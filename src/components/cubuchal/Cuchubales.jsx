import axios from "axios";
import React, { useEffect } from "react";

function Cuchubales() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cuchubales/${userId}`)
      .then((res) => console.log(res.data));
  }, []);

  return (
    <section className="content">
      <div>
        <h3 style={{ textAlign: "center" }}>Titulo</h3>
        <p>Forma de pago:</p>
        <p>Participantes:</p>
        <p>Cuota:</p>
        <p>Fecha de inicio:</p>
        <p>sorteo</p>
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>Titulo</h3>
        <p>Forma de pago:</p>
        <p>Participantes:</p>
        <p>Cuota:</p>
        <p>Fecha de inicio:</p>
        <p>sorteo</p>
      </div>
    </section>
  );
}

export default Cuchubales;
