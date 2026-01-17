import React, { useEffect, useState } from "react";
import moment from "moment";
import api from "../../api/axios";
import { FiCalendar, FiClock, FiDollarSign, FiUsers, FiTag } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Cuchubales.css"; // Reusing some CSS or adding specific ones

function MisManos() {
  const { t, language } = useLanguage();
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

  if (loading) return <div className="loader">{t("dashboard.loadingTurns")}</div>;

  return (
    <div className="cuchubales-view animate-fade-in">
      <header className="view-header">
        <div>
          <h1>{t("dashboard.myTurns")}</h1>
          <p>{t("dashboard.myTurnsDesc")}</p>
        </div>
      </header>

      {misManos.length === 0 ? (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <h2>{t("dashboard.emptyTurnsTitle")}</h2>
          <p>{t("dashboard.emptyTurnsDesc")}</p>
        </div>
      ) : (
        <div className="cuchubales-grid">
          {misManos.map((mano) => {
            const { cuchubal, numeroCuota } = mano;

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
                    <span className="badge-status">{t("dashboard.active")} #{numeroCuota}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-item">
                    <FiClock />
                    <span>{t("dashboard.estimatedDate")}: <strong>{fechaPago.locale(language).format("LL")}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiDollarSign />
                    <span>{t("dashboard.amountToReceive")}: <strong>{t("common.currency")}{cuchubal.cuotaPorParticipante * cuchubal.noParticipantes}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiUsers />
                    <span>{t("dashboard.participants")}: <strong>{cuchubal.noParticipantes}</strong></span>
                  </div>
                  <div className="info-item">
                    <FiTag />
                    <span>{t("dashboard.plan")}: <strong>{t(`common.${cuchubal.formaPago}`)}</strong></span>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="start-date">
                    {t("dashboard.started")}: {moment(cuchubal.fechaInicio).locale(language).format("LL")}
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
