import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./ManosSchedule.css";

function Manos() {
  const { t, language } = useLanguage();
  const I = useIcons();
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
        } else {
          return api.get(`/cuchubal/${id}`);
        }
      })
      .then((res2) => {
        if (res2) {
          setDatosCuchubal(res2.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">{t("dashboard.loadingSchedule")}</div>;
  if (!datosCuchubal) return <div className="error-state">{t("dashboard.noData")}</div>;

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
          <I.ArrowLeft /> {t("common.back")}
        </button>
        <div className="header-info">
          <h1>{datosCuchubal.nombreCuchubal}</h1>
          <div className="cuchubal-meta">
            <span className="meta-tag"><I.Calendar /> {t("dashboard.started")}: {moment(datosCuchubal.fechaInicio).locale(language).format("L")}</span>
            <span className="meta-tag"><I.CreditCard /> {t("dashboard.payout")}: {t(`common.${datosCuchubal.formaPago}`)}</span>
            <span className="meta-tag"><I.User /> {datosCuchubal.noParticipantes} {t("dashboard.members")}</span>
          </div>
        </div>
      </header>

      <div className="schedule-container">
        <h2>{t("dashboard.scheduleTitle")}</h2>
        {manos.length === 0 ? (
          <div className="empty-schedule">
            <p>{t("dashboard.emptyScheduleDesc")}</p>
            <button
              className="btn-primary-large"
              onClick={() =>
                navigate("/cuchubal/addManos", {
                  state: [{ userData: datosCuchubal }, { userData: datosCuchubal.id }],
                })
              }
            >
              {t("dashboard.assignParticipantsBtn")}
            </button>
          </div>
        ) : (
        <div className="timeline">
          {manos.map((mano) => {
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
                      <I.Clock /> {fechaPago.locale(language).format("LL")}
                    </div>
                    <div className="status-badge">
                      {isPast ? t("dashboard.completed") : t("dashboard.next")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

export default Manos;
