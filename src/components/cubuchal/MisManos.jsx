import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

function MisManos() {
  const userId = localStorage.getItem("userId");
  const [misManos, setMisManos] = useState([]);
  const [tipoPago, setTipoPago] = useState([]);
  const [fechaInicio, SetFechaInicio] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/usuario/${userId}/miscuotas`)
      .then(
        (res) => (
          setMisManos(res.data),
          setTipoPago(res.data[0].cuchubal.formaPago),
          SetFechaInicio(res.data[0].cuchubal.fechaInicio)
        )
      );
  }, []);

  let agregar = 0;
  let tipo = "";

  if (tipoPago == "Mensual") {
    agregar = 1;
    tipo = "month";
  } else if (tipoPago == "Quincenal") {
    agregar = 2;
    tipo = "week";
  } else if (tipoPago == "Semanal") {
    agregar = 1;
    tipo = "week";
  }

  return (
    <section>
      {misManos.map((mimano) => (
        <div key={mimano.id}>
          <h4>{mimano.cuchubal.nombreCuchubal}</h4>
          <p>Participantes: {mimano.cuchubal.noParticipantes}</p>
          <p>Forma de Pago: {mimano.cuchubal.formaPago}</p>
          <p>Número de cuota: {mimano.numeroCuota}</p>
          <p>Fecha de inicio: {moment(fechaInicio).format("DD/MM/YYYY")}</p>
          <p>
            Fecha a pagar:{" "}
            {moment(fechaInicio)
              .add(mimano.numeroCuota * agregar - agregar, tipo)
              .format("DD/MM/YYYY")}
          </p>
        </div>
      ))}
    </section>
  );
}

export default MisManos;
