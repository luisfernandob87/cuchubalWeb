import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiEdit3, FiCalendar, FiUsers, FiDollarSign, FiCheck } from "react-icons/fi";
import "./AddCuchubal.css";

function AddCuchubal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const submit = (data) => {
    api.post("/cuchubal", { ...data, idUsuario: userId }).then((res) => {
      const isSorteo = getValues("sorteo");
      if (isSorteo) {
        navigate("/cuchubal/addManosSorteo", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      } else {
        navigate("/cuchubal/addManos", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      }
    }).catch(err => console.error(err));
  };

  return (
    <div className="add-view animate-fade-in">
      <div className="view-header">
        <h1>Nuevo Cuchubal</h1>
        <p>Configura las reglas de tu nuevo grupo de ahorro inteligente.</p>
      </div>

      <div className="form-card-container">
        <form onSubmit={handleSubmit(submit)} className="premium-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label><FiEdit3 /> Nombre del Cuchubal</label>
              <input
                type="text"
                placeholder="Ej. Ahorro Navideño 2026"
                {...register("nombreCuchubal", { required: "El nombre es obligatorio" })}
              />
              {errors.nombreCuchubal && <span className="error">{errors.nombreCuchubal.message}</span>}
            </div>

            <div className="form-group">
              <label><FiCalendar /> Periodo de Pago</label>
              <select {...register("formaPago", { required: "Selecciona un periodo" })}>
                <option value="">--Selecciona--</option>
                <option value="Mensual">Mensual</option>
                <option value="Quincenal">Quincenal</option>
                <option value="Semanal">Semanal</option>
              </select>
            </div>

            <div className="form-group">
              <label><FiCalendar /> Fecha de Inicio</label>
              <input
                type="date"
                {...register("fechaInicio", { required: true })}
              />
            </div>

            <div className="form-group">
              <label><FiUsers /> No. de Participantes</label>
              <input
                type="number"
                placeholder="0"
                {...register("noParticipantes", { required: true, min: 2 })}
              />
            </div>

            <div className="form-group">
              <label><FiDollarSign /> Cuota por Participante</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                {...register("cuotaPorParticipante", { required: true })}
              />
            </div>

            <div className="form-group full-width checkbox-group">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="sorteo"
                  {...register("sorteo")}
                />
                <label htmlFor="sorteo">
                  <div className="custom-check">
                    <FiCheck />
                  </div>
                  Realizar sorteo automático de turnos
                </label>
              </div>
              <p className="helper-text">Si se activa, el sistema asignará los turnos aleatoriamente.</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate("/cuchubal")}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary-large">
              Siguiente Paso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCuchubal;
