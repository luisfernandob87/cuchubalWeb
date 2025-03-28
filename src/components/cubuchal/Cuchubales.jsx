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
      .then((res) => {
        const sortedCuchubales = res.data.sort((a, b) => b.id - a.id);
        setCuchubales(sortedCuchubales);
      });
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm('¿Está seguro que desea eliminar este cuchubal?')) {
      try {
        await axios.delete(`http://localhost:3000/cuchubal/${id}`);
        setCuchubales(cuchubales.filter(cuchubal => cuchubal.id !== id));
      } catch (error) {
        console.error('Error deleting cuchubal:', error);
        alert('Error al eliminar el cuchubal');
      }
    }
  };

  return (
    <section className="content">
      <div>
        {cuchubales.map((cuchubal) => (
          <div
            onClick={() => navigate(`/cuchubal/manos/${cuchubal.id}`)}
            key={cuchubal.id}
            style={{ marginBottom: "15px", position: "relative" }}
          >
            <button 
              onClick={(e) => handleDelete(cuchubal.id, e)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                padding: "5px 10px",
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Eliminar
            </button>
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
