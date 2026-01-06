import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../../api/axios";
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiCreditCard } from "react-icons/fi";
import "./ManosSchedule.css";

function Manos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manos, setManos] = useState([]);
  const [datosCuchubal, setDatosCuchubal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/cuchubal/${id}/cuotas`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setManos(res.data);
          setDatosCuchubal(res.data[0].cuchubal);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">Cargando cronograma...</div>;
  if (!datosCuchubal) return <div className="error-state">No se encontraron datos para este cuchubal.</div>;

  let agregar = 0;
  let tipo = "";
  const tipoPago = datosCuchubal.formaPago;

  if (tipoPago === "Mensual") {
    agregar = 1;
    tipo = "month";
  } else if (tipoPago === "Quincenal") {
    agregar = 2;
    tipo = "week";
  } else if (tipoPago === "Semanal") {
    agregar = 1;
    tipo = "week";
  }

  return (
    <div className="manos-view animate-fade-in">
      <header className="view-header">
        <button className="btn-back" onClick={() => navigate("/cuchubal")}>
          <FiArrowLeft /> Volver
        </button>
        <div className="header-info">
          <h1>{datosCuchubal.nombreCuchubal}</h1>
          <div className="cuchubal-meta">
            <span className="meta-tag"><FiCalendar /> Iniciado: {moment(datosCuchubal.fechaInicio).format("DD/MM/YYYY")}</span>
            <span className="meta-tag"><FiCreditCard /> Pago: {datosCuchubal.formaPago}</span>
            <span className="meta-tag"><FiUser /> {datosCuchubal.noParticipantes} integrantes</span>
          </div>
        </div>
      </header>

      <div className="schedule-container">
        <h2>Cronograma de Pagos y Turnos</h2>
        <div className="timeline">
          {manos.map((mano, index) => {
            const fechaPago = moment(datosCuchubal.fechaInicio)
              .add(mano.numeroCuota * agregar - agregar, tipo);
            const isPast = fechaPago.isBefore(moment());

            return (
              <div className={`timeline-item ${isPast ? 'past' : ''}`} key={mano.id}>
                <div className="timeline-number">{mano.numeroCuota}</div>
                <div className="timeline-content">
                  <div className="user-info">
                    <div className="user-avatar">
                      {mano.usuario.nombre.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3>{mano.usuario.nombre}</h3>
                      <p>{mano.usuario.correo}</p>
                    </div>
                  </div>
                  <div className="payment-info">
                    <div className="date">
                      <FiClock /> {fechaPago.format("DD [de] MMMM, YYYY")}
                    </div>
                    <div className="status-badge">
                      {isPast ? "Completado" : "Próximo"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Manos;
