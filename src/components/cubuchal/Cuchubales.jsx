import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

function Cuchubales() {
  const userId = localStorage.getItem("userId");
  const [cuchubales, setCuchubales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cuchubales/${userId}`)
      .then((res) => setCuchubales(res.data));
  }, []);

  return (
    <section className="content">
      <div>
        {cuchubales.map((cuchubal) => (
          <div
            onClick={() => console.log(cuchubal.id)}
            key={cuchubal.id}
            style={{ marginBottom: "15px" }}
          >
            <h3 style={{ textAlign: "center" }}>{cuchubal.nombreCuchubal}</h3>
            <h4>{cuchubal.cuotaPorParticipante * cuchubal.noParticipantes}</h4>
            <p>Forma de pago: {cuchubal.formaPago}</p>
            <p>Participantes: {cuchubal.noParticipantes}</p>
            <p>Cuota: {cuchubal.cuotaPorParticipante}</p>
            <p>
              Fecha de inicio:{" "}
              {moment(cuchubal.fechaInicio).format("DD/MM/YYYY")}
            </p>
            <p>sorteo {cuchubal.sorteo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cuchubales;
