import React, { useEffect, useState } from "react";
import moment from "moment";
import api from "../../api/axios";
import { FiCalendar, FiClock, FiDollarSign, FiUsers, FiTag } from "react-icons/fi";
import "./Cuchubales.css"; // Reusing some CSS or adding specific ones

function MisManos() {
  const userId = localStorage.getItem("userId");
  const [misManos, setMisManos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/usuario/${userId}/miscuotas`)
      .then((res) => {
        setMisManos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="loader">Cargando tus turnos...</div>;

  return (
    <div className="cuchubales-view animate-fade-in">
      <header className="view-header">
        <div>
          <h1>Mis Turnos</h1>
          <p>Consulta cuándo te toca recibir en cada uno de tus cuchubales.</p>
        </div>
      </header>

      {misManos.length === 0 ? (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <h2>Aún no tienes turnos asignados</h2>
          <p>Cuando te inviten a un cuchubal, aparecerán aquí tus fechas de pago.</p>
        </div>
      ) : (
        <div className="cuchubales-grid">
          {misManos.map((mano) => {
            const { cuchubal, numeroCuota } = mano;

            // Safety check: if cuchubal is null for some reason, don't render it
            if (!cuchubal) return null;

            let agregar = 0;
            let tipo = "";

            if (cuchubal.formaPago === "Mensual") { agregar = 1; tipo = "month"; }
            else if (cuchubal.formaPago === "Quincenal") { agregar = 2; tipo = "week"; }
            else if (cuchubal.formaPago === "Semanal") { agregar = 1; tipo = "week"; }

            const fechaPago = moment(cuchubal.fechaInicio).add(numeroCuota * agregar - agregar, tipo);

            return (
              <div key={mano.id} className="cuchubal-card-premium">
                <div className="card-header">
                  <div className="card-title">
                    <h3>{cuchubal.nombreCuchubal}</h3>
                    <span className="badge-status">Turno #{numeroCuota}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-item">
                    <FiClock />
                    <span>Fecha estimada: <strong>{fechaPago.format("DD [de] MMMM, YYYY")}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiDollarSign />
                    <span>Monto a recibir: <strong>Q{cuchubal.cuotaPorParticipante * cuchubal.noParticipantes}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiUsers />
                    <span>Participantes: <strong>{cuchubal.noParticipantes}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiTag />
                    <span>Plan: <strong>{cuchubal.formaPago}</strong></span>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="start-date">
                    Inició: {moment(cuchubal.fechaInicio).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MisManos;
