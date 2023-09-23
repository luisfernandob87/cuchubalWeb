import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Manos() {
  const { id } = useParams();
  const [manos, setManos] = useState([]);
  const [tipoPago, setTipoPago] = useState([]);
  const [fechaInicio, SetFechaInicio] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cuchubal/${id}/cuotas`)
      .then(
        (res) => (
          setManos(res.data),
          setTipoPago(res.data[0].cuchubal.formaPago),
          SetFechaInicio(res.data[0].cuchubal.fechaInicio)
        )
      );
  }, []);

  let dias = 0;

  if (tipoPago == "Mensual") {
    dias = 30;
  } else if (tipoPago == "Quincenal") {
    dias = 15;
  } else if (tipoPago == "Semanal") {
    dias = 7;
  }

  console.log(manos);

  // function sumarSemanasFecha(fecha, n = 1) {
  //   return new Date(fecha.setDate(fecha.getDate() + n));
  // }

  let anio = moment(fechaInicio).format("YYYY");
  let mes = moment(fechaInicio).format("MM");
  let dia = moment(fechaInicio).format("DD");

  let fecha = new Date(anio, mes, dia);
  console.log(moment(fecha).format("DD/MM/YYYY"));

  // let resultado = sumarSemanasFecha(fecha, dias);
  // console.log(moment(resultado).format("DD/MM/YYYY"));

  return (
    <section>
      {manos.map((mano) => (
        <div key={mano.id}>
          <h4>{mano.usuario.nombre}</h4>
          <p>{mano.usuario.correo}</p>
          <p>{moment(mano.cuchubal.fechaInicio).format("DD/MM/YYYY")}</p>
          <p>{mano.numeroCuota}</p>
        </div>
      ))}
    </section>
  );
}

export default Manos;
