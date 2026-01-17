import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiCalendar, FiDollarSign, FiUsers, FiTrash2, FiPlus, FiChevronRight } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Cuchubales.css";

function Cuchubales() {
  const { t, language } = useLanguage();
  const userId = localStorage.getItem("userId");
  const [cuchubales, setCuchubales] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/cuchubales/${userId}`)
      .then((res) => {
        const sortedCuchubales = res.data.sort((a, b) => b.id - a.id);
        setCuchubales(sortedCuchubales);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm(t("dashboard.deleteConfirm"))) {
      try {
        await api.delete(`/cuchubal/${id}`);
        setCuchubales(cuchubales.filter((cuchubal) => cuchubal.id !== id));
      } catch (error) {
        console.error("Error deleting cuchubal:", error);
      }
    }
  };

  if (loading) return <div className="loader">{t("dashboard.loading")}</div>;

  return (
    <div className="cuchubales-view animate-fade-in">
      <header className="view-header">
        <div>
          <h1>{t("dashboard.title")}</h1>
          <p>{t("dashboard.desc")}</p>
        </div>
        <button className="btn-add" onClick={() => navigate("/cuchubal/addCuchubal")}>
          <FiPlus /> {t("dashboard.createNew")}
        </button>
      </header>

      {cuchubales.length === 0 ? (
        <div className="empty-state">
          <FiDollarSign className="empty-icon" />
          <h2>{t("dashboard.emptyTitle")}</h2>
          <p>{t("dashboard.emptyDesc")}</p>
          <button className="btn-primary" onClick={() => navigate("/cuchubal/addCuchubal")}>
            {t("dashboard.emptyBtn")}
          </button>
        </div>
      ) : (
        <div className="cuchubales-grid">
          {cuchubales.map((cuchubal) => (
            <div
              onClick={() => navigate(`/cuchubal/manos/${cuchubal.id}`)}
              key={cuchubal.id}
              className="cuchubal-card-premium"
            >
              <div className="card-header">
                <div className="card-title">
                  <h3>{cuchubal.nombreCuchubal}</h3>
                  <span className="badge-status">{t("dashboard.active")}</span>
                </div>
                <button
                  onClick={(e) => handleDelete(cuchubal.id, e)}
                  className="card-delete-btn"
                  title={t("common.delete")}
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="card-body">
                <div className="info-item">
                  <FiCalendar />
                  <span>{t("dashboard.payout")}: <strong>{t(`common.${cuchubal.formaPago}`)}</strong></span>
                </div>
                <div className="info-item">
                  <FiDollarSign />
                  <span>{t("dashboard.quota")}: <strong>{t("common.currency")}{cuchubal.cuotaPorParticipante}</strong></span>
                </div>
                <div className="info-item">
                  <FiUsers />
                  <span>{t("dashboard.participants")}: <strong>{cuchubal.noParticipantes}</strong></span>
                </div>
              </div>

              <div className="card-footer">
                <div className="start-date">
                  {t("dashboard.starts")}: {moment(cuchubal.fechaInicio).locale(language).format("LL")}
                </div>
                <div className="view-details">
                  {t("dashboard.details")} <FiChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cuchubales;
