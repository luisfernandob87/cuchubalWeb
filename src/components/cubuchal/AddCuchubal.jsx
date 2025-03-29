import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddCuchubal.css";

function AddCuchubal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const page = "http://localhost:3000";
  const userId = localStorage.getItem("userId");

  const submit = (data) => {
    axios.post(`${page}/cuchubal`, data).then((res) => {
      console.log(res);

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
    });
  };

  return (
    <div className="add-cuchubal-container">
      <h1 className="title">Crear Cuchubal</h1>
      <form onSubmit={handleSubmit(submit)} className="form">
        <label className="label">Nombre del Cuchubal</label>
        <input
          type="text"
          className="input"
          {...register("nombreCuchubal", { required: true })}
        />

        <label className="label">Selecciona el Periodo de Pago</label>
        <select
          className="input"
          {...register("formaPago", { required: true })}
        >
          <option value="">--Selecciona Periodo--</option>
          <option value="Mensual">Mensual</option>
          <option value="Quincenal">Quincenal</option>
          <option value="Semanal">Semanal</option>
        </select>

        <label className="label">Fecha de Inicio</label>
        <input
          type="date"
          className="input"
          {...register("fechaInicio", { required: true })}
        />

        <label className="label">No. de Participantes</label>
        <input
          type="number"
          className="input"
          {...register("noParticipantes", { required: true })}
        />

        <label className="label">Cuota por Participante</label>
        <input
          type="text"
          className="input"
          {...register("cuotaPorParticipante", { required: true })}
        />

        <label className="label">Sorteo</label>
        <input
          type="checkbox"
          className="checkbox"
          {...register("sorteo")}
        />

        <input
          type="hidden"
          defaultValue={userId}
          {...register("idUsuario")}
        />

        {errors.exampleRequired && <span>El campo es requerido</span>}

        <button type="submit" className="submit-button">
          Crear Cuchubal
        </button>
      </form>
    </div>
  );
}

export default AddCuchubal;
