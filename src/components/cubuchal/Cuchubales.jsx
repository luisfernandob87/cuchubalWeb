import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import "./Cuchubales.css";

function Cuchubales() {
  const userId = localStorage.getItem("userId");
  const [cuchubales, setCuchubales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cuchubales/${userId}`)
      .then((res) => {
        const sortedCuchubales = res.data.sort((a, b) => b.id - a.id);
        setCuchubales(sortedCuchubales);
      });
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm("¿Está seguro que desea eliminar este cuchubal?")) {
      try {
        await axios.delete(`http://localhost:3000/cuchubal/${id}`);
        setCuchubales(cuchubales.filter((cuchubal) => cuchubal.id !== id));
      } catch (error) {
        console.error("Error deleting cuchubal:", error);
        alert("Error al eliminar el cuchubal");
      }
    }
  };

  return (
    <section className="cuchubales-content">
      <h1 className="cuchubales-title">Cuchubales</h1>
      <div className="cuchubales-grid">
        {cuchubales.map((cuchubal) => (
          <div
            onClick={() => navigate(`/cuchubal/manos/${cuchubal.id}`)}
            key={cuchubal.id}
            className="cuchubal-card"
          >
            <button
              onClick={(e) => handleDelete(cuchubal.id, e)}
              className="delete-button"
            >
              Eliminar
            </button>
            <h3>Nombre: {cuchubal.nombreCuchubal}</h3>
            <p>Periodo de Pago: {cuchubal.formaPago}</p>
            <p>Cuota por participante: {cuchubal.cuotaPorParticipante}</p>
            <p>
              Fecha de inicio:{" "}
              {moment(cuchubal.fechaInicio).format("YYYY-MM-DD")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cuchubales;
