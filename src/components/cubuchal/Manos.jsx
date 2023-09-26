import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Manos() {
  const { id } = useParams();
  const [manos, setManos] = useState([]);
  const [tipoPago, setTipoPago] = useState([]);
  const [fechaInicio, SetFechaInicio] = useState([]);
  const [datosCuchubal, setDatosCuchubal] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cuchubal/${id}/cuotas`)
      .then(
        (res) => (
          setManos(res.data),
          setTipoPago(res.data[0].cuchubal.formaPago),
          SetFechaInicio(res.data[0].cuchubal.fechaInicio),
          setDatosCuchubal(res.data[0].cuchubal)
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
      <h3>{datosCuchubal.nombreCuchubal}</h3>
      <h4>
        Fecha de inicio:{" "}
        {moment(datosCuchubal.fechaInicio).format("DD/MM/YYYY")}
      </h4>
      {manos.map((mano) => (
        <div key={mano.id}>
          <h4>{mano.usuario.nombre}</h4>
          <p>{mano.usuario.correo}</p>
          <p>Número de cuota: {mano.numeroCuota}</p>
          <p>
            Fecha a pagar:{" "}
            {moment(fechaInicio)
              .add(mano.numeroCuota * agregar - agregar, tipo)
              .format("DD/MM/YYYY")}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Manos;
