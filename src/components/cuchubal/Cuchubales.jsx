import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiCalendar, FiDollarSign, FiUsers, FiTrash2, FiPlus, FiChevronRight } from "react-icons/fi";
import "./Cuchubales.css";

function Cuchubales() {
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
    if (window.confirm("¿Está seguro que desea eliminar este cuchubal?")) {
      try {
        await api.delete(`/cuchubal/${id}`);
        setCuchubales(cuchubales.filter((cuchubal) => cuchubal.id !== id));
      } catch (error) {
        console.error("Error deleting cuchubal:", error);
      }
    }
  };

  if (loading) return <div className="loader">Cargando tus ahorros...</div>;

  return (
    <div className="cuchubales-view animate-fade-in">
      <header className="view-header">
        <div>
          <h1>Mis Cuchubales</h1>
          <p>Gestiona tus grupos de ahorro y monitorea el progreso.</p>
        </div>
        <button className="btn-add" onClick={() => navigate("/cuchubal/addCuchubal")}>
          <FiPlus /> Crear Nuevo
        </button>
      </header>

      {cuchubales.length === 0 ? (
        <div className="empty-state">
          <FiDollarSign className="empty-icon" />
          <h2>Aún no tienes Cuchubales</h2>
          <p>Crea tu primer grupo para empezar a ahorrar con tus amigos o familiares.</p>
          <button className="btn-primary" onClick={() => navigate("/cuchubal/addCuchubal")}>
            Crear mi primer Cuchubal
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
                  <span className="badge-status">Activo</span>
                </div>
                <button
                  onClick={(e) => handleDelete(cuchubal.id, e)}
                  className="card-delete-btn"
                  title="Eliminar"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="card-body">
                <div className="info-item">
                  <FiCalendar />
                  <span>Pago: <strong>{cuchubal.formaPago}</strong></span>
                </div>
                <div className="info-item">
                  <FiDollarSign />
                  <span>Cuota: <strong>Q{cuchubal.cuotaPorParticipante}</strong></span>
                </div>
                <div className="info-item">
                  <FiUsers />
                  <span>Participantes: <strong>{cuchubal.noParticipantes}</strong></span>
                </div>
              </div>

              <div className="card-footer">
                <div className="start-date">
                  Inicia: {moment(cuchubal.fechaInicio).format("DD MMM, YYYY")}
                </div>
                <div className="view-details">
                  Detalles <FiChevronRight />
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
